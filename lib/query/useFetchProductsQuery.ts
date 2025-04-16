import { useInfiniteQuery } from "@tanstack/react-query";
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

export const useFetchProductsQuery = (
  options?: {
    perPage?: number;
    searchQuery?: string;
    selectedCategory?: number;
  }
) => {
  const queryClient = useQueryClient();
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  const perPage = options?.perPage ?? 10;
  const searchQuery = options?.searchQuery ?? undefined;
  const selectedCategory = options?.selectedCategory ?? 0;

  const baseCacheKey = `storeProducts_${searchQuery || ''}_${selectedCategory || 0}_${perPage}`;

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(baseCacheKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          queryClient.setQueryData(['storeProducts', searchQuery, selectedCategory, perPage], parsed);
        }
      } catch {
        /* ignore */
      } finally {
        setInitialDataLoaded(true);
      }
    };
    load();
  }, [baseCacheKey, perPage, searchQuery, selectedCategory, queryClient]);

  const fetchProductsFunc = async ({ pageParam = 1 }): Promise<StoreProductsPageResponse> => {
    const url = new URL(`/api/products`, window.location.origin);
    url.searchParams.append('page', pageParam.toString());
    url.searchParams.append('per_page', perPage.toString());
    if (selectedCategory !== 0) {
      url.searchParams.append('category', String(selectedCategory));
    }
    if (searchQuery) url.searchParams.append('search', searchQuery);

    const res = await fetch(url.toString());
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to fetch products' }));
      throw new Error(err.message || 'Failed to fetch products');
    }
    const data = await res.json();

    return {
      products: data.products || [],
      pagination: {
        currentPage: data.pagination.currentPage,
        perPage: data.pagination.perPage,
        nextPage: data.pagination.nextPage,
        prevPage: data.pagination.prevPage,
        hasNextPage: data.pagination.hasNextPage,
      }
    };
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
    queryKey: ['storeProducts', searchQuery, selectedCategory, perPage],
    queryFn: fetchProductsFunc,
    initialPageParam: 1,
    keepPreviousData: true,
    getNextPageParam: last => last.pagination.nextPage ?? undefined,
    getPreviousPageParam: first => first.pagination.prevPage ?? undefined,
    enabled: initialDataLoaded,
    staleTime: 60_000,
  });

  // Cache the full infinite data to AsyncStorage whenever it changes
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
};