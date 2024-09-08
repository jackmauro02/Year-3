import React, { useEffect, useState } from 'react'
import { StyleSheet, Alert, Text, TouchableOpacity, View, Image, ImageBackground,  KeyboardAvoidingView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native-gesture-handler';

import { db } from '../components/config';
import { ref, set, update } from 'firebase/database';




export default function Login({navigation}) {

    const [Email, setEmail] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [ConfirmNewPassword, setConfirmNewPassword] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const [resetRequested, setResetRequested] = useState(false);


  const isPasswordValid = (password) => {
    // Add your password validation criteria here
    // For example, you can check if the password is at least 8 characters long
    return password.length >= 8;
  };

  const resetPassword = () => {

    if (!isPasswordValid(NewPassword)) {
      setValidationMessage('Password must be at least 8 characters long.');
      return;
    }

    if (NewPassword !== ConfirmNewPassword) {
      setValidationMessage('Passwords do not match.');
      return;
    }

    update(ref(db, 'users/' + Email), {
      Password: NewPassword
    });

    console.log("New Password: " + NewPassword);
    // console.log("New Password: " + Password);
    setNewPassword(Password);

    //takes user back to login page if everything matches
    navigation.navigate("Login");

  }


  return (

    <View style={styles.container}>
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

        <Text style={styles.h2}>Update Password</Text>

        <View style={styles.LoginProcessContainer}>

          {/* Email input */}
          <TextInput
            style={styles.inputButton}
            // value={Email}
            placeholder='Email'
            value={Email}
            onChangeText={(text) => setEmail(text)}
          />

          {/* New Password input */}
          <TextInput
            style={styles.inputButton}
            // value={Password}
            placeholder='New Password'
            secureTextEntry={true}
            value={NewPassword}
            onChangeText={(text) => setNewPassword(text)}
          />

          {/* Confirm new Password input */}
          <TextInput
            style={styles.inputButton}
            // value={Password}
            placeholder='Confirm New Password'
            secureTextEntry={true}
            value={ConfirmNewPassword}
            onChangeText={(text) => setConfirmNewPassword(text)}
          />

          {/* Forgot Password? and Sig up button row */}
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', width: '78%'}}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")} >
            <Text style={{color: 'white', fontSize: 20}}>Login</Text>
          </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")} >
              <Text style={{color: 'white', fontSize: 20}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        

        {/* Login button */}
        <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.btn} >
          <Text style={styles.btn_text} onPress={resetPassword}>Reset</Text>
        </TouchableOpacity>

        {/* skip for now and view bookings button */}
        
        <Text style={{textAlign: 'center', paddingTop: 35, color: 'white', fontSize: 18}}>Skip for now and view bookings</Text>

      </ImageBackground>
       
    </View>
    

  

  )
}

const styles = StyleSheet.create({
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
    alignItems: 'center',
    flexDirection: 'column',

  },

  inputButton:{
    width: 320,
    height: 150,
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
    paddingBottom: 30,
    textAlign: 'center'
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

