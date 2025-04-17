import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { loadInitialData } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CategoriesType } from "../type/categoriesType";


export interface CategoriesPageResponse {
    categories: CategoriesType[];
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
        PerPage?: number;
        searchQuery?: string;
        orderby?: string;
        order?: 'asc' | 'desc';
    }
) => {
    const queryClient = useQueryClient();
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    const perPage = options?.PerPage ?? 24;
    const search = options?.searchQuery ?? undefined;
    const orderby = options?.orderby ?? undefined;
    const order = options?.order ?? undefined;

    const baseCacheKey = `allCategories_paged_$_${perPage}_${search || ''}_${orderby || ''}_${order || ''}`;

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

    const fetchPage = async ({ pageParam = 1 }):Promise<CategoriesPageResponse> => {
        const url = new URL(`/api/allcategories`, window.location.origin);
        url.searchParams.append('page', pageParam.toString());
        url.searchParams.append('per_page', perPage.toString());
        if (search) url.searchParams.append('search', search);
        if (orderby) url.searchParams.append('orderby', orderby);
        if (order) url.searchParams.append('order', order);

        const res = await fetch(url.toString());
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Falied to fetch store categories');
        }
        const data = await res.json();

        return {
            categories: data.categories || [],
            pagination: {
                currentPage: data.pagination.currentPage,
                perPage: data.pagination.perPage,
                nextPage: data.pagination.nextPage,
                prevPage: data.pagination.prevPage,
                hasNextPage: data.pagination.hasNextPage,
            }
        }
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
        // @ts-ignore-next-line
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