import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Alert, Image } from 'react-native';

const HydrationScreen = ({ navigation }) => {
  const [ml, setMl] = useState(0);
  const [progressAnim] = useState(new Animated.Value(0));
  const dailyGoal = 2000; // 2000ml = 2 litros (meta diária recomendada)
  
  // Efeito para animar a barra de progresso
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (ml / dailyGoal) * 100,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
    
    // Mostrar confirmação quando atingir a meta
    if (ml === dailyGoal) {
      Alert.alert('Parabéns!', 'Você atingiu sua meta diária de hidratação! 🎉', [
        { text: 'Ótimo!', onPress: () => console.log('Parabéns aceitos') }
      ]);
    }
  }, [ml]);

  const addWater = (amount) => {
    if (ml + amount <= dailyGoal) {
      setMl(ml + amount);
    } else {
      setMl(dailyGoal);
    }
  };

  const removeWater = (amount) => {
    if (ml - amount >= 0) {
      setMl(ml - amount);
    } else {
      setMl(0);
    }
  };

  // Formatação do contador
  const formatCounter = () => `${ml}ml / ${dailyGoal}ml`;

  return (
    <View style={styles.container}>
      {/* Botão de voltar - agora apenas uma seta */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('Home')}
        style={styles.backButton}
      >
        <Image
          source={require('../assets/seta.png')} // Certifique-se de ter esta imagem em seus assets
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Restante do código permanece igual */}
      <View style={styles.header}>
        <Text style={styles.waterIcon}>💧</Text>
        <Text style={styles.title}>Hidratação Diária</Text>
      </View>

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{formatCounter()}</Text>
        <Text style={styles.counterLabel}>consumidos hoje</Text>
        
        <View style={styles.progressBar}>
          <Animated.View 
            style={[
              styles.progressFill, 
              { 
                width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%']
                }) 
              }
            ]} 
          />
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={[styles.smallButton, styles.addButton]}
            onPress={() => addWater(200)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>+ 200ml</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.smallButton, styles.addButton]}
            onPress={() => addWater(300)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>+ 300ml</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={[styles.smallButton, styles.removeButton]}
            onPress={() => removeWater(200)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>- 200ml</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.smallButton, styles.removeButton]}
            onPress={() => removeWater(300)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>- 300ml</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Dicas para se manter hidratado:</Text>
        <Text style={styles.tip}>• Beba 2 litros de água por dia</Text>
        <Text style={styles.tip}>• Mantenha uma garrafa de 500ml sempre à vista</Text>
        <Text style={styles.tip}>• Beba antes de sentir sede</Text>
        <Text style={styles.tip}>• Consuma frutas ricas em água</Text>
        <Text style={styles.tip}>• Defina lembretes a cada 2 horas</Text>
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
  backButton: {
    marginTop: 40,
    padding: 10,
    alignSelf: 'flex-start',
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  // Restante dos estilos permanece igual
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  waterIcon: {
    fontSize: 70,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0288D1',
    textAlign: 'center',
  },
  counterContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  counterText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0077B6',
  },
  counterLabel: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
    marginTop: 5,
  },
  progressBar: {
    width: '85%',
    height: 25,
    backgroundColor: '#E0F7FA',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#45B7D1',
  },
  buttonsContainer: {
    marginVertical: 25,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  smallButton: {
    padding: 12,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  addButton: {
    backgroundColor: '#45B7D1',
  },
  removeButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0288D1',
    marginBottom: 12,
  },
  tip: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
});

export default HydrationScreen;