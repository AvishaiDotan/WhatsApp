import { Pipe, PipeTransform } from '@angular/core';
import { Msg } from '../models';

@Pipe({
    name: 'filterMsg'
})
export class FilterMsgPipe implements PipeTransform {

    transform(msgs: Msg[], filter: string): Msg[] {
        const regex = new RegExp(filter, 'i')
        const filteredMsgs = msgs.filter(({msg}) => regex.test(msg))
        return filteredMsgs;
    }

}
