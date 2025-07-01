/*import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConsumedScreen = ({ navigation, route }) => {
  const [consumed, setConsumed] = useState([]);
  const [foods, setFoods] = useState([]);

  // Carrega os dados do AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedFoods = await AsyncStorage.getItem('@foods');
        if (savedFoods) setFoods(JSON.parse(savedFoods));
        
        // Prioriza os dados recebidos por parâmetro
        if (route.params?.consumed) {
          setConsumed(route.params.consumed);
          await AsyncStorage.setItem('@consumed', JSON.stringify(route.params.consumed));
        } else {
          // Se não houver parâmetros, carrega do AsyncStorage
          const savedConsumed = await AsyncStorage.getItem('@consumed');
          if (savedConsumed) setConsumed(JSON.parse(savedConsumed));
        }
      } catch (e) {
        console.error('Erro ao carregar dados', e);
      }
    };
    
    loadData();
  }, [route.params?.consumed]);

  // Função para forçar recarregamento
  const refreshData = () => {
    setShouldReload(prev => !prev);
  };

  // Limpa todos os alimentos consumidos
  const clearAllConsumed = async () => {
    Alert.alert(
      "Limpar tudo",
      "Tem certeza que deseja remover todos os alimentos da lista?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Limpar", 
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('@consumed');
              setConsumed([]);
              refreshData();
              Alert.alert('Sucesso', 'Todos os alimentos foram removidos!');
            } catch (error) {
              console.error('Erro ao limpar dados:', error);
              Alert.alert('Erro', 'Não foi possível limpar os dados');
            }
          }
        }
      ]
    );
  };

  // Calcula o total de calorias consumidas
  const totalCalories = consumed.reduce((sum, item) => sum + (item.calories || 0), 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color="#2F4F4F" />
        </TouchableOpacity>
        <Text style={styles.title}>Alimentos Consumidos</Text>
        <View style={{ width: 25 }} />
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total de itens: {consumed.length}</Text>
        <Text style={styles.summaryText}>Total de calorias: {totalCalories}kcal</Text>
        {consumed.length > 0 && (
          <TouchableOpacity 
            style={styles.clearAllButton}
            onPress={clearAllConsumed}
          >
            <Ionicons name="trash-outline" size={18} color="#FF5252" />
            <Text style={styles.clearAllButtonText}>Limpar Tudo</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        {consumed.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="fast-food-outline" size={50} color="#888" />
            <Text style={styles.emptyText}>Nenhum alimento consumido hoje</Text>
            <Text style={styles.emptySubText}>Adicione alimentos clicando neles na tela principal</Text>
            
            <TouchableOpacity 
              style={styles.addFoodButton}
              onPress={() => navigation.navigate('Alimentation')}
            >
              <Ionicons name="restaurant" size={20} color="#fff" />
              <Text style={styles.addFoodButtonText}>Ver Alimentos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={consumed}
            keyExtractor={(item) => item.id + item.consumedAt}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.consumedItem}>
                <View style={styles.itemLeft}>
                  <Ionicons 
                    name={item.category === 'frutas' ? 'nutrition' : 
                          item.category === 'vegetais' ? 'leaf' : 
                          item.category === 'proteínas' ? 'fish' : 'fast-food'} 
                    size={25} 
                    color={
                      item.category === 'frutas' ? '#4CAF50' : 
                      item.category === 'vegetais' ? '#4CAF50' : 
                      item.category === 'proteínas' ? '#FF9800' : '#FF5252'
                    } 
                  />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDetails}>
                      {item.calories}kcal • {item.consumedQuantity} • {new Date(item.consumedAt).toLocaleTimeString()}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => removeFromConsumed(item.id)}>
                  <Ionicons name="trash-outline" size={20} color="#FF5252" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
        
        {foods.length > 0 && (
          <View style={styles.quickAddSection}>
            <Text style={styles.sectionTitle}>Adicionar Rapidamente</Text>
            <Text style={styles.sectionSubtitle}>Toque em um alimento para adicionar à lista</Text>
            
            <FlatList
              data={foods.slice(0, 5)} // Mostra apenas os 5 primeiros para não ocupar muito espaço
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.foodItem} 
                  onPress={() => addToConsumed(item)}
                >
                  <Ionicons 
                    name={item.category === 'frutas' ? 'nutrition' : 
                          item.category === 'vegetais' ? 'leaf' : 
                          item.category === 'proteínas' ? 'fish' : 'fast-food'} 
                    size={25} 
                    color={
                      item.category === 'frutas' ? '#4CAF50' : 
                      item.category === 'vegetais' ? '#4CAF50' : 
                      item.category === 'proteínas' ? '#FF9800' : '#FF5252'
                    } 
                  />
                  <View style={styles.foodInfo}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <Text style={styles.foodDetails}>{item.calories}kcal • {item.quantity}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </ScrollView>
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
    justifyContent: 'space-between',
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    position: 'relative',
  },
  summaryText: {
    fontSize: 16,
    color: '#2F4F4F',
    marginBottom: 5,
  },
  clearAllButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  clearAllButtonText: {
    color: '#FF5252',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#2F4F4F',
    marginTop: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  addFoodButton: {
    flexDirection: 'row',
    backgroundColor: '#4682B4',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  addFoodButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  consumedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemInfo: {
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F4F4F',
  },
  itemDetails: {
    fontSize: 14,
    color: '#888',
    marginTop: 3,
  },
  quickAddSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
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
  foodInfo: {
    marginLeft: 15,
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F4F4F',
  },
  foodDetails: {
    fontSize: 14,
    color: '#888',
    marginTop: 3,
  },
});

export default ConsumedScreen; */