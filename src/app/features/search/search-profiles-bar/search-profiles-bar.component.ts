import {Component, EventEmitter, Output, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    TableThreeIconTextDeleteComponent
} from "../../../ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component";
import {
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiFilterByInputPipeModule,
    TuiInputModule,
    TuiStringifyContentPipeModule
} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {SearchUserActionService} from "../action-store-services/search-user.action.service";
import {SearchUserStoreService} from "../action-store-services/search-user.store.service";

@Component({
    selector: 'polity-search-profiles-bar',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        TableThreeIconTextDeleteComponent,
        TuiComboBoxModule,
        TuiDataListWrapperModule,
        TuiFilterByInputPipeModule,
        TuiStringifyContentPipeModule,
        TuiInputModule,
        TuiTextfieldControllerModule
    ],
    templateUrl: './search-profiles-bar.component.html',
    styleUrl: './search-profiles-bar.component.less'
})
export class SearchProfilesBarComponent {
    selectedUsers: SupabaseObjectReturn<'search_user'>[] = []
    selectedUsersAsSignal: WritableSignal<SupabaseObjectReturn<'search_user'>[]> = signal([])
    @Output() onUpdateSelectedUsers: EventEmitter<SupabaseObjectReturn<'search_user'>[]> = new EventEmitter<SupabaseObjectReturn<'search_user'>[]>()
    protected searchResults: WritableSignal<SupabaseObjectReturn<'search_user'>[]> = signal([]);
    protected readonly signal = signal;

    protected searchUserForm: FormGroup<{
        members: FormControl<string | null>
    }> = new FormGroup({
        members: new FormControl(''),
    });

    constructor(
        private searchUserActionService: SearchUserActionService,
        private searchUserStoreService: SearchUserStoreService) {
        this.searchResults = this.searchUserStoreService.profilSearchResults.getObjects();

        this.searchUserForm.controls['members'].valueChanges.subscribe((value: any): void => {
            console.log('value changed', value)
            if (value) {
                const choosenObject: SupabaseObjectReturn<'search_user'> | undefined = this.searchResults().find((searchResult: SupabaseObjectReturn<'search_user'>): boolean => {
                    return value.id === searchResult.id_
                })

                if (choosenObject && !this.selectedUsers.some((item: SupabaseObjectReturn<'search_user'>): boolean => item.id_ === choosenObject.id_)) {
                    this.selectedUsers.push(choosenObject);
                    this.selectedUsersAsSignal.update((selectedUser: SupabaseObjectReturn<'search_user'>[]) => ([...selectedUser, choosenObject]))
                    this.onUpdateSelectedUsers.emit(this.selectedUsersAsSignal())
                    this.searchUserForm.controls['members'].setValue(null);
                } else {
                    this.searchUserForm.controls['members'].setValue(null);
                }
            }
        })
    }

    protected onRemove(id: string): void {
        this.selectedUsers = this.selectedUsers.filter((item: SupabaseObjectReturn<'search_user'>): boolean => item.id_ !== id);
        this.selectedUsersAsSignal.set(this.selectedUsers);
        this.onUpdateSelectedUsers.emit(this.selectedUsersAsSignal())
    }

    protected stringify(searchResult: { first_name_: string; last_name_: string }): string {
        if (searchResult.first_name_ && searchResult.last_name_) {
            return `${searchResult.first_name_} ${searchResult.last_name_}`
        } else {
            return ''
        }
    }

    protected onSearchChange(search: string | null): void {
        if (search) {
            this.searchUserActionService.searchUser(search);
        }
    }
}
