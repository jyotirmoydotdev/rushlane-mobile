import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import { useFetchStoreQuery } from '@/lib/query/useFetchStoresQuery';
import { Image } from 'expo-image';
import { Icon } from '@/components/ui/icon';
import { ArrowUp, Search, ShoppingCart, Star } from 'lucide-react-native';
import { FlatList } from 'react-native';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { useCart } from '@/lib/state/cartState';
import { Link } from 'expo-router';
import { Switch } from '@/components/ui/switch';
import { useVegStatus } from '@/lib/state/filterState';
import he from 'he';
import { useInfiniteQuery } from '@tanstack/react-query';
import ProductCard from '@/components/ProductCard';
import Animated, {
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
    useAnimatedScrollHandler,
    withTiming,
    useSharedValue,
} from 'react-native-reanimated';
import { ProductType } from '@/lib/type/productType';
import {
    Checkbox,
    CheckboxIndicator,
    CheckboxLabel,
    CheckboxIcon,
} from "@/components/ui/checkbox"
import { CheckIcon } from "@/components/ui/icon"
import { PlaceholdersAndVanishInput } from '@/components/mainSearchBar';
import HalfScreenModal from '@/components/modelComp';
import { blurhash } from '@/constants/blurHash';

const AnimatedFlatList = Animated.FlatList;

export default function StorePage() {
    const { id } = useLocalSearchParams();
    const fetchStore = useFetchStoreQuery(id as string);
    const [searchQuery, setSearchQuery] = useState('');

    const addProduct = useCart((state: any) => state.addProduct);
    const cartItems = useCart((state: any) => state.items);
    const setVegStatus = useVegStatus((state: any) => state.setVegStatus);
    const getVegStatus: boolean = useVegStatus((state: any) => state.isVeg);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<null | any>(null);

    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const flatListRef = useAnimatedRef<FlatList>();
    const scrollY = useSharedValue(0);

    const MemoizedProductCard = React.memo(ProductCard);

    // Create scroll handler to track scroll position
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    // Animated style for the scroll-to-top button
    const scrollToTopButtonStyle = useAnimatedStyle(() => {
        return {
            opacity: scrollY.value > 600 ? withTiming(1) : withTiming(0),
            transform: [{ scale: scrollY.value > 600 ? withTiming(1) : withTiming(0.8) }],
        };
    });

    // Function to scroll to top
    const scrollToTop = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    // Function to fetch products page by page
    const fetchStoreProductsFunc = async ({
        pageParam = 1
    }): Promise<{
        storeProducts: any[];
        currentPage: number;
        nextPage: number | null;
        prevPage: number | null;
        perPage: number;
        hasNextPage: boolean;
    }> => {
        const perPage = 10;
        const url = new URL(`/api/stores/${id}/products`, window.location.origin);
        url.searchParams.append('page', pageParam.toString());
        url.searchParams.append('per_page', perPage.toString());
        if (getVegStatus) url.searchParams.append('veg', 'true');
        if (searchQuery) url.searchParams.append('search', searchQuery);

        const res = await fetch(url.toString());
        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await res.json();

        return {
            storeProducts: data.products || [],
            currentPage: data.pagination.currentPage,
            perPage: data.pagination.perPage,
            nextPage: data.pagination.nextPage,
            prevPage: data.pagination.prevPage,
            hasNextPage: data.pagination.hasNextPage,
        };
    };

    // Use infinite query hook
    const fetchStoreProducts = useInfiniteQuery({
        queryKey: ['storeProducts', id, getVegStatus, searchQuery],
        queryFn: fetchStoreProductsFunc,
        // initial page = 1
        initialPageParam: 1,
        getNextPageParam: last => last.nextPage ?? undefined,
        getPreviousPageParam: first => first.prevPage ?? undefined,
        // refetch when veg or search changes
        enabled: !!id,
    });

    // Handle search submission
    const handleSearch = useCallback((text: string) => {

        // Clear previous timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Set new timeout to update searchQuery after 300ms
        searchTimeoutRef.current = setTimeout(() => {
            setSearchQuery(text);
        }, 300);
    }, []);

    const closeModal = useCallback(() => {
        setModalVisible(false);
    }, []);

    // Function to handle adding products to cart
    const addToCart = (product: any) => {
        if (cartItems.length === 0) {
            addProduct(product);
            return;
        }

        for (const item of cartItems) {
            if (item.id === product.id) {
                return;
            }
            if (item.product.post_author !== product.post_author) {
                alert('You can only add products from the same store.');
                return;
            }
        }
        addProduct(product);
    };

    // Handle loading more products when reaching end of list
    const loadMoreProducts = useCallback(() => {
        if (fetchStoreProducts.hasNextPage && !fetchStoreProducts.isFetchingNextPage) {
            fetchStoreProducts.fetchNextPage();
        }
    }, [fetchStoreProducts]);

    const EmptyListComponent = useCallback(() => {
        if (fetchStoreProducts.isLoading || fetchStoreProducts.isRefetching) {
            return (
                <View className="flex items-center justify-center py-10">
                    <ActivityIndicator size="large" color="#0000ff" />
                    <View className='h-40 w-full '></View>
                </View>
            );
        }

        return (
            <View className="flex items-center justify-center py-10">
                <Icon as={Search} className="text-gray-300 size-10" />
                <Text className="text-center mt-2 text-gray-500">No products found</Text>
            </View>
        );
    }, [fetchStoreProducts.isLoading, fetchStoreProducts.isRefetching]);

    // Memoize footer component
    const FooterComponent = useCallback(() => {
        if (fetchStoreProducts.isFetchingNextPage) {
            return (
                <View className="py-4">
                    <ActivityIndicator size="small" color="#0000ff" />
                    <View className='h-40 w-full '></View>
                </View>
            );
        }

        if (fetchStoreProducts.hasNextPage) {
            return (
                <Button className="mx-4 my-2" onPress={loadMoreProducts}>
                    <ButtonText>Load More</ButtonText>
                </Button>
            );
        }

        const allProducts: ProductType[] = fetchStoreProducts.data?.pages.flatMap(page => page.storeProducts) || [];
        if (allProducts.length > 0) {
            return <Text className="text-center py-4 text-gray-500">No more products</Text>;
        }

        return null;
    }, [fetchStoreProducts.isFetchingNextPage, fetchStoreProducts.hasNextPage, fetchStoreProducts.data?.pages, loadMoreProducts]);

    // Combine all pages of products into a single array
    const allProducts: ProductType[] = fetchStoreProducts.data?.pages.flatMap(page => page.storeProducts) || [];

    const renderItem = useCallback(({ item }: { item: ProductType }) => (
        <MemoizedProductCard
            item={item}
            setModalVisible={setModalVisible}
            setSelectedItem={setSelectedItem}
        />
    ), []);

    return (
        <>
            <View className=''>
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
                            <View className=' bg-gray-50 p-4 mb-2 rounded-xl'>
                                <View className='flex-row gap-4 items-center'>
                                    <Image
                                        source={{
                                            uri: fetchStore.data?.logoUrl
                                        }}
                                        className=" bg-gray-200 "
                                        alt="image"
                                        placeholder={{ blurhash }}
                                        style={{
                                            width: 112,
                                            height: 112,
                                            backgroundColor: `#E0E0E0`,
                                            objectFit: "cover",
                                            borderRadius: 999,
                                            borderColor: '#c1c1c1',
                                        }}
                                    />
                                    <View className='flex-col gap-1'>
                                        <Text className=' text-3xl w-[14rem] font-bold'>{he.decode(fetchStore.data?.name ?? "Loading...")}</Text>
                                        <Text className=' line-clamp-2 w-[12rem] text-base'>{he.decode(fetchStore.data?.address ?? "Loading...")}</Text>
                                        <View className='flex-row gap-2'>
                                            <View className='  flex-row gap-1 px-2 py-1 rounded-md bg-green-600 items-center justify-center'>
                                                <Icon as={Star} className=' h-3 w-3 stroke-white' />
                                                <Text className=' text-sm text-white'>{fetchStore.data?.rating}</Text>
                                            </View>
                                            {
                                                (fetchStore.data?.email) && <Text>{fetchStore.data.email}</Text>
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <PlaceholdersAndVanishInput
                                placeholders={['Search for Pizza', 'Find something', 'Type here...']}
                                onChange={handleSearch}
                                onSubmit={() => console.log('Submitted')}
                            />
                        </>
                    }
                    ListEmptyComponent={EmptyListComponent}
                    ListFooterComponent={FooterComponent}
                    renderItem={renderItem}
                />
                <Animated.View
                    className='absolute bottom-12 right-5' style={scrollToTopButtonStyle}>
                    <TouchableOpacity
                        onPress={scrollToTop}
                        style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                        className='bg-orange-500 rounded-full p-3 border-2 border-orange-600'>
                        <Icon as={ArrowUp} className=' stroke-white' />
                    </TouchableOpacity>
                </Animated.View>
            </View>
            {/* Performance optimized modal implementation */}
            {modalVisible && (
                <HalfScreenModal
                    isVisible={modalVisible}
                    onClose={closeModal}
                    title="Product Details"
                    data={selectedItem}
                    height={60}
                >
                    {selectedItem && (
                        <FlatList
                            data={selectedItem.attributes}
                            keyExtractor={(item) => item.id.toString()}

                            renderItem={({ item }) => (
                                <View className='flex-col justify-between mb-4 gap-4 border-b border-gray-300 pb-4'>
                                    <View>
                                        <Text className='text-2xl font-semibold'>{item.name}</Text>
                                        <Text>{`Choose one out of this ${item.options.length} options`}</Text>
                                    </View>
                                    <View className='flex-col gap-2'>
                                        {item.options.map((option: any, index: number) => (
                                            <View key={index} className='flex flex-row gap-2'>
                                                <Checkbox size="md" value=''>
                                                    <CheckboxIndicator>
                                                        <CheckboxIcon as={CheckIcon} />
                                                    </CheckboxIndicator>
                                                </Checkbox>
                                                <Text>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            )}
                            ListFooterComponent={() => (
                                <Button>
                                    <ButtonText>
                                        Add to Cart
                                    </ButtonText>
                                </Button>
                            )}
                        />
                    )}
                </HalfScreenModal>
            )}
        </>
    );
}