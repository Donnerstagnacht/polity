import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {TuiSvgModule} from '@taiga-ui/core';

@Component({
    selector: 'polity-filter-headline',
    templateUrl: './filter-headline.component.html',
    styleUrls: ['./filter-headline.component.less'],
    standalone: true,
    imports: [
        TuiSvgModule
    ]
})
export class FilterHeadlineComponent {
    public showFilter: OutputEmitterRef<void> = output<void>();
    public headline: InputSignal<string> = input.required<string>();
    public dataCyTag: InputSignal<string> = input<string>('headline');

    toggleShowFilter(): void {
        this.showFilter.emit();
    }
}
