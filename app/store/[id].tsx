import { View, Text, ActivityIndicatorComponent, ActivityIndicatorBase, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import { useFetchStoreProductsQuery, useFetchStoreQuery } from '@/lib/query/useFetchStoresQuery';
import { Image } from 'expo-image';
import { Icon } from '@/components/ui/icon';
import { Star } from 'lucide-react-native';
import { FlatList } from 'react-native';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { useCart } from '@/lib/state/cartState';
import ViewEmail from '@/components/ViewEmail';
import { Link } from 'expo-router';
import { Switch } from '@/components/ui/switch';
import { useVegStatus } from '@/lib/state/filterState';

export default function StorePage() {
    const { id } = useLocalSearchParams();
    const fetchStore = useFetchStoreQuery(id as string);
    const fetchStoreProducts = useFetchStoreProductsQuery(id as string);

    const addProduct = useCart((state: any) => state.addProduct);
    const cartItems = useCart((state: any) => state.items);
    const setVegStatus = useVegStatus((state: any) => state.setVegStatus);
    const getVegStatus:boolean = useVegStatus((state: any) => state.isVeg);

    const addToCart = (index: number) => {
        if (cartItems.length === 0) {
            addProduct(fetchStore.data?.storeProducts[index]);
            return;
        }
        for (const item of cartItems) {
            if (item.id === fetchStore.data?.storeProducts[index].id) {
                return;
            }
            if (item.product.post_author !== fetchStore.data?.storeProducts[index].post_author) {
                alert('You can only add products from the same store.');
                return;
            }
        }
        addProduct(fetchStore.data?.storeProducts[index]);
    }
    if (fetchStore.isLoading) {
        return <ActivityIndicator />
    }
    if (fetchStore.isError) {
        return <View><Text>{fetchStore.error.message}</Text></View>
    }
    return (
        <View className='flex-col gap-3 w-full p-2'>
            <View className=' bg-gray-50 p-4 mx-2 rounded-2xl shadow-sm'>
                <View className='flex-row gap-4 items-center'>
                    <Image
                        source={{
                            uri: fetchStore.data?.vendor_shop_logo
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
                        <Text className=' text-3xl font-bold'>{fetchStore.data?.vendor_display_name}</Text>
                        <Text className=' line-clamp-2 w-[12rem] text-base'>{fetchStore.data?.vendor_address}</Text>
                        <View className='flex-row gap-2'>
                            <View className=' w-[4rem] flex-row gap-2 px-2 py-1 rounded-md bg-green-600 items-center justify-center'>
                                <Icon as={Star} className=' stroke-white' />
                                <Text className=' text-lg text-white'>{fetchStore.data?.store_rating}</Text>
                            </View>
                            {
                                (fetchStore.data?.store_hide_email === "yes") && <Link href='/modal'>Email</Link>
                            }
                        </View>
                    </View>
                </View>
            </View>
            <View className='flex-col'>
                <Input>
                    <InputField placeholder='Search product' />
                </Input>
                <View className='flex-row gap-2'>
                    <View className='flex-row gap-2 items-center justify-center rounded-2xl border-2 h-16 border-gray-300 '>
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
            <View className="flex-col gap-2">
                <FlatList
                    data={fetchStoreProducts.data}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 8 }}
                    renderItem={({ item, index }) => (
                        <View className="bg-white rounded shadow p-3 mb-3">
                            <Image
                                source={{ uri: item.images?.[0]?.src || '' }}
                                style={{ width: '100%', height: 150, borderRadius: 8 }}
                            />
                            <Text className="text-lg font-bold mt-2">{item.name}</Text>
                            <Text className="text-gray-500">₹{item.price}</Text>
                            <Text className="text-sm text-gray-600 mt-1">{item.description?.replace(/<[^>]+>/g, '')}</Text>
                            <Button className="mt-3 bg-blue-600" onPress={() => addToCart(index)}>
                                <ButtonText>
                                    Add to Cart
                                </ButtonText>
                            </Button>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}