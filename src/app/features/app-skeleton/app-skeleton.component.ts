import {Component} from '@angular/core';
import {NavigationItem} from "../../navigation/types-and-interfaces/navigationItem";
import {NAVIGATION_ITEMS} from "../../navigation/navigation-item";
import {FirstBarBottomComponent} from "../../navigation/first-bar-bottom/first-bar-bottom.component";
import {FirstBarLeftComponent} from "../../navigation/first-bar-left/first-bar-left.component";
import {RouterOutlet} from "@angular/router";
import {AssistantComponent} from "../assistant/assistant/assistant.component";

@Component({
    selector: 'polity-app-skeleton',
    templateUrl: './app-skeleton.component.html',
    styleUrls: ['./app-skeleton.component.less'],
    imports: [
        FirstBarBottomComponent,
        FirstBarLeftComponent,
        RouterOutlet,
        AssistantComponent
    ],
    standalone: true
})
export class AppSkeletonComponent {
    protected items: NavigationItem[] = NAVIGATION_ITEMS;
}
