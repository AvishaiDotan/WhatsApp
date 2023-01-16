import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';

import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Contact } from '../models';
import { ContactState } from '../enums';

@Injectable({
    providedIn: 'root'
})
export class ContactsService {

    contacts_key = 'contactsDB';

    constructor(
        private utilService: UtilService,
        private http: HttpClient) { }

    private _contactsDB$ = new BehaviorSubject([]);
    public contactsDB$ = this._contactsDB$.asObservable()

    public async query() {
        let contacts = this.utilService.loadFromStorage(this.contacts_key)

        if (!contacts) {
            let { results }: any = await lastValueFrom(this.http.get('https://randomuser.me/api/?inc=gender,picture,phone,id,name&results=100'))
            contacts = results
            contacts.forEach((contact: Contact) => {
                contact.msgs = this.utilService.getMessages('user', contact.id.value)
                contact.unread = this.utilService.getRandomIntInclusive(0, contact.msgs.length - 1)
                
                const chance = Math.random()
                if (chance <= 0.03) contact.state = ContactState.Pin
                else if (chance <= 0.15) contact.state = ContactState.Mute
                else contact.state = ContactState.Regular
            })

            contacts.sort((c1: Contact, c2: Contact) => (c2.state === 'pin') ? 1 : -1)
        }     

        this._contactsDB$.next(contacts)
        this.utilService.saveToStorage(this.contacts_key, contacts)
    }


}
