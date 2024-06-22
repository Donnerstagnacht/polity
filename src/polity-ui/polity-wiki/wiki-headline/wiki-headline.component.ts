import {Component, input, InputSignal} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'polity-wiki-headline',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './wiki-headline.component.html',
    styleUrls: ['./wiki-headline.component.less']
})
export class WikiHeadlineComponent {
    public firstName: InputSignal<string | null | undefined> = input.required<string | null | undefined>();
    public lastName: InputSignal<string | null | undefined> = input<string | null | undefined>();
    public isLoading: InputSignal<boolean> = input.required<boolean>();
}
