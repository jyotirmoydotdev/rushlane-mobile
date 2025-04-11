import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { loadInitialData } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";


export interface CategoriesPageResponse {
    categories: any[];
    pagination: {
        currentPage: number;
        perPage: number;
        nextPage: number | null;
        prevPage: number | null;
        hasNextPage: boolean;
    };
}

export const useFetchAllCategoriesQuery = (
    options?: {
        per_page?: number;
        search?: string;
        orderby?: string;
        order?: 'asc' | 'desc';
    }
) => {
    const queryClient = useQueryClient();
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    const perPage = options?.per_page ?? 10;
    const search = options?.search ?? undefined;
    const orderby = options?.orderby ?? undefined;
    const order = options?.order ?? undefined;

    const baseCacheKey = `categories_paged_$_${perPage}_${search || ''}_${orderby || ''}_${order || ''}`;

    useEffect(() => {
        const load = async () => {
            try {
                const raw = await AsyncStorage.getItem(baseCacheKey);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    queryClient.setQueryData(['categoriesPaged', perPage, search, order, orderby], parsed);
                }
            } catch (error) {

            } finally {
                setInitialDataLoaded(true)
            }
        }
        load()
    }, [baseCacheKey, perPage, search, orderby, order, queryClient])

    const fetchPage = async ({ pageParan = 1 }) => {
        const url = new URL(`/api/categories`, window.location.origin);
        url.searchParams.append('page', pageParan.toString());
        url.searchParams.append('per_page', perPage.toString());
        if (search) url.searchParams.append('search', search);
        if (orderby) url.searchParams.append('orderby', orderby);
        if (order) url.searchParams.append('order', order);

        const res = await fetch(url.toString());
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Falied to fetch store categories');
        }
        return res.json();
    }

    const {
        data,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
        ...rest
    } = useInfiniteQuery<CategoriesPageResponse>({
        queryKey: ['categoriesPaged', perPage, search, orderby, order],
        queryFn: fetchPage,
        initialPageParam: 1,
        keepPreviousData: true,
        getNextPageParam: last => last.pagination.nextPage ?? undefined,
        getPreviousPageParam: first => first.pagination.prevPage ?? undefined,
        enabled: initialDataLoaded,
        staleTime: 60_000,
    })

    useEffect(() => {
        if (data) {
            AsyncStorage.setItem(baseCacheKey, JSON.stringify(data)).catch(() => { });
        }
    }, [data, baseCacheKey]);

    return {
        data,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage: hasNextPage ?? false,
        hasPreviousPage: hasPreviousPage ?? false,
        isFetchingNextPage,
        isFetchingPreviousPage,
        ...rest,
    };
}



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