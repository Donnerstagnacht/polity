import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule} from '@taiga-ui/core';
import {LoadingState} from '@polity-signal-store/types/loadingState.type';

@Component({
    selector: 'polity-follow-button',
    templateUrl: './follow-button.component.html',
    styleUrls: ['./follow-button.component.less'],
    standalone: true,
    imports: [
        CommonModule,
        TuiButtonModule
    ]
})
export class FollowButton {
    /**
     * If true, a follow button is displayed.
     */
    public isFollowing: InputSignal<boolean> = input.required<boolean>();
    public loadingState: InputSignal<LoadingState> = input<LoadingState>({
        loading: true,
        dataRequested: false
    });

    /**
     * If true, the follow button is not displayed.
     */
    public isOwner: InputSignal<boolean> = input<boolean>(false);
    /**
     * If true, the follow button is not displayed.
     */
    public isLoading: InputSignal<boolean> = input.required<boolean>();

    public toggledFollowing: OutputEmitterRef<boolean> = output<boolean>();


    protected toggleFollow(): void {
        this.toggledFollowing.emit(!this.isFollowing());
    }

}
