import { useQuery } from "@tanstack/react-query"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { FetchALlCategories, FetchCategoryProducts } from "../action/ProductAction"
import CategoryListScreen from "./CategoryListScreen"
import { useState } from "react"
import CategoryProducts from "./CategoryProducts"

const CategoryScreen = () => {
  const [ selectedCategory, setSelectedCategory ] = useState('');
  const [ openCatProduct, setOpenCatProduct ] = useState(false);

  const {
    data: category = {},
    isError,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: [ 'category' ],         // Query key for caching and invalidation
    queryFn: () => FetchALlCategories(),
    keepPreviousData: true,
  });

  if (isError) {
    return (
      <View style={ styles.center }>
        <Text>Error fetching category!</Text>
      </View>
    );
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setOpenCatProduct(true);
  };

  return (
    <View style={ styles.container }>
      <View style={ styles.center }>
        <Text>
          All Category
        </Text>
      </View>

      <View style={ styles.chipContainer }>
        {
          isLoading ? (
            <View style={ styles.loadMoreContainer }>
              <ActivityIndicator size="small" color="#007bff" />
            </View>
          ) : isFetched && Array.isArray(category.categories) && category.categories.length > 0 ? (
            category.categories.map((cat, index) => (
              <CategoryListScreen
                key={ `category_${index}` }
                category={ cat }
                selectedCategory={ selectedCategory }
                onCategorySelect={ (category) => handleSelectCategory(category) }
              />
            ))
          ) : (
            <Text>No categories available</Text>
          )
        }
      </View>

      <View>
        {
          (openCatProduct && selectedCategory && selectedCategory.length > 0) &&
          <CategoryProducts selectedCategory={ selectedCategory } />
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'start',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
});

export default CategoryScreen
