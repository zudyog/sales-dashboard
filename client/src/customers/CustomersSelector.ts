import { RootState } from "../redux/Store";


export const customersSelector = (state: RootState) => state.customers.customers;
