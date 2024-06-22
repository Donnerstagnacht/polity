import {Component, input, InputSignal} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'polity-wiki-image',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './wiki-image.component.html',
    styleUrls: ['./wiki-image.component.less']
})
export class WikiImageComponent {
    public isLoading: InputSignal<boolean> = input.required<boolean>();
    public src: InputSignal<string | null | undefined> = input.required<string | null | undefined>();

    protected imgLoading: boolean = true;

    public onLoad(): void {
        this.imgLoading = false;
    }
}
