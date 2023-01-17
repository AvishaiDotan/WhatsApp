import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models';

@Component({
    selector: 'app-tabs',
    templateUrl: './app-tabs.component.html',
    styleUrls: ['./app-tabs.component.scss']
})
export class AppTabsComponent implements OnInit, OnDestroy {
    constructor(private contactsService: ContactsService) {}
    
    selectedTab: string = 'chats'
    contactsSub!: Subscription
    totalUnreadCount: number = 0

    ngOnInit(): void {
        this.contactsSub = this.contactsService.contactsDB$.subscribe((contacts) => {
            this.totalUnreadCount = contacts.reduce((total: number, contact: Contact) => {
                return total + contact.unread
            }, 0)
        })
    }

    ngOnDestroy(): void {
        this.contactsSub.unsubscribe()
    }


}
