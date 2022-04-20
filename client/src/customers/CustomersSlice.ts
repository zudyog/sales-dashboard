import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomersState, CustomersType } from './Customers';
import { getCustomersThunk } from './CustomersThunk';

const initialState: CustomersState = {
    customers: [] as CustomersType[],
    loading: 'idle',
    customer: {} as CustomersType,
}



export const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getCustomersThunk.pending, (state: CustomersState) => {
            state.loading = 'pending';
        }).addCase(getCustomersThunk.fulfilled, (state: CustomersState, action: PayloadAction<any>) => {
            state.loading = 'succeeded';
            state.customers = action.payload;
        }).addCase(getCustomersThunk.rejected, (state: CustomersState, action: PayloadAction<any>) => {
            state.loading = 'failed';
        })
    },
})

export default customersSlice.reducer;

