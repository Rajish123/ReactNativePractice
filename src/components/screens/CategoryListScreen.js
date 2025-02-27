import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const CategoryListScreen = ({ category, selectedCategory, onCategorySelect }) => {
  return (
    <View>
      <TouchableOpacity style={[
        styles.chip,
        selectedCategory === category && styles.selectedChip,
      ]}
        onPress={ () => onCategorySelect(category) }
      >
        <Text style={ styles.chipText }>{ category }</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 4,
  },
  selectedChip: {
    backgroundColor: '#007bff',
  },
  chipText: {
    color: '#333',
  },
})

export default CategoryListScreen
