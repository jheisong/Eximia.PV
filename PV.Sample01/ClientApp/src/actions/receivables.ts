import { IReceivableInput } from '../store/interfaces';

export function GetAll() {

    var data: IReceivableInput[] = [];

    return {
        type: 'RECEIVE_RECEIVABLES',
        receivables: data,
    }

}