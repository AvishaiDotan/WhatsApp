import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './root-app/app.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { AppTabsComponent } from './cmps/app-tabs/app-tabs.component';
import { ChatListComponent } from './views/chat-list/chat-list.component';
import { ChatPreviewComponent } from './cmps/chat-preview/chat-preview.component';
import { MainAppComponent } from './views/main-app/main-app.component';
import { MainContactComponent } from './views/main-contact/main-contact.component';
import { ContactChatComponent } from './cmps/contact-chat/contact-chat.component';
import { ContactHeaderComponent } from './cmps/contact-header/contact-header.component';
import {FormsModule} from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppTabsComponent,
    ChatListComponent,
    ChatPreviewComponent,
    MainAppComponent,
    MainContactComponent,
    ContactChatComponent,
    ContactHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
