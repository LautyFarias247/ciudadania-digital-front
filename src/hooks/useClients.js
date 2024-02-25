import { useCallback, useEffect, useState } from 'react';

import { fetchClients } from '../lib/clients';

const useClients = () => {
    const [loading, setLoading] = useState(false);
    const [savedClients, setSavedClients] = useState([]);
    const [clients, setClients] = useState([]);

    const refetch = useCallback(async () => {
        setLoading(true);
        const response = await fetchClients();
        setClients(response);
        setSavedClients(response);
        setLoading(false);
    }, []);

    const onSearch = (value) => {
        if (!value) return setClients(savedClients);

        const filteredClients = savedClients.filter(
            (client) => client.name.toLowerCase().includes(value) || client.email.toLowerCase().includes(value)
        );
        setClients(filteredClients);
    };

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { loading, clients, refetch, setLoading, onSearch };
};

export default useClients;
