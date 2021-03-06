import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from '../utilities-guards/isLoggedIn/is-logged-in.guard';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatComponent } from './chat/chat.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { Chat } from 'src/app/UI-elements/chat-list-item/chat-list-item.component';
import { NewsComponent } from '../news/news/news.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'news',
    component: NewsComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: ':id',
    component: ChatRoomComponent,
    canActivate: [IsLoggedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgaRoutingModule { }
