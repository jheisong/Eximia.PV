import { Action, Reducer } from 'redux';
import { IReceivableInput, ReceivableState } from '../store/interfaces';
import { KnownAction } from '../store/Receivable';


const unloadedState: ReceivableState = { receivables: [], isLoading: false, isSync: true };

export const reducer: Reducer<ReceivableState> = (state: ReceivableState | undefined, incomingAction: Action): ReceivableState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_RECEIVABLES':           
            return {
                receivables: state.receivables,
                isSync: state.isSync,
                isLoading: true
            };
        case 'RECEIVE_RECEIVABLES':
            action.receivables.forEach(f => f.selected = false);
            return {
                receivables: action.receivables,
                isSync: state.isSync,
                isLoading: false
            };
        default: return state;
    }
};
/*
export default function AddReceivable(state = [], incomingAction: Action) {

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ADD_RECEIVABLES':
            return {
                receivables: action.receivables,
                isSync: state.isSync,
                isLoading: false
            };
        default: return state;
    }

}*/


