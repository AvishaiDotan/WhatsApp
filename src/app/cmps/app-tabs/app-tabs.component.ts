import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tabs',
    templateUrl: './app-tabs.component.html',
    styleUrls: ['./app-tabs.component.scss']
})
export class AppTabsComponent {
    selectedTab: string = 'chats'


}
