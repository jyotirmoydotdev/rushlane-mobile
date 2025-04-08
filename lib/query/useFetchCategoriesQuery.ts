import { useQuery } from "@tanstack/react-query"
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { loadInitialData } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";


// Top Categories
export const useFetchCategoriesQuery = () => {
    const queryClient = useQueryClient();
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    useEffect(() => {
        loadInitialData('categories', queryClient, setInitialDataLoaded);
    }, [queryClient]);

    const query = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`/api/categories`);
            if (res.ok !== true) {
                throw new Error('Error: Failed to fetch categories');
            }
            const data = await res.json();
            try {
                await AsyncStorage.setItem('categories', JSON.stringify(data));
            } catch (error) {
                console.error('Error storing data:', error);
            }
            return data;
        },
        enabled: initialDataLoaded,
    });

    return query;
};