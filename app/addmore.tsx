import { View, Text } from 'react-native'
import React from 'react'
import { useCart } from '@/lib/state/cartState';
import ProductCard from '@/components/ProductCard';

export default function AddMorePage() {
const cartItems = useCart((state: any) => state.items);
const lastItem = () => cartItems.length - 1;
  return (
    <View className='px-4'>
        <Text className='text-2xl font-bold mb-2'>Product Added</Text>
        <ProductCard
            item={cartItems[lastItem()].product}
            setSelectedItem={() => {}}
            setModalVisible={() => {}}
        />
        <Text className='text-lg font-semibold'>Add more product from this resturant</Text>
    </View>
  )
}