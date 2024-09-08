import React, { useEffect, useState } from 'react'
import { StyleSheet, Alert, Text, TouchableOpacity, View, Button,  Image, ScrollView, SafeAreaView, ImageBackground,  KeyboardAvoidingView} from 'react-native';


{/* This will be a function which is a reused component recalled to create a task from user input */}
const Booking = (props) => {

    return (
        <TouchableOpacity>
            <View style={styles.cardContainer}>
                <Text style={styles.text}> {props.text}</Text>
                {/* <Text style={styles.text}> {props.description}</Text> */}
            </View>
                
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    cardContainer:{
        display: 'flex',
        flex: 1,
        backgroundColor: '#009FFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'start',
        width: '50%',
        height: '50%',
    }


});

{/* this allows the components to be imports by other files .e.g. App.js */}
export default Booking;