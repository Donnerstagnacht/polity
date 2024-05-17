import {Component, Input, signal, WritableSignal} from '@angular/core';
import {Router} from "@angular/router";
import {TuiIslandModule} from "@taiga-ui/kit";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";

@Component({
    selector: 'polity-profile-link-card',
    templateUrl: './profile-link-card.component.html',
    styleUrls: ['./profile-link-card.component.less'],
    standalone: true,
    imports: [
        TuiIslandModule
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
    @Input({required: true}) public sessionId: string | null = null;
    @Input({required: true}) public isLoading: WritableSignal<boolean> = signal(true);
    @Input({required: true}) public profile: WritableSignal<
        SupabaseObjectReturn<'read_user'> | null | undefined
    > = signal(
        null
    )
    @Input() public dataCyTag: string = 'profile-link-card';

    constructor(
        private readonly router: Router,
    ) {
    }

    protected async onClick(): Promise<void> {
        await this.router.navigate(['/profile/', this.sessionId]);
    }

}
