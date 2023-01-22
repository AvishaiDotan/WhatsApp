import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'contact-header',
    templateUrl: './contact-header.component.html',
    styleUrls: ['./contact-header.component.scss']
})
export class ContactHeaderComponent {

    constructor(private router: Router) { }

    @Input() contact!: Contact
    @Output() onFilter = new EventEmitter<string>()

    searchVal: string = ''

    goBack() {
        this.router.navigateByUrl('')
    }

    setFilter(filter: string) {
        this.onFilter.emit(filter)        
    }

}
