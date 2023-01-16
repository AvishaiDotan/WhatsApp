import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './root-app/app.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { AppTabsComponent } from './cmps/app-tabs/app-tabs.component';
import { ChatListComponent } from './views/chat-list/chat-list.component';
import { ChatPreviewComponent } from './cmps/chat-preview/chat-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppTabsComponent,
    ChatListComponent,
    ChatPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
