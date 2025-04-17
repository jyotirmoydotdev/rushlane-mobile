import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Button, ButtonText } from '@/components/ui/button';
import { ArrowUp, Search, ShoppingCart, Utensils } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';
import ProductCard from '@/components/ProductCard';
import { ProductType } from '@/lib/type/productType';
import { PlaceholdersAndVanishInput } from '@/components/mainSearchBar';
import { useFetchCategoriesQuery } from '@/lib/query/useFetchCategoriesQuery';
import { Image } from 'expo-image';
import { blurhash } from '@/constants/blurHash';
import Animated, { useAnimatedRef, useAnimatedStyle, useAnimatedScrollHandler, withTiming, useSharedValue } from 'react-native-reanimated'
import { useFetchProductsQuery } from '@/lib/query/useFetchProductsQuery';
import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';

const AnimatedFlatList = Animated.FlatList;

export default function SearchInput() {
  const {categogries} = useLocalSearchParams<{categogries?: string}>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setCategory] = useState<number>(Number(categogries) ?? 0);

  const categories = useFetchCategoriesQuery();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const flatListRef = useAnimatedRef<FlatList>();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const scrollToTopButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: scrollY.value > 600 ? withTiming(1) : withTiming(0),
      transform: [{ scale: scrollY.value > 600 ? withTiming(1) : withTiming(0.8) }],
    };
  });

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleSearch = useCallback((text: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setSearchQuery(text);
    }, 300);
  }, []);

  const fetchProducts = useFetchProductsQuery({
    searchQuery: searchQuery,
    selectedCategory: selectedCategory,
    perPage: 10
  });

  const loadMoreProducts = useCallback(() => {
    if (fetchProducts.hasNextPage && !fetchProducts.isFetchingNextPage) {
      fetchProducts.fetchNextPage();
    }
  }, [fetchProducts]);

  const MemoizedProductCard = React.memo(ProductCard);

  const CategoryList = useCallback(() => {
    if (categories.isLoading) {
      return (
        <>
          {Array(4).fill(0).map((_, i) => (
            <View key={i} className='mr-4 rounded-full'>
              <Image
                source={{ uri: '' }}
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#EAEAEA',
                  borderRadius: 40,
                }}
                contentFit="cover"
                transition={1000}
                placeholder={{ blurhash }}
              />
              <View className='mt-2 w-20'>
                <Text className='line-clamp-1 text-xs text-[#333] text-center'>loading...</Text>
              </View>
            </View>
          ))}
        </>
      );
    }

    if (categories.isError) {
      return <Text>Something went wrong while fetching Categories...</Text>;
    }

    return (
      <>
        <Pressable onPress={() => router.push('/categories')} className='items-center mr-4'>
          <View className='w-20 h-20 flex-row justify-center items-center rounded-full bg-[#EAEAEA] mb-3'>
            <Icon as={Utensils} />
          </View>
          <Text className='mt-2 w-20 line-clamp-1 text-xs text-[#333] text-center'>View All</Text>
        </Pressable>
        {categories.data?.map((category: any) => (
          <TouchableOpacity
            key={category.id}
            className={`items-center mr-4`}
            onPress={() => {
              if (category.id === selectedCategory) {
                setCategory(0)
              } else {
                setCategory(category.id)
              }
            }}
          >
            {!category.image ? (
              <View className='w-20 h-20 flex-row justify-center items-center rounded-full bg-[#EAEAEA] mb-3'>
                <Text className='text-3xl font-bold'>{category.name.slice(0, 1)}</Text>
              </View>
            ) : (
              <Image
                source={{ uri: category.image?.src }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: '#EAEAEA',
                  borderWidth: 2,
                  borderColor: category.id === selectedCategory ? '#f97316' : '#e5e7eb'
                }}
                cachePolicy={'disk'}
                contentFit="cover"
                placeholder={blurhash}
              />
            )}
            <Text className={`mt-2 w-20 line-clamp-1 text-xs ${category.id === selectedCategory ? 'text-orange-500' : 'text-[#333]'} text-center`}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </>
    );
  }, [categories.isLoading, categories.isError, categories.data, selectedCategory]);

  const ListHeader = useCallback(() => {
    return (
      <View className='my-4'>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mx-[-16px] px-4'>
          <CategoryList />
        </ScrollView>
      </View>
    );
  }, [CategoryList]);

  const EmptyListComponent = useCallback(() => {
    if (fetchProducts.isLoading || fetchProducts.isRefetching) {
      return (
        <View className="flex items-center justify-center py-10">
          <ActivityIndicator size="large" color="#0000ff" />
          <View className='h-20 w-full'></View>
        </View>
      );
    }

    return (
      <View className="flex items-center justify-center py-10">
        <Icon as={Search} className="text-gray-300 size-10" />
        <Text className="text-center mt-2 text-gray-500">No products found</Text>
      </View>
    );
  }, [fetchProducts.isLoading, fetchProducts.isRefetching]);

  const FooterComponent = useCallback(() => {
    if (fetchProducts.isFetchingNextPage) {
      return (
        <View className="py-4">
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      );
    }

    if (fetchProducts.hasNextPage) {
      return (
        <Button className="mx-4 my-2" onPress={loadMoreProducts}>
          <ButtonText>Load More</ButtonText>
        </Button>
      );
    }

    // @ts-ignore-next-line
    const allProducts: ProductType[] = fetchProducts.data?.pages.flatMap(page => page.products) || [];
    if (allProducts.length > 0) {
      return <Text className="text-center py-4 text-gray-500">No more products</Text>;
    }

    return null;
  }, [fetchProducts.isFetchingNextPage, fetchProducts.hasNextPage, fetchProducts.data?.pages, loadMoreProducts]);

  // @ts-ignore-next-line
  const allProducts: ProductType[] = fetchProducts.data?.pages.flatMap(page => page.products) || [];

  const renderItem = useCallback(({ item }: { item: ProductType }) => (
    <MemoizedProductCard
      item={item}
    />
  ), []);

  return (
    <>
    <Text>categogries: {categogries}</Text>
      <AnimatedFlatList
        onScroll={scrollHandler}
        ref={flatListRef}
        className='h-screen mt-2'
        data={allProducts}
        keyExtractor={(item: any) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        keyboardShouldPersistTaps="handled"
        windowSize={10}
        style={{
          paddingHorizontal: 12,
          marginBottom: 0
        }}
        onEndReached={loadMoreProducts}
        keyboardDismissMode='on-drag'
        ListHeaderComponent={
          <>
            <Stack.Screen
              options={{
                headerTitle: "Search for dishes",
                headerBackButtonMenuEnabled: false,
                headerBackTitle: 'Back',
                headerTitleStyle: {
                  fontSize: 14,
                  fontWeight: 'thin',
                },
                headerRight: () => (
                  <Link href={'/cart'} asChild>
                    <TouchableOpacity onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                      <Icon as={ShoppingCart} />
                    </TouchableOpacity>
                  </Link>
                )
              }}
            />
            <PlaceholdersAndVanishInput
              placeholders={['Search for Pizza', 'Find something', 'Type here...']}
              onChange={handleSearch}
            />
            <ListHeader />
          </>
        }
        ListEmptyComponent={EmptyListComponent}
        ListFooterComponent={FooterComponent}
        renderItem={renderItem}
      />
      <Animated.View
        className="absolute bottom-7 left-0 right-0 flex-row justify-center"
        style={scrollToTopButtonStyle}
      >
        <TouchableOpacity
          onPress={scrollToTop}
          className="bg-gray-900 rounded-xl p-3 shadow-lg border border-gray-800 flex-row items-center gap-1"
          activeOpacity={0.8}
        >
          <Text className='text-white font-bold'>Back to top</Text>
          <Icon as={ArrowUp} size='sm' className="stroke-white" />
        </TouchableOpacity>
      </Animated.View>

    </>
  );
}