import {Component, Inject, Input} from '@angular/core';
import {TuiAlertService} from "@taiga-ui/core";
import {menuItems, menuItemsSignedOut} from "../menu-itmes";

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
  items = menuItems;
  @Input()view: boolean = false;

  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService) {}

  ngOnInit(): void {
      if(this.view) {
        this.items = menuItems
      } else {
        this.items = menuItemsSignedOut
      }
  }

  ngOnChanges(): void {
    console.log('change', this.view)
    if(this.view) {
      this.items = menuItems
    } else {
      this.items = menuItemsSignedOut
    }
  }

  onClick(item: Item): void {
    item.badge = 0;
    this.alerts.open(this.activeItemIndex, {label: item.text}).subscribe();
  }
}
