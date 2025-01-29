import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ToggleList = ({ data }) => {
  const [visibleItems, setVisibleItems] = useState([]);

  const toggleItemVisibility = (itemId) => {
    setVisibleItems((prevVisibleItems) =>
      prevVisibleItems.includes(itemId)
        ? prevVisibleItems.filter((item) => item !== itemId)
        : [...prevVisibleItems, itemId]
    );
  };

  const renderItem = ({ item }) => {
    const isVisible = visibleItems.includes(item.id);

    return (
      <TouchableOpacity onPress={() => toggleItemVisibility(item.id)}>
        <Text style={[styles.listItem, isVisible && styles.listItemVisible]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {data.map((item) => (
        <View key={item.id}>{renderItem({ item })}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  listItem: {
    fontSize: 20,
    padding: 10,
  },
  listItemVisible: {
    backgroundColor: '#e6e6e6', // Change the background color when the item is visible
  },
});

export default ToggleList;
