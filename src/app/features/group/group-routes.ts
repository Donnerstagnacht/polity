import {Routes} from "@angular/router";
import {GroupNewComponent} from "./group-new/group-new.component";
import {GroupWikiComponent} from "./group-wiki/group-wiki.component";

export const GROUP_ROUTES: Routes = [
    {
        path: '',
        component: GroupWikiComponent
    },
    {
        path: 'new',
        component: GroupNewComponent
    },
    // {
    //     path: ':id',
    //     component: GroupComponent
    // }
]
