import { useCallback, useEffect, useState } from 'react';
import { fetchSales } from '../lib/sales';

const useSales = () => {
    const [loading, setLoading] = useState(false);

    const [sales, setSales] = useState([]);
    const [status, setStatus] = useState([]);
    const [totalSales, setTotalSales] = useState(0);

    const refetch = useCallback(async () => {
        setLoading(true);
        const response = await fetchSales();
        console.log(response);
        setSales(response.ventas);
        setStatus(response.estadosVentas);
        setTotalSales(response.ventasTotales[0].conteo);
        setLoading(false);
    }, []);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { loading, sales, status, totalSales, refetch, setLoading };
};

export default useSales;
