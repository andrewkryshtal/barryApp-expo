import ApiServiceImpl from './apiService';
import {AxiosHttpClient} from './clients/axiosHttpClient';
import {HttpClient} from './httpInstance';

// FIXED: showed here exactly what is going on with types.
// i could use some fabric method to create http client, but i think it's not necessary
// because we have only one http client for now and no variables to pass to it
const axiosHttpClient: HttpClient = new AxiosHttpClient();

// here we can use any other http client like fetchHttpClient
export const apiService = new ApiServiceImpl(axiosHttpClient);
