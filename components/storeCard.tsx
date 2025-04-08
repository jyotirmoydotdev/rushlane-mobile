import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable, View } from "react-native";
import { Icon } from "./ui/icon";
import { Clock, Star, Zap } from "lucide-react-native";
import { Badge } from "./ui/badge";
import { HStack } from "./ui/hstack";
import { Circle } from "react-native-svg";
import { Image } from "expo-image";
import he from 'he';
import { Link, useRouter } from "expo-router";

type Props = {
    storeLogo: string,
    storeBanner: string,
    storeName: string,
    storeRating: number | string,
    storeAddress: string,
    id: number,
}

export default function StoreCard({ storeLogo, storeBanner, storeName, storeRating, storeAddress, id }: Props) {
    return (
        <View className=" rounded-3xl p-0 max-w-[360px] bg-white border border-gray-500/50 overflow-hidden mb-4">
            <Image
                source={{
                    uri: storeBanner
                }}
                className=" bg-gray-200"
                alt="image"
                style={{
                    width: "100%",
                    height: 180,
                    backgroundColor: `#c1c1c1`,
                    objectFit: "contain",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}
            />
            <HStack className="mb-2 px-4 py-4 justify-between items-center">
                <VStack className=" ">
                    <View className="flex-row gap-2">
                        <Badge className=" flex flex-row justify-center gap-1 items-center mb-2  py-1 px-3 bg-red-500 rounded-full  ">
                            <Text className="text-sm font-bold  text-white">
                                Hyper
                            </Text>
                            <Icon as={Zap} className=" stroke-white" />
                        </Badge>
                        <Badge className=" flex flex-row justify-center gap-1 items-center mb-2  py-1 px-3 bg-green-700 rounded-full ">
                            <Text className="text-sm font-bold  text-white">
                                15 - 20 MINS
                            </Text>
                            <Icon as={Clock} className=" stroke-white" />
                        </Badge>
                    </View>
                    <Heading size="xl" className="mb-2 font-black w-[16rem] line-clamp-1">
                        {he.decode(storeName)}
                    </Heading>
                    <HStack className=" items-center gap-2">
                        <Icon as={Star} className="fill-green-600 stroke-white" />
                        <Text className="text-lg font-semibold">{storeRating == 0 || storeRating == "" ? "0.0" : parseFloat(storeRating.toString()).toFixed(1)}</Text>
                        <Text className="text-lg font-semibold w-[12rem] line-clamp-1">
                            {he.decode(storeAddress??"")}
                        </Text>
                        {/* <Box className=" rounded-full size-1.5 bg-gray-300" />
                        <Text className="text-lg font-semibold text-emerald-500">Open</Text> */}
                    </HStack>
                </VStack>
                <Image
                    source={{
                        uri: storeLogo
                    }}
                    className="rounded-full bg-gray-300"
                    alt="image"
                    style={{
                        width: 80,
                        height: 80,
                        objectFit: "contain",
                        borderRadius: 999
                    }}
                />
            </HStack>

        </View>
    )
}