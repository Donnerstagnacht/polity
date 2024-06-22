import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject, Signal} from '@angular/core';
import {GroupMembershipStatusStore} from '@polity-group/group-member-state/group-membership-status.store';

export const isBoardMemberGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): boolean => {
    const groupMembershipStatusStore: GroupMembershipStatusStore = inject(GroupMembershipStatusStore);
    const router: Router = inject(Router);
    const isBoardMember: Signal<boolean> = groupMembershipStatusStore.isBoardMember;
    console.log('isBoardMember: ', isBoardMember());
    if (isBoardMember()) {
        return true;
    } else {
        router.navigate(['/home']);
        return false;
    }
};
