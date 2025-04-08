import { QueryClient } from "@tanstack/react-query";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export async function loadInitialData(
    key: string, 
    queryClient: QueryClient, 
    setInitialDataLoaded: React.Dispatch<React.SetStateAction<boolean>>
) {
    try {
        const cachedData = await AsyncStorage.getItem(key);
        if (cachedData) {
          console.log(cachedData)
          queryClient.setQueryData([key], JSON.parse(cachedData));
        }
      } catch (error) {
        console.error('Error loading cached categories:', error);
      } finally {
        setInitialDataLoaded(true);
      }
}