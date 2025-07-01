import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const { userData } = route.params || {
    userData: {
      name: 'Usuário',
      email: 'usuário@exemplo.com',
      age: '30',
      height: '170',
      weight: '70'
    }
  };

  // Função para gerar iniciais do nome
  const getInitials = (name) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
          style={styles.backButton}
        >
          <Image
            source={require('../assets/seta.png')}
            style={styles.seta}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate('Profile')}
          style={styles.avatarContainer}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(userData.name)}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bem-vindo, {userData.name}!</Text>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.infoText}>Email: {userData.email}</Text>
        <Text style={styles.infoText}>Idade: {userData.age} anos</Text>
        <Text style={styles.infoText}>Altura: {userData.height} cm</Text>
        <Text style={styles.infoText}>Peso: {userData.weight} kg</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.optionButton, { backgroundColor: '#FFC130' }]}
          onPress={() => navigation.navigate('Alimentation')}
        >
          <Text style={styles.optionButtonText}>Alimentação</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionButton, { backgroundColor: '#4CAF50' }]}
          onPress={() => navigation.navigate('Exercise')}
        >
          <Text style={styles.optionButtonText}>Exercícios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionButton, { backgroundColor: '#45B7D1' }]}
          onPress={() => navigation.navigate('Hydration')}
        >
          <Text style={styles.optionButtonText}>Hydratação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0E0E6',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    marginTop: 40,
    padding: 10,
  },
  seta: {
    width: 25,
    height: 25,
  },
  avatarContainer: {
    marginTop: 40,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0288D1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  header: {
    alignItems: 'center',
    marginBottom: 35,
    marginTop: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0288D1',
    textAlign: 'center',
  },
  profileInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 40,
    marginHorizontal: 10,
  },
  infoText: {
    fontSize: 20,
    color: '#333',
    marginBottom: 12,
    lineHeight: 20,
    alignItems: 'center',
    fontWeight: '700'
  },
  buttonsContainer: {
    marginHorizontal: 10,
    gap: 20,
  },
  optionButton: {
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  optionButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default HomeScreen;