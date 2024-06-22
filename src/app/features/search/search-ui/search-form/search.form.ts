import {Component, output, OutputEmitterRef} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiErrorModule} from '@taiga-ui/core';
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';
import {debounceTime} from 'rxjs';

@Component({
    selector: 'polity-search-form',
    standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        ReactiveFormsModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiInputModule
    ],
    templateUrl: './search.form.html',
    styleUrl: './search.form.less'
})
export class SearchForm {
    public newSearch: OutputEmitterRef<string> = output<string>();
    protected searchForm: FormGroup<{
        search: FormControl<string | null>
    }> = new FormGroup({
        search: new FormControl(
            ''
        )
    });

    constructor() {
        this.searchForm.get('search')?.valueChanges.pipe(
            debounceTime(1000)).subscribe(
            () => {
                let searchTerm: string | null = this.searchForm.controls.search.value;
                if (searchTerm) {
                    this.newSearch.emit(searchTerm);
                }
            }
        );
    }
}
