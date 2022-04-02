import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:3001/api/";

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}


export class HttpClient {
    getApi = async <T = {}, U = {}>(url: string, body: U): Promise<AxiosResponse<T, any>> => {
        const result = await axios.get<T>(url, { params: body, headers: headers });
        return result;
    }

    postApi = async <T = {}, U = {}>(url: string, body: U): Promise<AxiosResponse<T, any>> => {
        const result = await axios.post<T>(url, { data: body, headers: headers });
        return result;
    }
}
