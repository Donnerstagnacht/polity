import {Component, inject, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NAVIGATION_ITEMS_PROFILE} from '../profile-navigation-signed-in';
import {SecondBarTopComponent} from '@polity-navigation/second-bar/second-bar-top/second-bar-top.component';
import {SecondBarRightComponent} from '@polity-navigation/second-bar/second-bar-right/second-bar-right.component';
import {NavigationItem} from '@polity-navigation/types-and-interfaces/navigationItem';
import {ProfileLoadHelperService} from '@polity-profile/state/profile-load-helper.service';

@Component({
    selector: 'polity-profile',
    templateUrl: './profile.router.html',
    styleUrls: ['./profile.router.less'],
    imports: [
        SecondBarTopComponent,
        RouterOutlet,
        SecondBarRightComponent,
        CommonModule
    ],
    standalone: true
})
export class ProfileRouter {
    protected profileLoadHelperService: ProfileLoadHelperService = inject(ProfileLoadHelperService);
    protected menuItemsProfile: WritableSignal<NavigationItem[]> = signal(NAVIGATION_ITEMS_PROFILE);

    constructor(
        private route: ActivatedRoute
    ) {
        this.menuItemsProfile = this.profileLoadHelperService.menuItemsProfile;
    }

    async ngOnInit(): Promise<void> {
        const urlId: string = this.route.snapshot.params['id'];
        await this.profileLoadHelperService.loadData(urlId);
    }
}
