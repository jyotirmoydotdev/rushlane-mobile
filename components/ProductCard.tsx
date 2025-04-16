import { View, Text, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native';
import React from 'react'
import { Icon } from './ui/icon';
import { Bookmark, Share, ChefHat, Star, Triangle, Circle, CheckIcon } from 'lucide-react-native';
import { blurhash } from '@/constants/blurHash';
import { Button, ButtonText } from './ui/button';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import he from 'he';
import { useCart } from '@/lib/state/cartState';
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetSectionHeaderText,
} from "@/components/ui/actionsheet"
import { Checkbox, CheckboxIcon, CheckboxIndicator } from './ui/checkbox';

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

  const addProduct = useCart((state: any) => state.addProduct);
  const vendorId = useCart((state: any) => state.vendorId);

  const [showActionsheet, setShowActionsheet] = React.useState(false)
  const handleClose = () => setShowActionsheet(false)

  return (
    <View className='flex-row items-center justify-between w-full mb-4 gap-2 border p-2 rounded-3xl bg-white border-gray-200'>
      <View className='w-1/2 flex-col gap-1.5 justify-start p-2'>
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
        <TouchableOpacity onPress={() => router.push(`/store/${item.store.vendor_id}`)} className='flex-row items-center gap-1'>
          <Icon as={ChefHat} className='w-4 h-4 stroke-blue-500' />
          <Text className='text-base text-blue-500 font-medium'>{he.decode(item.store.vendor_shop_name ?? 'No Shop Name')}</Text>
        </TouchableOpacity>
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
          {item.attributes.length > 0 ? (
            <>
              <Button className=' w-[8rem] rounded-full bg-orange-500/80 border border-orange-400' onPress={() => setShowActionsheet(true)} >
                <ButtonText className='text-xl text-white'>SELECT</ButtonText>
              </Button>
              <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
                <ActionsheetBackdrop />
                <ActionsheetContent>
                  <ActionsheetDragIndicatorWrapper>
                    <ActionsheetDragIndicator />
                  </ActionsheetDragIndicatorWrapper>
                  <ActionsheetSectionHeaderText>
                    <Text className='text-xl font-semibold'>Select Attribute</Text>
                  </ActionsheetSectionHeaderText>
                  {item.attributes.map((attribute: any) => {
                    return attribute.options.map((option: string, index: number) => (
                      <ActionsheetItem key={index} className='flex flex-row gap-2'>
                        <Checkbox size="md" value=''>
                          <CheckboxIndicator>
                            <CheckboxIcon as={CheckIcon} />
                          </CheckboxIndicator>
                        </Checkbox>
                        <Text>{option}</Text>
                      </ActionsheetItem>
                    ));
                  })}
                  <ActionsheetItem>
                    <Button>
                      <ButtonText className='text-xl text-white'>ADD</ButtonText>
                    </Button>
                  </ActionsheetItem>
                </ActionsheetContent>
              </Actionsheet>
            </>
          ) : (
            <Button
              onPress={async () => {
                addProduct(item)
                if (item.store.vendor_id === vendorId || vendorId === null) {
                  router.push('/addmore')
                }
              }}
              className=' w-[8rem] rounded-full bg-orange-500/80 border border-orange-400'>
              <ButtonText className='text-xl text-white'>ADD</ButtonText>
            </Button>
          )}
        </View>
      </View>
    </View>
  )
}

export default ProductCard