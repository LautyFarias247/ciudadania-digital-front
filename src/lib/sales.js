import axios from 'axios';
import { API, SALES } from '../config/constants';

const URL = `${API}/${SALES}`;

export const fetchSales = async () => {
    try {
        const response = await axios.get(URL);
        return response.data.data;
    } catch (error) {
        const response = { ventas: [], estadosVentas: [], ventasTotales: [{ conteo: 0 }] };
        return response;
    }
};

export const fetchClientSales = async (email, monto) => {
    try {
        const response = await axios.get(`${URL}/${email}/${monto}`);
        return response.data.data;
    } catch (error) {
        return [];
    }
};

export const createSale = async (sale) => {
    try {
        const { data } = await axios.post(URL, sale);

        return data.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
