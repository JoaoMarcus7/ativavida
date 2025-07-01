import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image,  Alert, TouchableWithoutFeedback, Keyboard, ScrollView, ActivityIndicator
} from 'react-native';
import { useState } from 'react';
import { initializeApp } from "firebase/app";

const CadastroScreen = ({ navigation }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyAV50muO4U5cInE20G_K003oQa6chnPtRw",
    authDomain: "ativa-vida.firebaseapp.com",
    projectId: "ativa-vida",
    storageBucket: "ativa-vida.firebasestorage.app",
    messagingSenderId: "282400954907",
    appId: "1:282400954907:web:1e9341548858db0fe736be"
  };

  const app = initializeApp(firebaseConfig);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { supabase } = useSupabase(); // Obtenha o cliente Supabase

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    setLoading(true);
    try {
      // 1. Registrar usuário no Supabase Auth
      const { data: { user }, error: authError } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            full_name: nome
          }
        }
      });

      if (authError) throw authError;

      // 2. Criar perfil na tabela profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: user.id,
          name: nome,
          email: email,
          age: '',
          height: '',
          weight: ''
        }]);

      if (profileError) throw profileError;

      // 3. Navegar para a tela de perfil com os dados
      navigation.navigate('Profile', {
        nome,
        email,
        idade: '',
        altura: '',
        peso: '',
      });

    } catch (error) {
      Alert.alert('Erro no cadastro', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para testar a conexão com o Supabase
  const testSupabaseConnection = async () => {
    try {
      Alert.alert('Testando Supabase', 'Verificando conexão...');
      
      // Teste de consulta simples
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);
      
      if (error) throw error;
      
      Alert.alert('✅ Conexão OK!', 'Supabase conectado com sucesso');
      console.log('Dados recebidos:', data);
    } catch (error) {
      Alert.alert('❌ Erro na conexão', error.message);
      console.error('Erro detalhado:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Image
                source={require('../assets/seta.png')}
                style={styles.seta}
              />
            </TouchableOpacity>
            
            <View style={styles.header}>
              <Image source={require('../assets/logo.png')} style={styles.logo} />
              <Text style={styles.title}>Crie sua conta</Text>
            </View>

            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                placeholderTextColor="#999"
                value={nome}
                onChangeText={setNome}
                returnKeyType="next"
                editable={!loading}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                editable={!loading}
              />

              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#999"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                returnKeyType="next"
                editable={!loading}
              />

              <TextInput
                style={styles.input}
                placeholder="Confirmar Senha"
                placeholderTextColor="#999"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
                returnKeyType="done"
                editable={!loading}
              />

              <TouchableOpacity
                style={styles.continuarButton}
                onPress={handleCadastro}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.continuarButtonText}>Continuar</Text>
                )}
              </TouchableOpacity>

              {/* Botão de teste do Supabase */}
              <TouchableOpacity
                style={[styles.continuarButton, { backgroundColor: '#4CAF50', marginTop: 10 }]}
                onPress={testSupabaseConnection}
              >
                <Text style={styles.continuarButtonText}>Testar Conexão Supabase</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                style={styles.loginLinkContainer}
                disabled={loading}
              >
                <Text style={styles.loginText}>
                  Já tem uma conta? <Text style={styles.loginLink}>Faça login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Mantenha os mesmos estilos que você já tinha
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0E0E6',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: 15,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0288D1',
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    maxWidth: 400,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  continuarButton: {
    backgroundColor: '#0288D1',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    maxWidth: 400,
  },
  continuarButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  loginText: {
    marginTop: 20,
    color: '#555',
    textAlign: 'center',
  },
  loginLink: {
    color: '#0288D1',
    fontWeight: '600',
  },
  loginLinkContainer: {
    marginTop: 20,
    width: '100%',
  },
  seta: {
    width: 25,
    height: 25,
    marginTop: 30,
    marginHorizontal: 5,
  },
});

export default CadastroScreen;