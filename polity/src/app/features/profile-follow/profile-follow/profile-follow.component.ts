import {Component, EventEmitter, Input, Output, signal, WritableSignal} from '@angular/core';

@Component({
    selector: 'polity-profile-follow',
    templateUrl: './profile-follow.component.html',
    styleUrls: ['./profile-follow.component.less']
})
export class ProfileFollowComponent {
    /**
     * If true, a follow button is displayed.
     */
        // @Input() public isFollowing: boolean | null | undefined;
    @Input() public isFollowing: boolean | undefined | null = true;

    /**
     * If true, the follow button is not displayed.
     */
    @Input() public isOwner: boolean = false;
    /**
     * If true, the follow button is not displayed.
     */
    @Input() public isLoading: WritableSignal<boolean> = signal(true);
    @Output() protected toggledFollowing: EventEmitter<boolean> = new EventEmitter<boolean>();

    protected toggleFollow(): void {
        this.toggledFollowing.emit(!this.isFollowing);
    }

}
