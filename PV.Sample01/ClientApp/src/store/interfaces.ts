

export interface IReceivableInput {
    id: string
    currentStatus: string
    product: string
    flag: string
    date: Date
    document: string
    grossValue: string
    discount: string
    value: string
    selected: boolean
}

export interface ReceivableState {
    isLoading: boolean;
    isSync: boolean;
    receivables: IReceivableInput[];
}


