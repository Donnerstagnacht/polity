import {Component, Input} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
    selector: 'polity-filter-string',
    templateUrl: './filter-string.component.html',
    styleUrls: ['./filter-string.component.less']
})
export class FilterStringComponent {
    @Input() formGroupName!: string;
    filterStringForm: FormGroup

    constructor(private rootFormGroup: FormGroupDirective) {
        this.filterStringForm = new FormGroup({})
    }

    ngOnInit(): void {
        this.filterStringForm = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    }
}
