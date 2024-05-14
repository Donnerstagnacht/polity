import {Routes} from '@angular/router';
import {GroupNewComponent} from "../group/group-new/group-new.component";
import {NewComponent} from "./new/new.component";

export const NEW_ROUTES: Routes = [
    {
        path: '',
        component: NewComponent
    },
    {
        path: 'group',
        component: GroupNewComponent
    }
];
