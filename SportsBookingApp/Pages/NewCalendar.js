import React, { useEffect, useState, } from 'react'
import { StyleSheet, Alert, Text, TouchableOpacity, View, Button,  Image, ScrollView, SafeAreaView, ImageBackground,  KeyboardAvoidingView} from 'react-native';

//imports for firebase
import { db , firestoredb } from '../components/config';
import { ref, get } from 'firebase/database';
import {collection, doc, setDoc, addDoc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../components/config';
//import firestore from '@react-native-firebase/firestore';


//import for the calendar
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Card, ListItem, Icon } from 'react-native-elements';

import Booking from '../components/Booking';

export default function NewCalendar({ route, navigation}) {

    

    //For user authentication
    const [userDetails, setUserDetails] = useState({
        username: auth.currentUser?.email
    });

    //all functions for the calendar view
    const [selectedDate, setSelectedDate] = useState('');
    const [markedDates, setMarkedDates] = useState({});

    //handles the calendar date selection
    const handleDateSelect = date => {
        setSelectedDate(date.dateString);
        setMarkedDates({ [date.dateString]: { selected: true, disableTouchEvent: true, selectedDotColor: '#FF4500' } });
    };
    
    // Array myItems, where i'd like to store the data
    const [classList, setClassList] = useState([]); 

    const [task, setTask] = useState();

    //For getting booking data
    const [Day, setDay] = useState('');
    const [Class, setClass] = useState('');
    const [Time, setTime] = useState('');
    
    //function for the Check Your Bookings Button
    const handleData = async ( ) => {
        console.log('starting handleData');
        //clears previous check
        setClassList([]);
        let tempClassItem = {}; // Initialize tempClassItem outside the loop
        //Grabs the users booking
        console.log(userDetails.username);
        const querySnapshot = await getDocs(collection(firestoredb, "Users", userDetails.username, "Bookings"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            let data = doc.data();
            //let json = data.Date;
            console.log("Right Here");
            // console.log(json);
            // setTime(data.Date.seconds);
            // let temptime = data.Date.seconds;
            // let event = json.toDate();
            // let event2 = timeToString(event);
            // console.log(event);
            // console.log(event2);
            // let event3 = timeToString2(event);
            // stores date based on doms code
            let dateDom = data.date;
            
            
            console.log("-----1----");
            console.log(Day);
            if(Day != ""){
                console.log("-----2----");
                // console.log(temptime, Day);
                //let temp =  Day % temptime;
                let tempClass = data.Class
                //console.log(temp);
                console.log("Test for new date checker");
                console.log(dateDom);
                console.log(selectedDate);
                if (dateDom == selectedDate){
                    console.log("4");
                    console.log("The data has matched the date selected");
                    
                    // let tempClassItem = {
                    //     '2024-02-19' :[ 
                    //         {name : tempClass, description : dateDom}
                    //     ]
                    // }
                    // console.log("----4-----");
                    setTask(data.class);
                    // console.log(task);
                    setClassList([task]);
                    //setTask(null);
                    console.log("the task is : " + task);
                    
                    //tempClassItem['2024-02-19'].push({ name: tempClass, description: event3 });
                    
                    console.log(classList);

                    //setClassList(oldArray => [...oldArray,  {'2024-02-19' : tempClassItem['2024-02-19'] } ]);
                
                    //{setClassList(oldArray => [...oldArray,{ [Object.keys(tempClassItem)] :tempClassItem['2024-02-19'] }]);}
                    //setClassList(tempClassItem);
                   // console.log("added data to the array")
                    // setTime(event2);

                    
                } else {
                    console.log("The data has not matched the date selected");
                }                
            }
            
        //renderItem(classList, data);
        });
    }
    const buttonHandle = () => {

        //console.log(selectedDate);
        console.log(classList);
        console.log("selected date is : " + selectedDate);
            // Check if classList has data for the date '2024-02-19'
        // if (classList && classList['2024-02-19']) {
        //     console.log(classList['2024-02-19']);
        // } else {
        //     console.log("No data found for the date '2024-02-19'");
        // }
        
        handleData(selectedDate);

        

        


    };
    
    // const renderItem = (data) => {
    //     console.log('rendering', data);
    //     return (
    //         <TouchableOpacity>
    //             <View style={styles.cardContainer}>
    //                 <Text style={styles.text}> {data.name}</Text>
    //                 <Text style={styles.text}> {data.description}</Text>
    //             </View>
                
    //         </TouchableOpacity>
    //     )
    // };


const [items, setItems] = useState({});

    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
      }
    //returns timestamp in military format
    const timeToString2 = (time) => {
        const date = new Date(time);
        let temp4 = date.toISOString().split('T')[1];

        return temp4.slice(0, 8);
      }



  




    return (

        <View style={styles.mainContainer}>

        <Button title="Check Your Bookings" onPress={buttonHandle} />
            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={ (day) => {
                        
                        setDay((day.timestamp) / 1000 );
                        console.log("day clicked is :" + selectedDate);
                        
                        handleDateSelect(day);
                        //handleData(day);
                        }}
                    markedDates={markedDates}
                />
            </View>
            <View style={styles.bookingContainer}>
                {
                classList.map((item, index) => {
                    return (
                    <TouchableOpacity key={index} >
                        <Booking  text={item} />
                    </TouchableOpacity>
                    )
                })
                }
            </View>
      
        </View>
        
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        //paddingTop: 10,
        //backgroundColor: '#E8EAED',
        
      },
    headerContainer:{
        display: 'flex',
        flex: 1,
        backgroundColor: '#004C72',
        justifyContent: 'space-between',
        //alignItems: 'center',
        justifyContent: 'start'
    },
    calendarContainer: {
        flex: 1,
        marginBottom: 20,
      },
    cardContainer:{
        display: 'flex',
        flex: 1,
        backgroundColor: '#009FFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'start',
        width: '50%',
        height: '50%',
        

    },
    text:{
        color: '#FFFFFF',
        fontSize: 20,
        
    },

    bookingContainer :{
        paddingTop: 80,
        paddingHorizontal: 20,
        
      },
    
});