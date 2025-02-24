import React, { useRef } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import ProductCardScreen from './ProductCardScreen'
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';

const ProductListScreen = ({ products, isFetching, hasMoreData, refreshing, onRefresh, onLimitChange }) => {
  const flatListRef = useRef(null);

  const handleEndReached = () => {
    if (!isFetching && hasMoreData) {
      onLimitChange();
    }
  };

  return (
    <FlatList
      ref={ flatListRef }
      data={ products }
      keyExtractor={ (item) => item.id.toString() }
      renderItem={ ({ item }) => <ProductCardScreen item={ item } /> }
      ListFooterComponent={
        isFetching ? (
          <View style={ styles.loadMoreContainer }>
            <ActivityIndicator size="small" color="#007bff" />
          </View>
        ) : hasMoreData ? (
          <View style={ styles.loadMoreContainer }>
            <TouchableOpacity
              style={ styles.loadMoreButton }
              onPress={ onLimitChange }
              disabled={ isFetching }
            >
              <Text style={ styles.loadMoreText }>Load More</Text>
              <Icon name="arrow-down" size={ 20 } color="#fff" style={ styles.loadMoreIcon } />
            </TouchableOpacity>
          </View>
        ) : null
      }
      onEndReached={ handleEndReached } // Load more when the end is reached
      onEndReachedThreshold={ 0.1 } // Trigger load more when 90% of the list is visible
      showsVerticalScrollIndicator={ false }
      refreshControl={
        <RefreshControl
          refreshing={ refreshing }
          onRefresh={ onRefresh }
        />
      }
    />
  )
}

const styles = StyleSheet.create({
  loadMoreContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMoreButton: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMoreText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
  },
  loadMoreIcon: {
    marginLeft: 10,
  },
})

export default ProductListScreen
