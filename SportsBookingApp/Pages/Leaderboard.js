import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { collection, addDoc, setDoc, Doc, getDoc, getDocs } from "firebase/firestore";
import {  auth, db, firestoredb, firestore } from '../components/config';

const Leaderboard = () => {
  const [timeRange, setTimeRange] = useState('allTime'); // 'allTime', 'oneWeek', 'oneMonth'
  const [userData, setUserData] = useState([]);
  const [ID, setID] = useState('0');
  const [Name, setName] = useState('');
  const [Score, setScore] = useState('');
  const [User, setUser] = useState('');
  const [Rank, setRank] = useState('');
  const [Uval, setUval] = useState('0');

  // Dummy data for demonstration
  const allUserData = [
    [1, 'John', 302, 1],
    [2, 'Alice', 258, 2],
    [3, 'Bob', 209, 3],
    [4, 'Kaci', 157, 4],
    [5, 'Ozzy', 106, 5],
    [6, 'Alex', 52, 6],
    // Add more users as needed
  ];

  const monthUserData = [
    [1, 'Jamie', 30, 1],
    [2, 'Alice', 25, 2],
    [3, 'Ujjval', 20, 3],
    [4, 'Charlotte', 15, 4],
    [5, 'Mary', 10, 5],
    [6, 'Harry', 5, 6],
    // Add more users as needed
  ];

  const weekUserData = [
    [1, 'Michael', 7, 1],
    [2, 'Prashant', 6, 2],
    [3, 'Tommy', 6, 3],
    [4, 'Kaci', 5, 4],
    [5, 'Ozzy', 4, 5],
    [6, 'Tom', 3, 6],
    // Add more users as needed
  ];
  const realUserData = [
    [ID[1], Name[1], Score[1], Rank[1]],
    // Add more users as needed
  ];

  const getUserData = () => {
    switch (timeRange) {
      case 'oneWeek':
        return weekUserData;
      case 'oneMonth':
        return monthUserData;
      default:
        return allUserData;
    }
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userQuerySnapshot = await getDocs(collection(firestoredb, "Users"));
      userQuerySnapshot.forEach((doc) => {
        const userData3 = doc.data();
        // Update state or do something with userData
        setUser(doc.id || userData3.doc.id);
      });
      
      // if (auth.currentUser) {
      //   const userEmail = auth.currentUser.email || '';

        // Fetch additional user details from Firestore
        const userDetailsQuerySnapshot = await getDocs(collection(firestoredb, "Users", User, "UserDetails"));
        // Assuming there's only one document in the subcollection for the user
        userDetailsQuerySnapshot.forEach((doc) => {
          const userData = doc.data();
          const i = 0; 
          // Update state or do something with userData
          setID(i || '');
          setName(userData.Username || '');
          i++;
        });

        const bookingsQuerySnapshot = await getDocs(collection(firestoredb, "Users", User, "Bookings"));
        bookingsQuerySnapshot.forEach((doc) => {
          const userData2 = doc.data();
          const b = 0;
          b++;
          const totalBookings = b;
          setScore(totalBookings || '');
        });
        setUval(Uval++);
      }
    //};

    fetchUserData();
    //generateRandomPin();
  }, []);

  //above need to create function to add the data to the array


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, timeRange === 'oneWeek' && styles.activeButton]}
            onPress={() => handleTimeRangeChange('oneWeek')}>
            <Text style={styles.buttonText}>1 Week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, timeRange === 'oneMonth' && styles.activeButton]}
            onPress={() => handleTimeRangeChange('oneMonth')}>
            <Text style={styles.buttonText}>1 Month</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, timeRange === 'allTime' && styles.activeButton]}
            onPress={() => handleTimeRangeChange('allTime')}>
            <Text style={styles.buttonText}>All Time</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, styles.headerRank]}>Rank</Text>
        <Text style={[styles.headerText, styles.headerName]}>Name</Text>
        <Text style={[styles.headerText, styles.headerVisits]}>Visits</Text>
      </View>
      {getUserData().map((user, index) => (
        <View style={styles.userContainer} key={index}>
          <Text style={styles.userRanking}>{user[3]}</Text>
          <Text style={styles.userName}>{user[1]}</Text>
          <Text style={styles.userVisits}>{user[2]}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#013257',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    width: 100,
    height: 50,
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
    alignSelf: "center",
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  activeButton: {
    backgroundColor: '#ccc',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRank: {
    flex: 1,
  },
  headerName: {
    flex: 3,
    textAlign: 'center',
  },
  headerVisits: {
    flex: 1,
    textAlign: 'right',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userRanking: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  userName: {
    flex: 3,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  userVisits: {
    flex: 1,
    fontSize: 18,
    color: 'white',
    textAlign: 'right',
  },
});

export default Leaderboard;
