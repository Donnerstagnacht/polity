import {Component, Input} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
    selector: 'polity-filter-date-range',
    templateUrl: './filter-date-range.component.html',
    styleUrls: ['./filter-date-range.component.less']
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
