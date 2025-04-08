import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { loadInitialData } from "../utils";


// Store Products
export const useFetchStoreProductsQuery = (id: string) => {
  const queryClient = useQueryClient();
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  useEffect(() => {
    loadInitialData(`storeProducts_${id}`, queryClient, setInitialDataLoaded);
  }, [queryClient]);
  
  return useQuery({
    queryKey: ['storeProducts', id],
    queryFn: async () => {
      if (isNaN(Number(id))) {
        return null;
      }
      const res = await fetch(`/api/stores/${id}/products`)
      if (res.ok !== true) {
        throw new Error('Error: Failed to fetch store products')
      }
      const data = await res.json()
      
      try {
        await AsyncStorage.setItem(`storeProducts_${id}`, JSON.stringify(data));
      } catch (error) {
        console.error('Error storing data:', error);
      }
      return data
    },
    enabled: initialDataLoaded && !!id,
  })
}

// Store Details
export const useFetchStoreQuery = (id: String) => {
  const queryClient = useQueryClient();
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  useEffect(() => {
    if (isNaN(Number(id))) {
      throw new Error('Invalid store ID')
    }
    loadInitialData(`store_${id}`, queryClient, setInitialDataLoaded);
  }, [queryClient]);
  return useQuery({
    queryKey: ['store', id],
    queryFn: async () => {
      if (isNaN(Number(id))) {
        throw new Error('Invalid store ID')
      }

      const res = await fetch(`/api/stores/${id}`)

      if (res.ok !== true) {
        throw new Error('Error: Failed to fetch store')
      }

      const data = await res.json()
      try {
          await AsyncStorage.setItem(`store_${id}`, JSON.stringify(data));
      } catch (error) {
        console.error('Error storing data:', error);
      }
      return data
    },
    enabled: initialDataLoaded && !!id,
  })
}

// All Stores
export const useFetchStoresQuery = () => {
  const queryClient = useQueryClient();
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  useEffect(() => {
    loadInitialData('stores', queryClient, setInitialDataLoaded);
  }, [queryClient]);

  const query = useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const res = await fetch(`/api/stores`);
      if (res.ok !== true) {
        throw new Error('Error: Failed to fetch stores');
      }
      const data = await res.json();
      try {
        await AsyncStorage.setItem('stores', JSON.stringify(data));
      } catch (error) {
        console.error('Error storing data:', error);
      }
      return data;
    },
    enabled: initialDataLoaded,
  });

  return query;
};