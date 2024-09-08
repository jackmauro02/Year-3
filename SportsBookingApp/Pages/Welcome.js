//import default libraries for react native
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
// import { AppLoading } from "expo-app-loading";


export default function Welcome({navigation}) {

  console.log("1");

  return (

    // Splash Screen main container/View
    <View style={styles.container}>

        {/* logo at top of screen */}
        <Text style={styles.h1}>ClubTime</Text>

        {/* Container for images/icons */}
        <View style={styles.imageContainer} >
          <Image style={{marginLeft:150, marginTop:40, height:'35%', width:'30%'}} source={require('./images/Ellipse_2.png')}/>
          <Image style={{marginRight:150, height:'55%', width:'50%'}} source={require('./images/Ellipse_1.png')}/>
        </View>

        {/* Main welcome text container/View */}
        <View style={styles.container2}>
          <Text style={styles.h2}>Let's Get</Text>
          <Text style={styles.h2}>Started</Text>
          <Text style={styles.h4}>Grow Together</Text>
        </View>

        {/* Join button  */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.btn} >
          <Text style={styles.btn_text}>Join</Text>
        </TouchableOpacity>

        {/* Keep this as it resembles the background color of the status bar on the chosen device */}
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#013257',
    
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 50,
    paddingBottom: 70,
  },

  imageContainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'

  },

  tinyLogo:{
    width:100,
    height:60,
    resizeMode:'contain'
  },

  tinyLogo:{
    width:100,
    height:60,
    resizeMode:'contain'
  },

  h1: {
    fontSize: 35,
    color: 'white', 
    alignSelf: 'center',
  },

  container2: {
    fontSize: 35,
    color: 'white', 
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft:20,
  },

  h2: {
    fontSize: 60,
    color: 'white',  
  },

  h4: {
    fontSize: 25,
    color: 'white',  
    paddingTop:15
  },

  btn: {
    width: 269,
    height: 64,
    backgroundColor: '#229AD1',
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection:'row',
    alignItems: 'center',
    shadowRadius:3.95,
    shadowOpacity:0.25,
    elevation:6,
    shadowColor:"#000",
    shadowOffset:{
      width:0,
      height:3,
    },
    alignSelf: 'center',
  },

  btn_text: {
    fontSize: 25
  }
}
);

