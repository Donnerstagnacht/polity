import {Component, input, InputSignal} from '@angular/core';
import {FormGroup, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';
import {TuiInputModule} from '@taiga-ui/kit';

@Component({
    selector: 'polity-filter-string',
    templateUrl: './filter-string.component.html',
    styleUrls: ['./filter-string.component.less'],
    standalone: true,
    imports: [
        TuiInputModule,
        ReactiveFormsModule

    ]
})
export class FilterStringComponent {
    formGroupName: InputSignal<string> = input.required<string>();
    placeholderText: InputSignal<string> = input.required<string>();
    filterStringForm: FormGroup;

    constructor(private rootFormGroup: FormGroupDirective) {
        this.filterStringForm = new FormGroup({});
    }

    ngOnInit(): void {
        this.filterStringForm = this.rootFormGroup.control.get(this.formGroupName()) as FormGroup;
    }
}
