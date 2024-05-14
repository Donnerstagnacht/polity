import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'polity-new-home',
    standalone: true,
    imports: [
        RouterOutlet
    ],
    templateUrl: './new-home.component.html',
    styleUrl: './new-home.component.less'
})
export class NewHomeComponent {

}
