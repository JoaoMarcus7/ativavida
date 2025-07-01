import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text, ScrollView, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialFoods = [
  { id: '1', name: 'Maçã', calories: 52, quantity: '100g', category: 'frutas' },
  { id: '2', name: 'Banana', calories: 89, quantity: '100g', category: 'frutas' },
  { id: '3', name: 'Peito de Frango', calories: 165, quantity: '100g', category: 'proteínas' },
  { id: '4', name: 'Arroz Integral', calories: 112, quantity: '100g', category: 'carboidratos' },
  { id: '5', name: 'Brócolis', calories: 34, quantity: '100g', category: 'vegetais' },
];

const loadFoodsData = async () => {
  try {
    const savedFoods = await AsyncStorage.getItem('@foods');
    return {
      foods: savedFoods ? JSON.parse(savedFoods) : initialFoods
    };
  } catch (e) {
    console.error('Erro ao carregar alimentos', e);
    return {
      foods: initialFoods
    };
  }
};

const AlimentationScreen = ({ navigation }) => {
  const [foods, setFoods] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newFood, setNewFood] = useState({
    name: '',
    calories: '',
    quantity: '100g',
    category: 'outros'
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      const { foods } = await loadFoodsData();
      setFoods(foods);
      
      if (!await AsyncStorage.getItem('@foods')) {
        await AsyncStorage.setItem('@foods', JSON.stringify(initialFoods));
      }
    };
    
    initializeData();
  }, []);

  const saveFoods = async (updatedFoods) => {
    try {
      await AsyncStorage.setItem('@foods', JSON.stringify(updatedFoods));
    } catch (e) {
      console.error('Erro ao salvar alimentos', e);
    }
  };

  const addToConsumed = async (food) => {
    const foodWithTimestamp = {
      ...food,
      consumedAt: new Date().toISOString(),
      consumedQuantity: food.quantity
    };
    
    const currentConsumed = await AsyncStorage.getItem('@consumed');
    const consumedArray = currentConsumed ? JSON.parse(currentConsumed) : [];
    
    const updatedConsumed = [...consumedArray, foodWithTimestamp];
    
    await AsyncStorage.setItem('@consumed', JSON.stringify(updatedConsumed));
    
    navigation.navigate('Consumed', { consumed: updatedConsumed });
    
    Alert.alert('Sucesso', `${food.name} foi adicionado à sua lista de consumidos!`);
  };

  const handleAddFood = async () => {
    if (!newFood.name || !newFood.calories) {
      Alert.alert('Atenção', 'Preencha pelo menos o nome e as calorias do alimento');
      return;
    }
    
    const foodToAdd = {
      ...newFood,
      id: Date.now().toString(),
      calories: parseInt(newFood.calories) || 0
    };
    
    const updatedFoods = [...foods, foodToAdd];
    setFoods(updatedFoods);
    await saveFoods(updatedFoods);
    
    setNewFood({ name: '', calories: '', quantity: '100g', category: 'outros' });
    setShowAddForm(false);
  };

  const handleFoodPress = (food) => {
    Alert.alert(
      food.name,
      `Informação Nutricional:\n\nCalorias: ${food.calories}kcal\nQuantidade: ${food.quantity}\nCategoria: ${food.category}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Adicionar à lista de consumidos', 
          onPress: () => addToConsumed(food) 
        }
      ]
    );
  };

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory ? food.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
    setSearchText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back" size={25} color="#2F4F4F" />
        </TouchableOpacity>
        <Text style={styles.title}>Nutrição</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Consumed')}
          style={styles.consumedButton}
        >
          <Ionicons name="list" size={25} color="#2F4F4F" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar alimentos..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <Text style={styles.sectionTitle}>Categorias</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          <TouchableOpacity 
            style={[
              styles.categoryCard, 
              selectedCategory === 'frutas' && styles.selectedCategoryCard
            ]} 
            onPress={() => handleCategorySelect('frutas')}
          >
            <Ionicons name="nutrition" size={30} color="#4CAF50" />
            <Text style={styles.categoryText}>Frutas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.categoryCard, 
              selectedCategory === 'vegetais' && styles.selectedCategoryCard
            ]} 
            onPress={() => handleCategorySelect('vegetais')}
          >
            <Ionicons name="leaf" size={30} color="#4CAF50" />
            <Text style={styles.categoryText}>Vegetais</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.categoryCard, 
              selectedCategory === 'proteínas' && styles.selectedCategoryCard
            ]} 
            onPress={() => handleCategorySelect('proteínas')}
          >
            <Ionicons name="fish" size={30} color="#FF9800" />
            <Text style={styles.categoryText}>Proteínas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.categoryCard, 
              selectedCategory === 'carboidratos' && styles.selectedCategoryCard
            ]} 
            onPress={() => handleCategorySelect('carboidratos')}
          >
            <Ionicons name="fast-food" size={30} color="#FF5252" />
            <Text style={styles.categoryText}>Carboidratos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.categoryCard} 
            onPress={() => {
              setSelectedCategory(null);
              setSearchText('');
            }}
          >
            <Ionicons name="list" size={30} color="#4682B4" />
            <Text style={styles.categoryText}>Todos</Text>
          </TouchableOpacity>
        </ScrollView>

        {showAddForm && (
          <View style={styles.addForm}>
            <Text style={styles.formTitle}>Adicionar Novo Alimento</Text>
            
            <Text style={styles.inputLabel}>Nome do alimento</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Maçã"
              value={newFood.name}
              onChangeText={(text) => setNewFood({...newFood, name: text})}
            />
            
            <Text style={styles.inputLabel}>Calorias (por 100g)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 52"
              keyboardType="numeric"
              value={newFood.calories}
              onChangeText={(text) => setNewFood({...newFood, calories: text})}
            />
            
            <Text style={styles.inputLabel}>Quantidade padrão</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 100g, 1 unidade"
              value={newFood.quantity}
              onChangeText={(text) => setNewFood({...newFood, quantity: text})}
            />
            
            <Text style={styles.inputLabel}>Categoria</Text>
            <View style={styles.categoryOptions}>
              <TouchableOpacity
                style={[styles.categoryOption, newFood.category === 'frutas' && styles.categoryOptionSelected]}
                onPress={() => setNewFood({...newFood, category: 'frutas'})}
              >
                <Ionicons name="nutrition" size={20} color="#4CAF50" />
                <Text style={styles.categoryOptionText}>Frutas</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.categoryOption, newFood.category === 'vegetais' && styles.categoryOptionSelected]}
                onPress={() => setNewFood({...newFood, category: 'vegetais'})}
              >
                <Ionicons name="leaf" size={20} color="#4CAF50" />
                <Text style={styles.categoryOptionText}>Vegetais</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.categoryOption, newFood.category === 'proteínas' && styles.categoryOptionSelected]}
                onPress={() => setNewFood({...newFood, category: 'proteínas'})}
              >
                <Ionicons name="fish" size={20} color="#FF9800" />
                <Text style={styles.categoryOptionText}>Proteínas</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.categoryOption, newFood.category === 'carboidratos' && styles.categoryOptionSelected]}
                onPress={() => setNewFood({...newFood, category: 'carboidratos'})}
              >
                <Ionicons name="fast-food" size={20} color="#FF5252" />
                <Text style={styles.categoryOptionText}>Carboidratos</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.formButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddForm(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddFood}>
                <Text style={styles.saveButtonText}>Salvar Alimento</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle}>Todos os Alimentos</Text>
        {filteredFoods.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="sad-outline" size={50} color="#888" />
            <Text style={styles.emptyText}>Nenhum alimento encontrado</Text>
          </View>
        ) : (
          <FlatList
            data={filteredFoods}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.foodItem} onPress={() => handleFoodPress(item)}>
                <Ionicons 
                  name={item.category === 'frutas' ? 'nutrition' : 
                        item.category === 'vegetais' ? 'leaf' : 
                        item.category === 'proteínas' ? 'fish' : 'fast-food'} 
                  size={30} 
                  color={
                    item.category === 'frutas' ? '#4CAF50' : 
                    item.category === 'vegetais' ? '#4CAF50' : 
                    item.category === 'proteínas' ? '#FF9800' : '#FF5252'
                  } 
                  style={styles.foodIcon} 
                />
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodDetails}>{item.calories}kcal • {item.quantity}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#888" />
              </TouchableOpacity>
            )}
          />
        )}
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => setShowAddForm(!showAddForm)}
      >
        <Ionicons name={showAddForm ? "close" : "add"} size={24} color="#fff" />
        <Text style={styles.addButtonText}>
          {showAddForm ? "Cancelar" : "Adicionar Alimento"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 50,
    backgroundColor: '#B0E0E6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginLeft: 15,
  },
  consumedButton: {
    marginLeft: 'auto',
    padding: 5
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#333',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginBottom: 15,
    marginTop: 10,
  },
  categoriesScroll: {
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    padding: 12,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedCategoryCard: {
    backgroundColor: '#e3f2fd',
    borderColor: '#4682B4',
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 12,
    color: '#2F4F4F',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '500',
  },
  addForm: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    marginTop: 10,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  categoryOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    width: '48%',
    borderWidth: 1,
    borderColor: '#eee',
  },
  categoryOptionSelected: {
    backgroundColor: '#e3f2fd',
    borderColor: '#4682B4',
  },
  categoryOptionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  saveButton: {
    backgroundColor: '#4682B4',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 16,
  },
  foodItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  foodIcon: {
    marginRight: 15,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F4F4F',
    marginBottom: 3,
  },
  foodDetails: {
    fontSize: 14,
    color: '#888',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#4682B4',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default AlimentationScreen;