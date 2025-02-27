import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ProductCardModalScreen from './ProductCardModalScreen';
import { useNavigation } from '@react-navigation/native';

const ProductCardScreen = ({ item }) => {
  const navigation = useNavigation();
  const [ modalVisible, setModalVisible ] = useState(false);

  const handleLongPress = () => {
    setModalVisible(true);
  };

  const handleOnProductClick = (id) => {
    navigation.navigate('ProductDetails', { productID: id })
  };

  return (
    <View>
      <TouchableOpacity
        style={ styles.productCard }
        onLongPress={ handleLongPress }
        onPress={ () => handleOnProductClick(item.id) }
      >
        <Image source={ { uri: item.image } } style={ styles.productImage } />

        <View style={ styles.categoryChip }>
          <Text style={ styles.categoryText }>{ item.category }</Text>
        </View>

        <Text style={ styles.productTitle }>{ item.title }</Text>
        <Text style={ styles.productPrice }>${ item.price }</Text>
      </TouchableOpacity>

      {
        modalVisible &&
        <ProductCardModalScreen
          item={ item }
          modalVisible={ modalVisible }
          onClose={ () => setModalVisible(false) }
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#008000',
  },
});

export default ProductCardScreen
