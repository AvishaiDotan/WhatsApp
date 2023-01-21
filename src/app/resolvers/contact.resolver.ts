import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Contact } from '../models';
import { ContactsService } from '../services/contacts.service';

@Injectable({
    providedIn: 'root'
})
export class ContactResolver implements Resolve<Contact> {

    constructor(private contactService: ContactsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Contact>  {     
        const contactId: any = route.params['id']
        return this.contactService.getContactById(contactId)
    }
}
