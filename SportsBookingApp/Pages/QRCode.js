import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { auth, firestoredb } from '../components/config'; // Import Firebase authentication
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import {doc,deleteDoc, collection, addDoc, getDoc, getDocs } from 'firebase/firestore';


const QRCode = () => {
  const [gymAccessPin, setGymAccessPin] = useState('');
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userEmail = auth.currentUser.email || '';
    
        const userDetailsQuerySnapshot = await getDocs(collection(firestoredb, "Users", userEmail, "UserDetails"));
      
        userDetailsQuerySnapshot.forEach((doc) => {
          const userData = doc.data();
          setGymAccessPin(userData.PIN || '345769');
        });
      }
    };

    fetchUserData();
    //generateRandomPin();
  }, []);
 
 
  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <Text style={styles.title}>Gym Access</Text>
        <View style={styles.rowContainer}>
        <Text style={styles.description}>Pin: </Text>
        <Text style={styles.description}>{gymAccessPin}</Text>
        </View>
        
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.qrCodeImage}
          resizeMode="contain" // Ensure that the image fits within its container
          source={require('./images/QRCode.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#013257',
    padding: 15,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  topcontainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  description: {
    fontSize: 30,
    color: 'white',
    marginBottom: 30,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCodeImage: {
    width: '100%', // Ensure the image takes up the full width of its container
    height: '100%', // Ensure the image takes up the full height of its container
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default QRCode;
