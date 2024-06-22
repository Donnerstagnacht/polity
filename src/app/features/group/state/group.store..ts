import {Injectable} from '@angular/core';
import {BaseObjectStore} from '@polity-signal-store/object/base-object-store.service';
import {rpcObjectHandler} from '@polity-signal-store/object/rpcObjectHandlerFeature';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';

@Injectable({providedIn: 'root'})
export class GroupStore extends BaseObjectStore<'group_read'> {

    constructor() {
        super({
            id_: '',
            name_: '',
            level_: 'regional',
            description_: '',
            img_url_: '',
            created_at_: '',
            updated_at_: ''
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
            },

            {
                useExtractImgUrl: true,
                bucket: 'group_images',
                key: 'img_url_'
            }
        );
    }

    public async update(group: Partial<SupabaseObjectReturn<'groups_update'>>): Promise<void> {
        await rpcObjectHandler(
            {
                fn: 'groups_update',
                args: {
                    _id: this.data_().id_,
                    _name: group.name_,
                    _description: group.description_,
                    _img_url: group.img_url_
                }
            },
            {
                useLoading: false
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
                successMessage: 'Groups updated!'
            },
            {
                useExtractImgUrl: true,
                bucket: 'group_images',
                key: 'img_url_'
            }
        );
    }

}
