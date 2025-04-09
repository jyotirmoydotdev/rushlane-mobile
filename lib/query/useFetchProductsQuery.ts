import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export interface StoreProductsPageResponse {
    products: any[];
    pagination: {
        currentPage: number;
        perPage: number;
        nextPage: number | null;
        prevPage: number | null;
        hasNextPage: boolean;
    };
}


// All Products
export const useFetchProductsQuery = (
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

    const perPage = options?.per_page ?? 10;
    const search = options?.search ?? undefined;
    const category = options?.category ?? undefined;
    const orderby = options?.orderby ?? undefined;
    const order = options?.order ?? undefined;

    const baseCacheKey = `products_paged_${id}_${perPage}_${search || ''}_${category || ''}_${orderby || ''}_${order || ''}`;

    useEffect(() => {
        const load = async () => {
            try {
                const raw = await AsyncStorage.getItem(baseCacheKey);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    queryClient.setQueryData(['productsPaged', id, perPage, search, category, orderby, order], parsed);
                }
            } catch {
                /* ignore */
            } finally {
                setInitialDataLoaded(true);
            }
        };
        load();
    }, [baseCacheKey, id, perPage, search, category, orderby, order, queryClient]);

    const fetchPage = async ({ pageParam = 1 }) => {
        if (isNaN(Number(id))) {
            throw new Error('Invalid store ID');
        }

        const url = new URL(`/api/products`, window.location.origin);
        url.searchParams.append('page', pageParam.toString());
        url.searchParams.append('per_page', perPage.toString());
        if (search) url.searchParams.append('search', search);
        if (category) url.searchParams.append('category', category);
        if (orderby) url.searchParams.append('orderby', orderby);
        if (order) url.searchParams.append('order', order);

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
        queryKey: ['productsPaged', id, perPage, search, category, orderby, order],
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
}


// return useQuery({
//     queryKey: ['products'],
//     queryFn: async () => {
//         if (!process.env.EXPO_PUBLIC_CONSUMERSECRET || !process.env.EXPO_PUBLIC_CONSUMERKEY) {
//             throw new Error('Environment variables CONSUMER_SECRET and CONSUMER_KEY must be set')
//         }
//         const res = await axios.get(`https://www.rushlane.net/wp-json/wc/v3/products`, {
//             params: {
//                 consumer_secret: process.env.EXPO_PUBLIC_CONSUMERSECRET,
//                 consumer_key: process.env.EXPO_PUBLIC_CONSUMERKEY,
//             }
//         })
//         if (res.status !== 200) {
//             throw new Error('Error: Failed to fetch products')
//         }
//         const data = await res.data
//         return data
//     }
// })
// }