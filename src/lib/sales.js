import axios from 'axios';
import { API, SALES } from '../config/constants';

const URL = `${API}/${SALES}`;

export const fetchSales = async () => {
    try {
        const { data } = await axios.get(URL);

        return data.data;
    } catch (error) {
        console.log(error);
        return { ventas: [], estadosVentas: [], ventasTotales: [{ conteo: 0 }] };
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
