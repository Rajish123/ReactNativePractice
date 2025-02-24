import { useQuery } from "@tanstack/react-query"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { FetchALlCategories, FetchCategoryProducts } from "../action/ProductAction"
import CategoryListScreen from "./CategoryListScreen"
import { useState } from "react"

const CategoryScreen = () => {
  const [ selectedCategory, setSelectedCategory ] = useState(null);

  const {
    data: category,
    isError,
    isLoading,
    isFetched,
    refetch
  } = useQuery({
    queryKey: [ 'category' ],         // Query key for caching and invalidation
    queryFn: () => FetchALlCategories(),
    keepPreviousData: true,
  });

  const {
    data: categoryProduct
  } = useQuery({
    queryKey: [ 'categoryProduct' ],
    queryFn: () => FetchCategoryProducts(selectedCategory),
    enabled: selectedCategory !== null
  });

  if (isError) {
    return (
      <View style={ styles.center }>
        <Text>Error fetching category!</Text>
      </View>
    );
  };
  return (
    <View style={ styles.center }>
      <Text>
        All Category
      </Text>

      {
        isLoading ? (
          <View style={ styles.loadMoreContainer }>
            <ActivityIndicator size="small" color="#007bff" />
          </View>
        ) : isFetched && (
          category && category.length > 0 && category.map((cat, index) => {
            return (
              <CategoryListScreen
                category={ cat }
                // onSelectCategory={ }
              />
            )
          })
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CategoryScreen
