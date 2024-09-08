import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const FatLoss = () => {
  const navigation = useNavigation();

  const workouts = [
    { name: 'Frog Press', time: 30 },
    { name: 'Dumbbell', time: 30 },
    { name: 'Leg Press', time: 30 },
    { name: 'Lunges', time: 30 },
  ];

  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [workoutStarted, setWorkoutStarted] = useState(false);

  useEffect(() => {
    let interval;

    if (workoutStarted && currentWorkoutIndex < workouts.length) {
      const currentWorkout = workouts[currentWorkoutIndex];

      interval = setInterval(() => {
        if (currentWorkout.time > 0) {
          workouts[currentWorkoutIndex].time--;
        } else {
          setCurrentWorkoutIndex(prevIndex => prevIndex + 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [workoutStarted, currentWorkoutIndex, workouts]);

  const startWorkout = () => {
    setCurrentWorkoutIndex(0);
    setWorkoutStarted(true);
  };

  const repeatWorkout = () => {
    setCurrentWorkoutIndex(0);
    workouts.forEach(workout => (workout.time = 30));
  };

  return (
    <View style={styles.container}>
      {/* Header Box */}
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>Fat Loss</Text>
        <View style={styles.innerBox}>
          <Text style={styles.subHeaderText}>5 Workouts, 2 Minutes</Text>
        </View>
        <Text style={styles.extraText}>
          Burn calories and shed excess fat with these quick and effective workouts.
        </Text>
      </View>

      {/* Workouts Section */}
      <View style={styles.workoutsContainer}>
        {workouts.map((workout, index) => (
          <View
            key={index}
            style={[
              styles.workoutBox,
              workoutStarted && currentWorkoutIndex === index && styles.currentWorkoutBox,
            ]}
          >
            <Text>{`${workout.name}: ${workout.time}s`}</Text>
          </View>
        ))}
      </View>

      {/* Start Button */}
      {!workoutStarted && (
        <TouchableOpacity style={styles.startButton} onPress={startWorkout}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      )}

      {/* Finished Workout */}
      {workoutStarted && currentWorkoutIndex === workouts.length && (
        <View style={styles.finishedBox}>
          <Text style={styles.finishedText}>Finished Workout</Text>
          <TouchableOpacity style={styles.repeatButton} onPress={repeatWorkout}>
            <Text style={styles.repeatButtonText}>Repeat</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Navigation Section */}
      <View style={styles.navigationContainer}>
        {/* HOME btn */}
        <TouchableOpacity onPress={() => navigation.navigate('Homepage')}>
          <Ionicons name="home-outline" size={24} color="black" />
        </TouchableOpacity>

        {/* Back btn */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6b6b6b',
  },
  headerBox: {
    backgroundColor: '#333',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  innerBox: {
    backgroundColor: '#6b6b6b',
    padding: 10,
    borderRadius: 8,
  },
  extraText: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  workoutsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  workoutBox: {
    width: '48%',
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  currentWorkoutBox: {
    backgroundColor: '#87CEEB', // Light Blue background for the current workout
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  finishedBox: {
    alignItems: 'center',
    marginTop: 20,
  },
  finishedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  repeatButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  repeatButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 15,
    fontSize: 20,
    width: '100%',
  },
});

export default FatLoss;
