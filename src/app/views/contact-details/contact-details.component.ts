import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
    selector: 'contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

    constructor(private contactsService: ContactsService) {}

    contact!: Contact | null
    contactSub!: Subscription

    ngOnInit() {
        this.contactSub = this.contactsService.currContactChatDB$.subscribe(contact => this.contact = contact)
    }

    ngOnDestroy(): void {
        this.contactSub.unsubscribe()
    }



}
