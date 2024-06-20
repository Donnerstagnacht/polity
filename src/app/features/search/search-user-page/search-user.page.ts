import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {debounceTime} from 'rxjs';
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';
import {TuiErrorModule} from '@taiga-ui/core';
import {SearchProfileResult} from '@polity-search/search-ui/search-profile-result/search-profile-result.component';
import {CommonModule} from '@angular/common';
import {SearchGroupResultComponent} from '@polity-search/search-ui/search-group-result/search-group-result.component';
import {SearchUserStore} from '../state/search-user.store';
import {SearchGroupStore} from '../state/search-group.store';

@Component({
    selector: 'polity-search-user',
    templateUrl: './search-user.page.html',
    styleUrls: ['./search-user.page.less'],
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
export class SearchUserPage {
    protected readonly searchUserStore = inject(SearchUserStore);
    protected readonly searchGroupStore = inject(SearchGroupStore);
    protected searchForm: FormGroup<{
        search: FormControl<string | null>
    }> = new FormGroup({
        search: new FormControl(
            ''
        )
    });
    protected readonly signal = signal;

    constructor() {
        this.searchForm.get('search')?.valueChanges.pipe(
            debounceTime(1000)).subscribe(
            () => this.onKeyUp()
        );

    }

    private async onKeyUp(): Promise<void> {
        let searchTerm: string | null = this.searchForm.controls.search.value;
        if (searchTerm) {
            await Promise.all([
                this.searchUserStore.search(searchTerm),
                this.searchGroupStore.search(searchTerm)
            ]);
        }
    }
}
