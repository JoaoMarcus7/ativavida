import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const ExercisesScreen = ({ navigation }) => {
  const exercises = [
    {
      id: 1,
      name: 'Flexões',
      description: '3 séries de 12 repetições',
      category: 'Superiores',
      color: '#FF6B6B',
      duration: '1 minuto' // Adicionei duração para cada exercício
    },
    {
      id: 2,
      name: 'Agachamentos',
      description: '4 séries de 15 repetições',
      category: 'Inferiores',
      color: '#4ECDC4',
      duration: '1 minuto'
    },
    {
      id: 3,
      name: 'Abdominais',
      description: '3 séries de 20 repetições',
      category: 'Core',
      color: '#45B7D1',
      duration: '1 minuto'
    },
    {
      id: 4,
      name: 'Prancha',
      description: '3 séries de 1 minuto',
      category: 'Core',
      color: '#45B7D1',
      duration: '1 minuto'
    },
    {
      id: 5,
      name: 'Corrida Estacionária',
      description: '3 séries de 1 minuto',
      category: 'Cardio',
      color: '#FFA500',
      duration: '1 minuto'
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('../assets/seta.png')}
          style={styles.seta}
        />
      </TouchableOpacity>

      <View style={styles.spacer} />

      <View style={styles.header}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo} 
        />
        <Text style={styles.title}>Exercícios Disponíveis</Text>
      </View>

      <ScrollView style={styles.exercisesContainer}>
        {exercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={[styles.exerciseButton, { backgroundColor: exercise.color }]}
            onPress={() => navigation.navigate('TimeOut', { exercise })}
          >
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDescription}>{exercise.description}</Text>
            <Text style={styles.exerciseCategory}>{exercise.category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0E0E6',
    padding: 20,
  },
  seta: {
    width: 25,
    height: 25,
    marginTop: 30,
    marginHorizontal: 5,
  },
  spacer: {
    flex: 0.3,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0288D1',
    textAlign: 'center',
    marginBottom: 30,
  },
  exercisesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  exerciseButton: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
  },
  exerciseName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  exerciseDescription: {
    color: '#FFF',
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 5,
  },
  exerciseCategory: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
});

export default ExercisesScreen;