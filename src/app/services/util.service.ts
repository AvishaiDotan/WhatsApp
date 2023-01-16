import { Injectable } from '@angular/core';

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
}
