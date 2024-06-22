import {Component, Inject} from '@angular/core';
import {TuiButtonModule, TuiDialogContext, TuiDialogService} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'polity-group-accept-decline-membership',
    standalone: true,
    imports: [
        TuiButtonModule
    ],
    templateUrl: './group-accept-decline-membership.component.html',
    styleUrl: './group-accept-decline-membership.component.less'
})
export class GroupAcceptDeclineMembershipComponent {

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<string, number>
    ) {
    }

    protected accept(): void {
        this.context.completeWith('accept');
    }

    protected decline(): void {
        this.context.completeWith('decline');
    }

}
