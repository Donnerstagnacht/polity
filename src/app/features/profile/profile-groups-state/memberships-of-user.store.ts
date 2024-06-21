import {inject, Injectable} from '@angular/core';
import {BaseArrayStore} from '@polity-signal-store/array/base-array-store.service';
import {rpcArrayHandler} from '@polity-signal-store/array/rpcArrayHandlerFeature';
import {removeObjectByPropertyValue} from '@polity-signal-store/array/removeItemFeatue';
import {ProfileCounterStore} from '@polity-profile/profile-follow-state/profile-counter.store';

@Injectable()
export class MembershipsOfUserStore extends BaseArrayStore<'groups_of_user_read'> {
    private profileCounterStore: ProfileCounterStore = inject(ProfileCounterStore);

    constructor() {
        super({
            loading: false,
            dataRequested: false
        });
    }

    public async read(): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'groups_of_user_read'
            },
            {
                useLoading: true,
                loadingState: this.loadingState_
            },
            {
                useStore: true,
                dataState: this.data_
            },
            {
                useError: true,
                errorStoreService: this.errorStoreService
            },
            {
                useSuccess: false
            }
        );
    }

    public async remove(membershipId: string): Promise<void> {
        const result = await rpcArrayHandler(
            {
                fn: 'leave_group_by_membership_id_transaction',
                args: {
                    _membership_id: membershipId
                }
            },
            {
                useLoading: false
            },
            {
                useStore: false
            },
            {
                useError: true,
                errorStoreService: this.errorStoreService
            },
            {
                useSuccess: true,
                alertService: this.tuiAlertService,
                successMessage: 'Member removed'
            }
        );
        if (!result().error) {
            removeObjectByPropertyValue(
                'id_',
                membershipId,
                this.data_
            );
            this.profileCounterStore.decrement('group_membership_counter_');
        }
    }

}
