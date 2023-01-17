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
    public contactsDB$ = this._contactsDB$.asObservable();

    private _selectedContactsDB$ = new BehaviorSubject<string[]>([]);
    public selectedContactsDB$ = this._selectedContactsDB$.asObservable();

    async query() {
        let contacts = this.utilService.loadFromStorage(this.contacts_key)

        if (!contacts) {
            let { results }: any = await lastValueFrom(this.http.get('https://randomuser.me/api/?inc=gender,picture,phone,id,name&results=100'))
            contacts = results
            contacts.forEach((contact: Contact) => {
                contact.msgs = this.utilService.getMessages('user', contact.id.value)
                contact.unread = (Math.random() > 0.7) ? this.utilService.getRandomIntInclusive(1, contact.msgs.length - 1) : 0
                
                const chance = Math.random()
                if (chance <= 0.03) contact.state = ContactState.Pin
                else if (chance <= 0.15) contact.state = ContactState.Mute
                else contact.state = ContactState.Regular

                contact.id.value = (contact.id.value) ? contact.id.value : this.utilService.makeId()
            })

            this.setOrder(contacts)

        }     

        this._contactsDB$.next(contacts)
        this.utilService.saveToStorage(this.contacts_key, contacts)
    }

    reloadContacts() {
        const contacts = this._contactsDB$.getValue()
        this.setOrder(contacts)
        this._contactsDB$.next(contacts)
    }

    async selectContact(contactId: string): Promise<void> {
        
        if (!contactId) return

        const selectedContacts = this._selectedContactsDB$.getValue()
        const selectedIdx =  selectedContacts.findIndex(id => contactId === id)

        if (selectedIdx !== -1) {
            selectedContacts.splice(selectedIdx, 1)
            this._selectedContactsDB$.next(selectedContacts)
            return
        }

        selectedContacts.push(contactId as never)
        this._selectedContactsDB$.next(selectedContacts)    
    }

    setOrder(contacts: Contact[]) {
        contacts.sort((c1: Contact, c2: Contact) => c1.msgs[0].timestamp - c2.msgs[0].timestamp)
        contacts.sort((c1: Contact, c2: Contact) => (c2.state === 'pin') ? 1 : -1)
    }

    toggleProp(prop: string): void {
        const selectedContacts = this._selectedContactsDB$.getValue()
        const contacts = this._contactsDB$.getValue()

        selectedContacts.forEach(id => {
            const contact: any = contacts.find((contact: Contact)  => contact.id.value === id)
            
            if (!contact) return

            contact.state = (contact.state === prop) ? '' : prop
        })

        this._selectedContactsDB$.next([])
        this.reloadContacts()
    }

    unselectContacts() {
        this._selectedContactsDB$.next([])
    }
}
