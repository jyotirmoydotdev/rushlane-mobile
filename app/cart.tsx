import { View, FlatList } from 'react-native'
import React from 'react'
import { useCart } from '@/lib/state/cartState';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
// import { useMutation } from '@tanstack/react-query';
// import { createOrder } from '@/api/orders';

export default function cart() {
  const item = useCart((state: any) => state.items);
  const resetCart = useCart((state: any) => state.resetCart);

  // const createOrderMutation = useMutation({
  //   mutationFn: () => createOrder(
  //     item.map((t)=>({
  //       productId : t.product.id,
  //       quantity: t.quantity,
  //       price: t.product.price,
  //     }))
  //   ),
  //   onSuccess: (data) => {
  //     console.log('success')
  //     console.log(data)
  //     resetCart()
  //   },
  //   onError: (error) => {
  //     console.log(error)
  //   },
  // })
  // const onCheckout = async () => {
  //   createOrderMutation.mutate();
  // }
  if (item.length === 0) {
    return (
      <View className='flex-1 justify-center items-center'>
        <Text className='text-lg font-semibold'>Your cart is empty</Text>
      </View>
    )
  }
  return (
    <FlatList
      data={item}
      contentContainerClassName='gap-2 max-w-[960px] w-full mx-auto'
      renderItem={({ item }) => (
        <ProductCard
          item={item.product}
          setSelectedItem={() => { }}
          setModalVisible={() => { }}
        />
      )}
      ListFooterComponent={() => (
        <Box className='bg-white p-3'>
          <Text className='text-xl py-4 font-semibold'>Total: ₹ {item.reduce((acc: any, curr: any) => acc + (curr.product.price * curr.quantity), 0)}</Text>
          <Button onPress={() => { }}>
            <ButtonText>Checkout</ButtonText>
          </Button>
        </Box>
      )}
    />
  )
}