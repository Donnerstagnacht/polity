import {Injectable} from '@angular/core';
import {rpcObjectHandler} from '../../../store-signal-functions/object/rpcObjectHandlerFeature';
import {BaseObjectStore} from '../../../store-signal-functions/object/base-object-store.service';
import {DatabaseHiddenOverwritten} from '../../../../../supabase/types/supabase.hidden.modified';

@Injectable({
    providedIn: 'root'
})
export class AssistantStore extends BaseObjectStore<'read_assistant'> {

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
                fn: 'read_assistant'
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
                fn: 'update_first_sign_in',
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
                fn: 'update_skip_tutorial',
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
                fn: 'update_last_tutorial',
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
