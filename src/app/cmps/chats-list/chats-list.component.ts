import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Contact } from 'src/app/models';

@Component({
    selector: 'chats-list',
    templateUrl: './chats-list.component.html',
    styleUrls: ['./chats-list.component.scss']
})
export class ChatsListComponent implements OnInit, AfterViewChecked {


    @Input() contact!: Contact
    @Input() filter!: string
    @ViewChild('scrollBottom') private scrollBottom!: ElementRef;

    ngOnInit() {
        this.scrollToBottom();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.scrollBottom.nativeElement.scrollTo(0, this.scrollBottom.nativeElement.clientHeight + 120)
            // this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;    
        } catch (err) { }
    }


    isPassedDay(timestamp: number, idx: number): boolean {
        const { msgs } = this.contact
        const day = 1000 * 60 * 60 * 24

        return msgs[idx - 1] && msgs[idx - 1].timestamp + day < timestamp
    }
}
