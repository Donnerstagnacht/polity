import {Component, input, InputSignal} from '@angular/core';
import {Router} from '@angular/router';
import {SupabaseObjectReturn} from '../../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {TuiAvatarModule, TuiIslandModule} from '@taiga-ui/kit';
import {LoadingState} from '@polity-signal-store/types/loadingState.type';
import {TuiCardModule, TuiCellModule, TuiSurfaceModule, TuiTitleModule} from '@taiga-ui/experimental';

@Component({
    selector: 'polity-search-profile-result',
    templateUrl: './search-profile-result.component.html',
    styleUrls: ['./search-profile-result.component.less'],
    imports: [
        TuiIslandModule,
        TuiAvatarModule,
        TuiCardModule,
        TuiCellModule,
        TuiSurfaceModule,
        TuiTitleModule
    ],
    standalone: true
})
export class SearchProfileResult {
    /**
     * Takes a profile as input to display a profile
     *
     * @Input profile: Profile | null.
     */
    public profile: InputSignal<SupabaseObjectReturn<'search_user'> | null> = input<SupabaseObjectReturn<'search_user'> | null>(null);
    public isLoading: InputSignal<LoadingState> = input<LoadingState>({
        dataRequested: false,
        loading: false
    });

    constructor(private readonly router: Router) {
    }

    protected async onClick(): Promise<void> {
        await this.router.navigate([`/profile/`, this.profile()?.id_]);
    }
}
