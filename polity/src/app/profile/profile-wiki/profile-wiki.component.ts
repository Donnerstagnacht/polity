import {Component, Input} from '@angular/core';
import {Profile} from "../types-and-interfaces/profile";
import {SimpleChangeExtended} from "../../shared/types-and interfaces/SimpleChangeExtended";

@Component({
  selector: 'polity-profile-wiki',
  templateUrl: './profile-wiki.component.html',
  styleUrls: ['./profile-wiki.component.less']
})
export class ProfileWikiComponent {
  @Input() profile!: Profile | null;

  ngOnChanges(changes: SimpleChangeExtended<'profile', Profile>) {
    console.log(changes.profile)
     this.profile = changes.profile.currentValue;
  }
}