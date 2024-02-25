import axios from 'axios';
import { API, SALES } from '../config/constants';

const URL = `${API}/${SALES}`;

export const fetchSales = async () => {
    try {
        const response = await axios.get(URL);
        console.log('TRY');
        console.log(response);
        return response.data;
    } catch (error) {
        console.log('CATCH');
        const response = { ventas: [], estadosVentas: [], ventasTotales: [{ conteo: 0 }] };
        return response;
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
