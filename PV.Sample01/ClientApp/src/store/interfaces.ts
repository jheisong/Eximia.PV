

export interface IReceivableInput {
    selected: boolean
    product: string
    flag: string
    date: Date
    document: string
    grossValue: string
    discount: string
    value: string
}

export interface ReceivableState {
    isLoading: boolean;
    isSync: boolean;
    receivables: IReceivableInput[];
}


