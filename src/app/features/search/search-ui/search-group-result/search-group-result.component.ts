import {Component, input, InputSignal} from '@angular/core';
import {SupabaseObjectReturn} from '../../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {Router} from '@angular/router';
import {TuiIslandModule} from '@taiga-ui/kit';

@Component({
    selector: 'polity-search-group-result',
    standalone: true,
    imports: [
        TuiIslandModule
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
    public isLoading: InputSignal<boolean> = input(true);

    constructor(private readonly router: Router) {
    }

    protected async onClick(): Promise<void> {
        await this.router.navigate([`/group/`, this.group()?.id_]);
    }
}
