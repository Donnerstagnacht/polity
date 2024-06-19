import {Component, effect, EventEmitter, Input, Output, Signal, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule} from '@taiga-ui/core';
import {LoadingState} from 'src/app/store-signal-functions/loadingFeature';

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
        // @Input() public isFollowing: boolean | null | undefined;
    @Input({required: true}) public isFollowing: boolean | undefined | null = true;
    @Input() public loadingState: Signal<LoadingState> = signal({
        loading: true,
        dataRequested: false
    });

    /**
     * If true, the follow button is not displayed.
     */
    @Input() public isOwner: boolean = false;
    /**
     * If true, the follow button is not displayed.
     */
    @Input({required: true}) public isLoading: WritableSignal<boolean> = signal(true);

    @Output() protected toggledFollowing: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
        effect(() => {
            // console.log('loadingState in follower changed: ', this.loadingState());
        });
    }

    protected toggleFollow(): void {
        this.toggledFollowing.emit(!this.isFollowing);
    }

}
