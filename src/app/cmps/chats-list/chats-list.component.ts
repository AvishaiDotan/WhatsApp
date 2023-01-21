import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/models';

@Component({
    selector: 'chats-list',
    templateUrl: './chats-list.component.html',
    styleUrls: ['./chats-list.component.scss']
})
export class ChatsListComponent {
    @Input() contact!: Contact

    isPassedDay(timestamp: number, idx: number): boolean {
        const { msgs } = this.contact
        const day = 1000 * 60 * 60 * 24

        return msgs[idx - 1] && msgs[idx - 1].timestamp + day < timestamp
    }
}
