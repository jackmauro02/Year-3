//import default libraries for react native
import React , { createContext, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AddData from '../SportsBookingApp/components/config'

const Stack = createStackNavigator();

import { AppLoading } from "expo-app-loading";

//Importing the pages
import Welcome from './Pages/Welcome';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Register2 from './Pages/Register2';
import ForgotPassword from './Pages/ForgotPassword';
import Homepage from './Pages/Homepage';
import AboutUs from './Pages/AboutUs';
import TermsAndConditions from './Pages/TermsConditions';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import GymSafety from './Pages/GymSafety';
import PlankTimer from './Pages/PlankTimer';
import BookingPage from './Pages/BookingPage';
import FatLoss from './Pages/FatLoss';
import BuildMuscle from './Pages/BuildMuscle';
import Cardio from './Pages/Cardio';
import Endurance from './Pages/Endurance';
import WorkoutCustomization from './Pages/WorkoutCustomization';
import MapPage from './Pages/MapPage';
import MyCalendar from './Pages/MyCalendar';
import NewCalendar from './Pages/NewCalendar';
import CheckIn from './Pages/CheckIn';

// for idiris pages
import Nutrition from './Pages/Nutrition';
//for jacks pages
import Accountpage from './Pages/Accountpage';
import Leaderboard from './Pages/Leaderboard';
import QRCode from './Pages/QRCode';
import SubscriptionPage from './Pages/SubscriptionPage';
import Feedback from './Pages/Feedback';


//importing images

export default function App() {
  //const [username, setUsername] = React.useState("John Doe");

  // Create two context:
  // UserContext: to query the context state
  // UserDispatchContext: to mutate the context state
  const UserContext = createContext(undefined);
  const UserDispatchContext = createContext(undefined);

  // A "provider" is used to encapsulate only the
  // components that needs the state in this context
  const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({
      username: "John Doe"
    });

    return (
      <UserContext.Provider value={userDetails}>
        <UserDispatchContext.Provider value={setUserDetails}>
          {children}
        </UserDispatchContext.Provider>
      </UserContext.Provider>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 

          name="Welcome"
          component={Welcome}
          options={{
            title: "Welcome",
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="Login"
          component={Login}
          options={{
            title: "Login",
            headerShown: false
          }}/>
          <Stack.Screen 
          name="Register"
          component={Register}
          options={{
            title: "Register",
            headerShown: false
          }}/>
          <Stack.Screen 
          name="Register2"
          component={Register2}
          options={{
            title: "Register2",
            headerShown: false
          }}/>
          <Stack.Screen 
          name="Forgot Password"
          component={ForgotPassword}
          options={{
            title: "Forgot Password",
            headerShown: false
          }}/>
          <Stack.Screen 
          name="Homepage"
          component={Homepage}
          options={{
            title: "Homepage",
            headerShown: false
          }}/>
          <Stack.Screen 
          name="About Us"
          component={AboutUs}
          options={{
            title: "About Us",
            headerShown: true
          }}/>
          <Stack.Screen 
          name="Terms and Conditions"
          component={TermsAndConditions}
          options={{
            title: "Terms and Conditions",
            headerShown: true
          }}/>
          <Stack.Screen 
          name="Privacy Policy"
          component={PrivacyPolicy}
          options={{
            title: "Privacy Policy",
            headerShown: true
          }}/>
          <Stack.Screen 
          name="Gym Safety"
          component={GymSafety}
          options={{
            title: "Gym Safety",
            headerShown: true
          }}/>
          <Stack.Screen 
          name="Plank Timer"
          component={PlankTimer}
          options={{
            title: "Plank Timer",
            headerShown: false
          }}/>
          <Stack.Screen 
          name="Booking Page"
          component={BookingPage}
          options={{
            title: "BookingPage",
            headerShown: false
          }}/>
          <Stack.Screen 
          name="Fat Loss"
          component={FatLoss}
          options={{
            title: "Fat Loss",
            headerShown: false
          }}/>
          <Stack.Screen 
          name="Build Muscle"
          component={BuildMuscle}
          options={{
            title: "Build Muscle",
            headerShown: false
          }}/>
          <Stack.Screen 
          name="Cardio"
          component={Cardio}
          options={{
            title: "Cardio",
            headerShown: false
          }}/>
          <Stack.Screen 
          name="Endurance"
          component={Endurance}
          options={{
            title: "Endurance",
            headerShown: false
          }}/>
          <Stack.Screen 
          name="Workout Customization"
          component={WorkoutCustomization}
          options={{
            title: "Workout Customization",
            headerShown: false
          }}/>

        <Stack.Screen 
          name="MapPage"
          component={MapPage}
          options={{
            title: "MapPage",
            headerShown: true
          }}/>
        <Stack.Screen 
          name="MyCalendar"
          component={MyCalendar}
          options={{
            title: "MyCalendar",
            headerShown: true
          }}/>
        <Stack.Screen 
          name="NewCalendar"
          component={NewCalendar}
          options={{
            title: "NewCalendar",
            headerShown: true
          }}/>
          <Stack.Screen 
          name="Nutrition"
          component={Nutrition}
          options={{
            title: "Nutrition",
            headerShown: true
          }}/>
            <Stack.Screen 
          name="Accountpage"
          component={Accountpage}
          options={{
            title: "Account page",
            headerShown: true
          }}/>
          <Stack.Screen 
          name="Leaderboard"
          component={Leaderboard}
          options={{
            title: "Leaderboard",
            headerShown: true
          }}/>
          <Stack.Screen 
          name="QRCode"
          component={QRCode}
          options={{
            title: "QRCode",
            headerShown: true
          }}/>
          <Stack.Screen 
          name="SubscriptionPage"
          component={SubscriptionPage}
          options={{
            title: "SubscriptionPage",
            headerShown: true
          }}/>
          <Stack.Screen 
          name="Feedback"
          component={Feedback}
          options={{
            title: "Feedback",
            headerShown: true
          }}/>
          <Stack.Screen 
          name="Check In"
          component={CheckIn}
          options={{
            title: "Check In",
            headerShown: true
          }}/>
      </Stack.Navigator>
    </NavigationContainer>

  )
};

