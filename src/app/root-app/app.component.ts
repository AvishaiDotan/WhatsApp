import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private contactsService: ContactsService ){}

    ngOnInit(): void {
        this.contactsService.query()
        console.log('hey');
    }
}
