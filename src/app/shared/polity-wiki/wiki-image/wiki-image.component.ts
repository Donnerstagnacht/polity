import {Component, Input, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'polity-wiki-image',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './wiki-image.component.html',
    styleUrls: ['./wiki-image.component.less']
})
export class WikiImageComponent {
    @Input() public isLoading: WritableSignal<boolean> = signal(true);
    @Input() public src: string | null | undefined = null;
}
