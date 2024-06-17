import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounceTime} from "rxjs";
import {TuiFieldErrorPipeModule, TuiInputModule} from "@taiga-ui/kit";
import {TuiErrorModule} from "@taiga-ui/core";
import {SearchProfileResult} from "../search-profile-result/search-profile-result.component";
import {CommonModule} from "@angular/common";
import {SearchGroupResultComponent} from "../search-group-result/search-group-result.component";
import {NewSearchUserStore} from "../action-store-services/new-search-user-store.service";
import {FollowingsOfUserStore} from "../../profile-follow/action-store-services/followings-of-user-store.service";
import {SearchGroupStore} from "../action-store-services/search-group.store";

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
    //protected readonly searchUserStore = inject(SearchUserStore);
    protected readonly searchUserStore = inject(NewSearchUserStore);
    protected readonly searchGroupStore = inject(SearchGroupStore);
    protected readonly test = inject(FollowingsOfUserStore)
    protected searchForm: FormGroup<{
        search: FormControl<string | null>
    }> = new FormGroup({
        search: new FormControl(
            ''
        )
    })

    constructor() {
        this.searchForm.get('search')?.valueChanges.pipe(
            debounceTime(1000)).subscribe(
            () => this.onKeyUp()
        );

    }

    private async onKeyUp(): Promise<void> {
        let searchTerm: string | null = this.searchForm.controls.search.value
        if (searchTerm) {
            await Promise.all([
                this.searchUserStore.searchUser(searchTerm),
                this.searchGroupStore.searchGroup(searchTerm),
            ])
        }
    }
}
