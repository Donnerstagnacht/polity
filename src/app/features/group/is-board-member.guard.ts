import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject, WritableSignal} from "@angular/core";
import {GroupStoreService} from "./action-store-service/group.store.service";

export const isBoardMemberGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean => {
    const groupStoreService: GroupStoreService = inject(GroupStoreService);
    const router: Router = inject(Router);
    const isBoardMember: WritableSignal<boolean> = groupStoreService.group.uiFlagStore.getFlag('isBoardMember');

    if (isBoardMember()) {
        return true;
    } else {
        router.navigate(['/home']);
        return false;
    }
};
