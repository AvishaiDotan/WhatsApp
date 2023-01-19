import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'main-contact',
    templateUrl: './main-contact.component.html',
    styleUrls: ['./main-contact.component.scss']
})
export class MainContactComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute) {}

    contactSub!: Subscription

    contact!: Contact


    ngOnInit(): void {
        this.contactSub = this.activatedRoute.data.subscribe(contact => this.contact = contact['contact']);
        console.log(this.contact);
        
    }

}
