import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {supabaseClient} from "../../../auth/supabase-client";
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {SupabaseFunctionTableReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {GroupNew} from "../types/group-new";

@Injectable({
    providedIn: 'root'
})
export class CreateGroupService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient

    constructor(private router: Router) {
    }

    public async createGroup(group: GroupNew): Promise<void> {
        console.log(group)
        this.router.navigate(['/group']);
        const response: PostgrestSingleResponse<SupabaseFunctionTableReturn<'create_group_transaction'>> = await this.supabaseClient
        .rpc('create_group_transaction', {
            name: group.name,
            level: group.level,
            description: group.description,
            invited_members: group.invited_members
        })
        .throwOnError()
        if (response.error) {
            console.log(response.error)
        }
    }
}
