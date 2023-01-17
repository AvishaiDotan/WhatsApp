import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {

    constructor(private contactsService: ContactsService){}

    selectedContactsSub!: Subscription
    selectedCount: number = 0

    ngOnInit(): void {
        this.selectedContactsSub = this.contactsService.selectedContactsDB$.subscribe(contactsIds => {
            this.selectedCount = contactsIds.length
        })
    }

    ngOnDestroy(): void {
        this.selectedContactsSub.unsubscribe()
    }


}
