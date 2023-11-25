import {Component, Input} from '@angular/core';
import {FormGroup, FormGroupDirective, ReactiveFormsModule} from "@angular/forms";
import {TuiInputDateModule} from "@taiga-ui/kit";

@Component({
    selector: 'polity-filter-date-range',
    templateUrl: './filter-date-range.component.html',
    styleUrls: ['./filter-date-range.component.less'],
    standalone: true,
    imports: [
        TuiInputDateModule,
        ReactiveFormsModule
    ]
})
export class FilterDateRangeComponent {
    @Input() formGroupName!: string;
    form!: FormGroup

    constructor(private rootFormGroup: FormGroupDirective) {
    }

    ngOnInit(): void {
        this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    }
}
