import {Component, input, InputSignal} from '@angular/core';
import {LoadingState} from '@polity-signal-store/types/loadingState.type';

@Component({
    selector: 'polity-image',
    standalone: true,
    imports: [],
    templateUrl: './image.component.html',
    styleUrl: './image.component.less'
})
export class ImageComponent {
    public loadingState: InputSignal<LoadingState> = input.required();
    public imgSrc: InputSignal<string> = input.required();

}
