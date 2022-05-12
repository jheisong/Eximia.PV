import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';


export interface ReceivableState {
    isLoading: boolean;
    isSync: boolean;
    receivables: ReceivableInput[];
}

export interface ReceivableInput {
    selected: boolean
    product: string
    flag: string
    date: Date
    document: string
    grossValue: string
    discount: string
    value: string
}

interface RequestReceivableAction {
    type: 'REQUEST_RECEIVABLES';
}

interface ReceiveReceivableAction {
    type: 'RECEIVE_RECEIVABLES';
    receivables: ReceivableInput[];
}

type KnownAction = RequestReceivableAction | ReceiveReceivableAction;


export const actionCreators = {
    requestReceivable: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.receivable) {
            if (appState.receivable.isSync) {
                fetch('https://localhost:44366/ReceivableUnit')
                    .then(response => response.json() as Promise<ReceivableInput[]>)
                    .then(data => {
                        dispatch({ type: 'RECEIVE_RECEIVABLES', receivables: data });
                    });
                dispatch({ type: 'REQUEST_RECEIVABLES' });
            } else {
                fetch('https://localhost:44366/Receivabl')
                    .then(response => response.json() as Promise<ReceivableInput[]>)
                    .then(data => {
                        dispatch({ type: 'RECEIVE_RECEIVABLES', receivables: data });
                    });
                dispatch({ type: 'REQUEST_RECEIVABLES' });
            }
        }
    }
};

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
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            //if (this. action.startDateIndex === state.startDateIndex) {
            return {
                receivables: action.receivables,
                isSync: state.isSync,
                isLoading: false
            };

            break;
    }

    return state;
};
