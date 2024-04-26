import {Component} from '@angular/core';
import {TuiIslandModule} from "@taiga-ui/kit";
import {Router} from "@angular/router";

@Component({
    selector: 'polity-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.less'],
    imports: [
        TuiIslandModule
    ],
    standalone: true
})
export class NewComponent {

    constructor(private readonly router: Router) {
    }

    protected async onCreateGroup(): Promise<void> {
        await this.router.navigate(['/group/new']);
    }
}
