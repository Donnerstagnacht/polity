import {Component, Inject} from '@angular/core';
import {TuiAlertService} from "@taiga-ui/core";

interface Item {
  badge?: number;
  icon: string;
  text: string;
}

@Component({
  selector: 'polity-main-bar-bottom',
  templateUrl: './main-bar-bottom.component.html',
  styleUrls: ['./main-bar-bottom.component.less']
})
export class MainBarBottomComponent {

  activeItemIndex = 1;

  readonly items = [
    {
      text: 'VOR ORT',
      icon: 'tuiIconUsers',
      badge: 3,
    },
    {
      text: 'SUCHE',
      icon: 'tuiIconSearch',
      badge: 1234,
    },
    {
      text: 'NEU',
      icon: 'tuiIconPlus',
    },
    {
      text: 'ORGA',
      icon: 'tuiIconCalendar',
      badge: 100,
    },
    {
      text: 'HOME',
      icon: 'tuiIconHome',
    },
  ];

  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService) {}

  onClick(item: Item): void {
    item.badge = 0;
    this.alerts.open(this.activeItemIndex, {label: item.text}).subscribe();
  }

}
