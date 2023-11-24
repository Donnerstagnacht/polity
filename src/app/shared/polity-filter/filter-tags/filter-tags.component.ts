import {Component, Input} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
    selector: 'polity-filter-tags',
    templateUrl: './filter-tags.component.html',
    styleUrls: ['./filter-tags.component.less']
})
export class FilterTagsComponent {
    @Input() formGroupName!: string;
    @Input() filterTypes: { text: string, value: string }[] = []
    filterTagsForm: FormGroup

    constructor(private rootFormGroup: FormGroupDirective) {
        this.filterTagsForm = new FormGroup({})
    }

    ngOnInit(): void {
        this.filterTagsForm = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    }
}
