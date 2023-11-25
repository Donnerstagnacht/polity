import {Component, signal, WritableSignal} from '@angular/core';

@Component({
    selector: 'polity-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.less']
})
export class LoadingComponent {
    protected isLoading: WritableSignal<boolean> = signal(false);
}
