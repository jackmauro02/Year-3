// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Picker } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const WorkoutCustomization = () => {
//   const exercisesList = [
//     'Squats', 'Bench Press', 'Deadlifts', 'Pull-ups', 'Military Press',
//     'Running', 'Jumping', 'High Knees', 'Burpees', 'Cycling',
//     'Plank', 'Mountain Climbers', 'Jumping Jacks', 'Lunges', 'Leg Press',
//     'Frog Press', 'Dumbbell'
//   ];

//   const [selectedExercises, setSelectedExercises] = useState([]);
//   const [selectedTimers, setSelectedTimers] = useState({});
//   const timerOptions = [15, 30, 45, 60];

//   const handleExerciseSelection = (exercise) => {
//     if (selectedExercises.includes(exercise)) {
//       setSelectedExercises(selectedExercises.filter(item => item !== exercise));
//       setSelectedTimers(prevTimers => {
//         const { [exercise]: removedTimer, ...restTimers } = prevTimers;
//         return restTimers;
//       });
//     } else {
//       if (selectedExercises.length < 5) {
//         setSelectedExercises([...selectedExercises, exercise]);
//         setSelectedTimers(prevTimers => ({ ...prevTimers, [exercise]: timerOptions[0] }));
//       } else {
//         // Alert or some indication that the user can't select more than 5 exercises
//       }
//     }
//   };

//   const handleTimerSelection = (exercise, timer) => {
//     setSelectedTimers(prevTimers => ({ ...prevTimers, [exercise]: timer }));
//   };

//   const startWorkout = () => {
//     // Implement your logic to start the workout with selected exercises and timers
//     console.log('Selected Exercises:', selectedExercises);
//     console.log('Selected Timers:', selectedTimers);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Exercise Selection */}
//       <View style={styles.exerciseSelection}>
//         <Text style={styles.selectionTitle}>Select 5 Exercises:</Text>
//         <View style={styles.exerciseList}>
//           {exercisesList.map((exercise, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.exerciseItem,
//                 selectedExercises.includes(exercise) && styles.selectedExercise,
//               ]}
//               onPress={() => handleExerciseSelection(exercise)}
//             >
//               <Text>{exercise}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Timer Selection */}
//       <View style={styles.timerSelection}>
//         <Text style={styles.selectionTitle}>Set Timers:</Text>
//         {selectedExercises.map((exercise, index) => (
//           <View key={index} style={styles.timerItem}>
//             <Text>{exercise}</Text>
//             <Picker
//               style={styles.timerPicker}
//               selectedValue={selectedTimers[exercise]}
//               onValueChange={(itemValue) => handleTimerSelection(exercise, itemValue)}
//             >
//               {timerOptions.map((timer, index) => (
//                 <Picker.Item key={index} label={`${timer}s`} value={timer} />
//               ))}
//             </Picker>
//           </View>
//         ))}
//       </View>

//       {/* Start Workout Button */}
//       <TouchableOpacity style={styles.startButton} onPress={startWorkout}>
//         <Text style={styles.startButtonText}>Start Workout</Text>
//       </TouchableOpacity>

//       {/* Navigation Section */}
//       <View style={styles.navigationContainer}>
//         {/* HOME btn */}
//         <Ionicons name="home-outline" size={24} color="black" />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#6b6b6b',
//     padding: 20,
//   },
//   exerciseSelection: {
//     marginBottom: 20,
//   },
//   selectionTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   exerciseList: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   exerciseItem: {
//     width: '48%',
//     padding: 10,
//     marginVertical: 5,
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: '#ccc',
//     alignItems: 'center',
//   },
//   selectedExercise: {
//     backgroundColor: '#87CEEB',
//   },
//   timerSelection: {},
//   timerItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   timerPicker: {
//     width: '40%',
//   },
//   startButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   startButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   navigationContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 10,
//   },
// });

// export default WorkoutCustomization;

















































































// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Picker } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const WorkoutCustomization = () => {
//   const exercisesList = [
//     'Squats', 'Bench Press', 'Deadlifts', 'Pull-ups', 'Military Press',
//     'Running', 'Jumping', 'High Knees', 'Burpees', 'Cycling',
//     'Plank', 'Mountain Climbers', 'Jumping Jacks', 'Lunges', 'Leg Press',
//     'Frog Press', 'Dumbbell'
//   ];

//   const [selectedExercises, setSelectedExercises] = useState([]);
//   const [selectedTimers, setSelectedTimers] = useState({});
//   const [workoutStarted, setWorkoutStarted] = useState(false);
//   const timerOptions = [15, 30, 45, 60];

//   useEffect(() => {
//     let interval;

//     if (workoutStarted && selectedExercises.length > 0) {
//       interval = setInterval(() => {
//         const updatedTimers = { ...selectedTimers };
//         let allTimersZero = true;

//         selectedExercises.forEach(exercise => {
//           if (updatedTimers[exercise] > 0) {
//             allTimersZero = false;
//             updatedTimers[exercise]--;
//           }
//         });

//         setSelectedTimers(updatedTimers);

//         if (allTimersZero) {
//           setWorkoutStarted(false);
//         }
//       }, 1000);
//     }

//     return () => clearInterval(interval);
//   }, [workoutStarted, selectedExercises, selectedTimers]);

//   const handleExerciseSelection = (exercise) => {
//     if (selectedExercises.includes(exercise)) {
//       setSelectedExercises(selectedExercises.filter(item => item !== exercise));
//       setSelectedTimers(prevTimers => {
//         const { [exercise]: removedTimer, ...restTimers } = prevTimers;
//         return restTimers;
//       });
//     } else {
//       if (selectedExercises.length < 5) {
//         setSelectedExercises([...selectedExercises, exercise]);
//         setSelectedTimers(prevTimers => ({ ...prevTimers, [exercise]: timerOptions[0] }));
//       } else {
//         // Alert or some indication that the user can't select more than 5 exercises
//       }
//     }
//   };

//   const handleTimerSelection = (exercise, timer) => {
//     setSelectedTimers(prevTimers => ({ ...prevTimers, [exercise]: timer }));
//   };

//   const startWorkout = () => {
//     if (selectedExercises.length > 0) {
//       setWorkoutStarted(true);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Exercise Selection */}
//       <View style={styles.exerciseSelection}>
//         <Text style={styles.selectionTitle}>Select 5 Exercises:</Text>
//         <View style={styles.exerciseList}>
//           {exercisesList.map((exercise, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.exerciseItem,
//                 selectedExercises.includes(exercise) && styles.selectedExercise,
//               ]}
//               onPress={() => handleExerciseSelection(exercise)}
//             >
//               <Text>{exercise}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Timer Selection */}
//       <View style={styles.timerSelection}>
//         <Text style={styles.selectionTitle}>Set Timers:</Text>
//         {selectedExercises.map((exercise, index) => (
//           <View key={index} style={styles.timerItem}>
//             <Text>{exercise}</Text>
//             <Picker
//               style={styles.timerPicker}
//               selectedValue={selectedTimers[exercise]}
//               onValueChange={(itemValue) => handleTimerSelection(exercise, itemValue)}
//             >
//               {timerOptions.map((timer, index) => (
//                 <Picker.Item key={index} label={`${timer}s`} value={timer} />
//               ))}
//             </Picker>
//           </View>
//         ))}
//       </View>

//       {/* Start Workout Button */}
//       {!workoutStarted && (
//         <TouchableOpacity style={styles.startButton} onPress={startWorkout}>
//           <Text style={styles.startButtonText}>Start Workout</Text>
//         </TouchableOpacity>
//       )}

//       {/* Navigation Section */}
//       <View style={styles.navigationContainer}>
//         <Ionicons name="home-outline" size={24} color="black" />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#6b6b6b',
//     padding: 20,
//   },
//   exerciseSelection: {
//     marginBottom: 20,
//   },
//   selectionTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   exerciseList: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   exerciseItem: {
//     width: '48%',
//     padding: 10,
//     marginVertical: 5,
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: '#ccc',
//     alignItems: 'center',
//   },
//   selectedExercise: {
//     backgroundColor: '#87CEEB',
//   },
//   timerSelection: {},
//   timerItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   timerPicker: {
//     width: '40%',
//   },
//   startButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   startButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   navigationContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 10,
//   },
// });

// export default WorkoutCustomization;























































































































import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WorkoutCustomization = () => {
  const exercisesList = [
    'Squats', 'Bench Press', 'Deadlifts', 'Pull-ups', 'Military Press',
    'Running', 'Jumping', 'High Knees', 'Burpees', 'Cycling',
    'Plank', 'Mountain Climbers', 'Jumping Jacks', 'Lunges', 'Leg Press',
    'Frog Press', 'Dumbbell'
  ];

  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedTimers, setSelectedTimers] = useState({});
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const timerOptions = [15, 30, 45, 60];

  useEffect(() => {
    let interval;

    if (workoutStarted && selectedExercises.length > 0) {
      interval = setInterval(() => {
        const updatedTimers = { ...selectedTimers };
        let allTimersZero = true;

        selectedExercises.forEach(exercise => {
          if (updatedTimers[exercise] > 0) {
            allTimersZero = false;
            updatedTimers[exercise]--;
          }
        });

        setSelectedTimers(updatedTimers);

        if (allTimersZero) {
          setWorkoutStarted(false);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [workoutStarted, selectedExercises, selectedTimers]);

  const handleExerciseSelection = (exercise) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(selectedExercises.filter(item => item !== exercise));
      setSelectedTimers(prevTimers => {
        const { [exercise]: removedTimer, ...restTimers } = prevTimers;
        return restTimers;
      });
    } else {
      if (selectedExercises.length < 5) {
        setSelectedExercises([...selectedExercises, exercise]);
        setSelectedTimers(prevTimers => ({ ...prevTimers, [exercise]: timerOptions[0] }));
      } else {
        // Alert or some indication that the user can't select more than 5 exercises
      }
    }
  };

  const handleTimerSelection = (exercise, timer) => {
    setSelectedTimers(prevTimers => ({ ...prevTimers, [exercise]: timer }));
  };

  const startWorkout = () => {
    if (selectedExercises.length > 0) {
      setWorkoutStarted(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Exercise Selection */}
      <View style={styles.exerciseSelection}>
        <Text style={styles.selectionTitle}>Select 5 Exercises:</Text>
        <View style={styles.exerciseList}>
          {exercisesList.map((exercise, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.exerciseItem,
                selectedExercises.includes(exercise) && styles.selectedExercise,
              ]}
              onPress={() => handleExerciseSelection(exercise)}
            >
              <Text>{exercise}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Timer Selection */}
      <View style={styles.timerSelection}>
        <Text style={styles.selectionTitle}>Set Timers:</Text>
        {selectedExercises.map((exercise, index) => (
          <View key={index} style={styles.timerItem}>
            <Text>{exercise}</Text>
            <Picker
              style={styles.timerPicker}
              selectedValue={selectedTimers[exercise]}
              onValueChange={(itemValue) => handleTimerSelection(exercise, itemValue)}
            >
              {timerOptions.map((timer, index) => (
                <Picker.Item key={index} label={`${timer}s`} value={timer} />
              ))}
            </Picker>
          </View>
        ))}
      </View>

      {/* Start Workout Button */}
      {!workoutStarted && (
        <TouchableOpacity style={styles.startButton} onPress={startWorkout}>
          <Text style={styles.startButtonText}>Start Workout</Text>
        </TouchableOpacity>
      )}

        <View style={styles.navigationContainer}>

            {/* HOME btn */}
            <TouchableOpacity onPress={() => navigation.navigate("Homepage")} >
            {/* <Text style={styles.navText}>HOME</Text> */}
            <Ionicons name="home-outline" size={24} color="black" />
            </TouchableOpacity>

            {/* Back btn */}
            <TouchableOpacity onPress={() => navigation.navigate("Login")} >
            {/* <Text style={styles.navText}>BACK</Text> */}
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
    padding: 20,
  },
  exerciseSelection: {
    marginBottom: 20,
  },
  selectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exerciseItem: {
    width: '48%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  selectedExercise: {
    backgroundColor: '#87CEEB',
  },
  timerSelection: {},
  timerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timerPicker: {
    width: '40%',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  navigationContainer:{
    display: 'flex',
    flex: 0.05,
    flexDirection: 'row',
    color: '#000000',
    textAlign: 'center',
    paddingTop: 10,
    marginBottom: 15,
    fontSize: 20,
    //justifyContent: 'space-between',
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
});

export default WorkoutCustomization;














































































































