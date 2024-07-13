import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export const ProductCard = ({ product }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: product?.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{product?.name}</Text>
            <Text>{product?.description}</Text>
            <Text>{product?.price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: { margin: 8, padding: 16, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
    image: { width: '100%', height: 150, borderRadius: 8 },
    name: { fontWeight: 'bold', marginTop: 8 },
});
