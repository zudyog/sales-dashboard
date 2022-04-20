
export interface CustomersType {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
}

export interface CustomersRequestType {
    perPage?: number;
    page?: number;
    sortOrder?: string;
    field?: string;
}

export interface CustomersState {
    customers: Array<CustomersType>;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    customer: CustomersType;
}

