import {Directive, Input, OnInit, signal, WritableSignal} from '@angular/core';

@Directive({
    selector: '[polityArrayStoreConsumer]',
    standalone: true
})
export class ArrayStoreConsumerDirective<T> implements OnInit {
    @Input() service?: {
        loading: {
            getLoading: () => WritableSignal<boolean>
        }
        getDataRequested: () => WritableSignal<boolean>
        getObjects: () => WritableSignal<any[]>
        getNoDataFound: () => WritableSignal<boolean>
    };

    protected isLoading: WritableSignal<boolean> = signal(false);
    protected dataRequested: WritableSignal<boolean> = signal(false);
    protected noDataFound: WritableSignal<boolean> = signal(false);
    protected data: WritableSignal<T[]> = signal([]);

    constructor() {

    }

    ngOnInit() {
        if (this.service && typeof this.service.loading.getLoading === 'function') {
            this.isLoading = this.service.loading.getLoading();
            this.noDataFound = this.service.getNoDataFound();
            this.dataRequested = this.service.getDataRequested();
            this.data = this.service.getObjects();
        }

    }

}
