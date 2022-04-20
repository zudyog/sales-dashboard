import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpClient } from "../utilities/HttpClient";
import { CustomersRequestType, CustomersType } from "./Customers";
import { CustomersConstant } from "./CustomersConstant";

const httpClient = new HttpClient();

export const getCustomersThunk = createAsyncThunk('customers/getAll', async (bodyParams: CustomersRequestType, thunkApi) => {
    try {
        const result = await httpClient.getApi<Array<CustomersType>, CustomersRequestType>(CustomersConstant.CUSTOMERS, bodyParams);
        return result.data as Array<CustomersType>;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const addCustomerThunk = createAsyncThunk('customers/add', async (bodyParams: CustomersType, thunkApi) => {
    try {
        const result = await httpClient.postApi<Array<CustomersType>, CustomersType>(CustomersConstant.CUSTOMERS, bodyParams);
        return result.data as Array<CustomersType>;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});
