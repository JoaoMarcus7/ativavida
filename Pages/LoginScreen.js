import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard 
} from 'react-native';
import {useState} from 'react'
import { initializeApp } from "firebase/app";

const LoginScreen = ({ navigation }) => {
    const firebaseConfig = {
    apiKey: "AIzaSyAV50muO4U5cInE20G_K003oQa6chnPtRw",
    authDomain: "ativa-vida.firebaseapp.com",
    projectId: "ativa-vida",
    storageBucket: "ativa-vida.firebasestorage.app",
    messagingSenderId: "282400954907",
    appId: "1:282400954907:web:1e9341548858db0fe736be"
  };

  const app = initializeApp(firebaseConfig);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      // Navega para a tela Home passando o email como parâmetro
      navigation.navigate('Home', { 
        userData: {
          email: email,
          name: 'Usuário', // Você pode substituir por dados reais
          age: '30',
          height: '170',
          weight: '70'
        }
      });
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Image 
              source={require('../assets/logo.png')} 
              style={styles.logo} 
            />
            <Text style={styles.appName}>Ativa Vida</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.registerText}>
                Não tem uma conta? <Text style={styles.registerLink}>Cadastre-se</Text>
              </Text>
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
    padding: 5,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200, 
    marginBottom: 15,
  },
  appName: {
    fontSize: 32, 
    fontWeight: '700',
    color: '#0288D1',
    letterSpacing: 0.8,
  },
  formContainer: {
    backgroundColor: 'transparent', 
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 25, 
    backgroundColor: '#FFFFFF', 
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#0288D1',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  registerText: {
    textAlign: 'center',
    color: '#3271a8',
    fontSize: 14,
  },
  registerLink: {
    color: '#3271a8',
    fontWeight: '600',
  },
});

export default LoginScreen;