import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native';
import React from 'react'
import { Icon } from './ui/icon';
import { Bookmark, Share, ChefHat, Star, Triangle, Circle } from 'lucide-react-native';
import { blurhash } from '@/constants/blurHash';
import { Button, ButtonText } from './ui/button';
import { Image } from 'expo-image';

type Props = {
  id: string | number,
  name: string,
  price: string,
  regular_price: string,
  sale_price: string,
  imageUrl: string,
  stock_status: string,
  store_name: string,
  on_sale: boolean,
  openModal: (item: any) => void,
}

interface ProductCardProps {

  item: any;

  setSelectedItem: React.Dispatch<React.SetStateAction<null>>;

  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

}

const ProductCard: React.FC<ProductCardProps> = ({ item, setSelectedItem, setModalVisible }) => {
  const openModal = (item: any) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View className='flex-row justify-between w-full mb-4 gap-4 border-b border-gray-200 pb-4'>
      <View className='flex-col w-[12rem] gap-1.5 justify-start'>
        <Text className=' text-xl font-bold'>{item.name}</Text>
        {
          item.on_sale ? (
            <View className='flex-row items-center gap-2'>
              <Text className='text-lg font-semibold'>₹ 200{item.sale_price}</Text>
              <Text className='text-base text-gray-500 line-through'>₹{item.regular_price}</Text>
            </View>
          ) : (
            <Text className='text-lg font-semibold'>₹ {item.price}</Text>
          )
        }
        <View className='flex-row gap-1 items-center'>
          {Array.from({ length: 5 }, (_, index) => (
            <Icon
              key={index}
              as={Star}
              className={`w-3 h-3 ${index < Math.round(Number(item.average_rating))
                ? 'fill-yellow-400 stroke-yellow-500'
                : 'fill-gray-300 stroke-gray-400'
                }`}
            />
          ))}
          <Text className='text-sm px-1 text-gray-500'>({item.rating_count})</Text>
        </View>
        <View className='flex-row items-center gap-1'>
          <Icon as={ChefHat} className='w-4 h-4 stroke-blue-500' />
          <Text className='text-base text-blue-500 font-medium'>{item.store.vendor_shop_name}</Text>
        </View>
        <View className='flex-row gap-2 pt-2 items-center'>
          <View className=' p-2.5 bg-gray-50 rounded-full border border-gray-200 outline'>
            {
              item.categories.find((cat: any) => cat.id == 356) !== undefined && <Icon as={Triangle} className='h-4 w-4 fill-red-600 stroke-red-700' />
            }
            {
              item.categories.find((cat: any) => cat.id == 355) !== undefined && <Icon as={Circle} className='h-4 w-4 fill-green-600 stroke-green-700' />
            }
          </View>
          <View className=' p-2 bg-gray-50 rounded-full border border-gray-200 outline'><Icon as={Bookmark} className='stroke-gray-500' /></View>
          <View className=' p-2 bg-gray-50 rounded-full border border-gray-200 outline'><Icon as={Share} className='stroke-gray-500' /></View>
        </View>
      </View>
      {/* Image */}
      <View className='relative'>
        <Image
          alt='banner1'
          source={{
            uri: item.images[0].src,
          }}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
          style={{
            width: 160,
            height: 160,
            borderRadius: 24,
            marginRight: 16,
            borderColor: '#E5E7EB',
            borderWidth: 1,
          }}
        />
        <View className='absolute flex-row items-center justify-center bottom-4 w-full'>
          <Button className=' w-[8rem] rounded-full bg-orange-500/80 border border-orange-400' onPress={() => openModal(item)} >
            <ButtonText className='text-xl text-white'>
              {item.attributes.length > 0 ? 'SELECT' : 'ADD'}
            </ButtonText>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default ProductCard