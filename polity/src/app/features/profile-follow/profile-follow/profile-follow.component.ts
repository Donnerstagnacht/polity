import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'polity-profile-follow',
    templateUrl: './profile-follow.component.html',
    styleUrls: ['./profile-follow.component.less']
})
export class ProfileFollowComponent {
    /**
     * If true, a follow button is displayed.
     */
    @Input() public isFollowing: boolean | null | undefined = false;
    /**
     * If true, the follow button is not displayed.
     */
    @Input() public isOwner: boolean = false;
    @Output() protected toggledFollowing: EventEmitter<boolean> = new EventEmitter<boolean>();

    protected toggleFollow(): void {
        this.toggledFollowing.emit(!this.isFollowing)
    }

}
