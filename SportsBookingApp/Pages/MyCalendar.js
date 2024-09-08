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

export default function MyCalendar({ route, navigation}) {

    

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
    //For getting booking data
    const [Day, setDay] = useState('');
    const [Class, setClass] = useState('');
    const [Time, setTime] = useState('');

     // Function to add a new class entry
     const addClassEntry = (date, className, description) => {
        // Check if classList[date] is undefined, if so, initialize it as an empty array
        // if (!classList[date]) {
        //     setClassList(prevState => ({
        //         ...prevState,
        //         [date]: []
        //     }));
        // }

        // // Add the new entry
        // setClassList(prevState => ({
        //     ...prevState,
        //     [date]: [
        //         //...prevState[date],
        //         {
        //             name: className,
        //             description: description
        //         }
        //     ]
        // }));
        setClassList(prevState => ({
            ...prevState,
            [date]: [
                ...(prevState[date] || []), // Use existing array or initialize as empty array
                {
                    name: className,
                    description: description
                }
            ]
        }));
        console.log(classList);
    };

    
    //function for the Check Your Bookings Button
    const handleData = async ( ) => {
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
                    
                    // tempClassItem = {
                    //     [selectedDate] :[ 
                    //         {name : data.class, description : dateDom}
                    //     ]
                    // }
                    // if(classList != null){
                    //     classList[data.date].push({
                    //         name: data.class,
                    //         description: dateDom
                    //     });
                    // } else {
                    //     classList[data.date] = [{
                    //         name: data.class,
                    //         description: data.description
                    //     }];
                    // }

                    addClassEntry(selectedDate, data.class, data.time);
                    
                    console.log("the current classList is : " + classList);
                    //tempClassItem['2024-02-19'].push({ name: tempClass, description: event3 });
                    
                    //console.log(tempClassItem['2024-02-19']);

                   // setClassList(oldArray => [...oldArray,  {'2024-02-19' : tempClassItem['2024-02-19'] } ]);
                
                   
                    //setClassList(tempClassItem);
                    console.log("added data to the array")
                    //setTime(event2);

                    
                } else {
                    console.log("The data has not matched the date selected");
                }                
            }
            
        //renderItem(classList, data);
        });
    }
    const buttonHandle = () => {

        console.log(classList);

            // Check if classList has data for the date '2024-02-19'
        // if (classList && classList['2024-02-19']) {
        //     console.log("there is data for ");
        //     console.log(classList['2024-02-19']);
        // } else {
        //     console.log("No data found for the date '2024-02-19'");
        // }
            

        

        


    };
    


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

    const loadItems = (day) => {

        // const items = classList;
        setTimeout(() => {
        for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);

            if (!items[strTime]) {
            items[strTime] = [];
            
            const numItems = Math.floor(Math.random() * 3 + 1);
            for (let j = 0; j < numItems; j++) {
                items[strTime].push({
                name: 'Item for ' + strTime + ' #' + j,
                height: Math.max(50, Math.floor(Math.random() * 150)),
                day: strTime
                });
            }
            }
      }
      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      //setItems(classList);
    }, 1000);
    };

  

    const renderItem = (data) => {
        console.log('rendering', data);
        return (
            <TouchableOpacity >
                <View style={styles.cardContainer}>
                    <Text style={styles.text}> {data.name}</Text>
                    <Text style={styles.text}> {data.description}</Text>
                </View>
                
            </TouchableOpacity>
        )
    };

    return (

        <View style={{flex: 1}}>
        {/* <View style={styles.headerContainer}> */}
            <Button title="Check Your Bookings" onPress={buttonHandle} />
        {/* </View> */}
        <Agenda
            items={classList}
            //  items={{
            //      '2024-02-19' : [
            //         {name : "sports", description : "test"},
            //         {name : "sports", description : "test"}
            //       ]
           
            //  }}
            renderEmptyDate={() => {
            return (
                <View>
                    <Text>Select A Day</Text>
                </View>
            ); 
            }}
            loadItemsForMonth={loadItems}
            //loads the page on the current day
            selected={new Date()}
            renderItem={renderItem}
            onDayPress={day => {
                let tempptime = day.dateString;
                setDay((day.timestamp) / 1000 );
                handleData(tempptime);
                console.log(Day);
                console.log('selected day', day);
                handleDateSelect(day);
                //setTime(tempptime);
                console.log("date to string: ", tempptime);
            }}
        />
        {/* <View> */}
            {/* <Text>Dummy</Text> */}
        {/* </View> */}
      </View>
        
    );
}

const styles = StyleSheet.create({
    headerContainer:{
        display: 'flex',
        flex: 1,
        backgroundColor: '#004C72',
        justifyContent: 'space-between',
        //alignItems: 'center',
        justifyContent: 'start'
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
        paddingBottom: '10px',
        

    },
    text:{
        color: '#FFFFFF',
        fontSize: 20,
        
    },
    
});