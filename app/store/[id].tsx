import { View, Text, ActivityIndicatorComponent, ActivityIndicatorBase, ActivityIndicator } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useFetchStoreQuery } from '@/api/product';
import { Image } from 'expo-image';

export default function StorePage() {
    const { id } = useLocalSearchParams();
    const fetchStore = useFetchStoreQuery(id as string);
    if (fetchStore.isLoading) {
        return <ActivityIndicator />
    }
    if (fetchStore.isError) {
        return <View><Text>Not Store Found</Text></View>
    }
    return (
        <View className='flex-col gap-3 w-full '>
            {/* <Image
                source={{
                    uri: fetchStore.data?.wcfmm.vendor_banner
                }}
                className=" bg-gray-200 rounded-t-3xl "
                alt="image"
                style={{
                    width: "100%",
                    height: 180,
                    backgroundColor: `#c1c1c1`,
                    objectFit: "contain",
                }}
            />
            <View className='px-2 flex-col gap-2'>
                <Text className=' text-3xl font-bold'>{fetchStore.data?.wcfmm.vendor_display_name}</Text>
                <Text className=' text-base'>{fetchStore.data?.wcfmm.vendor_address}</Text>
                <Text className='text-center text-lg font-bold'>Rating: {fetchStore.data?.wcfmm.store_rating}</Text>
                <Text className='text-center text-lg font-bold'>Logo: {fetchStore.data?.wcfmm.vendor_shop_logo}</Text>
                <Text className='text-center text-lg font-bold'>Banner: {fetchStore.data?.wcfmm.vendor_banner}</Text>
                <Text>{fetchStore.data?.wc.meta_data
                    ?.find((item:any) => item.key === "wcfm_vendor_store_hours")
                    ?.value?.day_times?.[0]?.[0]?.start || "Not Available"}
                </Text>
            </View> */}

            
        </View>
    );
}