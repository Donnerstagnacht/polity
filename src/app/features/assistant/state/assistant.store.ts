import {Injectable} from '@angular/core';
import {DatabaseHiddenOverwritten} from '../../../../../supabase/types/supabase.hidden.modified';
import {rpcObjectHandler} from '@polity-signal-store/object/rpcObjectHandlerFeature';
import {BaseObjectStore} from '@polity-signal-store/object/base-object-store.service';

@Injectable({
    providedIn: 'root'
})
export class AssistantStore extends BaseObjectStore<'assistants_read'> {

    constructor() {
        super({
            id_: '',
            first_sign_in_: false,
            skip_tutorial_: false,
            last_tutorial_: 'profile'
        });
    }

    public async read(): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: 'assistants_read'
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

    public async updateFirstSignIn(newStatus: boolean): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: 'assistants_first_sign_in_update',
                args: {
                    _new_status: newStatus
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
                successMessage: 'Congratulations. You made your first step!'
            }
        );
    }

    public async skipTutorial(newStatus: boolean): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: 'assistants_skip_tutorial_update',
                args: {
                    _new_status: newStatus
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
                successMessage: 'Assistant loaded!'
            }
        );
    }

    public async updateLastTutorial(last_tutorial: DatabaseHiddenOverwritten['hidden']['Enums']['tutorial_enum']): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: 'assistants_last_tutorial_update',
                args: {
                    _new_status: last_tutorial
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
                successMessage: 'Congratulations. You finished another tutorial!'
            }
        );
    }


}
