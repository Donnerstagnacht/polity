import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule} from '@taiga-ui/core';

@Component({
    selector: 'polity-request-button',
    templateUrl: './request-button.component.html',
    styleUrls: ['./request-button.component.less'],
    standalone: true,
    imports: [
        CommonModule,
        TuiButtonModule
    ]
})
export class RequestButton {
    /**
     * If true, a request button is displayed.
     */
    public isRequested: InputSignal<boolean | undefined | null> = input.required<boolean | undefined | null>();

    /**
     * If true, the request button is not displayed.
     */
    public requestNotPossible: InputSignal<boolean> = input<boolean>(false);

    /**
     * If true, a loading skeleton is displayed.
     */
    public isLoading: InputSignal<boolean> = input.required<boolean>();

    /**
     * The request title to display.
     */
    public requestTitleString: InputSignal<string> = input<string>('');

    /**
     * The title to display when the button is toggled.
     */
    public toggledTitle: InputSignal<string> = input<string>('');

    public toggledFollowing: OutputEmitterRef<boolean> = output<boolean>();

    protected toggleFollow(): void {
        this.toggledFollowing.emit(!this.isRequested);
    }
}
