import {Component, Input, signal, WritableSignal} from '@angular/core';
import {Router} from "@angular/router";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {TuiIslandModule} from "@taiga-ui/kit";

@Component({
    selector: 'polity-search-profile-result',
    templateUrl: './search-profile-result.component.html',
    styleUrls: ['./search-profile-result.component.less'],
    imports: [
        TuiIslandModule
    ],
    standalone: true
})
export class SearchProfileResult {
    /**
     * Takes a profile as input to display a profile
     *
     * @Input profile: Profile | null.
     */
    @Input({required: true}) public profile: SupabaseObjectReturn<'search_user'> | null = null;
    @Input({required: true}) public isLoading: WritableSignal<boolean> = signal(true);

    constructor(private readonly router: Router) {
    }

    protected async onClick(): Promise<void> {
        await this.router.navigate([`/profile/`, this.profile?.id]);
    }
}
