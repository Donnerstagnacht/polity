import {ChangeDetectionStrategy, Component, Input, signal, WritableSignal} from '@angular/core';
import {ProfileStatistics} from "../../features/profile/types-and-interfaces/profile-statistics";

@Component({
    selector: 'polity-key-figure',
    templateUrl: './key-figure-list.component.html',
    styleUrls: ['./key-figure-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyFigureList {
    @Input() keyFigureList: WritableSignal<ProfileStatistics> = signal({
        follower_counter: 0,
        following_counter: 0,
        follower: [],
        following: [],
        is_following: false,
        profile_id: ''
    });
}
