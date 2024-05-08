import {Component, Input, signal, WritableSignal} from '@angular/core';
import {Router} from "@angular/router";
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
     * Linked url which can be navigated to on click of the card.
     *
     * @Input linkUrl - string |null.
     */
    @Input({required: true}) public linkUrl: string | null = null;
    /**
     * Card title which should be displayed.
     *
     * @Input linkUrl - string |null.
     */
    @Input({required: true}) public cardTitle: string | null = null;
    @Input() public dataCyTag: string = 'profile-link-card';

    @Input() public isLoading: WritableSignal<boolean> = signal(false);
    protected readonly history = history;

    constructor(
        private readonly router: Router,
    ) {
    }

    protected async onClick(): Promise<void> {
        console.log(this.linkUrl);
        await this.router.navigate([this.linkUrl]);
    }
}
