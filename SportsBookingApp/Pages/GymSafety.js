import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GymSafety() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gym Safety Guidelines</Text>

      <Text style={styles.sectionTitle}>1. Personal Health Check</Text>
      <Text style={styles.description}>
        Before entering the gym, ensure you are in good health. If you are feeling unwell or have symptoms of illness, please stay home.
      </Text>

      <Text style={styles.sectionTitle}>2. Hygiene Practices</Text>
      <Text style={styles.description}>
        Practice good hygiene by washing your hands frequently and using hand sanitizer. Wipe down equipment before and after use with the provided disinfectant wipes.
      </Text>

      <Text style={styles.sectionTitle}>3. Physical Distancing</Text>
      <Text style={styles.description}>
        Maintain a safe distance from other gym-goers. Follow marked guidelines for equipment spacing and adhere to any floor markings indicating proper distancing.
      </Text>

      <Text style={styles.sectionTitle}>4. Face Coverings</Text>
      <Text style={styles.description}>
        In accordance with local regulations, wear a face covering when required. Remove the face covering only during strenuous exercise and maintain distance from others.
      </Text>

      <Text style={styles.sectionTitle}>5. Equipment Usage</Text>
      <Text style={styles.description}>
        Follow the gym's guidelines for equipment usage. Be mindful of time limits on machines during peak hours, and share equipment with courtesy.
      </Text>

      <Text style={styles.sectionTitle}>6. Reporting Concerns</Text>
      <Text style={styles.description}>
        Report any equipment issues, cleanliness concerns, or violations of safety protocols to gym staff immediately.
      </Text>

      <Text style={styles.sectionTitle}>7. Stay Informed</Text>
      <Text style={styles.description}>
        Stay informed about the gym's safety protocols and any updates or changes. Check notices, signage, and the gym's communication channels regularly.
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
