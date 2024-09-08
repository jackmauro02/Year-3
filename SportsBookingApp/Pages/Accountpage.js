import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { auth, firestoredb } from '../components/config'; // Import Firebase authentication
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import {doc,deleteDoc, collection, addDoc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
//import {moment} from moment;

const AccountPage = () => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [gymAccessPin, setGymAccessPin] = useState('');
  const [subscription, setSubscription] = useState('');
  const [timeStamp, setTimeStamp] = useState('');
  const navigation = useNavigation();

  // Fetch user details from Firebase Authentication when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userEmail = auth.currentUser.email || '';
        const [emailUsername] = userEmail.split('@'); // Splitting email at '@'
        // setUserName(emailUsername || '');

        // Fetch additional user details from Firestore
        const userDetailsQuerySnapshot = await getDocs(collection(firestoredb, "Users", userEmail, "UserDetails"));
        
        // Assuming there's only one document in the subcollection for the user
        userDetailsQuerySnapshot.forEach((doc) => {
          const userData = doc.data();
          // Update state or do something with userData
          setUserName(userData.Username || emailUsername);
          setFirstName(userData.Firstname || '');
          setLastName(userData.Lastname || '');
          setEmail(userData.Email || userEmail);
          setGymAccessPin(userData.PIN || '3457892');
        });

        const subscriptionQuerySnapshot = await getDocs(collection(firestoredb, "Users", userEmail, "Subscription"));
        subscriptionQuerySnapshot.forEach((doc) => {
          const userData2 = doc.data();
          setSubscription(userData2.subscription || 'Free');
          setTimeStamp(userData2.timestamp || 'N/A');
        //   if (timeStamp == userData2.timestamp) {
        //     const timestamp = new Date(userData2.timestamp);
        //     timestamp.setMonth(timestamp.getMonth() + 1);
        //     const newTimestamp = timestamp.toISOString().slice(0, 19).replace('T', ' ');
        //     setTimeStamp(newTimestamp);
        //   } else {
        //     setTimeStamp('N/A');
        //   //}
        // };
        });
      }
    };

    fetchUserData();
    //generateRandomPin();
  }, []);

  //const expireDate = () => {
    


  const generateRandomPin = () => {
    let randomPin = Math.floor(Math.random() * 900000) + 100000;
    setGymAccessPin(randomPin.toString());
  };

  const handleSaveDetails = async () => {
    // Save user details logic here
    setIsEditing(false);
    const updateDocRef = doc(firestoredb, "Users", userEmail,"UserDetails");
      await updateDoc(updateDocRef, {
        Username: Username,
        Firstname: Firstname,
        Lastname: Lastname,
        Email: email,
        PIN: PIN,
      });
  };

  const handleDeleteAccount = async () => {
    // Delete account logic
    if (auth.currentUser) {
      auth.currentUser.delete()
      await deleteDoc(doc(firestoredb, "Users", userEmail))

        .then(() => {
          // Account deleted successfully
          console.log('Account deleted successfully');
          // Navigate to login page or any other appropriate action
          navigation.navigate('Login');
        })
        .catch(error => {
          console.error('Error deleting account:', error);
        });
    }
  };

  const pullInfo = async () => {
    try {
      if (auth.currentUser) {
        const userEmail = auth.currentUser.email || '';
        
        const userDetailsQuerySnapshot = await getDocs(collection(firestoredb, "Users", userEmail, "UserDetails"));
        
        // Assuming there's only one document in the subcollection for the user
        userDetailsQuerySnapshot.forEach((doc) => {
          const userData = doc.data();
          // Update state or do something with userData
          setUserName(userData.Username || '');
          setFirstName(userData.Firstname || '');
          setLastName(userData.Lastname || '');
          setEmail(userData.Email || '');
          setGymAccessPin(userData.PIN || '');
        });
      }
    } catch (error) {
      console.error("Error pulling user info:", error);
    }
  };

    


  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Account</Text>
        <View style={styles.accountInfoContainer}>
          <Text style={styles.contactLabel}>UserName:</Text>
          {isEditing ? (
            <TextInput
              style={styles.contactValueInput}
              value={userName}
              onChangeText={setUserName}
            />
          ) : (
            <Text style={styles.contactValue}>{userName}</Text>
          )}
        </View>
        <View style={styles.accountInfoContainer}>
          <Text style={styles.contactLabel}>First Name:</Text>
          {isEditing ? (
            <TextInput
              style={styles.contactValueInput}
              value={firstName}
              onChangeText={setFirstName}
            />
          ) : (
            <Text style={styles.contactValue}>{firstName}</Text>
          )}
        </View> 
         <View style={styles.accountInfoContainer}>
          <Text style={styles.contactLabel}>Last Name:</Text>
          {isEditing ? (
            <TextInput
              style={styles.contactValueInput}
              value={lastName}
              onChangeText={setLastName}
            />
          ) : (
            <Text style={styles.contactValue}>{lastName}</Text>
          )}
        </View> 
        <View style={styles.accountInfoContainer}>
          <Text style={styles.contactLabel}>Email:</Text>
          {isEditing ? (
            <TextInput
              style={styles.contactValueInput}
              value={email}
              onChangeText={setEmail}
            />
          ) : (
            <Text style={styles.contactValue}>{email}</Text>
          )}
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => setIsEditing(!isEditing)}>
            <Text style={styles.btnText}>{isEditing ? 'Cancel' : 'Edit Details'}</Text>
          </TouchableOpacity>
          {isEditing && (
            <TouchableOpacity style={styles.btn} onPress={handleSaveDetails}>
              <Text style={styles.btnText}>Save Details</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.title}>Subscription</Text>
        <View style={styles.accountInfoContainer}>
          <Text style={styles.contactLabel}>Subscription type: </Text>
          <Text style={styles.contactLabel}> {subscription}</Text>
        </View>
        <View style={styles.accountInfoContainer}>
          <Text style={styles.contactLabel}>Renewal date:</Text>
          <Text style={styles.contactLabel}> {timeStamp} </Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SubscriptionPage')}>
          <Text style={styles.btnText}>Payment Method</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Gym Access</Text>
        <View style={styles.accountInfoContainer}>
          <Text style={styles.contactLabel}>PIN: {gymAccessPin}</Text>
        </View>
        {/* QR Code Button */}
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('QRCode')}>
            <Text style={styles.btnText}>Show QR Code</Text>
          </TouchableOpacity>
          {/* Feedback Button */}
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Feedback')}>
          <Text style={styles.btnText}>Feedback</Text>
        </TouchableOpacity>
          
          <View style={styles.rowContainer}>
        {/* Logout Button */}
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
        {/* Delete Account Button */}
        <TouchableOpacity style={styles.btn} onPress={handleDeleteAccount}>
          <Text style={styles.btnText}>Delete Account</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#013257",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '50%',
    marginLeft: 5,
  },
  accountInfoContainer: {
    flexDirection: 'row',
    marginBottom: 2,
    marginTop: 3,
    marginLeft: 5,
  },
  contactLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    color: 'white',
  },
  contactValue: {
    flex: 1,
    color: 'white',
  },
  contactValueInput: {
    flex: 1,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingBottom: 2,
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
});

export default AccountPage;
