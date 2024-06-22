import {Component} from '@angular/core';
import {TuiIslandModule} from '@taiga-ui/kit';
import {Router} from '@angular/router';

@Component({
    selector: 'polity-new',
    templateUrl: './new.page.html',
    styleUrls: ['./new.page.less'],
    imports: [
        TuiIslandModule
    ],
    standalone: true
})
export class NewPage {

    constructor(private readonly router: Router) {
    }

    protected async onCreateGroup(): Promise<void> {
        await this.router.navigate(['new/group']);
    }
}
