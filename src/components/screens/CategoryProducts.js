import { useQuery } from '@tanstack/react-query'
import React, { useMemo, useState } from 'react'
import { FlatList, View } from 'react-native'
import { FetchCategoryProducts } from '../action/ProductAction';
import ProductCardScreen from './ProductCardScreen';
import ProductListScreen from './ProductListScreen';

const CategoryProducts = ({ selectedCategory }) => {
  const {
    data: categoryProduct = {},
    isError,
    isFetching,
    refetch
  } = useQuery({
    queryKey: [ 'categoryProduct',selectedCategory ],
    queryFn: () => FetchCategoryProducts(selectedCategory),
    enabled: selectedCategory && selectedCategory.length !== 0
  });

  const [ refreshing, setRefreshing ] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false))
  };

  if (isError) {
    return (
      <View style={ styles.center }>
        <Text>Error fetching products!</Text>
      </View>
    );
  };

  return (
    <View>
      {
        selectedCategory &&
        <ProductListScreen
          products={ categoryProduct.products }
          isFetching={ isFetching }
          hasMoreData={ false }
          refreshing={ refreshing }
          onRefresh={ onRefresh }
          onLimitChange={ () => { } }
        />
      }
    </View>
  )
}

export default CategoryProducts
