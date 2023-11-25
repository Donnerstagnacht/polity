import {Component} from '@angular/core';
import {TuiButtonModule} from "@taiga-ui/core";
import {RouterModule} from "@angular/router";

@Component({
    selector: 'polity-feature-description',
    templateUrl: './feature-description.component.html',
    styleUrls: ['./feature-description.component.less'],
    standalone: true,
    imports: [
        TuiButtonModule,
        RouterModule
    ],
})
export class FeatureDescriptionComponent {
}
