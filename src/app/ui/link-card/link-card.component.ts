import {Component, Input, signal, WritableSignal} from '@angular/core';
import {Router} from "@angular/router";
import {Profile} from "../../../../cypress/fixtures/profile";
import {TuiIslandModule} from "@taiga-ui/kit";

@Component({
    selector: 'polity-link-card',
    templateUrl: './link-card.component.html',
    styleUrls: ['./link-card.component.less'],
    standalone: true,
    imports: [
        TuiIslandModule
    ]
})
export class LinkCardComponent {
    /**
     * Takes the sessionId as input to display a profile link
     *
     * @Input sessionId - string |null.
     */
    @Input({required: true}) public sessionId: string | null = null;
    @Input({required: true}) public isLoading: WritableSignal<boolean> = signal(true);
    @Input({required: true}) public profile: WritableSignal<
        Profile | null | undefined
    > = signal(
        null
    )
    @Input() public dataCyTag: string = 'link-card';

    constructor(
        private readonly router: Router,
    ) {
    }

    protected async onClick(): Promise<void> {
        await this.router.navigate(['/profile/', this.sessionId]);
    }

}
