import {Injectable} from '@angular/core';
import {BaseObjectStore} from '@polity-signal-store/object/base-object-store.service';
import {rpcObjectHandler} from '@polity-signal-store/object/rpcObjectHandlerFeature';
import {getSignedUrlFromSupabaseObject} from '@polity-signal-store/imageFeature';

@Injectable({providedIn: 'root'})
export class GroupStore extends BaseObjectStore<'group_read'> {

    constructor() {
        super({
            id_: '',
            name_: '',
            level_: 'regional',
            description_: '',
            img_url_: ''
        });
    }

    public async read(groupId: string): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: 'group_read',
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
        console.log('result', result().data);
        await getSignedUrlFromSupabaseObject<'group_read'>(result, 'group_images', 'img_url_');
    }

}
