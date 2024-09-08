import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutUs() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>

      <Text style={styles.description}>
        ClubTime is a community-driven platform dedicated to bringing people together who share common interests. Our mission is to create a space where individuals can connect, collaborate, and grow together.
      </Text>

      <Text style={styles.description}>
        Founded in [Year], ClubTime has been a hub for diverse communities, fostering meaningful relationships and empowering individuals to pursue their passions.
      </Text>

      <Text style={styles.description}>
        Thank you for being part of ClubTime. Let's continue to explore, learn, and thrive together!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#013257',
    padding: 15,
    paddingTop: 50,
    paddingBottom: 70,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    color: 'white',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
});
