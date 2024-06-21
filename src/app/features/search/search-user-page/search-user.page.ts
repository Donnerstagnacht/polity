import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';
import {TuiErrorModule} from '@taiga-ui/core';
import {SearchProfileResult} from '@polity-search/search-ui/search-profile-result/search-profile-result.component';
import {CommonModule} from '@angular/common';
import {SearchGroupResultComponent} from '@polity-search/search-ui/search-group-result/search-group-result.component';
import {SearchUserStore} from '../state/search-user.store';
import {SearchGroupStore} from '../state/search-group.store';
import {SearchForm} from '@polity-search/search-ui/search-form/search.form';

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
        SearchGroupResultComponent,
        SearchForm
    ],
    standalone: true
})
export class SearchUserPage {
    protected readonly searchUserStore: SearchUserStore = inject(SearchUserStore);
    protected readonly searchGroupStore: SearchGroupStore = inject(SearchGroupStore);

    protected async onKeyUp(newSearch: string): Promise<void> {
        await Promise.all([
            this.searchUserStore.search(newSearch),
            this.searchGroupStore.search(newSearch)
        ]);
    }
}
