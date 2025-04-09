import { View, Text } from 'react-native'
import { Image, StyleSheet } from 'react-native';
import React from 'react'

type Props = {
  id: string | number,
  name: string,
  price: string,
  regular_price: string,
  sale_price: string,
  imageUrl : string,
  stock_status: string,
}

export default function ProductCard({ id, name, price, regular_price, sale_price, imageUrl, stock_status }: Props) {
  const isOnSale = sale_price < regular_price;

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.priceContainer}>
          {isOnSale && <Text style={styles.salePrice}>₹{Number(price).toFixed(2)}</Text>}
          <Text style={[styles.regularPrice, isOnSale && styles.strikeThrough]}>
            ₹{Number(regular_price).toFixed(2)}
          </Text>
        </View>
        <Text style={[styles.stockStatus, stock_status === 'out_of_stock' && styles.outOfStock]}>
          {stock_status === 'out_of_stock' ? 'Out of Stock' : 'In Stock'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    margin: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  salePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 5,
  },
  regularPrice: {
    fontSize: 14,
    color: '#555',
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  stockStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
  },
  outOfStock: {
    color: 'red',
  },
});