import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'polity-new-home',
    standalone: true,
    imports: [
        RouterOutlet
    ],
    templateUrl: './new-router.component.html',
    styleUrl: './new-home.component.less'
})
export class NewRouter {

}
