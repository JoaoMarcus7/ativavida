import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TimeOutScreen = ({ navigation, route }) => {
  const { exercise } = route.params;
  const [timeLeft, setTimeLeft] = useState(exercise.durationSeconds || 60);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isRestTime, setIsRestTime] = useState(false);

  // Função para descanso
  const descanso = () => {
    setTimeLeft(exercise.durationSeconds || 60);
    setIsCompleted(false);
    setIsRestTime(true);
  };

  // Função para repetir o exercício
  const repeatExercise = () => {
    setTimeLeft(exercise.durationSeconds || 60);
    setIsCompleted(false);
    setIsRestTime(false);
  };

  // Função para parar o exercício
  const stopExercise = () => {
    setIsCompleted(true);
    setTimeLeft(0);
    setIsRestTime(false);
  };

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isRestTime) {
      setIsRestTime(false);
    }
  }, [timeLeft, isCompleted, isRestTime]);

  return (
    <View style={styles.container}>
      {timeLeft > 0 && !isCompleted ? (
        <>
          <View style={styles.clockIcon}>
            <Text style={styles.clockText}>{timeLeft}</Text>
          </View>
          
          <Text style={styles.title}>
            {isRestTime ? 'Tempo de Descanso' : 'Exercício em Andamento'}
          </Text>
          
          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseName}>
              {isRestTime ? 'Descanso' : exercise.name}
            </Text>
            <Text style={styles.exerciseDescription}>
              {isRestTime ? 'Aproveite para recuperar suas energias!' : exercise.description}
            </Text>
            {!isRestTime && (
              <Text style={styles.durationText}>Duração: {exercise.duration}</Text>
            )}
          </View>

          {!isRestTime && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.stopButton]}
              onPress={stopExercise}
            >
              <Text style={styles.buttonText}>Parar Exercício</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <>
          <View style={[styles.clockIcon, { backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.clockText}>✓</Text>
          </View>
          
          <Text style={styles.title}>
            {isRestTime ? 'Descanso Concluído' : 'Exercício Concluído!'}
          </Text>
          
          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseName}>
              {isRestTime ? 'Descanso' : exercise.name}
            </Text>
            <Text style={styles.exerciseDescription}>
              {isCompleted ? 'Concluído antes do tempo!' : 'Concluído com sucesso!'}
            </Text>
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.repeatButton, styles.buttonRowItem]}
              onPress={repeatExercise}
            >
              <Text style={styles.buttonText}>Repetir</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.nextButton, styles.buttonRowItem]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
          
          {!isRestTime && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.restButton]}
              onPress={descanso}
            >
              <Text style={styles.buttonText}>Descanso</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0E0E6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  clockIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  clockText: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0288D1',
    marginBottom: 20,
    textAlign: 'center',
  },
  exerciseInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    alignItems: 'center',
    width: '100%',
  },
  exerciseName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 5,
  },
  exerciseDescription: {
    fontSize: 16,
    color: '#2C3E50',
    opacity: 0.8,
    marginBottom: 5,
    textAlign: 'center',
  },
  durationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  actionButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  nextButton: {
    backgroundColor: '#FF6B6B',
  },
  repeatButton: {
    backgroundColor: '#4ECDC4',
  },
  restButton: {
    backgroundColor: '#FFA500',
    width: '100%',
  },
  stopButton: {
    backgroundColor: '#FF6B6B',
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  buttonRowItem: {
    width: '48%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TimeOutScreen;