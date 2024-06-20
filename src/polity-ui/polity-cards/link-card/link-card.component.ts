import {Component, input, InputSignal} from '@angular/core';
import {Router} from '@angular/router';
import {TuiIslandModule} from '@taiga-ui/kit';

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
    public linkUrl: InputSignal<string | null | undefined> = input<string | null | undefined>();
    /**
     * Card title which should be displayed.
     *
     * @Input linkUrl - string |null.
     */
    public cardTitle: InputSignal<string | null | undefined> = input<string | null | undefined>();
    public dataCyTag: InputSignal<string> = input<string>('profile-link-card');

    public isLoading: InputSignal<boolean> = input(false);

    constructor(
        private readonly router: Router
    ) {
    }

    protected async onClick(): Promise<void> {
        console.log(this.linkUrl);
        await this.router.navigate([this.linkUrl]);
    }
}
