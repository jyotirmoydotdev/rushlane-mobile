import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useFetchCategoriesQuery = () => {
    const queryClient = useQueryClient();
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    // Load data from AsyncStorage on component mount
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('categories');
                if (storedData) {
                    queryClient.setQueryData(['categories'], JSON.parse(storedData));
                }
                setInitialDataLoaded(true);
            } catch (error) {
                console.error('Error loading stored data:', error);
                setInitialDataLoaded(true);
            }
        };

        loadInitialData();
    }, [queryClient]);

    const query = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            if (!process.env.EXPO_PUBLIC_CONSUMERSECRET || !process.env.EXPO_PUBLIC_CONSUMERKEY) {
                throw new Error('Environment variables CONSUMER_SECRET and CONSUMER_KEY must be set');
            }

            const res = await axios.get(`https://www.rushlane.net/wp-json/wc/v3/products/categories`, {
                params: {
                    consumer_secret: process.env.EXPO_PUBLIC_CONSUMERSECRET,
                    consumer_key: process.env.EXPO_PUBLIC_CONSUMERKEY,
                    orderby: 'include',
                    include: [124, 111, 126, 129, 125, 121, 580],
                }
            });

            if (res.status !== 200) {
                throw new Error('Error: Failed to fetch categories');
            }

            // Filter out categories without images
            const categoriesWithImages = res.data.filter((category: any) =>
                category.image !== null && category.image !== undefined
            );

            // Store filtered data in AsyncStorage
            try {
                await AsyncStorage.setItem('categories', JSON.stringify(categoriesWithImages));
            } catch (error) {
                console.error('Error storing data:', error);
            }

            return categoriesWithImages;
        },
        enabled: initialDataLoaded, // Only run the query after we've checked AsyncStorage
    });

    return query;
};