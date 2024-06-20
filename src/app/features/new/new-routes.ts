import {Routes} from '@angular/router';
import {NewPage} from './new-page/new.page';
import {NewGroupPage} from './new-group-page/new-group.page';

export const NEW_ROUTES: Routes = [
    {
        path: '',
        component: NewPage
    },
    {
        path: 'group',
        component: NewGroupPage
    }
];
