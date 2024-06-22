import {Component, input, InputSignal} from '@angular/core';
import {FormGroup, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';
import {TuiFilterModule} from '@taiga-ui/kit';

@Component({
    selector: 'polity-filter-tags',
    templateUrl: './filter-tags.component.html',
    styleUrls: ['./filter-tags.component.less'],
    standalone: true,
    imports: [
        TuiFilterModule,
        ReactiveFormsModule

    ]
})
export class FilterTagsComponent {
    public formGroupName: InputSignal<string> = input.required<string>();
    public filterTypes: InputSignal<{ text: string, value: string }[]> = input.required<{
        text: string,
        value: string
    }[]>();
    protected filterTagsForm: FormGroup;

    constructor(private rootFormGroup: FormGroupDirective) {
        this.filterTagsForm = new FormGroup({});
    }

    ngOnInit(): void {
        this.filterTagsForm = this.rootFormGroup.control.get(this.formGroupName()) as FormGroup;
    }
}
