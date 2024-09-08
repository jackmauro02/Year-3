import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { collection, addDoc, setDoc, query, where, getDocs, timestamp} from "firebase/firestore";
import { db, firestoredb } from '../components/config';
import { auth } from '../components/config';

const BookingPage = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const [classModalVisible, setClassModalVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [totalBookings, setTotalBookings] = useState(null); //added variable for total number of bookings to display after class selection

  //for user authentication
  const [userDetails, setUserDetails] = useState({
    username: auth.currentUser?.email
  });


  const handleDateSelect = date => {
    setSelectedDate(date.dateString);
    setMarkedDates({ [date.dateString]: { selected: true, disableTouchEvent: true, selectedDotColor: '#FF4500' } });
  };

  const handleClassSelect = classId => {
    setSelectedClass(classId);
    setClassModalVisible(false); //close the class modal after selection
  };

  const handleTimeSelect = async time => {
    setSelectedTime(time);
    setTimeModalVisible(false);
    //only once all 3 fields are selected 
    if (selectedDate && selectedClass && time) {
      const classBookingsQuery = query( //query is performed to get the total number of bookings for that class
        collection(firestoredb, "AllBookings"),
        where("date", "==", selectedDate),
        where("class", "==", selectedClass),
        where("time", "==", time)
      );
      const classBookingsSnapshot = await getDocs(classBookingsQuery);
      setTotalBookings(classBookingsSnapshot.size); //totalBookings is assigned with the number of bookings retrieved
    }
  };  

  const handleBooking = async () => {
    try {
      //only if all fields are selected a booking can be attempted
      if (!selectedDate || !selectedClass || !selectedTime) {
        Alert.alert('Missing Fields', 'Please select a date, class, and time.');
        return;
      }
  
      //performs a check for double booking by querying the user's bookings
      const userBookingsQuery = query(
        collection(firestoredb, "Users", userDetails.username, "Bookings"),
        where("date", "==", selectedDate),
        where("class", "==", selectedClass),
        where("time", "==", selectedTime)
      );
      const userBookingsSnapshot = await getDocs(userBookingsQuery);
  
      if (!userBookingsSnapshot.empty) {
        //if the user already has a booking for the selected class, date, and time
        Alert.alert('Already booked', 'You have already booked this class, Please select another time or try again later.');
        return;
      }
  
      //checks for the total number of bookings for the selected booking
      const classBookingsQuery = query(
        collection(firestoredb, "AllBookings"),
        where("date", "==", selectedDate),
        where("class", "==", selectedClass),
        where("time", "==", selectedTime)
      );
      const classBookingsSnapshot = await getDocs(classBookingsQuery);
  
      const maxBookingsPerClass = 25; //maximum number of bookings per class
      if (classBookingsSnapshot.size >= maxBookingsPerClass) {
        //if the maximum limit for bookings for this class has been reached alert is displayed
        Alert.alert('Class Full', 'Sorry, this class is already fully booked. Please select another class.');
        return;
      }
  
      //One function to store each booking directly under the user so that the view booking can pull from it 
      const newBookingRef = await addDoc(collection(firestoredb, "Users", userDetails.username, "Bookings"), {
        date: selectedDate,
        class: selectedClass,
        time: selectedTime,
      });
  
      //Another function to store each booking under the allbookings section this allows for querying to enable class limits
      const newBookingRef2 = await addDoc(collection(firestoredb, "AllBookings"), {
        date: selectedDate,
        class: selectedClass,
        time: selectedTime,
      });
      
      //message to display bookigng has been added successfully 
      console.log('Booking added successfully with ID: ', newBookingRef.id);
  
      //logging the total number of bookings for the specific booking 
      console.log(`Total bookings for ${selectedClass} on ${selectedDate} at ${selectedTime}: ${classBookingsSnapshot.size + 1}`);
  
      //displays alert if successful
      Alert.alert('Booking Successful', 'Your class has been booked successfully!');
    } catch (error) {
      //if unsuccessful
      console.error('Error adding booking: ', error);
      Alert.alert('Error', 'An error occurred while booking the class. Please try again later.');
    }
  };
  
  
  
  

  
  
  
  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.returnButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Return</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewBookingButton}
        onPress={() => {}}
      >
        <Text style={styles.buttonText}>View Bookings</Text>
      </TouchableOpacity>
      <View style={styles.calendarContainer}>
        <Text style={styles.title}>Select a date to book a gym class:</Text>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={markedDates}
        />
      </View>
      <View style={styles.selectionContainer}>
        {/* <Text style={styles.label}>Select a class:</Text> */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setClassModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{selectedClass || 'Select a class'}</Text>
        </TouchableOpacity>
        {/* <Text style={styles.label}>Select a time:</Text> */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setTimeModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{selectedTime || 'Select a time'}</Text>
        </TouchableOpacity>
        {selectedDate && selectedClass && selectedTime && totalBookings !== null && ( //only when all 3 fields have been selected the text is generated
          <Text style={styles.spotsLeftText}>Spots left: {25 - totalBookings}</Text> //25 is total limit for classes - totalBookings = spots left
        )}
        <TouchableOpacity
          style={styles.bookNowButton}
          onPress={handleBooking}
        >
          <Text style={styles.bookNowButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      {/* Class Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={classModalVisible}
        onRequestClose={() => setClassModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setClassModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClassSelect('Zumba')}>
              <Text style={styles.option}>Zumba</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClassSelect('Boxing')}>
              <Text style={styles.option}>Boxing</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClassSelect('Cycle Class')}>
              <Text style={styles.option}>Cycle Class</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Time Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={timeModalVisible}
        onRequestClose={() => setTimeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setTimeModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTimeSelect('10:00 AM')}>
              <Text style={styles.option}>10:00 AM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTimeSelect('2:00 PM')}>
              <Text style={styles.option}>2:00 PM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTimeSelect('5:00 PM')}>
              <Text style={styles.option}>5:00 PM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

//styling for booking
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#add8e6',
    paddingHorizontal: 15,
    paddingTop: 100,
  },
  returnButton: {
    position: 'absolute',
    top: 25,
    left: 20,
    backgroundColor: '#4682B4',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
  },
  viewBookingButton: {
    position: 'absolute',
    top: 25,
    right: 20,
    backgroundColor: '#4682B4',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
  },
  calendarContainer: {
    flex: 1,
    marginBottom: 20,
  },
  selectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  dropdownButton: {
    height: 70,
    width: 375,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  dropdownText: {
    fontSize: 18,
    color: 'black',
  },
  bookNowButton: {
    width: 240,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4682B4',
    borderRadius: 8,
  },
  bookNowButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  option: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
});

export default BookingPage;
