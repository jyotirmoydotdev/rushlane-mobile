import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { loadInitialData } from "../utils";
import { storeType } from "../type/storeType";


// Store Products
// export const useFetchStoreProductsQuery = (id: string) => {
//   const queryClient = useQueryClient();
//   const [initialDataLoaded, setInitialDataLoaded] = useState(false);
//   useEffect(() => {
//     loadInitialData(`storeProducts_${id}`, queryClient, setInitialDataLoaded);
//   }, [queryClient]);
  
//   return useQuery({
//     queryKey: ['storeProducts', id],
//     queryFn: async () => {
//       if (isNaN(Number(id))) {
//         return null;
//       }
//       const res = await fetch(`/api/stores/${id}/products`)
//       if (res.ok !== true) {
//         throw new Error('Error: Failed to fetch store products')
//       }
//       const data = await res.json()
      
//       try {
//         await AsyncStorage.setItem(`storeProducts_${id}`, JSON.stringify(data));
//       } catch (error) {
//         console.error('Error storing data:', error);
//       }
//       return data
//     },
//     enabled: initialDataLoaded && !!id,
//   })
// }


export interface StoreProductsPageResponse {
  products: storeType[];
  pagination: {
    currentPage: number;
    perPage: number;
    nextPage: number | null;
    prevPage: number | null;
    hasNextPage: boolean;
  };
}

export const useFetchStoreProductsQuery = (
  id: string,
  options?: {
    per_page?: number;
    search?: string;
    category?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
  }
) => {
  const queryClient = useQueryClient();
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // Build static query‑only params
  const perPage  = options?.per_page  ?? 10;
  const search   = options?.search    ?? undefined;
  const category = options?.category  ?? undefined;
  const orderby  = options?.orderby   ?? undefined;
  const order    = options?.order     ?? undefined;

  // Base cache key for AsyncStorage
  const baseCacheKey = `storeProducts_paged_${id}_${perPage}_${search || ''}_${category || ''}_${orderby || ''}_${order || ''}`;

  // Load initial data from cache before enabling queries
  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(baseCacheKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          queryClient.setQueryData(['storeProductsPaged', id, perPage, search, category, orderby, order], parsed);
        }
      } catch {
        /* ignore */
      } finally {
        setInitialDataLoaded(true);
      }
    };
    load();
  }, [baseCacheKey, id, perPage, search, category, orderby, order, queryClient]);

  // Fetcher: pageParam is the page number
  const fetchPage = async ({ pageParam = 1 }) => {

    if (isNaN(Number(id))) {
      throw new Error('Invalid store ID');
    }

    const url = new URL(`/api/stores/${id}/products`, window.location.origin);
    url.searchParams.append('page',     pageParam.toString());
    url.searchParams.append('per_page', perPage.toString());
    if (search)   url.searchParams.append('search',   search);
    if (category) url.searchParams.append('category', category);
    if (orderby)  url.searchParams.append('orderby',  orderby);
    if (order)    url.searchParams.append('order',    order);

    const res = await fetch(url.toString());
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to fetch store products');
    }
    return res.json();
  };

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...rest
  } = useInfiniteQuery<StoreProductsPageResponse>({
    queryKey: ['storeProductsPaged', id, perPage, search, category, orderby, order],
    queryFn:   fetchPage,
    initialPageParam: 1,
    keepPreviousData: true,
    getNextPageParam:   last => last.pagination.nextPage ?? undefined,
    getPreviousPageParam: first => first.pagination.prevPage ?? undefined,
    enabled: initialDataLoaded && !!id,
    staleTime: 60_000,
  });

  // Cache the full infinite data to AsyncStorage whenever it changes
  useEffect(() => {
    if (data) {
      AsyncStorage.setItem(baseCacheKey, JSON.stringify(data)).catch(() => {});
    }
  }, [data, baseCacheKey]);

  return {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage:        hasNextPage  ?? false,
    hasPreviousPage:    hasPreviousPage ?? false,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...rest,
  };
};


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
  return useQuery<storeType>({
    queryKey: ['store', id],
    queryFn: async () => {
      if (isNaN(Number(id))) {
        throw new Error('Invalid store ID')
      }

      const res = await fetch(`/api/stores/${id}`)

      if (res.ok !== true) {
        throw new Error('Error: Failed to fetch store')
      }

      const data: storeType = await res.json()
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

  const query = useQuery<storeType[]>({
    queryKey: ['stores'],
    queryFn: async () => {
      const res = await fetch(`/api/stores`);
      if (res.ok !== true) {
        throw new Error('Error: Failed to fetch stores');
      }
      const data:storeType[] = await res.json();
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