// App.tsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuProvider, useMenu } from './MenuContext';
import MenuItem from './MenuItem';

const Stack = createStackNavigator();

//////////////////////
// HOME SCREEN
//////////////////////
const HomeScreen = ({ navigation }) => {
  const { menuItems } = useMenu();

  // Calculate average prices
  const averages = {};
  const counts = {};
  menuItems.forEach(item => {
    averages[item.course] = (averages[item.course] || 0) + item.price;
    counts[item.course] = (counts[item.course] || 0) + 1;
  });

  const avgPrices = Object.keys(averages).map(course => ({
    course,
    avg: averages[course] / counts[course],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Christoffel's Kitchen</Text>
      <Text>Total Menu Items: {menuItems.length}</Text>

      {/* Average prices */}
      {avgPrices.map(a => (
        <Text key={a.course}>Average {a.course} price: R{a.avg.toFixed(2)}</Text>
      ))}

      {/* Full menu */}
      <FlatList
        data={menuItems}
        renderItem={({ item }) => <MenuItem item={item} />}
        keyExtractor={item => item.id.toString()}
      />

      {/* Navigation */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddManage')}>
          <Text style={styles.buttonText}>Add / Manage Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Filter')}>
          <Text style={styles.buttonText}>Filter Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//////////////////////
// ADD & MANAGE SCREEN
//////////////////////
const AddManageScreen = ({ navigation }) => {
  const { menuItems, addMenuItem, removeMenuItem } = useMenu();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [course, setCourse] = useState('starters');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!name || !desc || !price) {
      Alert.alert('Error', 'All fields required');
      return;
    }
    addMenuItem({
      id: Date.now(),
      name,
      description: desc,
      course,
      price: parseFloat(price),
    });
    setName('');
    setDesc('');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add / Manage Menu Items</Text>

      {/* Add form */}
      <TextInput style={styles.input} placeholder="Dish Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Description" value={desc} onChangeText={setDesc} />
      <Picker selectedValue={course} onValueChange={setCourse} style={styles.input}>
        <Picker.Item label="Starters" value="starters" />
        <Picker.Item label="Mains" value="mains" />
        <Picker.Item label="Desserts" value="desserts" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Price (R)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add to Menu</Text>
      </TouchableOpacity>

      {/* List with delete */}
      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text>{item.course} · R{item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => removeMenuItem(item.id)}>
              <Text style={styles.delete}>×</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={i => i.id.toString()}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

//////////////////////
// FILTER SCREEN
//////////////////////
const FilterScreen = ({ navigation }) => {
  const { menuItems } = useMenu();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? menuItems : menuItems.filter(i => i.course === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Course</Text>
      <View style={styles.buttonRow}>
        {['all', 'starters', 'mains', 'desserts'].map(c => (
          <TouchableOpacity
            key={c}
            style={[styles.button, filter === c && styles.active]}
            onPress={() => setFilter(c)}>
            <Text style={styles.buttonText}>{c.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text>Showing {filtered.length} items</Text>

      <FlatList
        data={filtered}
        renderItem={({ item }) => <MenuItem item={item} />}
        keyExtractor={item => item.id.toString()}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

//////////////////////
// MAIN APP
//////////////////////
export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddManage" component={AddManageScreen} />
          <Stack.Screen name="Filter" component={FilterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

//////////////////////
// STYLES
//////////////////////
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  button: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5 },
  active: { backgroundColor: '#004C99' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  addButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 5, marginVertical: 10, alignItems: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  delete: { fontSize: 22, color: 'red', paddingHorizontal: 10 },
  itemText: { fontWeight: 'bold' },
  backButton: { backgroundColor: '#555', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' },
});

     