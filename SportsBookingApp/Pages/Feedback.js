import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { collection, addDoc, setDoc } from "firebase/firestore";
import { db, firestoredb, firestore } from '../components/config';
import { auth } from '../components/config';

const FeedbackPage = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [Email, setEmail] = useState('');
  const [userDetails, setUserDetails] = useState({
    username: auth.currentUser?.email
  });

  useEffect(() => {
    const fetchUserData = () => {
      if (auth.currentUser) {
        const userEmail = auth.currentUser.email || '';
        setEmail(auth.currentUser.email || '');
      }
    };
    fetchUserData();
  }, []);


  const handleCancel = () => {
    console.log('Feedback submission canceled');
  };

  const handleConfirm = () => {
    console.log('Feedback submitted');
  };

  const handleBooking = async () => {
    try {
      if (!subject || !description || !rating) {
        Alert.alert('Missing Fields', 'Please select a subject, description, and rating.');
        return;
      }
  
      const feedbackCollectionRef = collection(firestore, "Users", userDetails.username,"Feedback");
      const newFeedbackRef = await addDoc(feedbackCollectionRef, {
        subject: subject,
        description: description,
        rating: rating,
        //Email: Email,
      });
      console.log('Feedback added successfully with ID: ', newFeedbackRef.id);
  
      //show alert if successful
      Alert.alert('Feedback Successful', 'Your Feedback has been added successfully!');
    } catch (error) {
      console.error('Error adding Feedback: ', error);
      Alert.alert('Error', 'An error occurred while leaving Feedback. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      <View>
        <Text style={styles.label}>Subject:</Text>
        <TextInput 
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />
      </View>
      <View>
        <Text style={styles.label}>Rating:</Text>
        <View>
          {[1, 2, 3, 4, 5].map((value) => (
            <Text key={value} style={styles.ratingLabel}>
              <TextInput
                type="radio"
                name="rating"
                value={value}
                checked={rating === value}
                onChange={() => setRating(value)}
              />
              {value}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {/* <button style={styles.button} onClick={handleCancel}>Cancel</button> */}
        <TouchableOpacity onPress={() => handleCancel} >
          <Text style={styles.title}>Cancel</Text>
        </TouchableOpacity>

        {/* <button style={styles.button} onClick={handleBooking}>Confirm</button> */}
        <TouchableOpacity onPress={() => handleBooking} >
          <Text style={styles.title}>Confirm</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: '#013257',
    padding: 15,
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: 'center',
    height:'100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    alignItems: 'center',
  },
  label: {
    color: 'white',
    marginBottom: 5,
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 40,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  textarea: {
    width: '90%',
    height: 100,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
    spaceBetween: 'center',
  },
  button: {
    width: 134,
    height: 40,
    backgroundColor: '#229AD1',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ratingLabel: {
    color: 'white',
    marginRight: 5,
  },
};

export default FeedbackPage;
