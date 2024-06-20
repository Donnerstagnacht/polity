import {Component, input, InputSignal} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'polity-counter',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.less']
})
export class CounterComponent {
    public isLoading: InputSignal<boolean> = input.required<boolean>();
    public counterValue: InputSignal<number | null | undefined> = input.required<number | null | undefined>();
    public counterTitle: InputSignal<string | null> = input.required<string | null>();
    public dataCyTag: InputSignal<string> = input<string>('counter');
}
