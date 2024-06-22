import {Component, input, InputSignal} from '@angular/core';
import {Router} from '@angular/router';
import {TuiAvatarModule} from '@taiga-ui/kit';
import {
    TuiAppearanceModule,
    TuiCardModule,
    TuiCellModule,
    TuiIconModule,
    TuiSurfaceModule,
    TuiTitleModule
} from '@taiga-ui/experimental';

@Component({
    selector: 'polity-icon-link-card',
    templateUrl: './icon-link-card.component.html',
    styleUrls: ['./icon-link-card.component.less'],
    standalone: true,
    imports: [
        TuiAvatarModule,
        TuiCardModule,
        TuiCellModule,
        TuiSurfaceModule,
        TuiTitleModule,
        TuiAppearanceModule,
        TuiIconModule
    ]
})
export class IconLinkCardComponent {
    /**
     * Takes the sessionId as input to display a profile link
     *
     * @Input isLoading - WritableSignal<boolean> - a signal that indicates if the component is loading
     * @Input group - SupabaseObjectReturn<'groups_of_user_read'> | null - the group data to
     * be displayed
     */
    public isLoading: InputSignal<boolean> = input(false);
    public title: InputSignal<string> = input.required();
    public dataCyTag: InputSignal<string> = input<string>('icon-link-card');
    public iconName: InputSignal<string> = input.required<string>();
    public url: InputSignal<string> = input.required<string>();

    constructor(
        private readonly router: Router
    ) {
    }

    protected async onClick(): Promise<void> {
        await this.router.navigateByUrl(this.url());
    }

}
