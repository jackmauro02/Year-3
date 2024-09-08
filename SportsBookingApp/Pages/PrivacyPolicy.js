import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PrivacyPolicy() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>

      <Text style={styles.description}>
        This Privacy Policy explains how ClubTime collects, uses, and protects your personal information when you use our app.
      </Text>

      <Text style={styles.sectionTitle}>1. Information We Collect</Text>
      <Text style={styles.description}>
        We may collect personal information such as your name, email address, and profile information when you create an account on ClubTime.
      </Text>

      <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
      <Text style={styles.description}>
        We use the information collected to provide and improve our services, personalize your experience, and communicate with you.
      </Text>

      <Text style={styles.sectionTitle}>3. Information Sharing</Text>
      <Text style={styles.description}>
        We do not share your personal information with third parties, except as required by law or with your explicit consent.
      </Text>

      <Text style={styles.sectionTitle}>4. Security</Text>
      <Text style={styles.description}>
        We take reasonable measures to protect your personal information, but no method of transmission over the internet or electronic storage is 100% secure.
      </Text>

      <Text style={styles.sectionTitle}>5. Changes to Privacy Policy</Text>
      <Text style={styles.description}>
        We may update our Privacy Policy from time to time. Any changes will be posted on this page.
      </Text>

      <Text style={styles.sectionTitle}>6. Contact Us</Text>
      <Text style={styles.description}>
        If you have any questions or concerns about our Privacy Policy, please contact us at privacy@clubtimeapp.com.
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
  sectionTitle: {
    fontSize: 25,
    color: 'white',
    marginTop: 15,
  },
  description: {
    fontSize: 18,
    color: 'white',
    marginBottom: 15,
    textAlign: 'justify',
  },
});
