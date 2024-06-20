import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TuiSvgModule} from "@taiga-ui/core";

@Component({
    selector: 'polity-filter-headline',
    templateUrl: './filter-headline.component.html',
    styleUrls: ['./filter-headline.component.less'],
    standalone: true,
    imports: [
        TuiSvgModule

    ],
})
export class FilterHeadlineComponent {
    @Output() showFilter: EventEmitter<void> = new EventEmitter();
    @Input({required: true}) headline: string = '';
    @Input() dataCyTag: string = 'headline';

    toggleShowFilter(): void {
        this.showFilter.emit();
    }
}
