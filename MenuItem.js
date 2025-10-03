import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MenuItem = ({ item }) => {
  return (
    <View style={styles.menuItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemCourse}>{item.course} - R{item.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  itemCourse: {
    fontSize: 14,
    color: '#888',
  },
});

export default MenuItem;
