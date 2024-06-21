import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {BaseObjectStore} from '@polity-signal-store/object/base-object-store.service';
import {rpcObjectHandler} from '@polity-signal-store/object/rpcObjectHandlerFeature';
import {getSignedUrlFromSupabaseObject} from '@polity-signal-store/imageFeature';

@Injectable({providedIn: 'root'})
export class ProfileStore extends BaseObjectStore<'profiles_read'> {
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
                fn: 'profiles_read',
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
                useSuccess: false
            }
        );
        getSignedUrlFromSupabaseObject<'profiles_update'>(result, 'profile_images', 'profile_image_');
    }

    public async update(profile: Partial<SupabaseObjectReturn<'profiles_update'>>): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: 'profiles_update',
                args: {
                    _first_name: profile.first_name_,
                    _last_name: profile.last_name_,
                    _profile_image: profile.profile_image_
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
                successMessage: 'Profile updated!'
            }
        );
        getSignedUrlFromSupabaseObject<'profiles_update'>(result, 'profile_images', 'profile_image_');
    }

    public checkIsOwner(sessionId: string, urlId: string | null): void {
        this.isOwner_.set(sessionId === urlId);
    }

}
