import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models';

@Component({
    selector: 'chat-preview',
    templateUrl: './chat-preview.component.html',
    styleUrls: ['./chat-preview.component.scss']
})
export class ChatPreviewComponent {

    @Input() contact!: Contact;
}
