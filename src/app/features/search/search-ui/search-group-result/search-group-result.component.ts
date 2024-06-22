import {Component, input, InputSignal} from '@angular/core';
import {SupabaseObjectReturn} from '../../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {Router} from '@angular/router';
import {TuiAvatarModule, TuiIslandModule} from '@taiga-ui/kit';
import {TuiCardModule, TuiCellModule, TuiSurfaceModule, TuiTitleModule} from '@taiga-ui/experimental';
import {LoadingState} from '@polity-signal-store/types/loadingState.type';

@Component({
    selector: 'polity-search-group-result',
    standalone: true,
    imports: [
        TuiIslandModule,
        TuiAvatarModule,
        TuiCardModule,
        TuiCellModule,
        TuiSurfaceModule,
        TuiTitleModule
    ],
    templateUrl: './search-group-result.component.html',
    styleUrl: './search-group-result.component.less'
})
export class SearchGroupResultComponent {
    /**
     * Takes a profile as input to display a profile
     *
     * @Input profile: Profile | null.
     */
    public group: InputSignal<SupabaseObjectReturn<'search_group'> | null | undefined> = input<SupabaseObjectReturn<'search_group'> | null | undefined>();
    public isLoading: InputSignal<LoadingState> = input<LoadingState>({
        dataRequested: false,
        loading: false
    });

    constructor(private readonly router: Router) {
    }

    protected async onClick(): Promise<void> {
        await this.router.navigate([`/group/`, this.group()?.id_]);
    }
}
