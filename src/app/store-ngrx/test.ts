import {inject} from '@angular/core';
import {patchState, signalStoreFeature, SignalStoreFeature, withMethods, withState,} from '@ngrx/signals';
import {Clipboard} from '@angular/cdk/clipboard';

export interface ClipboardState {
    text: string;
}

export interface ClipboardOptions<Prop> {
    prefix: Prop;
}

export type PrefixedClipboardState<Prop extends string> = {
    [K in Prop as `${K}Text`]: string;
};

export type PrefixedClipboardMethods<Prop extends string> = {
    [K in Prop as `${K}Copy`]: (value: string) => {};
};

export function withClipboard<Prop extends string>(
    options: ClipboardOptions<Prop>
): SignalStoreFeature<
    {
        state: {};
        signals: {};
        methods: {};
    },
    {
        state: PrefixedClipboardState<Prop>;
        signals: {};
        methods: PrefixedClipboardMethods<Prop>;
    }
>;

export function withClipboard<Prob>(
    options: ClipboardOptions<Prob>
): SignalStoreFeature<any> {
    const textKey = `${options.prefix}Text`;
    const copyKey = `${options.prefix}Copy`;

    return signalStoreFeature(
        withState({[textKey]: ''}),

        withMethods((store, clipboard = inject(Clipboard)) => ({
            [copyKey](value: string) {
                clipboard.copy(value);

                patchState(store, {[textKey]: value});
            },
        }))
    );
}
