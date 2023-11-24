import {Component, Input, signal, WritableSignal} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
    selector: 'polity-counter',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.less']
})
export class CounterComponent {
    @Input() isLoading: WritableSignal<boolean> = signal(true);
    // @Input() counterValue: WritableSignal<number | null> = signal(null);
    // @Input() counterTitle: WritableSignal<string | null> = signal(null);
    @Input() counterValue: number | null | undefined = null;
    @Input() counterTitle: string | null = null;
    @Input() dataCyTag: string = 'counter';

    ngOnChanges(): void {
        console.log('change')
    }

}
