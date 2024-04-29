import {Component} from '@angular/core';
import {GroupActionService} from "../action-store-service/group.action.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'polity-group',
    standalone: true,
    imports: [],
    templateUrl: './group.component.html',
    styleUrl: './group.component.less'
})
export class GroupComponent {

    constructor(
        private groupActionService: GroupActionService,
        private route: ActivatedRoute
    ) {

    }

    async ngOnInit(): Promise<void> {
        const urlId: string = this.route.snapshot.params['id'];
        await this.groupActionService.readGroup(urlId);
        console.log(urlId)
    }
}
