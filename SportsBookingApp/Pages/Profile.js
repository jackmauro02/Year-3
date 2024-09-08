// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { getAuth, onAuthStateChanged, deleteUser, signOut } from 'firebase/auth';

// export default function Homepage({ navigation }) {
//   const [userEmail, setUserEmail] = useState(null);

//   useEffect(() => {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (user) {
//       setUserEmail(user.email);
//     }
//   }, []);

//   const handleDeleteAccount = () => {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (user) {
//       try {
//         deleteUser(user).then(() => {
//           signOut(auth).then(() => {
//             console.log('User account deleted');
//             navigation.navigate('Login');
//           });
//         });
//       } catch (error) {
//         console.error('Error deleting account:', error);
//         // Handle the error, display a message, or take appropriate action
//       }
//     } else {
//       console.error('User is not signed in');
//       navigation.navigate('Login');
//     }
//   };

//   return (
//     <View>
//       <Text>NOW LOGGED IN</Text>
//       {userEmail && <Text>User's Email: {userEmail}</Text>}

//       <TouchableOpacity onPress={handleDeleteAccount} style={styles.btn}>
//         <Text style={styles.btn_text}>Delete Account</Text>
//       </TouchableOpacity>

//       {/* About Us btn */}
//       <TouchableOpacity onPress={() => navigation.navigate("About Us")} >
//         <Text style={styles.btn_text}>About Us</Text>
//       </TouchableOpacity>

//       {/* Terms and Conditions btn */}
//       <TouchableOpacity onPress={() => navigation.navigate("Terms and Conditions")} >
//         <Text style={styles.btn_text}>Terms and Conditions</Text>
//       </TouchableOpacity>

//       {/* Privacy Policy btn */}
//       <TouchableOpacity onPress={() => navigation.navigate("Privacy Policy")} >
//         <Text style={styles.btn_text}>Privacy Policy</Text>
//       </TouchableOpacity>

//       {/* Gym Safety btn */}
//       <TouchableOpacity onPress={() => navigation.navigate("Gym Safety")} >
//         <Text style={styles.btn_text}>Gym Safety</Text>
//       </TouchableOpacity>

//     </View>
//   );
// }


// const styles = StyleSheet.create({
//     validationMessage:{
//       color: '#FF0000',
//       textAlign: 'center',
//       paddingTop: 15,
//       fontSize: 15
//     },
  
//     container: {
//       flex: 1,
//       backgroundColor: '#013257',
//       justifyContent: 'space-between',
//     },
  
//     imageContainer:{
//       flex:1,
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
  
//     LoginProcessContainer: {
//       flex:0.5,
//       alignItems: 'center',
//       flexDirection: 'column',
  
//     },
  
//     inputButton:{
//       width: 320,
//       height: 150,
//       backgroundColor: '#D9D9D9',
//       borderRadius: 20,
//       justifyContent: 'center',
//       alignContent: 'center',
//       flexDirection:'row',
//       alignItems: 'center',
//       shadowRadius:3.95,
//       shadowOpacity:0.75,
//       elevation:6,
//       shadowColor:"#000",
//       shadowOffset:{
//         width:0,
//         height:3,
//       },
//       alignSelf: 'center',
//       marginBottom: 30,
//       color: 'rgba(0, 0, 0, 0.31)',
//       fontSize: 25,
//       paddingLeft: 25
//     },
  
//     tinyLogo:{
//       width:100,
//       height:60,
//       resizeMode:'contain'
//     },
  
//     tinyLogo:{
//       width:100,
//       height:60,
//       resizeMode:'contain'
//     },
  
//     h1: {
//       fontSize: 35,
//       color: 'white', 
//       alignSelf: 'center',
//       padding: 15,
//       paddingTop: 50,
//     },
  
//     container2: {
//       fontSize: 35,
//       color: 'white', 
//       flex: 1,
//       alignItems: 'flex-start',
//       justifyContent: 'center',
//       paddingLeft:20,
//     },
  
//     h2: {
//       fontSize: 40,
//       color: 'white',  
//       alignSelf: 'flex-start',
//       paddingLeft: 35,
//       paddingTop: 65,
//       paddingBottom: 70
//     },
  
//     h4: {
//       fontSize: 25,
//       color: 'white',  
//       paddingTop:15
//     },
  
//     btn: {
//       width: 269,
//       height: 64,
//       backgroundColor: '#229AD1',
//       borderRadius: 30,
//       justifyContent: 'center',
//       alignContent: 'center',
//       flexDirection:'row',
//       alignItems: 'center',
//       shadowRadius:3.95,
//       shadowOpacity:0.25,
//       elevation:6,
//       shadowColor:"#000",
//       shadowOffset:{
//         width:0,
//         height:3,
//       },
//       alignSelf: 'center',
//       marginTop: 50
//     },
  
//     btn_text: {
//       fontSize: 25,
//     }
//   });
  



































import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { getAuth, deleteUser, signOut } from 'firebase/auth';

export default function Profile({ navigation }) {
  const [userEmail, setUserEmail] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  const handleDeleteAccount = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        deleteUser(user).then(() => {
          signOut(auth).then(() => {
            console.log('User account deleted');
            navigation.navigate('Login');
          });
        });
      } catch (error) {
        console.error('Error deleting account:', error);
        // Handle the error, display a message, or take appropriate action
      }
    } else {
      console.error('User is not signed in');
      navigation.navigate('Login');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Dummy user data, replace with actual user data if available
  const userName = "John Doe"; // Replace with actual user's name

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <View style={styles.profileIconContainer}>
          {/* You can replace the profile icon with your actual profile image */}
          {/* <Image source={require('path/to/profile-icon.png')} style={styles.profileIcon} /> */}
        </View>
        <Text style={[styles.welcomeText, isDarkMode && styles.welcomeTextDark]}>
          Welcome, {userName}! 😊
        </Text>
      </View>

      {/* Search Widget */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, isDarkMode && styles.searchInputDark]}
          placeholder="Search..."
          placeholderTextColor={isDarkMode ? 'gray' : '#888'}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {userEmail && <Text style={[styles.h4, isDarkMode && styles.h4Dark]}>User's Email: {userEmail}</Text>}

      <TouchableOpacity onPress={handleDeleteAccount} style={[styles.btn, isDarkMode && styles.btnDark]}>
        <Text style={styles.btnText}>Delete Account</Text>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      {navigationButtons.map((button) => (
        <TouchableOpacity
          key={button.title}
          onPress={() => navigation.navigate(button.screen)}
          style={[styles.btn, isDarkMode && styles.btnDark]}
        >
          <Text style={styles.btnText}>{button.title}</Text>
        </TouchableOpacity>
      ))}

      {/* Toggle Mode Button */}
      <TouchableOpacity onPress={toggleDarkMode} style={styles.toggleModeBtn}>
        <Text style={styles.toggleModeBtnText}>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</Text>
      </TouchableOpacity>

      {/* New Buttons for Sports and Gym Activities */}
      <TouchableOpacity
        onPress={() => navigation.navigate('SportsScreen')}
        style={[styles.btn, isDarkMode && styles.btnDark]}
      >
        <Text style={styles.btnText}>Sports</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('GymScreen')}
        style={[styles.btn, isDarkMode && styles.btnDark]}
      >
        <Text style={styles.btnText}>Gym Activities</Text>
      </TouchableOpacity>

    </View>
  );
}

const navigationButtons = [
  { title: 'About Us', screen: 'About Us' },
  { title: 'Terms and Conditions', screen: 'Terms and Conditions' },
  { title: 'Privacy Policy', screen: 'Privacy Policy' },
  { title: 'Gym Safety', screen: 'Gym Safety' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c63d6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  containerDark: {
    backgroundColor: '#1a1a1a', // Dark mode background color
  },

  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  profileIconContainer: {
    marginRight: 10,
  },

  profileIcon: {
    width: 30, // Set the width of your profile icon
    height: 30, // Set the height of your profile icon
    borderRadius: 15, // Assuming a circular profile icon
  },

  welcomeText: {
    fontSize: 20,
    color: 'white',
  },

  welcomeTextDark: {
    color: 'lightgray', // Dark mode text color
  },

  h4: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },

  h4Dark: {
    color: 'lightgray', // Dark mode text color
  },

  btn: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  btnDark: {
    backgroundColor: '#333', // Dark mode button background color
  },

  btnText: {
    fontSize: 18,
    color: '#1c63d6', // Button text color in light mode
  },

  toggleModeBtn: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#1c63d6',
  },

  toggleModeBtnText: {
    color: 'white',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    color: 'black', // Input text color
  },

  searchInputDark: {
    borderColor: 'lightgray', // Dark mode input border color
    color: 'white', // Dark mode input text color
  },

  searchButton: {
    backgroundColor: '#1c63d6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  searchButtonText: {
    color: 'white',
  },
});
































