import { Text, View } from "react-native";
import { Image } from 'expo-image';
import { blurhash } from "@/constants/blurHash";
import he from 'he'
import { Icon } from "./ui/icon";
import { MapPin, Star } from "lucide-react-native";

interface RestaurantCardProps {
    id: number;
    name: string;
    address: string;
    rating: number;
    imageUrl: string;
    logoUrl: string;
    cuisine?: string;
    deliveryTime?: string;
    priceRange?: string;
    discount?: string;
  }
  
 export default function RestaurantCard ({
    id,
    name,
    address,
    rating,
    imageUrl,
    logoUrl,
    cuisine,
    deliveryTime,
    priceRange,
    discount,
  }: RestaurantCardProps) {
    return (
      <View className="bg-white rounded-3xl shadow-sm border border-gray-100">
        {/* Restaurant Image */}
        <View className="relative">
          <Image
            source={{ uri: imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4' }}
            style={{
              height: 180,
              width: '100%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20
            }}
            className="rounded-t-xl"
            contentFit="cover"
            placeholder={{ blurhash }}
            transition={200}
          />
  
          {/* Discount Badge */}
          {/* <View className="absolute top-3 left-3 bg-foodapp-discount px-2 py-1 rounded-md">
            <Text className="text-white font-bold text-xs">{discount}</Text>
          </View> */}
  
          {/* Restaurant Logo */}
          <Image
            style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              width: 80,
              height: 80,
              borderRadius: 999,
              backgroundColor: '#e5e7eb'
            }}
            source={{
              uri: logoUrl
            }}
          />
        </View>
  
        {/* Restaurant Info */}
        <View className="p-3">
          {/* Restaurant Name and Logo */}
          <View className="flex-row items-center justify-between mb-1">
            <Text className=" font-black text-3xl" numberOfLines={1}>
              {he.decode(name)}
            </Text>
  
            <View className="flex-row items-center bg-foodapp-rating px-2 py-0.5 rounded">
              <Icon as={Star} size='sm' className="stroke-white fill-white mr-1" />
              <Text className="text-white font-bold text-xs">{rating}</Text>
            </View>
          </View>
  
          {/* Rating */}
          <View className='flex-row gap-1 items-center'>
            {Array.from({ length: 5 }, (_, index) => (
              <Icon
                key={index}
                as={Star}
                className={`w-3 h-3 ${index < Math.round(Number(rating))
                  ? 'fill-yellow-400 stroke-yellow-500'
                  : 'fill-gray-300 stroke-gray-400'
                  }`}
              />
            ))}
            <Text className='text-sm px-1 text-gray-500'>({rating})</Text>
          </View>
  
          {/* Divider */}
          <View className="h-[1px] bg-gray-100 my-2"></View>
  
          {/* Delivery Info */}
          <View className="flex-row items-center w-3/4">
            <Icon as={MapPin} size='sm' className="mr-1" />
            <Text className="text-base line-clamp-1">
              {he.decode(address)}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  