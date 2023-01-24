import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models';

@Component({
    selector: 'chats-list',
    templateUrl: './chats-list.component.html',
    styleUrls: ['./chats-list.component.scss']
})
export class ChatsListComponent implements OnInit, AfterViewInit {


    constructor(private route: ActivatedRoute) {}

    @Input() contact!: Contact
    @Input() filter!: string

    unread: number = 0

    ngOnInit() {
        this.route.data.subscribe(({contact}) => {           
            this.unread = contact           
        })
    }

    ngAfterViewInit(): void {
        this.scrollToBottom()
    }

    scrollToBottom(): void {
        try {
            // @ts-ignore
            window.document.querySelector('.scrollTo')?.scrollIntoView()       
        } catch (err) { }
    }


    isPassedDay(timestamp: number, idx: number): boolean {
        const { msgs } = this.contact
        const day = 1000 * 60 * 60 * 24

        return msgs[idx - 1] && msgs[idx - 1].timestamp + day < timestamp
    }
}
