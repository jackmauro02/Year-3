import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ImageBackground, TextInput, ScrollView, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth, firestoredb } from '../components/config';
import { ref, update } from 'firebase/database';
import { collection, addDoc } from 'firebase/firestore';

export default function Register({ navigation }) {

  const [Username, setUsername] = useState('');
  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [PIN, setPIN] = useState('');
  
  useEffect(() => {
    generateRandomPin();
  }, []);

  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const addData = async () => {
    if (!isPasswordValid(Password)) {
      setValidationMessage('Password must be at least 8 characters long.');
      return;
    }

    if (Password !== ConfirmPassword) {
      setValidationMessage('Passwords do not match.');
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, Email, Password);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }

    update(ref(db, 'posts/' + Username), {
      Username: Username,
      Firstname: Firstname,
      Lastname: Lastname,
      Email: Email,
      Password: Password,
    });

    firestoredb().collection('Users').add({ Email })
      .then(() => {
        console.log('User added!');
      });

    navigation.navigate("Login");
    Alert.alert("Account has been made");
  };

  const generateRandomPin = () => {
    let randomPin = Math.floor(Math.random() * 900000) + 100000;
    setPIN(randomPin);
  };

  const handleRegister = async () => {
    if (!isPasswordValid(Password)) {
      setValidationMessage('Password must be at least 8 characters long.');
      return;
    }

    if (Password !== ConfirmPassword) {
      setValidationMessage('Passwords do not match.');
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, Email, Password);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
    try {
      if (!Email || !Username || !Password) {
        Alert.alert('Missing Fields', 'Please fill all the fields.');
        return;
      }
      
      

      const feedbackCollectionRef = collection(firestoredb, "Users", Email,"UserDetails");
      await addDoc(feedbackCollectionRef, {
        Username: Username,
        Firstname: Firstname,
        Lastname: Lastname,
        Email: Email,
        PIN: PIN,
      });

      navigation.navigate('Homepage');  

      Alert.alert('Registration Successful', 'Your account has been created successfully!');
    } catch (error) {
      console.error('Error registering: ', error);
      Alert.alert('Error', 'An error occurred while registering. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground
        source={require('./images/pexels-julia-larson-6456291.png')}
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.h1}>ClubTime</Text>
            <Text style={styles.h2}>Register</Text>

            <TextInput
              style={styles.inputButton}
              placeholder={'Username'}
              value={Username}
              onChangeText={(text) => setUsername(text)}
            />

            <TextInput
              style={styles.inputButton}
              placeholder={'First Name'}
              value={Firstname}
              onChangeText={(text) => setFirstname(text)}
            />

            <TextInput
              style={styles.inputButton}
              placeholder={'Last Name'}
              value={Lastname}
              onChangeText={(text) => setLastname(text)}
            />

            <TextInput
              style={styles.inputButton}
              placeholder={'Email'}
              value={Email}
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              style={styles.inputButton}
              placeholder={'Password'}
              secureTextEntry={true}
              value={Password}
              onChangeText={(text) => setPassword(text)}
            />

            <TextInput
              style={styles.inputButton}
              placeholder={'Confirm Password'}
              secureTextEntry={true}
              value={ConfirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />

            <View style={styles.accountInfoContainer}>
            <Text style={styles.contactLabel}>PIN: {PIN}</Text>
            </View>

            <TouchableOpacity style={styles.btn} onPress={handleRegister}>
              <Text style={styles.btn_text}>Sign Up</Text>
            </TouchableOpacity>
          </ScrollView>
          <Text style={styles.validationMessage}>{validationMessage}</Text>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 35,
    color: 'white',
    alignSelf: 'center',
    padding: 15,
    paddingTop: 50,
  },
  h2: {
    fontSize: 40,
    color: 'white',
    alignSelf: 'flex-start',
    paddingLeft: 35,
    paddingTop: 65,
    paddingBottom: 30,
  },
  inputButton: {
    width: 330,
    height: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    shadowRadius: 3.95,
    shadowOpacity: 0.75,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    alignSelf: 'center',
    marginBottom: 30,
    color: 'rgba(0, 0, 0, 0.31)',
    fontSize: 25,
    paddingLeft: 25,
  },
  btn: {
    marginTop: 50,
    width: 269,
    height: 64,
    backgroundColor: '#229AD1',
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    shadowRadius: 3.95,
    shadowOpacity: 0.25,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height:3,
    },
    alignSelf: 'center',
  },
  
  btn_text: {
    fontSize: 25
  },
  contactLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    color: 'white',
    fontSize: 25,
  }
  }
);

