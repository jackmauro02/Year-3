import React, { useState }from 'react'
import { StyleSheet,SafeAreaView, Text, TouchableOpacity, View, Image, ScrollView, ImageBackground} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native-gesture-handler';

import { db } from '../components/config';
import { ref, get } from 'firebase/database';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({navigation}) {

  // const emailAndPassword = () => {
    // const [Email, setEmail] = useState('Email');
    // const [Password, setPassword] = useState('Password');
  // };

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    
    const login = async () => {
      if (!Email || !Password) {
        setValidationMessage('Please enter both email and password.');
        return;
      }

      const auth = getAuth();

      setEmail(Email);
      setPassword(Password);

      try {
        signInWithEmailAndPassword(auth, Email, Password);
        // Login successful, navigate to the user's profile or another page
        navigation.navigate("Homepage");
      } catch (error) {
        console.error('Login error:', error);
        setValidationMessage('Invalid email or password. Please try again.');
      }
    };
        
        
    

  return (

    <SafeAreaView style={styles.container}>
      {/* This is how you add a background image onto every page - Use ImageBackground as a wrapper*/}
      <ImageBackground
        source={require('./images/pexels-julia-larson-6456291.png')}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
      {/* logo at top of screen */}
        <Text style={styles.h1}>ClubTime</Text>

        <Text style={styles.h2}>Login</Text>

        <ScrollView style={styles.LoginProcessContainer}>

          {/* Email input */}
          <TextInput
            style={styles.inputButton}
            // value={Email}
            placeholder='Email'
            value={Email}
            onChangeText={(text) => setEmail(text)}
          />

          {/* Password input */}
          <TextInput
            style={styles.inputButton}
            // value={Password}
            placeholder='Password'
            secureTextEntry={true}
            value={Password}
            onChangeText={(text) => setPassword(text)}
          />

          {/* Forgot Password? and Sig up button row */}
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', width: '78%', paddingLeft: 50, alignItems: 'center',}}>
          <TouchableOpacity onPress={() => navigation.navigate("Forgot Password")} >
            <Text style={{color: 'white', fontSize: 20}}>Forgot Password?</Text>
          </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")} >
              <Text style={{color: 'white', fontSize: 20}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        

        {/* Login button */}
        <TouchableOpacity onPress={login} style={styles.btn} >
          <Text style={styles.btn_text}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.validationMessage}>{validationMessage}</Text>

        {/* skip for now and view bookings button */}
        <Text style={{textAlign: 'center', paddingTop: 35, color: 'white', fontSize: 18}}>Skip for now and view bookings</Text>

      </ImageBackground>
       
    </SafeAreaView>
    

  

  )
}

const styles = StyleSheet.create({

  validationMessage:{
    color: '#FF0000',
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 15
  },

  container: {
    flex: 1,
    backgroundColor: '#013257',
    justifyContent: 'space-between',
  },

  imageContainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  LoginProcessContainer: {
    flex:0.5,
    //alignItems: 'center',
    flexDirection: 'column',

  },

  inputButton:{
    width: 320,
    height: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection:'row',
    alignItems: 'center',
    shadowRadius:3.95,
    shadowOpacity:0.75,
    elevation:6,
    shadowColor:"#000",
    shadowOffset:{
      width:0,
      height:3,
    },
    alignSelf: 'center',
    marginBottom: 30,
    color: 'rgba(0, 0, 0, 0.31)',
    fontSize: 25,
    paddingLeft: 25
  },

  tinyLogo:{
    width:100,
    height:60,
    resizeMode:'contain'
  },

  tinyLogo:{
    width:100,
    height:60,
    resizeMode:'contain'
  },

  h1: {
    fontSize: 35,
    color: 'white', 
    alignSelf: 'center',
    padding: 15,
    paddingTop: 50,
  },

  container2: {
    fontSize: 35,
    color: 'white', 
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft:20,
  },

  h2: {
    fontSize: 40,
    color: 'white',  
    alignSelf: 'flex-start',
    paddingLeft: 35,
    paddingTop: 65,
    paddingBottom: 70
  },

  h4: {
    fontSize: 25,
    color: 'white',  
    paddingTop:15
  },

  btn: {
    width: 269,
    height: 64,
    backgroundColor: '#229AD1',
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection:'row',
    alignItems: 'center',
    shadowRadius:3.95,
    shadowOpacity:0.25,
    elevation:6,
    shadowColor:"#000",
    shadowOffset:{
      width:0,
      height:3,
    },
    alignSelf: 'center',
    marginTop: 50
  },

  btn_text: {
    fontSize: 25,
  }
});
