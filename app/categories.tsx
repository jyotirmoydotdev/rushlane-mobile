import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useFetchAllCategoriesQuery } from '@/lib/query/useFetchCategoriesQuery';

export default function AllCategoriesPage() {
  const fetchAllCategories = useFetchAllCategoriesQuery()
  return (
    <ScrollView style={styles.container}>
      {/* <View className='flex-row gap-5 flex-wrap justify-center px-2 pt-4'>
      {Array.from({ length: 100 }).map((_, index) => (
        <View key={index} style={styles.circle} />
      ))}
      </View> */}
      <Text>{JSON.stringify(fetchAllCategories.isLoading?'Loading..,':fetchAllCategories.isError?'Something went wrong..':fetchAllCategories.data)}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 999,
    backgroundColor: '#3498db',
  },
});