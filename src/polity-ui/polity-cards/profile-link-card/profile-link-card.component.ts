import {Component, input, InputSignal} from '@angular/core';
import {Router} from '@angular/router';
import {TuiAvatarModule, TuiIslandModule} from '@taiga-ui/kit';
import {SupabaseObjectReturn} from '../../../../supabase/types/supabase.authenticated.shorthand-types';
import {TuiCardModule, TuiCellModule, TuiSurfaceModule, TuiTitleModule} from '@taiga-ui/experimental';

@Component({
    selector: 'polity-profile-link-card',
    templateUrl: './profile-link-card.component.html',
    styleUrls: ['./profile-link-card.component.less'],
    standalone: true,
    imports: [
        TuiIslandModule,
        TuiAvatarModule,
        TuiCardModule,
        TuiCellModule,
        TuiSurfaceModule,
        TuiTitleModule
    ]
})
export class ProfileLinkCardComponent {
    /**
     * Takes the sessionId as input to display a profile link
     *
     * @Input sessionId - string |null.
     * @Input isLoading - WritableSignal<boolean> - a signal that indicates if the profile is loading
     * @Input profile - WritableSignal<SupabaseObjectReturn<'read_user'> | null | undefined> - the profile data to
     * be displayed
     */
    public sessionId: InputSignal<string | null> = input<string | null>('');
    public isLoading: InputSignal<boolean> = input(true);
    public profile: InputSignal<SupabaseObjectReturn<'profiles_read'> | null | undefined> = input<SupabaseObjectReturn<'profiles_read'> | null | undefined>(null);
    public dataCyTag: InputSignal<string> = input<string>('profile-link-card');

    constructor(
        private readonly router: Router
    ) {
    }

    protected async onClick(): Promise<void> {
        await this.router.navigate(['/profile/', this.sessionId()]);
    }

}
