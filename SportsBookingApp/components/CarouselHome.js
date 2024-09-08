import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// import { Carousel } from 'react-native-snap-carousel';

const CarouselHome = () => {
//   const sportingOptions = [
//     {
//       id: 1,
//       name: 'Running',
//       image: require('./Pages/images/pexels-julia-larson-6456291.png'),
//     },
//     {
//       id: 2,
//       name: 'Weightlifting',
//       image: require('./Pages/images/pexels-julia-larson-6456291.png'),
//     },
//     {
//       id: 3,
//       name: 'Yoga',
//       image: require('./Pages/images/pexels-julia-larson-6456291.png'),
//     },
//   ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.sportName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
        Test
      <Carousel
        data={sportingOptions}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={200}
        layout="stack"
        loop={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#dcdcdc',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sportName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CarouselHome;
