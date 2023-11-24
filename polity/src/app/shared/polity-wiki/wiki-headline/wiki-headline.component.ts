import {Component, Input, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'polity-wiki-headline',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './wiki-headline.component.html',
    styleUrls: ['./wiki-headline.component.less']
})
export class WikiHeadlineComponent {
    @Input() firstName: string | null | undefined = null;
    @Input() lastName: string | null | undefined = null;
    @Input() isLoading: WritableSignal<boolean> = signal(true);
}
