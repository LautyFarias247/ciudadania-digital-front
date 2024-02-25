import axios from 'axios';
import { API, CLIENTS } from '../config/constants';

const URL = `${API}/${CLIENTS}`;

export const fetchClients = async () => {
    try {
        const { data: d } = await axios.get(URL);

        const { data } = d;

        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const createClient = async (client) => {
    try {
        const { data } = await axios.post(URL, client);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const editClient = async (client) => {
    try {
        const { data } = await axios.patch(`${URL}/${client.id}`, client);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteClient = async (clientId) => {
    try {
        const { data: d } = await axios.delete(`${URL}/${clientId}`);
        const { data } = d;
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
