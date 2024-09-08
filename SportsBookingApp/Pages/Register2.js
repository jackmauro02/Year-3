import React, { useEffect, useState } from 'react'
import { StyleSheet, Alert, Text, TouchableOpacity, View, Image, ScrollView, SafeAreaView, ImageBackground,  KeyboardAvoidingView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native-gesture-handler';
// import {useRoute} from '@react-navigation/native';

import { db , auth, firestoredb } from '../components/config';
import { ref, set , update} from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {collection, doc, setDoc, addDoc, getDoc } from 'firebase/firestore';
//import firestore from '@react-native-firebase/firestore';

export default function Register2({ route, navigation}) {

  // console.log("1");

  //gets the username , first and last name params pushed from the first register screen
  // console.log('Register2 now')
  //Gets the params and put into variables for later
  const Username = route.params?.id;
  console.log(Username);
  const Firstname = route.params?.first;
  // console.log(Firstname)
  const Lastname = route.params?.last;
  // console.log(Lastname)

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');


  const isPasswordValid = (password) => {
    // Add your password validation criteria here
    // For example, you can check if the password is at least 8 characters long
    return password.length >= 8;
  };

  //This is code that will send the user an email verification link to the user's account
  // registerUser = async (Email, Password) => {
  //   await firebase.auth().createUserWithEmailAndPassword(Email, Password)
  //   .then(() => {
  //     firebase.auth().currentUser.sendEmailVerification({
  //       handleCodeInApp: true,
  //       url: 'clubtime-6d38e.firebaseapp.com',
  //     })
  //     .then(() => {
  //         alert("Verification email sent");
  //       }).catch((error) => {
  //         alert(error.message);
  //       })
  //       .then(() => {
  //         addData();
  //       })
  //   })
  //   .catch((error) => {
  //     alert(error.message);
  //   })
  // }
  const addData = async () => {
    if (!isPasswordValid(Password)) {
      setValidationMessage('Password must be at least 8 characters long.');
      return;
    }

    if (Password !== ConfirmPassword) {
      setValidationMessage('Passwords do not match.');
      return;
    }

    console.log('addData method has started');

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        Email,
        Password
      );
      console.log('user account created');
      console.log(user);
    } catch (error){
      console.log(error.message);
      alert(error.message);(error.message);
    }


    console.log("10");
    // If the password is valid and matches the confirmation, proceed to save the data#
    //JSON.stringify(Username)
    //updates the data in post/ Username from the param
    // update(ref(db, 'posts/' + Username ), {
    //   Username: Username,
    //   Firstname: Firstname,
    //   Lastname: Lastname,
    //   Email: Email,
    //   Password: Password,
    // });
    
    // console.log("Email is added 1");
 
    // update(ref(db, 'posts/' + Username ), {
    //   Username: Username,
    //   Firstname: Firstname,
    //   Lastname: Lastname,
    //   Email: Email,
    //   Password: Password,
    // });
    
    //attempting to add the user email to the booking collection to store their booking data
    // firestore()
    //   .collection('Users')
    //   .add({
    //     Email,
    //   }).then(() => {
    //     console.log('User added!');
    //   });

    // console.log("Email is added 2");
    

    setEmail(Email);
    setPassword(Password);

    Alert.alert("Account has been made");

    //takes user back to login page if everything matches
    navigation.navigate("Login");

    
  };


    {/*this function removes the keyboard when the background is clicked*/}
    // const handleAddTask = () => {
    //   Keyboard.dismiss();
    // }


  return (

    <SafeAreaView style={styles.container}>
    <StatusBar style="auto" />
      {/* This is how you add a background image onto every page - Use ImageBackground as a wrapper*/}
      <ImageBackground onPress={() => handleAddTask()}
        source={require('./images/pexels-julia-larson-6456291.png')}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
      

      {/* logo at top of screen */}
        {/* <Text style={styles.h1}>ClubTime</Text>

        <Text style={styles.h2}>Register</Text> */}
        

        <KeyboardAvoidingView style={styles.RegisterProcessContainer} >

          <Text style={styles.h1}>ClubTime</Text>

          <Text style={styles.h2}>Register</Text>
          <ScrollView style={styles.scrollView}>
            {/* Email input */}
            <TextInput
              style={styles.inputButton}
              // value={Email}
              placeholder={'Email'}
              value={Email}
              onChangeText={(text) => setEmail(text)}
            
            />

            {/* Password input */}
            <TextInput
              style={[
                styles.inputButton,
                // !isPasswordValid(Password) ? {} : {borderColor: '#FF0000', borderWidth: 1},
              ]}
              // value={Email}
              placeholder={'Password'}
              secureTextEntry={true}
              value={Password}
              onChangeText={(text) => setPassword(text)}
            />

            {/* Confirm Password input */}
            <TextInput
              style={[
                styles.inputButton,
              ]}
              // value={Email}
              placeholder={'Confirm Password'}
              secureTextEntry={true}
              value={ConfirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </ScrollView>

          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.btn} >
            <Text style={styles.btn_text}  onPress={() =>  addData()} >Sign Up</Text>
          </TouchableOpacity>
          

        </KeyboardAvoidingView>

       
        <Text style={styles.validationMessage}>{validationMessage}</Text>

      </ImageBackground>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({

  scrollView: {
    //flex:0.5,
    //alignItems: 'center',
    flexDirection: 'column',
    //backgroundColor: 'pink',
    marginHorizontal: 20,
    paddingVertical: 20
    

  },

  validationMessage:{
    color: '#FF0000',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 20
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

  RegisterProcessContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',

  },
  inputButton:{
    width: 330,
    height: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 20 ,
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
    paddingLeft: 25,

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
    marginTop: 50,
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
  },
  
  btn_text: {
    fontSize: 25
  }
  }
);

