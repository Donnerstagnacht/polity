import {Injectable} from '@angular/core';
import {BaseObjectStore} from '@polity-signal-store/object/base-object-store.service';
import {rpcObjectHandler} from '@polity-signal-store/object/rpcObjectHandlerFeature';

@Injectable({providedIn: 'root'})
export class GroupStore extends BaseObjectStore<'read_group'> {

    constructor() {
        super({
            id_: '',
            name_: '',
            level_: 'regional',
            description_: ''
        });
    }

    public async read(groupId: string): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: 'read_group',
                args: {
                    _group_id: groupId
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
                useSuccess: false
            }
        );
    }

}
