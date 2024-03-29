import {Component, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime} from "rxjs";
import {FunctionTableReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {TuiFieldErrorPipeModule, TuiInputModule} from "@taiga-ui/kit";
import {TuiErrorModule} from "@taiga-ui/core";
import {SearchProfileResult} from "../search-profile-result/search-profile-result.component";
import {CommonModule} from "@angular/common";
import {SearchStoreService} from "../action-store-services/search.store.service";
import {SearchUserActionService} from "../action-store-services/search-user.action.service";

@Component({
    selector: 'polity-search-user',
    templateUrl: './search-user.component.html',
    styleUrls: ['./search-user.component.less'],
    imports: [
        ReactiveFormsModule,
        TuiInputModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        SearchProfileResult,
        CommonModule
    ],
    standalone: true
})
export class SearchUserComponent {
    loading: WritableSignal<boolean> = signal(false);
    protected searchResults: WritableSignal<FunctionTableReturn<'search_user'>> = signal([]);
    protected searchForm: FormGroup<{
        search: FormControl<string | null>
    }> = new FormGroup({
        search: new FormControl(
            '',
            Validators.required),
    })

    constructor(
        private readonly searchService: SearchUserActionService,
        private readonly searchStoreService: SearchStoreService,
    ) {
        this.loading = this.searchStoreService.profilSearchResults.loading.getLoading()
        this.searchResults = this.searchStoreService.profilSearchResults.getObjects();
        this.searchForm.get('search')?.valueChanges.pipe(
            debounceTime(1000)).subscribe(
            () => this.onKeyUp()
        )
    }

    public focused(): void {
        this.searchStoreService.profilSearchResults.resetObjects()
    };

    private async onKeyUp(): Promise<void> {
        let searchTerm: string | null = this.searchForm.controls.search.value
        if (searchTerm) {
            if (searchTerm.endsWith(' ')) {
                searchTerm = searchTerm.substring(0, searchTerm.length - 1)
            }
            searchTerm = searchTerm.replace(/ /g, '|')
            await this.searchService.searchUser(searchTerm);
        }
    }
}
