import {Component, signal, WritableSignal} from '@angular/core';
import {Profile} from "../../profile/types-and-interfaces/profile";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SearchService} from "../services/search.service";
import {SearchStoreService} from "../services/search-store.service";
import {debounceTime} from "rxjs";

@Component({
    selector: 'polity-search-user',
    templateUrl: './search-user.component.html',
    styleUrls: ['./search-user.component.less']
})
export class SearchUserComponent {
    loading: WritableSignal<boolean> = signal(false);
    protected searchResults: WritableSignal<Profile[] | null> = signal([]);
    protected searchForm: FormGroup<{
        search: FormControl<string | null>
    }> = new FormGroup({
        search: new FormControl(
            '',
            Validators.required),
    })

    constructor(
        private readonly searchService: SearchService,
        private readonly searchStoreService: SearchStoreService,
    ) {
        this.loading = this.searchStoreService.profilSearchResults.loading.getLoading()
        this.searchResults = this.searchStoreService.profilSearchResults.getEntities();
        // this.searchResults = this.searchStoreService.selectProfileSearchResults();
        this.searchForm.get('search')?.valueChanges.pipe(
            debounceTime(1000)).subscribe(
            () => this.onKeyUp()
        )
    }

    public focused(): void {
        this.searchStoreService.profilSearchResults.resetEntities()
        // this.searchStoreService.updateProfileSearchResults(null)
    };

    private async onKeyUp(): Promise<void> {
        this.searchStoreService.profilSearchResults.loading.startLoading()
        let searchTerm: string | null = this.searchForm.controls.search.value
        if (searchTerm) {
            if (searchTerm.endsWith(' ')) {
                searchTerm = searchTerm.substring(0, searchTerm.length - 1)
            }
            searchTerm = searchTerm.replace(/ /g, '|')

            await this.searchService.searchUser(searchTerm);
            this.searchStoreService.profilSearchResults.loading.stopLoading()
        }
    }
}
