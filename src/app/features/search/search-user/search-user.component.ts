import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {debounceTime} from 'rxjs';
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';
import {TuiErrorModule} from '@taiga-ui/core';
import {SearchProfileResult} from '../search-profile-result/search-profile-result.component';
import {CommonModule} from '@angular/common';
import {SearchGroupResultComponent} from '../search-group-result/search-group-result.component';
import {SearchUserStore} from '../store/search-user.store';
import {SearchGroupStore} from '../store/search-group.store';

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
