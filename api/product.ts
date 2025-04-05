import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useFetchProductsQuery = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            if (!process.env.EXPO_PUBLIC_CONSUMERSECRET || !process.env.EXPO_PUBLIC_CONSUMERKEY) {
                throw new Error('Environment variables CONSUMER_SECRET and CONSUMER_KEY must be set')
            }
            const res = await axios.get(`https://www.rushlane.net/wp-json/wc/v3/products`, {
                params: {
                    consumer_secret: process.env.EXPO_PUBLIC_CONSUMERSECRET,
                    consumer_key: process.env.EXPO_PUBLIC_CONSUMERKEY,
                }
            })
            if (res.status !== 200) {
                throw new Error('Error: Failed to fetch products')
            }
            const data = await res.data
            return data
        }
    })
}

export const useFetchStoresQuery = () => {
  const queryClient = useQueryClient();
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  
  // Load data from AsyncStorage on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('stores');
        if (storedData) {
          queryClient.setQueryData(['stores'], JSON.parse(storedData));
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
    queryKey: ['stores'],
    queryFn: async () => {
      if (!process.env.EXPO_PUBLIC_CONSUMERSECRET || !process.env.EXPO_PUBLIC_CONSUMERKEY) {
        throw new Error('Environment variables CONSUMER_SECRET and CONSUMER_KEY must be set');
      }
      
      const res = await axios.get(`https://www.rushlane.net/wp-json/wcfmmp/v1/store-vendors`, {
        params: {
          per_page: 40,
        }
      });
      
      if (res.status !== 200) {
        throw new Error('Error: Failed to fetch stores');
      }
      
      // Store data in AsyncStorage after successful fetch
      try {
        await AsyncStorage.setItem('stores', JSON.stringify(res.data));
      } catch (error) {
        console.error('Error storing data:', error);
      }
      
      return res.data;
    },
    enabled: initialDataLoaded, 
  });
  
  return query;
};

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
          page: 1,
          per_page: 100,
          hide_empty: true,
          context: 'view',
          exclude: [110],
          orderby: 'count',
        }
      });
      
      if (res.status !== 200) {
        throw new Error('Error: Failed to fetch categories');
      }
      
      // Filter out categories without images
      const categoriesWithImages = res.data.filter(category => 
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