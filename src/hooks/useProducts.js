import { useCallback, useEffect, useState } from 'react';

import { fetchProducts, fetchProductsWithoutDescription } from '../lib/products';

const useProducts = () => {
    const [loading, setLoading] = useState(false);
    const [savedProducts, setSavedProducts] = useState([]);
    const [products, setProducts] = useState([]);

    const refetch = useCallback(async () => {
        setLoading(true);
        const response = await fetchProducts();
        setProducts(response);
        setSavedProducts(response);
        setLoading(false);
    }, []);

    const refetchNoDesc = useCallback(async () => {
        setLoading(true);
        const response = await fetchProductsWithoutDescription();
        setProducts(response);
        setSavedProducts(response);
        setLoading(false);
    }, []);

    const onSearch = (value) => {
        if (!value) return setProducts(savedProducts);

        const filteredProducts = savedProducts.filter((product) => {
            return product.nombre.toLowerCase().includes(value) || product.descripcion.toLowerCase().includes(value);
        });
        setProducts(filteredProducts);
    };

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { loading, products, refetch, refetchNoDesc, setLoading, onSearch };
};

export default useProducts;
