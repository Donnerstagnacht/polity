import {Component, input, InputSignal} from '@angular/core';
import {Router} from '@angular/router';
import {TuiAvatarModule} from '@taiga-ui/kit';
import {SupabaseObjectReturn} from '../../../../supabase/types/supabase.authenticated.shorthand-types';
import {
    TuiAppearanceModule,
    TuiCardModule,
    TuiCellModule,
    TuiSurfaceModule,
    TuiTitleModule
} from '@taiga-ui/experimental';

@Component({
    selector: 'polity-group-link-card',
    templateUrl: './group-link-card.component.html',
    styleUrls: ['./group-link-card.component.less'],
    standalone: true,
    imports: [
        TuiAvatarModule,
        TuiCardModule,
        TuiCellModule,
        TuiSurfaceModule,
        TuiTitleModule,
        TuiAppearanceModule
    ]
})
export class GroupLinkCardComponent {
    /**
     * Takes the sessionId as input to display a profile link
     *
     * @Input isLoading - WritableSignal<boolean> - a signal that indicates if the component is loading
     * @Input group - SupabaseObjectReturn<'groups_of_user_read'> | null - the group data to
     * be displayed
     */
    public isLoading: InputSignal<boolean> = input(true);
    public group: InputSignal<SupabaseObjectReturn<'groups_of_user_read'> | null> = input<SupabaseObjectReturn<'groups_of_user_read'> | null>(null);
    public dataCyTag: InputSignal<string> = input<string>('group-link-card');

    constructor(
        private readonly router: Router
    ) {
    }

    protected async onClick(): Promise<void> {
        await this.router.navigate(['/group/', this.group()?.group_id_]);
    }

}
