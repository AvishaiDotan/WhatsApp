import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { ChatListComponent } from './views/chat-list/chat-list.component';

const routes: Routes = [
    {
        path: 'chats',
        component: ChatListComponent,
    },
    {
        path: 'status',
        component: AppHeaderComponent,
    },
    {
        path: 'calls',
        component: AppHeaderComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
