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
    @Input({required: true}) firstName: string | null | undefined = null;
    @Input({required: true}) lastName: string | null | undefined = null;
    @Input({required: true}) isLoading: WritableSignal<boolean> = signal(true);
}
