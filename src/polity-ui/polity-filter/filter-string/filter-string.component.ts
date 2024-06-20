import {Component, Input} from '@angular/core';
import {FormGroup, FormGroupDirective, ReactiveFormsModule} from "@angular/forms";
import {TuiInputModule} from "@taiga-ui/kit";

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
    @Input() formGroupName!: string;
    @Input({required: true}) placeholderText: string = '';
    filterStringForm: FormGroup

    constructor(private rootFormGroup: FormGroupDirective) {
        this.filterStringForm = new FormGroup({})
    }

    ngOnInit(): void {
        this.filterStringForm = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    }
}
