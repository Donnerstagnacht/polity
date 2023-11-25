import {Component, EventEmitter, Output} from '@angular/core';
import {TuiButtonModule} from "@taiga-ui/core";

@Component({
    selector: 'polity-filter-clear',
    templateUrl: './filter-clear.component.html',
    styleUrls: ['./filter-clear.component.less'],
    standalone: true,
    imports: [
        TuiButtonModule
    ],
})
export class FilterClearComponent {
    @Output() clearFilter: EventEmitter<void> = new EventEmitter();

    onClear(): void {
        this.clearFilter.emit();
    }
}
