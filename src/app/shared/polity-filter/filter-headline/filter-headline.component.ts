import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'polity-filter-headline',
    templateUrl: './filter-headline.component.html',
    styleUrls: ['./filter-headline.component.less']
})
export class FilterHeadlineComponent {
    @Output() showFilter: EventEmitter<void> = new EventEmitter();
    @Input() headline: string = '';
    @Input() dataCyTag: string = 'headline';

    toggleShowFilter(): void {
        this.showFilter.emit();
    }
}
