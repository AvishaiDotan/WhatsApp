import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models';

@Component({
    selector: 'chat-preview',
    templateUrl: './chat-preview.component.html',
    styleUrls: ['./chat-preview.component.scss']
})
export class ChatPreviewComponent {

    @Input() contact!: Contact;


    getDatePipe(timestamp: number): {pipe: string, additional: string} {
        const now = Date.now()
        if (now - timestamp > 1000 * 60 * 60 * 24 * 30 * 12) return {pipe: 'yyyy', additional: ''}
        if (now - timestamp > 1000 * 60 * 60 * 24 * 30) return {pipe: 'dd MMM', additional: ''} 
        if (now - timestamp > 1000 * 60 * 60 * 24) return {pipe: 'HH:mm', additional: ''}  
        if (now - timestamp > 1000 * 60 * 60) return {pipe: 'mm', additional: 'minutes ago'}
        return {pipe: 'ss', additional: 'secondes ago'} 
    }
}
