import {Component, Input, signal, WritableSignal} from '@angular/core';
import {Router} from "@angular/router";
import {PlainFunctions} from "../../../../../supabase/types/supabase.shorthand-types";

@Component({
    selector: 'polity-search-profile-result',
    templateUrl: './search-profile-result.component.html',
    styleUrls: ['./search-profile-result.component.less']
})
export class SearchProfileResult {
    /**
     * Takes a profile as input to display a profile
     *
     * @Input profile: Profile | null.
     */
    @Input() public profile: PlainFunctions<'search_user'> | null = null;
    @Input() public isLoading: WritableSignal<boolean> = signal(true);

    constructor(private readonly router: Router) {
    }

    protected async onClick(): Promise<void> {
        await this.router.navigate([`/profile/`, this.profile?.id]);
    }
}
