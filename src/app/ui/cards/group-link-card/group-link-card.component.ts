import {Component, Input, signal, WritableSignal} from '@angular/core';
import {Router} from "@angular/router";
import {TuiIslandModule} from "@taiga-ui/kit";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";

@Component({
    selector: 'polity-group-link-card',
    templateUrl: './group-link-card.component.html',
    styleUrls: ['./group-link-card.component.less'],
    standalone: true,
    imports: [
        TuiIslandModule
    ]
})
export class GroupLinkCardComponent {
    /**
     * Takes the sessionId as input to display a profile link
     *
     * @Input isLoading - WritableSignal<boolean> - a signal that indicates if the component is loading
     * @Input group - SupabaseObjectReturn<'read_groups_of_user'> | null - the group data to
     * be displayed
     */
    @Input({required: true}) public isLoading: WritableSignal<boolean> = signal(true);
    @Input({required: true}) public group: SupabaseObjectReturn<'read_groups_of_user'> | null = null;


    // @Input({required: true}) public group: WritableSignal<
    //     SupabaseObjectReturn<'read_groups_of_user'> | null | undefined
    // > = signal(
    //     null
    // )
    @Input() public dataCyTag: string = 'group-link-card';

    constructor(
        private readonly router: Router,
    ) {
    }

    protected async onClick(): Promise<void> {
        await this.router.navigate(['/group/', this.group?.group_id_]);
    }

}
