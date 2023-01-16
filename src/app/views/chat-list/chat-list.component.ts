import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Contact } from 'src/app/models';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
    selector: 'chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

    constructor(private contactsService: ContactsService) {}

    contactsSub!: Observable<Contact[]>;

    ngOnInit(): void {
        this.contactsService.query()
        this.contactsSub = this.contactsService.contactsDB$
    }
}
