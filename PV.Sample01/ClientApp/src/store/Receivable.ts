import { Action, Reducer } from 'redux';
import { AppThunkAction } from './index';
import { IReceivableInput, ReceivableState } from './interfaces';
import { Api } from '../service/service';

interface RequestReceivableAction {
    type: 'REQUEST_RECEIVABLES';
}
interface ReceiveReceivableAction {
    type: 'RECEIVE_RECEIVABLES';
    receivables: IReceivableInput[];
}

export type KnownAction = RequestReceivableAction | ReceiveReceivableAction

function GetReceivables(): Promise<IReceivableInput[]> {
    return Api.get<IReceivableInput[]>('v1/receivable-unit');
}

function AddReceivable(): Promise<IReceivableInput[]> {
    return Api.put<IReceivableInput[]>('v1/receivable-unit');
}

export const actionsReceivables = {

    requestReceivable: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.receivable) {
            if (appState.receivable.isSync) {
                GetReceivables().then(data => dispatch({ type: "RECEIVE_RECEIVABLES", receivables: data }));
            }
        }
    },
    requestAddReceivable: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.receivable) {
            if (appState.receivable.isSync) {
                AddReceivable();                
                GetReceivables().then(data => dispatch({ type: "RECEIVE_RECEIVABLES", receivables: data }));
            }
        }
    },

};
