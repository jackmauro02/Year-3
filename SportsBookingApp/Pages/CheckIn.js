import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; //importing QR code generator 

const CheckIn = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Me</Text>
      <View style={styles.qrContainer}>
        <QRCode //creating QR code
          value="test"              
          size={300}
          // color="#004C72"
          backgroundColor="white"
        />
        {/* <Text style={styles.scanText}>Scan the QR Code in order to check in</Text> */}
        <Text style={[styles.scanText, styles.boldText, ]}>Total visits this month: <Text style={styles.boldText}>0</Text></Text>
      </View>
    </View>
  );
};

//styling for page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004C72',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'white',
  },
  qrContainer: {
    alignItems: 'center',
  },
  scanText: {
    fontSize: 24,
    marginTop: 20,
    color: 'white',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  bottomText: {
    position: 'absolute',
    bottom: 20,
  },
});

export default CheckIn;
