import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TermsAndConditions() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>

      <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
      <Text style={styles.description}>
        By using the ClubTime app, you agree to comply with and be bound by these terms and conditions.
      </Text>

      <Text style={styles.sectionTitle}>2. User Conduct</Text>
      <Text style={styles.description}>
        Users are responsible for their conduct and the content they share. Harassment, abuse, or any illegal activities are strictly prohibited.
      </Text>

      <Text style={styles.sectionTitle}>3. Privacy Policy</Text>
      <Text style={styles.description}>
        Our Privacy Policy outlines how we collect, use, and protect your personal information. By using the app, you agree to the terms outlined in the Privacy Policy.
      </Text>

      <Text style={styles.sectionTitle}>4. Termination</Text>
      <Text style={styles.description}>
        We reserve the right to terminate or suspend your account if you violate these terms and conditions.
      </Text>

      <Text style={styles.sectionTitle}>5. Changes to Terms</Text>
      <Text style={styles.description}>
        We may update or modify these terms and conditions at any time without prior notice. It is your responsibility to review them periodically.
      </Text>

      <Text style={styles.sectionTitle}>6. Contact Information</Text>
      <Text style={styles.description}>
        For any questions regarding these terms and conditions, please contact us at support@clubtimeapp.com.
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
