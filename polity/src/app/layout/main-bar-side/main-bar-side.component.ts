import {Component, Inject} from '@angular/core';
import {TuiAlertService} from "@taiga-ui/core";
import {menuItems} from "../menu-itmes";

interface Item {
  badge?: number;
  icon: string;
  text: string;
}

@Component({
  selector: 'polity-main-bar-side',
  templateUrl: './main-bar-side.component.html',
  styleUrls: ['./main-bar-side.component.less']
})
export class MainBarSideComponent {
  activeItemIndex = 1;
  readonly items = menuItems

  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService) {}

  onClick(item: Item): void {
    item.badge = 0;
    this.alerts.open(this.activeItemIndex, {label: item.text}).subscribe();
  }

}
