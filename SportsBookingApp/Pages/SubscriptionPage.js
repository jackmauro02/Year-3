import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Picker, Alert } from 'react-native';
import { auth, firestoredb } from '../components/config'; // Import Firebase Firestore
import { useNavigation } from '@react-navigation/native';
//import { Picker } from '@react-native-picker/picker';
//import {Picker} from '@react-native-picker/picker';
import { collection, addDoc, setDoc, serverTimestamp } from "firebase/firestore";

const SubscriptionPage = () => {
  const [subscription, setSubscription] = useState('Free');
  const [accountNumber, setAccountNumber] = useState('');
  const [sortCode, setSortCode] = useState('');
  const [CVC, setCVC] = useState('');
  const navigation = useNavigation();
  const timeStamp = useState('');
  const [userDetails, setUserDetails] = useState({
    username: auth.currentUser?.email
  });

  const handleSubscriptionChange = (value) => {
    setSubscription(value);
  };

  const handleSubscription = async () => {
    try {
      if (!subscription || !accountNumber || !sortCode || !CVC) {
        Alert.alert('Missing Fields', 'Please select a date, class, and time.');
        return;
      }
  
      const subscriptionCollectionRef = collection(firestoredb, "Users", userDetails.username,"Subscription");
      const newsubscriptionRef = await addDoc(subscriptionCollectionRef, {
        subscription: subscription,
        accountNumber: accountNumber,
        sortCode: sortCode,
        CVC: CVC,
        timestamp: serverTimestamp(),
      });
      console.log('Feedback added successfully with ID: ', newsubscriptionRef.id);
  
      //show alert if successful
      Alert.alert('Feedback Successful', 'Your Feedback has been added successfully!');
    } catch (error) {
      console.error('Error adding Feedback: ', error);
      Alert.alert('Error', 'An error occurred while leaving Feedback. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Subscription</Text>
      <Picker style={styles.Picker}
        selectedValue={subscription}
        onValueChange={handleSubscriptionChange}>
        <Picker.Item label="Free" value="Free" />
        <Picker.Item label="Standard (£19.99/month)" value="Standard" />
        <Picker.Item label="Advanced (£30/month)" value="Advanced" />
      </Picker>
      <Text style={styles.title}>Account number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter account number"
        value={accountNumber}
        onChangeText={setAccountNumber}
      />
      {/* <View style={styles.rowContainer}> */}
      <Text style={styles.title}>sort code:</Text>
      <TextInput
        style={styles.inputSmall}
        placeholder="Sort code"
        value={sortCode}
        onChangeText={setSortCode}
      />
      <Text style={styles.title}>CVC:</Text>
      <TextInput
        style={styles.inputSmall}
        placeholder="CVC"
        value={CVC}
        onChangeText={setCVC}
      />
      {/* </View> */}
      <TouchableOpacity style={styles.btn} onPress={handleSubscription}>
        <Text style={styles.btnText}>Subscribe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#013257',
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    color: 'white',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#013257',
    
  },
  btn: {
    width: 175,
    height: 55,
    backgroundColor: "#229AD1",
    borderRadius: 30,
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    alignItems: "center",
    shadowRadius: 3.95,
    shadowOpacity: 0.25,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    alignSelf: "left",
    marginTop: 25,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: '50%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    marginLeft: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  inputSmall: {
    width: '20%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    marginLeft: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  Picker: {
    width: '50%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    marginLeft: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

export default SubscriptionPage;
