import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useFetchProductsQuery } from '../api/product'

export default function search() {
  return (
    <View>
      <Text>
        Search
      </Text>
    </View>
  )
}