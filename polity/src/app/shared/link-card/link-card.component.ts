import {Component, Input, signal, WritableSignal} from '@angular/core';
import {Router} from "@angular/router";
import {Profile} from "../../features/profile/types-and-interfaces/profile";

@Component({
    selector: 'polity-link-card',
    templateUrl: './link-card.component.html',
    styleUrls: ['./link-card.component.less']
})
export class LinkCardComponent {
    /**
     * Takes the sesionId as input to display a profile link
     *
     * @Input sessionId - string |null.
     */
    @Input() public sessionId: string | null = null;

    @Input() public profile: WritableSignal<
        Profile | null | undefined
    > = signal(
        null
    )

    constructor(
        private readonly router: Router,
    ) {
    }

    protected async onClick(): Promise<void> {
        await this.router.navigate(['/profile/', this.sessionId]);
    }

}
