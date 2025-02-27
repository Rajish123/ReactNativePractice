import { useQuery } from '@tanstack/react-query'
import { StyleSheet, Text, View } from 'react-native'
import { FetchPaginatedProducts } from '../action/ProductAction'
import ProductListScreen from './ProductListScreen';
import { useEffect, useMemo, useState } from 'react';

const HomeScreen = () => {
  const [ limit, setLimit ] = useState(10);
  const [ allProducts, setAllProducts ] = useState([]);
  const [ refreshing, setRefreshing ] = useState(false);
  const { data: products = [], isError, isFetching, refetch } = useQuery({
    queryKey: [ 'products', limit ],         // Query key for caching and invalidation
    queryFn: () => FetchPaginatedProducts(limit),
    keepPreviousData: true,
  });

  const handleLimitChange = () => {
    setLimit((prev) => prev + 10);
  };

  const hasMoreData = useMemo(() => {
    return products?.products?.length === limit;
  }, [ products ]);


  useEffect(() => {
    if (Array.isArray(products?.products) && products.products.length > 0) {
      setAllProducts(products.products);
    }
  }, [ products ]);

  if (isError) {
    return (
      <View style={ styles.center }>
        <Text>Error fetching products!</Text>
      </View>
    );
  };

  const onRefresh = () => {
    setLimit(10);
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false))
  };

  return (
    <View style={ styles.container }>
      <Text style={ styles.header }>
        Rajish Ecommerce
      </Text>

      <ProductListScreen
        products={ allProducts }
        isFetching={ isFetching }
        hasMoreData={ hasMoreData }
        refreshing={ refreshing }
        onRefresh={ onRefresh }
        onLimitChange={ handleLimitChange }
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default HomeScreen
