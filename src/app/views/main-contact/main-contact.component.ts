import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models';
import { Subscription } from 'rxjs';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
    selector: 'main-contact',
    templateUrl: './main-contact.component.html',
    styleUrls: ['./main-contact.component.scss']
})
export class MainContactComponent implements OnInit, OnDestroy {

    constructor(private activatedRoute: ActivatedRoute, private contactsService: ContactsService) {}

    
    contactSub!: Subscription
    contact!: Contact

    filter: string = ''

    ngOnInit(): void {
        this.contactSub = this.contactsService.currContactChatDB$.subscribe(contact => {
            this.contact = JSON.parse(JSON.stringify(contact as Contact))   
        })
    }

    ngOnDestroy(): void {
        this.contactSub.unsubscribe();
    }

    setFilter(filter: string) {
        this.filter = filter;
    }

}
