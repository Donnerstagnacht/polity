import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'polity-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less'],
    standalone: true,
    imports: [
        RouterOutlet
    ]
})
export class SearchComponent {
}
