import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchProducts } from '../../api';
import { ProductCard } from './ProductCard';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  premiumAccess: boolean;
}

export const ProductListScreen = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const productData = await fetchProducts(page);
      setProducts((prev)=> ([...prev, ...productData]));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard key={item?.id?.toString()} product={item} />}
        keyExtractor={(item) => item?.id?.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.000001}
        initialNumToRender={10}
        ListEmptyComponent={() => {
          return isLoading ? <View style={styles.container}>
          <Text>Loading...</Text>
        </View> : <Text>Empty!</Text>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 16, color: "black" },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  }
});
