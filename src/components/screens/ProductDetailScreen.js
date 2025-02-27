import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { FetchProductByID } from '../action/ProductAction';

const ProductDetailScreen = () => {
  const route = useRoute();

  const { productID } = route.params;

  const {
    data: productDetail = {},
    isError,
    isFetching
  } = useQuery({
    queryKey: [ 'productDetail', productID ],
    queryFn: () => FetchProductByID(productID),
    enabled: productID > 0
  });

  if (isError) {
    return (
      <View style={ styles.center }>
        <Text>Error fetching products!</Text>
      </View>
    );
  };

  return (
    <ScrollView style={ styles.container }>
      {
        isFetching ?
          <View>
            <ActivityIndicator size="small" color="#007bff" />
          </View>
          :
          <View style={ styles.productContainer }>
            <Image source={ { uri: productDetail?.product?.image } } style={ styles.productImage } />
            <View style={ styles.categoryChip }>
              <Text style={ styles.categoryText }>{ productDetail?.product?.category }</Text>
            </View>

            { productDetail?.product?.discount && (
              <View style={ styles.discountContainer }>
                <Text style={ styles.discountText }>{ productDetail.product.discount }% discount</Text>
              </View>
            ) }

            <View style={ styles.productInfo }>
              <Text style={ styles.productTitle }>{ productDetail?.product?.title }</Text>
            </View>

            <View style={ styles.productInfo }>
              <Text style={ styles.productPrice }>Price: ${ productDetail?.product?.price }</Text>
            </View>

            <View style={ styles.productDetail }>
              <Text style={ styles.productBrand }>Brand: { productDetail?.product?.brand }</Text>
              <Text style={ styles.productModel }>Model: { productDetail?.product?.model }</Text>
              <Text style={ styles.productColor }>Color: { productDetail?.product?.color }</Text>
            </View>

            <Text style={ styles.productDescription }>{ productDetail?.product?.description }</Text>
          </View>
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryChip: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
  },
  discountContainer: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  discountText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productInfo: {
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 18,
    color: 'green',
  },
  productDetails: {
    marginBottom: 15,
  },
  productBrand: {
    fontSize: 16,
    color: '#333',
  },
  productModel: {
    fontSize: 16,
    color: '#333',
  },
  productColor: {
    fontSize: 16,
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
});


export default ProductDetailScreen
