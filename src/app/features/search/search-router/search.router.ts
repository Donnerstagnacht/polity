import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'polity-search',
    templateUrl: './search.router.html',
    styleUrls: ['./search.router.less'],
    standalone: true,
    imports: [
        RouterOutlet
    ]
})
export class SearchRouter {
}
