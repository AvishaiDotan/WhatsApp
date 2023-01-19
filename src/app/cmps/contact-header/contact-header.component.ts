import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/models';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'contact-header',
    templateUrl: './contact-header.component.html',
    styleUrls: ['./contact-header.component.scss']
})
export class ContactHeaderComponent {
    @Input() contact!: Contact

    searchVal: string = ''

    Print() {
        console.log(this.searchVal);
    }
}
