import {Component} from '@angular/core';
import {TuiButtonModule} from '@taiga-ui/core';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'polity-feature-description',
    templateUrl: './feature-description.page.html',
    styleUrls: ['./feature-description.page.less'],
    standalone: true,
    imports: [
        TuiButtonModule,
        RouterModule
    ]
})
export class FeatureDescriptionPage {
}
