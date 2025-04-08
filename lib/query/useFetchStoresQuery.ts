import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useFetchStoreQuery = (id: String) => {
    return useQuery({
        queryKey: ['store', id],
        queryFn: async () => {
            if (!process.env.EXPO_PUBLIC_CONSUMERSECRET || !process.env.EXPO_PUBLIC_CONSUMERKEY) {
                throw new Error('Environment variables CONSUMER_SECRET and CONSUMER_KEY must be set')
            }
            if (isNaN(Number(id))) {
                return {
                    storeDetails: null,
                    storeProducts: null
                };
            }
            const storeResponse = await axios.get(`https://www.rushlane.net/wp-json/wcfmmp/v1/store-vendors/${id}`)
            const productResponse = await axios.get(`https://rushlane.net/wp-json/wcfmmp/v1/store-vendors/${id}/products`)
            if (storeResponse.status !== 200 || productResponse.status !== 200) {
                throw new Error('Error: Failed to fetch products')
            }
            const storeData = await storeResponse.data
            const ProductData = await productResponse.data
            return {
                storeDetails: storeData,
                storeProducts: ProductData
            }
        },
        enabled: !!id,
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
            exclude: 110,
          }
        });
        
        if (res.status !== 200) {
          throw new Error('Error: Failed to fetch stores');
        }
        
        // Store data in AsyncStorage after successful fetch
      try {
        const filteredData = res.data.filter((store: any) => store.vendor_id !== 311);
        await AsyncStorage.setItem('stores', JSON.stringify(filteredData));
      } catch (error) {
          console.error('Error storing data:', error);
        }
        
        return res.data;
      },
      enabled: initialDataLoaded, 
    });
    
    return query;
  };