import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import { useFetchStoreQuery } from '@/lib/query/useFetchStoresQuery';
import { Image } from 'expo-image';
import { Icon } from '@/components/ui/icon';
import { Search, Star } from 'lucide-react-native';
import { FlatList } from 'react-native';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { useCart } from '@/lib/state/cartState';
import ViewEmail from '@/components/ViewEmail';
import { Link } from 'expo-router';
import { Switch } from '@/components/ui/switch';
import { useVegStatus } from '@/lib/state/filterState';
import he from 'he';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { storeType } from '@/lib/type/storeType';

export default function StorePage() {
    const { id } = useLocalSearchParams();
    const fetchStore = useFetchStoreQuery(id as string);
    const [searchQuery, setSearchQuery] = useState('');

    const addProduct = useCart((state: any) => state.addProduct);
    const cartItems = useCart((state: any) => state.items);
    const setVegStatus = useVegStatus((state: any) => state.setVegStatus);
    const getVegStatus: boolean = useVegStatus((state: any) => state.isVeg);

    // Function to fetch products page by page
    const fetchStoreProducts = async ({
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
        const url = new URL(`/api/stores/${id}/products`, window.location.origin);
        url.searchParams.append('page',     pageParam.toString());
        url.searchParams.append('per_page', perPage.toString());
        if (getVegStatus)    url.searchParams.append('veg',   'true');
        if (searchQuery)     url.searchParams.append('search', searchQuery);
      
        const res = await fetch(url.toString());
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
      
        // Assuming your endpoint returns:
        // {
        //   products: [...],
        //   pagination: { currentPage, perPage, nextPage, prevPage, hasNextPage }
        // }
        return {
          storeProducts: data.products || [],
          currentPage:   data.pagination.currentPage,
          perPage:       data.pagination.perPage,
          nextPage:      data.pagination.nextPage,
          prevPage:      data.pagination.prevPage,
          hasNextPage:   data.pagination.hasNextPage,
        };
      };
      
    // Use infinite query hook
    const {
        data,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
        isLoading,
        isRefetching,
        isError,
        error,
        refetch
      } = useInfiniteQuery({
        queryKey: ['storeProducts', id, getVegStatus, searchQuery],
        queryFn:  fetchStoreProducts,
        // initial page = 1
        initialPageParam: 1,
        getNextPageParam:   last => last.nextPage ?? undefined,
        getPreviousPageParam: first => first.prevPage ?? undefined,
        // refetch when veg or search changes
        enabled: !!id,
      });
      

    // Handle search submission
    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };

    // Combine all pages of products into a single array
    const allProducts = data?.pages.flatMap(page => page.storeProducts) || [];

    // Function to handle adding products to cart
    const addToCart = (product: any) => {
        if (cartItems.length === 0) {
            addProduct(product);
            return;
        }
        
        for (const item of cartItems) {
            if (item.id === product.id) {
                return;
            }
            if (item.product.post_author !== product.post_author) {
                alert('You can only add products from the same store.');
                return;
            }
        }
        addProduct(product);
    };

    // Handle loading more products when reaching end of list
    const loadMoreProducts = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    // Render loading state
    if (fetchStore.isLoading) { // || isLoading && !data
        return <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" /></View>;
    }

    // Render error state
    if (fetchStore.isError || isError) {
        return (
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-red-500 text-center">{fetchStore.isError ? fetchStore.error.message : (error instanceof Error ? error.message : 'An error occurred')}</Text>
                <Button onPress={() => refetch()} className="mt-4">
                    <ButtonText>Try Again</ButtonText>
                </Button>
            </View>
        );
    }

    return (
        <View className='flex-1'>
            <View className='flex-col gap-3 w-full p-2'>
                <View className=' bg-gray-50 p-4 mx-2 rounded-2xl shadow-sm'>
                    <View className='flex-row gap-4 items-center'>
                        <Image
                            source={{
                                uri: fetchStore.data?.logoUrl
                            }}
                            className=" bg-gray-200 "
                            alt="image"
                            style={{
                                width: 112,
                                height: 112,
                                backgroundColor: `#c1c1c1`,
                                objectFit: "cover",
                                borderRadius: 999,
                                borderColor: '#c1c1c1',
                            }}
                        />
                        <View className='flex-col gap-1'>
                            <Text className=' text-3xl w-[14rem] font-bold'>{he.decode(fetchStore.data?.name ?? "")}</Text>
                            <Text className=' line-clamp-2 w-[12rem] text-base'>{he.decode(fetchStore.data?.address ?? "")}</Text>
                            <View className='flex-row gap-2'>
                                <View className=' w-[4rem] flex-row gap-2 px-2 py-1 rounded-md bg-green-600 items-center justify-center'>
                                    <Icon as={Star} className=' stroke-white' />
                                    <Text className=' text-lg text-white'>{fetchStore.data?.rating}</Text>
                                </View>
                                {
                                    (fetchStore.data?.email) && <Link href='/modal'>Email</Link>
                                }
                            </View>
                        </View>
                    </View>
                </View>
                <View className='flex-col'>
                    <Input>
                        <InputField 
                            placeholder='Search product' 
                            value={searchQuery}
                            onChangeText={handleSearch}
                            returnKeyType="search"
                        />
                    </Input>
                    <View className='flex-row gap-2 mt-2'>
                        <View className='flex-row gap-2 items-center justify-center rounded-2xl border-2 h-16 border-gray-300 px-3'>
                            <Text className='text-black italic text-base font-bold'>VEG</Text>
                            <Switch
                                value={getVegStatus}
                                onValueChange={setVegStatus}
                                size='sm'
                            />
                        </View>
                        <Button variant='outline' size='sm' className='rounded-lg'>
                            <ButtonText>
                                Rating 4.0+
                            </ButtonText>
                        </Button>
                    </View>
                </View>
                <View className="h-[30rem]">
                    <FlatList
                        data={allProducts}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ padding: 8 }}
                        onEndReached={loadMoreProducts}
                        onEndReachedThreshold={0.3}
                        keyboardDismissMode='on-drag'
                        ListFooterComponent={() => (
                            isFetchingNextPage ? (
                                <View className="py-4">
                                    <ActivityIndicator size="small" color="#0000ff" />
                                </View>
                            ) : hasNextPage  ? (
                                <Button className="mx-4 my-2" onPress={loadMoreProducts}>
                                    <ButtonText>Load More</ButtonText>
                                </Button>
                            ) : allProducts.length > 0 ? (
                                <Text className="text-center py-4 text-gray-500">No more products</Text>
                            ) : null
                        )}
                        ListEmptyComponent={() => (
                            isLoading || isRefetching ?(
                                <View className="flex items-center justify-center py-10">
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>
                            ):(<View className="flex items-center justify-center py-10">
                                <Icon as={Search}  className="text-gray-300 size-10" />
                                <Text className="text-center mt-2 text-gray-500">No products found</Text>
                            </View>)
                        )}
                        renderItem={({ item }) => (
                            <View className="bg-white rounded shadow p-3 mb-3">
                                <Image
                                    source={{ uri: item.images?.[0]?.src || '' }}
                                    style={{ width: '100%', height: 150, borderRadius: 8 }}
                                />
                                <Text className="text-lg font-bold mt-2">{item.name}</Text>
                                <Text className="text-gray-500">₹{item.price}</Text>
                                <Text className="text-sm text-gray-600 mt-1">{item.description?.replace(/<[^>]+>/g, '')}</Text>
                                <Button className="mt-3 bg-blue-600" onPress={() => addToCart(item)}>
                                    <ButtonText>
                                        Add to Cart
                                    </ButtonText>
                                </Button>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    );
}