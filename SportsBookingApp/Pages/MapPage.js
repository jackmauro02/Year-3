import React from 'react';
import MapView, {PROVIDER_GOOGLE, LatLng, Marker } from 'react-native-maps'; //import for map library
import { 
    StyleSheet,
    Dimensions,
    Alert,
    Text,
    TouchableOpacity,
    View,
    Button, 
    Image,
    ScrollView,
    SafeAreaView,
    ImageBackground,
    KeyboardAvoidingView,
    } from 'react-native';
import { useRef, useState, useEffect } from "react";

//import for geolocation 
import * as Location from 'expo-location';

//import for icons
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");

// const [origin, setOrigin] = useState<LatLng | null>();

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 51.2843348353391,
  longitude: 1.071147399558505,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};
const gym_position = {
  latitude: 51.29733772971504,
  longitude: 1.0646170359709537,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};
const gym_position2 = {
  latitude: 51.28710064087194,
  longitude: 1.0821066109909396,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};
const gym_position3 = {
  latitude: 51.295259289109794,
  longitude: 1.0529241798284608,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};
const gym_position4 = {
  latitude: 51.27979956888853,
  longitude: 1.063910506854335,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};






export default function MapPage ({ navigation }){
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    
  }
  

  return (
    <View style={styles.container}>

        {/* header for the page */}
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Showing Clubs near you</Text>
            
        </View>
        <View style={styles.mapContainer}>
          <Text style={styles.paragraph}>{text}</Text>
          {console.log(text)}
            {/* map object from google maps  */}
            <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_POSITION}>
              {/* <Marker coordinate={location}/> */}
              <Marker coordinate={gym_position} />
              <Marker coordinate={gym_position2} />
              <Marker coordinate={gym_position3} />
              <Marker coordinate={gym_position4} />
            </MapView>
        </View>

        <View style={styles.navigationContainer}>
    
        
        <TouchableOpacity onPress={() => navigation.navigate("Homepage")} >
          <Ionicons name="home-outline" size={24} color="black" />
        </TouchableOpacity>

        
        <TouchableOpacity onPress={() => navigation.navigate("Login")} >
          <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
        </TouchableOpacity>

        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //Styling for the header section
  headerContainer:{
    flex: 0.1,
    backgroundColor: '#004C72',
    textAlign: 'center',
    paddingTop: 20,
    fontSize: 15
  },

  headerText:{
    color: '#FFFFFF',
    textAlign: 'center',
    paddingTop: 10,
    marginBottom: 15,
    fontSize: 20
  },
  
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },

  navigationContainer:{
    display: 'flex',
    flex: 0.08,
    flexDirection: 'row',
    backgroundColor: '#004C72',
    textAlign: 'center',
    paddingTop: 10,
    //marginBottom: 10,
    fontSize: 20,
    //justifyContent: 'space-between',
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },

});