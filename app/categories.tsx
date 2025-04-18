import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, Platform, RefreshControl, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useFetchAllCategoriesQuery } from '@/lib/query/useFetchCategoriesQuery';
import { CategoriesType } from '@/lib/type/categoriesType';
import { useCallback, useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { blurhash } from '@/constants/blurHash';
import { Icon } from '@/components/ui/icon';
import { Search } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AllCategoriesPage() {
  const fetchAllCategories = useFetchAllCategoriesQuery()
  // @ts-ignore-next-line
  const allCategories: CategoriesType[] = fetchAllCategories.data?.pages.flatMap(page => page.categories) || []
  const loadMoreCategories = useCallback(() => {
    if (fetchAllCategories.hasNextPage && !fetchAllCategories.isFetchingNextPage) {
      fetchAllCategories.fetchNextPage();
    }
  }, [fetchAllCategories]);
  return (
    <>
      <FlatList
        data={allCategories}
        onEndReached={loadMoreCategories}
        onEndReachedThreshold={0.5}
        numColumns={4}
        refreshControl={<RefreshControl
          refreshing={fetchAllCategories.isRefetching}
          onRefresh={() => {
            fetchAllCategories.refetch();
          }}
        />}
        ListEmptyComponent={() => {
          if (fetchAllCategories.isLoading || fetchAllCategories.isRefetching) {
            return (
              <View className="flex items-center justify-center py-10">
                <ActivityIndicator size="large" color="#0000ff" />
                <View className='h-20 w-full'></View>
              </View>
            )
          }
          return (
            <View className="flex items-center justify-center py-10">
              <Icon as={Search} className="text-gray-300 size-10" />
              <Text className="text-center mt-2 text-gray-500">No categories found</Text>
            </View>
          )
        }}
        columnWrapperStyle={{
          width: '100%',
          justifyContent: 'space-between',
          gap: 13, // Add gap between columns
          padding: 4
        }}
        style={{
          gap: 20, // Add gap between rows
          padding: 4,
          backgroundColor: 'white',
        }}
        contentContainerStyle={{
        }}
        ListFooterComponent={<View className='h-20 w-full'></View>}
        renderItem={(data: { index: number; item: CategoriesType }) => (
          <View className='flex-col gap-2 justify-start items-center w-[5rem] ' >
            {/* <View className='bg-blue-500 rounded-full w-[5rem] h-[5rem]' style={{backgroundColor: '#3b82f6'}}>
        </View> */}
            <Image
              source={{
                uri: data.item.image?.src || ''
              }}
              placeholder={blurhash}
              transition={300}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#EAEAEA',
              }}
            />
            <Text className='text-center text-sm'>{data.item.name}</Text>
          </View>
        )}
      />
    </>
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