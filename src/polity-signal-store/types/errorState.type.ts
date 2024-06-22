import {WritableSignal} from '@angular/core';

export type ErrorState = WritableSignal<{
    error: string
    showError: boolean
}>
