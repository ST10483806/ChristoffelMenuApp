import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';

// Simple data storage
let menuItems = [
  { id: '1', name: 'Bruschetta', description: 'Toasted bread with tomatoes', course: 'starters', price: '128.00' },
  { id: '2', name: 'Grilled Salmon', description: 'Fresh salmon with herbs', course: 'mains', price: '385.00' },
  { id: '3', name: 'Tiramisu', description: 'Classic Italian dessert', course: 'desserts', price: '160.00' }
];

// Home Screen
function HomeScreen({ setCurrentScreen }: any) {
  const totalItems = menuItems.length;
  
  // Calculate averages
  const averages: any = {};
  const counts: any = {};
  
  menuItems.forEach(item => {
    if (!counts[item.course]) {
      counts[item.course] = 0;
      averages[item.course] = 0;
    }
    counts[item.course] += 1;
    averages[item.course] += parseFloat(item.price);
  });
  
  Object.keys(averages).forEach(course => {
    averages[course] = (averages[course] / counts[course]).toFixed(2);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Christoffel's Kitchen</Text>
      
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
        <Text style={styles.averageText}>Starters: R{averages.starters || '0.00'}</Text>
        <Text style={styles.averageText}>Mains: R{averages.mains || '0.00'}</Text>
        <Text style={styles.averageText}>Desserts: R{averages.desserts || '0.00'}</Text>
      </View>

      <ScrollView style={styles.list}>
        {menuItems.map(item => (
          <View key={item.id} style={styles.menuItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemCourse}>{item.course} - R{item.price}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('add')}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('filter')}>
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Add Item Screen
function AddItemScreen({ setCurrentScreen }: any) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('starters');
  const [price, setPrice] = useState('');

  const addItem = () => {
    if (name && description && price) {
      const newItem = {
        id: Date.now().toString(),
        name,
        description,
        course,
        price: parseFloat(price).toFixed(2)
      };
      menuItems.push(newItem);
      setName('');
      setDescription('');
      setPrice('');
      setCurrentScreen('home');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Menu Item</Text>

      <Text style={styles.label}>Dish Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter name" />

      <Text style={styles.label}>Description:</Text>
      <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} placeholder="Enter description" multiline />

      <Text style={styles.label}>Course:</Text>
      <View style={styles.courseButtons}>
        <TouchableOpacity style={[styles.courseBtn, course === 'starters' && styles.activeCourse]} onPress={() => setCourse('starters')}>
          <Text style={styles.courseBtnText}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.courseBtn, course === 'mains' && styles.activeCourse]} onPress={() => setCourse('mains')}>
          <Text style={styles.courseBtnText}>Mains</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.courseBtn, course === 'desserts' && styles.activeCourse]} onPress={() => setCourse('desserts')}>
          <Text style={styles.courseBtnText}>Desserts</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Price (R):</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="0.00" keyboardType="numeric" />

      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setCurrentScreen('home')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.addButton]} onPress={addItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Filter Screen
// Filter Screen
function FilterScreen({ setCurrentScreen }: any) {
  const [selectedCourse, setSelectedCourse] = useState('all');
  
  const filteredItems = selectedCourse === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.course === selectedCourse);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>

      <View style={styles.filterButtons}>
        <TouchableOpacity style={[styles.filterBtn, selectedCourse === 'all' && styles.activeFilter]} onPress={() => setSelectedCourse('all')}>
          <Text style={styles.filterBtnText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterBtn, selectedCourse === 'starters' && styles.activeFilter]} onPress={() => setSelectedCourse('starters')}>
          <Text style={styles.filterBtnText}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterBtn, selectedCourse === 'mains' && styles.activeFilter]} onPress={() => setSelectedCourse('mains')}>
          <Text style={styles.filterBtnText}>Mains</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterBtn, selectedCourse === 'desserts' && styles.activeFilter]} onPress={() => setSelectedCourse('desserts')}>
          <Text style={styles.filterBtnText}>Desserts</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.results}>Showing {filteredItems.length} items</Text>

      <ScrollView style={styles.list}>
        {filteredItems.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('home')}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
// Main App
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  return (
    <View style={styles.app}>
      {currentScreen === 'home' && <HomeScreen setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'add' && <AddItemScreen setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'filter' && <FilterScreen setCurrentScreen={setCurrentScreen} />}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  summary: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  averageText: {
    fontSize: 14,
    color: '#666',
  },
  list: {
    flex: 1,
    marginBottom: 20,
  },
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  addButton: {
    backgroundColor: '#27ae60',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 80,
  },
  courseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  courseBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeCourse: {
    backgroundColor: '#3498db',
  },
  courseBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  filterBtn: {
    width: '48%',
    padding: 12,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  activeFilter: {
    backgroundColor: '#3498db',
  },
  filterBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  results: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: '#666',
  },
});