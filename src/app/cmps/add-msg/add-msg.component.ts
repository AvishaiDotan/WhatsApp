import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
    selector: 'add-msg',
    templateUrl: './add-msg.component.html',
    styleUrls: ['./add-msg.component.scss']
})
export class AddMsgComponent {

    constructor(private contactService: ContactsService){}

    @Input() contactId!: string;

    msgTxt: string = ''

    addMsg() {
        if (!this.msgTxt) return

        const msg = {
            from: 'user',
            to: this.contactId,
            timestamp: Date.now(),
            msg: this.msgTxt
        }
        
        this.contactService.addMsg(this.contactId, msg)

        this.msgTxt = ''
    }
}
