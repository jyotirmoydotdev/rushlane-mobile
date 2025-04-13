import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function Orders() {
  return (
    <View className='flex-1'>
      <View className='p-4 h-5 w-full bg-green-400'>
        <Text>View Cart</Text>
      </View>
      <Text>Orders</Text>
    </View>
  );
}
