import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { IProduct } from './ProductListScreen';

export const ProductCard = ({ product }: {product: IProduct}) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: product?.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{product?.name}</Text>
            <Text style={styles.text}>{product?.description}</Text>
            <Text style={styles.text}>{product?.price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: { margin: 8, padding: 16, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
    image: { width: '100%', height: 150, borderRadius: 8 },
    name: { fontWeight: 'bold', marginTop: 8, color: "black"},
    text: {color: "black"}
});
