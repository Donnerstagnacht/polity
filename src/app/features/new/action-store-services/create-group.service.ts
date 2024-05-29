import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {DatabasePublicOverwritten} from "../../../../../supabase/types/supabase.public.modified";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {GroupNew} from "../types/group-new";

@Injectable({
    providedIn: 'root'
})
export class CreateGroupService {
    private readonly supabaseClient: SupabaseClient<DatabasePublicOverwritten> = supabaseAuthenticatedClient

    constructor(private router: Router) {
    }

    public async createGroup(group: GroupNew): Promise<void> {
        console.log(group)
        const response: PostgrestSingleResponse<SupabaseObjectReturn<'create_group_transaction'>> = await this.supabaseClient
        .rpc('create_group_transaction', {
            _name: group.name,
            _level: group.level,
            _description: group.description,
            _invited_members: group.invited_members
        })
        .throwOnError()
        if (response.error) {
            console.log(response.error)
        } else {
            this.router.navigate(['/home']);
        }
    }
}
