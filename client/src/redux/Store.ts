import { configureStore } from '@reduxjs/toolkit';
import customersReducer from "../customers/CustomersSlice";
export const store = configureStore({
    reducer: {
        customers: customersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

