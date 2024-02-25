import axios from 'axios';
import { API, PRODUCTS } from '../config/constants';

const URL = `${API}/${PRODUCTS}`;

export const fetchProducts = async () => {
    try {
        const { data: d } = await axios.get(URL);

        const { data } = d;

        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const createProduct = async (product) => {
    try {
        const { data } = await axios.post(URL, product);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const editProduct = async (product) => {
    try {
        const { data } = await axios.patch(`${URL}/${product.id}`, product);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const { data: d } = await axios.delete(`${URL}/${productId}`);
        const { data } = d;
        return data;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const fetchProductsWithoutDescription = async () => {
    try {
        const { data: d } = await axios.get(`${URL}/no-description`);

        const { data } = d;

        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
