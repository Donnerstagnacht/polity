import {Component, signal, WritableSignal} from '@angular/core';
import {TuiLoaderModule} from "@taiga-ui/core";

@Component({
    selector: 'polity-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.less'],
    standalone: true,
    imports: [
        TuiLoaderModule
    ]
})
export class LoadingComponent {
    protected isLoading: WritableSignal<boolean> = signal(false);
}
