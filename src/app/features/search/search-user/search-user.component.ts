import {Component, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime} from "rxjs";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {TuiFieldErrorPipeModule, TuiInputModule} from "@taiga-ui/kit";
import {TuiErrorModule} from "@taiga-ui/core";
import {SearchProfileResult} from "../search-profile-result/search-profile-result.component";
import {CommonModule} from "@angular/common";
import {SearchUserStoreService} from "../action-store-services/search-user.store.service";
import {SearchUserActionService} from "../action-store-services/search-user.action.service";
import {SearchGroupStoreService} from "../action-store-services/search-group.store.service";
import {SearchGroupActionService} from "../action-store-services/search-group.action.service";
import {SearchGroupResultComponent} from "../search-group-result/search-group-result.component";

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
        CommonModule,
        SearchGroupResultComponent
    ],
    standalone: true
})
export class SearchUserComponent {
    protected loading: WritableSignal<boolean> = signal(false);
    protected noSearchProfileResults: WritableSignal<boolean> = signal(false);
    protected noSearchGroupResults: WritableSignal<boolean> = signal(false);

    protected searchUserResults: WritableSignal<SupabaseObjectReturn<'search_user'>[]> = signal([]);
    protected searchGroupResults: WritableSignal<SupabaseObjectReturn<'search_group'>[]> = signal([]);
    protected searchForm: FormGroup<{
        search: FormControl<string | null>
    }> = new FormGroup({
        search: new FormControl(
            '',
            Validators.required),
    })

    constructor(
        private readonly searchUserActionService: SearchUserActionService,
        private readonly searchGroupActionService: SearchGroupActionService,
        private readonly searchUserStoreService: SearchUserStoreService,
        private readonly searchGroupStoreService: SearchGroupStoreService
    ) {
        this.loading = this.searchUserStoreService.profilSearchResults.loading.getLoading() || this.searchGroupStoreService.groupSearchResults.loading.getLoading();
        this.noSearchProfileResults = this.searchUserStoreService.profilSearchResults.uiFlagStore.getFlag('noResults')
        this.noSearchGroupResults = this.searchGroupStoreService.groupSearchResults.uiFlagStore.getFlag('noResults');
        this.searchUserResults = this.searchUserStoreService.profilSearchResults.getObjects();
        this.searchGroupResults = this.searchGroupStoreService.groupSearchResults.getObjects();
        this.searchForm.get('search')?.valueChanges.pipe(
            debounceTime(1000)).subscribe(
            () => this.onKeyUp()
        )
    }

    public focused(): void {
        this.searchUserStoreService.profilSearchResults.resetObjects()
    };

    private async onKeyUp(): Promise<void> {
        let searchTerm: string | null = this.searchForm.controls.search.value
        if (searchTerm) {
            //     if (searchTerm.endsWith(' ')) {
            //         searchTerm = searchTerm.substring(0, searchTerm.length - 1)
            //     }
            //     searchTerm = searchTerm.replace(/ /g, '|')

            await Promise.all([
                this.searchUserActionService.searchUser(searchTerm),
                this.searchGroupActionService.searchGroup(searchTerm)
            ])
        }
    }
}
