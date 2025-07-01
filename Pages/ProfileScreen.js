import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';

const ProfileScreen = ({ route, navigation }) => {
  const { email } = route.params || { email: 'usuário@exemplo.com' };
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleContinue = () => {
    if (!name || !age || !height || !weight) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    navigation.navigate('Home', {
      userData: {
        name,
        email,
        age,
        height,
        weight
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../assets/seta.png')}
              style={styles.seta}
              onPress={() => navigation.navigate('Login')}
            />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Insira seus dados</Text>
          </View>
          
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Idade"
              placeholderTextColor="#999"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Altura (cm)"
              placeholderTextColor="#999"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Peso (kg)"
              placeholderTextColor="#999"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
            
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0E0E6',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,  // Reduzi esta margem
    marginTop: 60,    // Aumentei o espaçamento do topo
  },
  title: {
    fontSize: 50,
    fontWeight: '500',
    color: '#0288D1',
    textAlign: 'center',
    marginBottom: 5,  // Reduzi esta margem
  },
  formContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 0,  // Subi o formulário para ficar mais próximo do título
  },
  input: {
    height: 70,
    width: '100%',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginBottom: 20,  // Reduzi o espaçamento entre os inputs
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#0288D1',
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 15,    // Reduzi esta margem
    width: '100%',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
  seta: {
    width: 25,
    height: 25,
    marginTop: 40,
    marginHorizontal: 5,
  },
});

export default ProfileScreen;