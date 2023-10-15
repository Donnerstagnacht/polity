import {Component, Input} from '@angular/core';
import {Profile} from "../profile";

@Component({
  selector: 'polity-profile-wiki',
  templateUrl: './profile-wiki.component.html',
  styleUrls: ['./profile-wiki.component.less']
})
export class ProfileWikiComponent {
  @Input() profile: Profile | null = null;
}
