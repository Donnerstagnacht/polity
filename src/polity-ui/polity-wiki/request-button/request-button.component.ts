import {Component, EventEmitter, Input, Output, signal, WritableSignal} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TuiButtonModule} from "@taiga-ui/core";

@Component({
    selector: 'polity-request-button',
    templateUrl: './request-button.component.html',
    styleUrls: ['./request-button.component.less'],
    standalone: true,
    imports: [
        CommonModule,
        TuiButtonModule
    ],
})
export class RequestButton {
    /**
     * If true, a request button is displayed.
     */
        // @Input() public isRequested: boolean | null | undefined;
    @Input({required: true}) public isRequested: boolean | undefined | null = true;

    /**
     * If true, the request button is not displayed.
     */
    @Input() public requestNotPossible: boolean = false;

    /**
     * If true, a loading skeleton is displayed.
     */
    @Input({required: true}) public isLoading: WritableSignal<boolean> = signal(true);

    /**
     * The request title to display.
     */
    @Input() public requestTitle: WritableSignal<string> = signal('');
    @Input() public requestTitleString: string = '';

    /**
     * The title to display when the button is toggled.
     */
    @Input() public toggledTitle: string = '';

    @Output() protected toggledFollowing: EventEmitter<boolean> = new EventEmitter<boolean>();

    protected toggleFollow(): void {
        this.toggledFollowing.emit(!this.isRequested);
    }
}
