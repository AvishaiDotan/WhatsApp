import { Injectable } from '@angular/core';
import { Msg } from '../models';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    downloadCSV(arr: Array<string>) {
        const array = [Object.keys(arr[0])].concat(arr)

        const csvData = array.map((it) => { return Object.values(it).toString() }).join('\n')

        const anchor = document.createElement('a');
        anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData);
        anchor.target = '_blank';
        anchor.download = `EXAMPLE.csv`;
        anchor.click();
    }


    makeId(length: number = 6): string {
        var txt = ''
        var possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

        for (var i = 0; i < length; i++) {
            txt += possible.charAt(Math.floor(Math.random() * possible.length))
        }

        return txt
    }

    makeLorem(size: number = 100): string {
        var words = [
            'The sky',
            'above',
            'the port',
            'was',
            'the color of television',
            'tuned',
            'to',
            'a dead channel',
            '.',
            'All',
            'this happened',
            'more or less',
            '.',
            'I',
            'had',
            'the story',
            'bit by bit',
            'from various people',
            'and',
            'as generally',
            'happens',
            'in such cases',
            'each time',
            'it',
            'was',
            'a different story',
            '.',
            'It',
            'was',
            'a pleasure',
            'to',
            'burn',
        ]
        var txt = ''
        while (size > 0) {
            size--
            txt += words[Math.floor(Math.random() * words.length)] + ' '
        }
        return txt
    }

    copyToClipboard(text: string): void {
        var input = document.createElement('input')
        input.setAttribute('value', text)
        document.body.appendChild(input)
        input.select()
        var result = document.execCommand('copy')
        document.body.removeChild(input)
    }

    getRandomIntInclusive(min: number, max: number): number {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
    }


    debounce(func: Function, timeout: number = 1000): Function {
        let timer: any

        return (...args: any) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(this, args)
            }, timeout)
        }
    }

    saveToStorage(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value))
    }

    loadFromStorage(key: string): any {
        const data = localStorage.getItem(key)
        return data ? JSON.parse(data) : undefined
    }

    deepCopy(val: any): any {
        return JSON.parse(JSON.stringify(val))
    }

    getRandomColor(): string {
        var letters = '0123456789ABCDEF'
        var color = '#'
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    getMessage() {
        const messages = ["Hello, how are you?", "I'm good, thanks for asking.", "What's new with you?", "Not much, just working from home.",
            "I'm good, how about you?", "Just hanging out at home.", "What have you been up to?", "Not much, just watching some TV.",
            "How was your day?", "It was alright, had a lot of work to do.", "What are you doing later?", "Not sure yet, still deciding.",
            "Hey, what's up?", "Not much, just relaxing.", "What are you up to?", "Just finished work and now taking a break.",
            "What's new?", "Not much, just catching up with friends.", "How's your week going?", "It's been busy, but good.",
            "How's your day going?", "Pretty good, how about yours?", "Just hanging out at home", "Watching a movie",
            "What you doing?", "Nothing much, just watching TV", "Just woke up, what's new?", "Had a good sleep, thanks for asking.",
            "How's work?", "It's going well, thanks for asking.", "What's the plan for today?", "Not sure yet, still deciding.",
            "What's on your mind?", "Just thinking about the weekend.", "How's your weekend?", "It was good, how about yours?",
            "Just finished a workout", "Feeling good now", "Do you have plans today?", "Not yet, what do you suggest?",
            "Just finished lunch, how about you?", "I haven't had lunch yet, what did you have?", "How's the weather?", "It's nice today.",
            "What are you listening to?", "Listening to some music, what about you?", "What have you been reading?", "I just finished a book.",
            "How's your family?", "They're good, thanks for asking.", "What's the latest news?", "I haven't checked, what's happening?",
            "Just saw an interesting movie", "What was it about?", "I'm going for a walk", "Have a good walk",
            "How's your project going?", "It's going well, thanks for asking.", "What's your favorite hobby?", "I like to read and travel.",
            "What's your favorite food?", "I love pizza.", "What's your favorite color?", "I like blue.",
            "How's your day going?", "It's going well, thanks for asking.", "What did you do today?", "Just finished work and now relaxing.",
            "What's your favorite book?", "I like the Harry Potter series.", "What's your favorite movie?", "I like The Shawshank Redemption.",
            "What's your favorite sport?", "I like soccer.", "What's your favorite TV show?", "I like Game of Thrones.",
            "What's your favorite music?", "I like Pop music.", "What's your favorite holiday?", "I like Christmas."
        ]

        return messages[this.getRandomIntInclusive(0, messages.length - 1)]
    }

    getMessages(from: string, to: string): Msg[] {
        const msgs = []
        const msgsCount = this.getRandomIntInclusive(1, 20)
        
        for (let i = 0; i < msgsCount; i++) {
            const destination = (Math.random() > Math.random()) ? {from, to} : {from: to, to: from}
            const msg = {
                from: destination.from,
                to: destination.to,
                msg: this.getMessage(),
                timestamp: this.getRandomTimestamp()
            }
            msgs.push(msg)
        }
        
        msgs.sort((msg1, msg2) => msg1.timestamp - msg2.timestamp)

        return msgs
    }

    getRandomTimestamp() {
        const now = Date.now()

        let before
        
        if (Math.random() > 0.9) before = before = 1000 * 60 * 60 * 24 * 30 * 12 * (2 * Math.random()) * Math.random()
        else if (Math.random() > 0.7) before = before = 1000 * 60 * 60 * 24 * 30 * 12 * Math.random()
        else if (Math.random() > 0.5) before = before = 1000 * 60 * 60 * 24 * 30 * Math.random()
        else if (Math.random() > 0.2) before = 1000 * 60 * 60 * 24 * Math.random()
        else before = 1000 * 60 * 60 * Math.random()
        
        return +(now - before).toFixed(0)
    }
}
