import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {BaseObjectStore} from '../../../store-signal-functions/object/base-object-store.service';
import {rpcObjectHandler} from '../../../store-signal-functions/object/rpcObjectHandlerFeature';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {getSignedUrlFromSupabaseObject} from '../../../store-signal-functions/object/imageFeature';

@Injectable({
    providedIn: 'root'
})
export class ProfileStore extends BaseObjectStore<'read_profile'> {
    private isOwner_: WritableSignal<boolean> = signal(false);
    public isOwner: Signal<boolean> = this.isOwner_.asReadonly();

    constructor() {
        super({
            profile_id_: '',
            first_name_: '',
            last_name_: '',
            profile_image_: ''
        });
    }

    public async read(userId: string): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: 'read_profile',
                args: {
                    _user_id: userId
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
                successMessage: 'Profile loaded!'
            }
        );
        getSignedUrlFromSupabaseObject<'update_profile'>(result, 'profile_images', 'profile_image_');
    }

    public async update(profile: Partial<SupabaseObjectReturn<'update_profile'>>): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: 'update_profile',
                args: {
                    _first_name: profile.first_name_,
                    _last_name: profile.last_name_,
                    _profile_image: profile.profile_image_
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
                successMessage: 'Profile loaded!'
            }
        );
        getSignedUrlFromSupabaseObject<'update_profile'>(result, 'profile_images', 'profile_image_');
    }

    public checkIsOwner(sessionId: string, urlId: string | null): void {
        this.isOwner_.set(sessionId === urlId);
    }

}
