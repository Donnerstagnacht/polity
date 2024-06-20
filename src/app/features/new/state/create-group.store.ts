import {inject, Injectable} from '@angular/core';
import {GroupNew} from '../types/group-new';
import {Router} from '@angular/router';
import {BaseObjectStore} from '@polity-signal-store/object/base-object-store.service';
import {rpcObjectHandler} from '@polity-signal-store/object/rpcObjectHandlerFeature';

@Injectable({providedIn: 'root'})
export class CreateGroupStore extends BaseObjectStore<'create_group_transaction'> {
    private router: Router = inject(Router);

    constructor() {
        super(undefined);
    }

    public async create(group: GroupNew): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: 'create_group_transaction',
                args: {
                    _name: group.name,
                    _description: group.description,
                    _level: group.level,
                    _invited_members: group.invited_members
                }
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
                useSuccess: true,
                alertService: this.tuiAlertService,
                successMessage: 'CreateGroup loaded!'
            }
        );
        this.router.navigate(['/home']);
    }

}
