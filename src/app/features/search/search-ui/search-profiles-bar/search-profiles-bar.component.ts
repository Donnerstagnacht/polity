import {Component, inject, output, OutputEmitterRef, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    TableThreeIconTextDeleteComponent
} from '@polity-ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component';
import {
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiFilterByInputPipeModule,
    TuiInputModule,
    TuiStringifyContentPipeModule
} from '@taiga-ui/kit';
import {TuiTextfieldControllerModule} from '@taiga-ui/core';
import {SupabaseObjectReturn} from '../../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {SearchUserStore} from '../../state/search-user.store';

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
    styleUrl: './search-profiles-bar.component.less',
    providers: [
        SearchUserStore
    ]
})
export class SearchProfilesBarComponent {
    onUpdateSelectedUsers: OutputEmitterRef<SupabaseObjectReturn<'search_user'>[]> = output<SupabaseObjectReturn<'search_user'>[]>();
    protected searchUserStore: SearchUserStore = inject(SearchUserStore);
    protected readonly signal = signal;
    protected searchUserForm: FormGroup<{
        members: FormControl<string | null>
    }> = new FormGroup({
        members: new FormControl('')
    });
    protected selectedUsers: WritableSignal<SupabaseObjectReturn<'search_user'>[]> = signal([]);

    constructor() {
        this.addMember();
    }

    protected onRemove(id: string): void {
        this.selectedUsers.set(this.selectedUsers().filter((item: SupabaseObjectReturn<'search_user'>): boolean => item.id_ !== id));
        this.onUpdateSelectedUsers.emit(this.selectedUsers());
    }

    protected stringify(searchResult: { first_name_: string; last_name_: string }): string {
        if (searchResult.first_name_ && searchResult.last_name_) {
            return `${searchResult.first_name_} ${searchResult.last_name_}`;
        } else {
            return '';
        }
    }

    protected onSearchChange(search: string | null): void {
        if (search) {
            this.searchUserStore.search(search);
        }
    }

    private addMember(): void {
        this.searchUserForm.controls['members'].valueChanges.subscribe((value: any): void => {
            if (value) {
                const choosenObject = this.chosenObjectFromSearchResults(value);

                if (choosenObject && this.objectIsNotYetSelected(choosenObject)) {
                    this.selectedUsers.update((selectedUser: SupabaseObjectReturn<'search_user'>[]) => ([...selectedUser, choosenObject]));
                    this.onUpdateSelectedUsers.emit(this.selectedUsers());
                    this.searchUserForm.controls['members'].setValue(null);
                } else {
                    this.searchUserForm.controls['members'].setValue(null);
                }

            }
        });
    }

    private objectIsNotYetSelected(choosenObject: SupabaseObjectReturn<'search_user'>): boolean {
        return !this.selectedUsers().some(
            (item: SupabaseObjectReturn<'search_user'>): boolean => {
                return item.id_ === choosenObject.id_;
            });
    }

    private chosenObjectFromSearchResults(value: SupabaseObjectReturn<'search_user'>): SupabaseObjectReturn<'search_user'> | undefined {
        return this.searchUserStore.data().find(
            (searchResult: SupabaseObjectReturn<'search_user'>): boolean => {
                return value.id_ === searchResult.id_;
            });
    }
}
