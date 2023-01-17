import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';

import { Subscription, timeInterval } from 'rxjs';
import { Contact } from 'src/app/models';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
    selector: 'chat-preview',
    templateUrl: './chat-preview.component.html',
    styleUrls: ['./chat-preview.component.scss']
})
export class ChatPreviewComponent implements OnInit, OnDestroy {

    constructor(private contactsService: ContactsService){}
    
    @Input() contact!: Contact;

    selectedContactsSub!: Subscription

    timeoutHandler: any = null;
    isHolding: boolean = false;
    isSelecting: boolean = false;


    ngOnInit(): void {
        this.selectedContactsSub = this.contactsService.selectedContactsDB$.subscribe((contacts) => {
            this.isSelecting = (contacts.length > 0) ? true : false
        })
    }

    ngOnDestroy(): void {
        this.selectedContactsSub.unsubscribe()
    }



    getDatePipe(timestamp: number): { pipe: string, additional: string } {
        const now = Date.now()
        if (now - timestamp > 1000 * 60 * 60 * 24 * 30 * 12) return { pipe: 'yyyy', additional: '' }
        if (now - timestamp > 1000 * 60 * 60 * 24 * 30) return { pipe: 'dd MMM', additional: '' }
        if (now - timestamp > 1000 * 60 * 60 * 24) return { pipe: 'HH:mm', additional: '' }
        if (now - timestamp > 1000 * 60 * 60) return { pipe: 'mm', additional: 'minutes ago' }
        return { pipe: 'ss', additional: 'secondes ago' }
    }

    resetSelection() {
        this.isHolding = false
    }

    selectContact(contactId: string) {

        if (this.isSelecting) {
            this.contactsService.selectContact(contactId)
            return
        }

        if (this.isHolding) return

        this.isHolding = true
        this.timeoutHandler = setTimeout(() => {
            if (!this.isHolding) {
                clearTimeout(this.timeoutHandler)
                this.isHolding = false
                return
            }

            this.contactsService.selectContact(contactId)    
            clearTimeout(this.timeoutHandler) 
        }, 1500)
    }
}
