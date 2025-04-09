import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Animated, Dimensions, AppState, SafeAreaView, Text, ActivityIndicator, FlatList } from 'react-native';
import { PlaceholdersAndVanishInput2 } from '@/components/PlaceHolderAndVanish';
import { router, Stack } from 'expo-router';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react-native';
import { useFetchProductsQuery } from '@/lib/query/useFetchProductsQuery';
import { Icon } from '@/components/ui/icon';
import { useInfiniteQuery } from '@tanstack/react-query';
import ProductCard from '@/components/ProductCard';
import { ProductType } from '@/lib/type/productType';

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState('');
  const fetchProductsfunc = async ({
    pageParam = 1
  }): Promise<{
    storeProducts: any[];
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
    perPage: number;
    hasNextPage: boolean;
  }> => {
    const perPage = 10;
    const url = new URL(`/api/products`, window.location.origin);
    url.searchParams.append('page', pageParam.toString());
    url.searchParams.append('per_page', perPage.toString());
    if (searchQuery) url.searchParams.append('search', searchQuery);

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await res.json();

    return {
      storeProducts: data.products || [],
      currentPage: data.pagination.currentPage,
      perPage: data.pagination.perPage,
      nextPage: data.pagination.nextPage,
      prevPage: data.pagination.prevPage,
      hasNextPage: data.pagination.hasNextPage,
    };
  };
  const fetchProducts = useInfiniteQuery({
    queryKey: ['storeProducts', searchQuery],
    queryFn: fetchProductsfunc,
    // initial page = 1
    initialPageParam: 1,
    getNextPageParam: last => last.nextPage ?? undefined,
    getPreviousPageParam: first => first.prevPage ?? undefined,
  });


  // Handle search submission
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const loadMoreProducts = () => {
    if (fetchProducts.hasNextPage && !fetchProducts.isFetchingNextPage) {
      fetchProducts.fetchNextPage();
    }
  };

  // Combine all pages of products into a single array
  const allProducts: ProductType[] = fetchProducts.data?.pages.flatMap(page => page.storeProducts) || [];

  return (
    <View>
      <Stack.Screen
        options={{
          header: () => {
            return (
              <SafeAreaView className='w-full'>
                <View className='flex-row'>
                  <Button onPress={() => router.back()}>
                    <ButtonIcon as={ArrowLeft}></ButtonIcon>
                  </Button>
                  <PlaceholdersAndVanishInput2
                    placeholders={['Search for Pizza', 'Find something', 'Type here...']}
                    onChange={handleSearch}
                    onSubmit={() => console.log('Submitted')}
                  />
                </View>
              </SafeAreaView>
            )
          },
          headerBackButtonMenuEnabled: false,
        }}>
      </Stack.Screen>
      <FlatList
      className='h-[50rem]'
        data={allProducts}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreProducts}
        keyboardDismissMode='on-drag'
        ListEmptyComponent={() => (
          fetchProducts.isLoading || fetchProducts.isRefetching ? (
            <View className="flex items-center justify-center py-10">
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (<View className="flex items-center justify-center py-10">
            <Icon as={Search} className="text-gray-300 size-10" />
            <Text className="text-center mt-2 text-gray-500">No products found</Text>
          </View>)
        )}
        ListFooterComponent={() => (
          fetchProducts.isFetchingNextPage ? (
              <View className="py-4">
                  <ActivityIndicator size="small" color="#0000ff" />
              </View>
          ) : fetchProducts.hasNextPage  ? (
              <Button className="mx-4 my-2" onPress={loadMoreProducts}>
                  <ButtonText>Load More</ButtonText>
              </Button>
          ) : allProducts.length > 0 ? (
              <Text className="text-center py-4 text-gray-500">No more products</Text>
          ) : null
      )}
        renderItem={({ item }) => (
          <ProductCard
          id={item.id}
          name={item.name}
          price={item.price}
          regular_price={item.regular_price}
          sale_price={item.sale_price}
          imageUrl={item.images[0].src}
          stock_status={"yes"}
          />
        )}
      />
    </View>
  );
}
