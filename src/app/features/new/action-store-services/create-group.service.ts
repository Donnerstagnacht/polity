import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CreateGroupService {
    // private readonly supabaseClient = supabaseAuthenticatedClient
    //
    // constructor(private router: Router) {
    // }
    //
    // public async createGroup(group: GroupNew): Promise<void> {
    //     console.log(group)
    //     const response: PostgrestSingleResponse<SupabaseObjectReturn<'create_group_transaction'>> = await this.supabaseClient
    //     .rpc('create_group_transaction', {
    //         _name: group.name,
    //         _description: group.description,
    //         _level: group.level,
    //         _invited_members: group.invited_members
    //     })
    //     .throwOnError()
    //     if (response.error) {
    //         console.log(response.error)
    //     } else {
    //         this.router.navigate(['/home']);
    //     }
    // }
}
