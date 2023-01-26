import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
    selector: 'contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

    constructor(private contactsService: ContactsService,
                private router: Router


        ) {}

    contact!: Contact
    contactSub!: Subscription

    toggleProp(prop: "isMute" | "isBlocked", isNavigate: boolean) {
        this.contact[prop] = !this.contact[prop]
        this.contactsService.updateContact(this.contact)
        this.contactsService.reloadContacts()
        if (isNavigate) this.router.navigateByUrl('')
    }

    deleteContact() {
        this.contact["isBlocked"] = !this.contact["isBlocked"]
        this.contactsService.updateContact(this.contact)
        this.contactsService.reloadContacts()
        this.router.navigateByUrl('')
    }

    goBack() {
        this.router.navigateByUrl('')
    }

    ngOnInit() {
        this.contactSub = this.contactsService.currContactChatDB$.subscribe(contact => this.contact = contact as Contact);
    }

    ngOnDestroy(): void {
        this.contactSub.unsubscribe()
    }



}
