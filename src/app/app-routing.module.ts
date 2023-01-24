import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { ChatListComponent } from './views/chat-list/chat-list.component';
import { MainAppComponent } from './views/main-app/main-app.component';
import { MainContactComponent } from './views/main-contact/main-contact.component';
import { ContactResolver } from './resolvers/contact.resolver';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';

const routes: Routes = [
    {
        path: 'main',
        component: MainAppComponent,
        children: [
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
        ]
    },
    {
        path: 'contact/chat/:id',
        component: MainContactComponent,
        resolve: {contact: ContactResolver},
    },
    {
        path: 'contact/details/:id',
        component: ContactDetailsComponent,
        resolve: {contact: ContactResolver},
    },
    {
        path: '**',
        redirectTo: 'main/chats'
    }


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
