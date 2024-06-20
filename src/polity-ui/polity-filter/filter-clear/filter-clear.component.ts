import {Component, output, OutputEmitterRef} from '@angular/core';
import {TuiButtonModule} from '@taiga-ui/core';

@Component({
    selector: 'polity-filter-clear',
    templateUrl: './filter-clear.component.html',
    styleUrls: ['./filter-clear.component.less'],
    standalone: true,
    imports: [
        TuiButtonModule
    ]
})
export class FilterClearComponent {
    public clearFilter: OutputEmitterRef<void> = output<void>();

    onClear(): void {
        this.clearFilter.emit();
    }
}
