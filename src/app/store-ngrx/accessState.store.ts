import {Component, inject, OnInit} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import 'zone.js';
import {NgClass} from '@angular/common';

import {
    patchState,
    signalStore,
    SignalStoreFeature,
    signalStoreFeature,
    StateSignal,
    withMethods,
    withState,
} from '@ngrx/signals';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {filter, switchMap, tap} from 'rxjs/operators';
import {Observable, of, pipe} from 'rxjs';
import {SignalStoreFeatureResult, SignalStoreSlices,} from '@ngrx/signals/src/signal-store-models';

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

function withEntityVersioner<Entity>(loader: () => Observable<Entity[]>) {
    return signalStoreFeature(
        withState({version: 1, entities: new Array<Entity>()}),
        withMethods((store) => {
            return {
                update: rxMethod<unknown>(
                    pipe(
                        switchMap(() => loader()),
                        filter((entities) => entities !== store.entities()),
                        tap((entities) =>
                            patchState(store, (value) => ({
                                entities,
                                version: value.version + 1,
                            }))
                        )
                    )
                ),
            };
        })
    );
}


function withIncrementer<Entity extends object>(key: keyof Entity, store2: StateSignal<any>) {
    return signalStoreFeature(
        withMethods(() => {
            const store = store2 as any;
            return {
                increment() {
                    patchState(store, {[key]: store[key]() + 1});
                },
            };
        })
    );
}

export function withFeatureFactory<
    Input extends SignalStoreFeatureResult,
    Feature extends SignalStoreFeature<any, any>
>(
    featureFactory: (
        store: Prettify<
            SignalStoreSlices<Input['state']> &
            Input['signals'] &
            Input['methods'] &
            StateSignal<Prettify<Input['state']>>
        >
    ) => Feature
): SignalStoreFeature<
    Input & (Feature extends SignalStoreFeature<infer In, any> ? In : never),
    Feature extends SignalStoreFeature<any, infer Out> ? Out : never
> {
    return ((store: any) => {
        const {slices, methods, signals, hooks, ...rest} = store;
        return featureFactory({
            ...slices,
            ...signals,
            ...methods,
            ...rest,
        } as Prettify<SignalStoreSlices<Input['state']> & Input['signals'] & Input['methods'] & StateSignal<Prettify<Input['state']>>>)(
            store
        );
    }) as Feature;
}

interface Person {
    firstname: string;
    lastname: string;
}

const persons: Person[] = [
    {firstname: 'John', lastname: 'Doe'},
    {firstname: 'Jane', lastname: 'Doe'},
];

type counter = {
    counter: number;
};

const intitialState = {
    counter: 0,
};

const testStore = signalStore(
    {providedIn: 'root'},
    withState(intitialState),
    withMethods(() => {
        return {
            load() {
                return of(persons);
            },
        };
    }),
    withFeatureFactory((store) => withEntityVersioner(() => store.load())),
    withFeatureFactory((store) => withIncrementer<counter>('counter', store)),
    withMethods((store) => {
        return {
            decrement() {
                patchState(store, {counter: store.counter() + 1});
            },
        };
    })
);

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
        <h1>NgRx Signal Store Seed</h1>
        <p>Demonstration of withFeatureFactory as described in https://github.com/ngrx/platform/issues/4340
            <button (click)='onIncrement()'>increment</button>
        <p>{{ this.store.counter() }}</p>
    `,
    imports: [NgClass],
})
export class App implements OnInit {
    protected store = inject(testStore);

    ngOnInit() {
    }

    onIncrement() {
        console.log('increment');
        //this.store.decrement();
        this.store.increment();
    }
}

bootstrapApplication(App);
