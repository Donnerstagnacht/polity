import {Component, Input, signal, WritableSignal} from '@angular/core';
import {Profile} from "../../features/profile/types-and-interfaces/profile";
import {Router} from "@angular/router";

@Component({
    selector: 'polity-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.less']
})
export class ProfileCardComponent {
    /**
     * Takes a profile as input to display a profile
     *
     * @Input profile: Profile | null.
     */
    @Input() public profile: Profile | null = null;
    @Input() public isLoading: WritableSignal<boolean> = signal(true);

    constructor(private readonly router: Router) {
    }

    protected async onClick(): Promise<void> {
        await this.router.navigate([`/profile/`, this.profile?.id]);
    }
}
