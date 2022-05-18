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
    return Api.get<IReceivableInput[]>('receivable-unit');
}

function AddReceivable(): Promise<IReceivableInput[]> {
    return Api.put<IReceivableInput[]>('receivable-unit');
}

function ApplayReceivable(id: string): Promise<boolean> {
    return Api.put<boolean>('order/id/' + id);
}

export const actionsReceivables = {

    requestReceivable: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.receivable) {
            if (appState.receivable.isSync) {
                GetReceivables().then(data => {
                    dispatch({ type: "RECEIVE_RECEIVABLES", receivables: data })
                });
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
    requestApplyReceivable: (receivables: IReceivableInput[]): AppThunkAction<KnownAction> => (dispatch, getState) => {

        receivables.filter(f => f.selected).forEach(r => ApplayReceivable(r.id));
        GetReceivables().then(data => dispatch({ type: "RECEIVE_RECEIVABLES", receivables: data }));
    }

};
