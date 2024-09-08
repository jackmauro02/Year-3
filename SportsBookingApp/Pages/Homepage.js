import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Button, View, ScrollView, TextInput, ImageBackground } from 'react-native';
import Countdown from 'react-native-countdown-component';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons/FontAwesome';

import { auth } from '../components/config';
import { signOut, onAuthStateChanged} from 'firebase/auth';
export default function Homepage({ navigation }) {
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [searchQuery, setSearchQuery] = useState('');
  const [timerRunning, setTimerRunning] = useState(false);
  const [workoutGoals, setWorkoutGoals] = useState([
    { name: 'Fat Loss', description: 'Burn calories and shed excess fat.', color: '#D7D7D7' },
    { name: 'Build Muscle', description: 'Gain strength and increase muscle mass.', color: '#D7D7D7' },
    { name: 'Cardio', description: 'Improve cardiovascular health and stamina.', color: '#D7D7D7'},
    { name: 'Endurance', description: 'Enhance overall endurance and stamina.', color: '#D7D7D7'},
    { name: 'Workout Customization', description: 'Set your own workout', color: '#D7D7D7'},
    // Add more workout goals as needed
  ]);

  //For user authentication
  const [userDetails, setUserDetails] = useState({
    username: auth.currentUser?.email
  });

  onAuthStateChanged(auth, (user) => {
     if(user){
      userDetails.username = user.uid;
     } else {
      //user is signed out
     }
    
    });

  const logOut = async () => {
    await signOut(auth);
    navigation.navigate("Login");

  };

  const handleTimerFinish = () => {
    // Handle timer finish logic if needed
    setTimerRunning(false);
  };

  const handleStartTimer = () => {
    // Handle timer start logic if needed
    setTimerRunning(true);
  };

  const handleGoalPress = (goalName) => {
    navigation.navigate(goalName);
  };

  const renderWorkoutGoalItem = (goal) => (
    <TouchableOpacity
      style={[styles.box, { backgroundColor: goal.color, paddingTop: 20, paddingBottom: 20, paddingLeft: 30, paddingRight: 30}]}
      onPress={() => handleGoalPress(goal.name)}
    >
      <Text style={[styles.boxText, {margin: 0}]}>{`${goal.name}`}</Text>
    </TouchableOpacity>
  );

  const filteredWorkoutGoals = workoutGoals.filter(goal =>
    goal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <PreviewLayout
      style={{minHeight:'auto', backgroundColor: 'blue', paddingTop: 20,}}
      label="Welcome "
      
      selectedValue={justifyContent}
      values={[
        'Booking Page',
        'MyCalendar',
        'Check In',
        'Nutrition',
        'Leaderboard',
        'MapPage',
        //'Helpful Guides',
        'About Us',
        //'Workout List',
        'Privacy Policy',
        'Terms and Conditions',
        
        

      ]}
      setSelectedValue={setJustifyContent}
      navigation={navigation}
    >
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search workout goals..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <View style={ { backgroundColor: 'white' }}>
        <ImageBackground
            source={require('./images/workout_background.png')}
            style={{
              width: '100%',
              height: 'auto',
              //marginBottom: '20',
            }}
          >
          <Text style={[styles.boxText, {color:'#fff', paddingTop: 18, paddingLeft: 20 }]}>Workout by Goal</Text>
          <ScrollView  style={{backgroundColor: '#d3d3d300'}} horizontal showsHorizontalScrollIndicator={false}>
            {filteredWorkoutGoals.map((goal, index) => (
              <View key={index} style={styles.carouselItem}>
                {renderWorkoutGoalItem(goal)}
              </View>
            ))}
          </ScrollView>
          </ImageBackground>
      </View>

      <View style={[styles.box, { backgroundColor: 'powderblue', textAlign: 'center', marginTop: 13 }]}>
        <Text style={styles.boxText}>Workout Timer</Text>
        <View style={styles.timerContainer}>
          {timerRunning ? (
            <Countdown
              until={60 * 30} // 30 minutes, adjust as needed
              size={20}
              onFinish={handleTimerFinish}
              digitStyle={{ backgroundColor: '#229ad1' }}
              digitTxtStyle={{ color: 'white' }}
              timeToShow={['M', 'S']}
              timeLabels={{ m: null, s: null }}
            />
          ) : (
            <Text style={styles.timerText}>00:00</Text>
          )}
        </View>
        <TouchableOpacity style={styles.timerButton} onPress={handleStartTimer}>
          <Text style={styles.buttonLabel}>Start Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AnotherPage')}
        >
          <Text style={styles.buttonLabel} onPress={() => navigation.navigate("Build Muscle")}>Log timer</Text>
        </TouchableOpacity>
      </View>

      <View style={[{ backgroundColor: 'skyblue', textAlign: 'center' }]}>
        <ImageBackground
          source={require('./images/locate_gym_image.png')}
          style={{
            width: '100%',
            height: 'auto',
            marginBottom: '20',
            
          }}
        >
          <Text style={[styles.boxText, {color: '#fff'}]}>Local Gyms</Text>
          <Text style={[styles.boxContent, {color: '#fff'}]}>
            Discover and explore local gyms in your area. Find the one that suits your fitness needs.
          </Text>
          <Text style={[styles.boxFeature, {color:'#fff'}]}>Features:</Text>
          <Text style={{color:'#fff'}}> • Gym ratings and reviews</Text>
          <Text style={{color:'#fff'}}> • Amenities information</Text>
          <Text style={{color:'#fff'}}> • Membership details</Text>
        </ImageBackground>
      </View>

      <View style={[styles.box, { backgroundColor: 'steelblue', textAlign: 'center', marginTop:20 }]}>
        <Text style={styles.boxText}>My Gym Activity</Text>
        <Text style={styles.boxContent}>
          Track your gym activity, view your workout history, and set new fitness goals.
        </Text>
        <Text style={styles.boxFeature}>Features:</Text>
        <Text>- Activity history log</Text>
        <Text>- Goal setting and tracking</Text>
        <Text>- Personalized workout plans</Text>
      </View>

      <Button title="Sign Out" onPress={logOut} />
      
    </PreviewLayout>
  );
}

const PreviewLayout = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
  navigation,
  userDetails,
  username,
}) => (
  <View style={{  flex: 1, backgroundColor: 'white', height: '0%' }}>
    <Text style={styles.label}>{label}{auth.currentUser?.email}</Text>
    
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => navigation.navigate(value)}
          style={[styles.button, selectedValue === value && styles.selected]}
        >
          <Text
            style={[
              styles.buttonLabel,
              selectedValue === value && styles.selectedLabel,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    <ScrollView style={[styles.container, { [label]: selectedValue }]}>
      {children}
    </ScrollView>

    
    <View style={styles.navigationContainer}>

        {/* HOME btn */}
        <TouchableOpacity onPress={() => navigation.navigate("Homepage")} >
          {/* <Text style={styles.navText}>HOME</Text> */}
          <Ionicons name="home-outline" size={24} color="black" />
        </TouchableOpacity>
        {/* Account Page button*/}
        <TouchableOpacity onPress={() => navigation.navigate("Accountpage")} >
          {/* <Text style={styles.navText}>Account</Text> */}
          <Ionicons name="person-circle-outline" size={24} color="black" />
        </TouchableOpacity>

        {/* Sign Out btn */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")} >
          {/* <Text style={styles.navText}>BACK</Text> */}
          <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
        </TouchableOpacity>

      </View>



  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: 'white',
    minHeight: 'initial',
    height: 'auto',
    
  },
  searchContainer: {
    marginBottom: 10,
    minHeight: 'auto',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  box: {
    width: '100%',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  boxText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#54bbe800',
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  timerButton: {
    backgroundColor: '#229ad1',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  carItems:{
    height: 0,
  },
  boxContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  boxFeature: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginBottom: 0,
    maxHeight: 50,
    minHeight: 'auto',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#229ad1',
    alignSelf: 'flex-start',
    marginRight: 10,
    //minWidth: '48%',
    minWidth: 'auto',
    textAlign: 'center',
    backgroundColor: '#54bbe899',
  },
  selected: {
    backgroundColor: '#000000',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    fontSize: 24,
    backgroundColor: '#004C72',
    color: '#FFFFFF',
    
  },
  workoutGoalItem: {
    backgroundColor: '#D3D3D3',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  workoutGoalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  workoutGoalDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 10,
    backgroundColor: '#d3d3d300',
  },
  navigationContainer:{
    display: 'flex',
    flex: 0.05,
    flexDirection: 'row',
    backgroundColor: '#004C72',
    textAlign: 'center',
    paddingTop: 10,
    //marginBottom: 15,
    fontSize: 20,
    //justifyContent: 'space-between',
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    minHeight: 'auto',
    
  },
});

