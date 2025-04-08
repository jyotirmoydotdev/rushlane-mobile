import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';


// All Products
export const useFetchProductsQuery = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            if (!process.env.EXPO_PUBLIC_CONSUMERSECRET || !process.env.EXPO_PUBLIC_CONSUMERKEY) {
                throw new Error('Environment variables CONSUMER_SECRET and CONSUMER_KEY must be set')
            }
            const res = await axios.get(`https://www.rushlane.net/wp-json/wc/v3/products`, {
                params: {
                    consumer_secret: process.env.EXPO_PUBLIC_CONSUMERSECRET,
                    consumer_key: process.env.EXPO_PUBLIC_CONSUMERKEY,
                }
            })
            if (res.status !== 200) {
                throw new Error('Error: Failed to fetch products')
            }
            const data = await res.data
            return data
        }
    })
}