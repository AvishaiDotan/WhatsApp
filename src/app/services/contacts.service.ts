import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';

import { BehaviorSubject, lastValueFrom, of } from 'rxjs';
import { Contact, Msg } from '../models';
import { ContactState } from '../enums';

@Injectable({
    providedIn: 'root'
})
export class ContactsService {

    contacts_key = 'contactsDB';
    randomMsgInterval: any = ''

    constructor(
        private utilService: UtilService,
        private http: HttpClient) { }

    private _contactsDB$ = new BehaviorSubject([]);
    public contactsDB$ = this._contactsDB$.asObservable();

    private _selectedContactsDB$ = new BehaviorSubject<string[]>([]);
    public selectedContactsDB$ = this._selectedContactsDB$.asObservable();

    private _currContactChatDB$ = new BehaviorSubject<Contact | null>(null);
    public currContactChatDB$ = this._currContactChatDB$.asObservable();

    
    

    async query() {
        if (!this.randomMsgInterval) this.randomMsgInterval = setInterval(this.addRandomMsg, 2000, this)
        let contacts = this.utilService.loadFromStorage(this.contacts_key)

        if (!contacts) {
            let { results }: any = await lastValueFrom(this.http.get('https://randomuser.me/api/?inc=gender,picture,phone,id,name&results=5'))
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

    addRandomMsg(currThis: any) {
        const contacts: Contact[] = currThis._contactsDB$.getValue()
        if (!contacts) return

        const idx = currThis.utilService.getRandomIntInclusive(0, contacts.length - 1)

        if (idx < 0) return

        const {id: {value}} = contacts[idx]

        const msg = {
            from: value,
            to: 'user',
            timestamp: Date.now(),
            msg: currThis.utilService.getMessage()
        }
        contacts[idx].unread++

        currThis.addMsg(value, msg)
    }

    getContactById(contactId: string) {;
        const contacts = this._contactsDB$.getValue()
        const contact = contacts.find(({ id: {value} }) => value === contactId)
        
        if (!contact) return this._currContactChatDB$.next(null)

        this._currContactChatDB$.next(contact)
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

    addMsg(contactId: string, msg: Msg): void {
        const contacts: Contact[] = this._contactsDB$.getValue()
        const contact = contacts.find(({ id: {value} }) => value === contactId)

        if (!contact) return      
        contact.msgs.push(msg)

        this._contactsDB$.next(contacts as never[])
        this.utilService.saveToStorage(this.contacts_key, contacts)  
        this._currContactChatDB$.next(contact)  
    }
}
