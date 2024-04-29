import {Routes} from "@angular/router";
import {GroupNewComponent} from "./group-new/group-new.component";
import {GroupComponent} from "./group/group.component";

export const GROUP_ROUTES: Routes = [
    {
        path: 'new',
        component: GroupNewComponent
    },
    {
        path: ':id',
        component: GroupComponent
    }
]
