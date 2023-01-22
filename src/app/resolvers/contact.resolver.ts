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
export class ContactResolver implements Resolve<void> {

    constructor(private contactService: ContactsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void  {     
        const contactId: any = route.params['id']
        this.contactService.getContactById(contactId)    
    }
}
