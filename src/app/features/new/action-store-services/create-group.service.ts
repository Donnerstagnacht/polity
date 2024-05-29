import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";
import {PostgrestSingleResponse} from "@supabase/supabase-js";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {GroupNew} from "../types/group-new";

@Injectable({
    providedIn: 'root'
})
export class CreateGroupService {
    private readonly supabaseClient = supabaseAuthenticatedClient

    constructor(private router: Router) {
    }

    public async createGroup(group: GroupNew): Promise<void> {
        console.log(group)
        const response: PostgrestSingleResponse<SupabaseObjectReturn<'create_group_transaction'>> = await this.supabaseClient
        .rpc('create_group_transaction', {
            _name: group.name,
            _description: group.description,
            _level: group.level,
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
