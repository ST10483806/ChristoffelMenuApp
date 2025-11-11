import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MenuItem = ({ item }) => (
  <View style={styles.container}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.desc}>{item.description}</Text>
    <View style={styles.row}>
      <Text>{item.course}</Text>
      <Text>R{item.price}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  name: { fontWeight: 'bold', fontSize: 16 },
  desc: { color: '#555' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
});

export default MenuItem;
