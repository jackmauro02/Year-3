import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, Button, TouchableOpacity,Linking, View, ScrollView, TextInput } from 'react-native';
//import MealList from '../components/MealList';
import { Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-web';

export default function Nutrition({ navigation }) {
  
      //styling for nutrition page
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#54bbe8',
          minHeight: 'auto',
          borderRadius: 8,
        },
        searchContainer: {
          marginBottom: 10,
          marginTop: 10,
          flexDirection: 'row',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 8,
        },
        searchInput: {
          flex: 1,
          height: 40,
          width: '50%',
          backgroundColor: 'white',
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 8,
          marginRight: 10,
        },
        box: {
          width: '100%',
          justifyContent: 'space-between',
          padding: 20,
          borderRadius: 8,
          marginBottom: 20,
        },
        boxText: {
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 10,
        },
        timerContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 15,
        },
        timerText: {
          fontSize: 24,
          fontWeight: 'bold',
        },
        timerButton: {
          backgroundColor: '#229ad1',
          paddingVertical: 10,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 10,
        },
        boxContent: {
          fontSize: 16,
          marginBottom: 10,
        },
        boxFeature: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 5,
        },
        row: {
          flexDirection: 'row',
          flexWrap: 'nowrap',
          marginBottom: 0,
          minHeight: 'auto',
        },
        searchButton: {
          paddingHorizontal: 8,
          paddingVertical: 6,
          borderRadius: 4,
          backgroundColor: '#229ad1',
          alignSelf: 'flex-start',
          marginRight: 10,
          width:90,
          height: 45,
          textAlign: 'center',
        },
          button: {
          paddingHorizontal: 8,
          paddingVertical: 6,
          borderRadius: 4,
          backgroundColor: '#229ad1',
          alignSelf: 'flex-start',
          marginRight: 10,
          minWidth: '48%',
          textAlign: 'center',
        },
        selected: {
          backgroundColor: '#000000',
          borderWidth: 0,
        },
        buttonLabel: {
          fontSize: 16,
          fontWeight: '500',
          color: '#000000',
          textAlign: 'center',
        },
        selectedLabel: {
          color: 'white',
        },
        label: {
          textAlign: 'center',
          marginBottom: 25,
          fontSize: 24,
        },
        workoutGoalItem: {
          backgroundColor: '#D3D3D3',
          borderRadius: 8,
          padding: 15,
          marginHorizontal: 10,
          alignItems: 'center',
        },
        workoutGoalTitle: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 10,
        },
        workoutGoalDescription: {
          fontSize: 16,
          textAlign: 'center',
        },
        carouselItem: {
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10, 
          borderRadius: 8,
          backgroundColor: '#D3D3D3',
          marginHorizontal: 10,
          width: '70%'
        },
        navigationContainer:{
          display: 'flex',
          flex: 0.2,
          flexDirection: 'row',
          color: '#084c74',
          textAlign: 'center',
          paddingTop: 10,
          marginBottom: 15,
          fontSize: 20,
          alignContent: 'space-around',
          alignItems: 'center',
          justifyContent: 'space-around',
        },
        resultsContainer: {
          marginBottom: 20, 
          flexGrow: 1,
        },
        resultContainer: {
          flexDirection: 'row',
          marginBottom: 20,
          height: 100,
        },
        resultImage: {
          width: 156,
          height: 115,
        },
        resultTextContainer: {
          marginLeft: 10,
        },
        resultTitle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
      });

  // setting up useStates for stuff 
  const [justifyContent, setJustifyContent] = useState('flex-start');
 
  // setting up useStates for searching
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  
  // request data like calories and 2500 is a placeholder for a calorie target for avg man
  const [calories, setCalories] = useState(2500);
  // data for meals
  const [mealData, setMealData] = useState([]);
  const [mealID, setMealID] = useState('')
  
  // sets nutritional info to 0
  function handleChange(){
    setCalories(e.target.value);
  }

    // setting up variable nutrients to use to call meal data

    // function to search for recipes
    function fetchSearchData() {
      setSearchQuery(inputValue);
      if (searchQuery != '') {
        fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=90a3bf60228f4c3b8726f01e12cad772&addRecipeInformation=true&number=7`)
          .then(response => response.json())
          .then(data => {
           console.log(data.results);
           setSearchData(data.results);
           const id = data.results.map(result => result.id);
           setMealID(id);
           console.log(id);
          })
          .catch(error => console.error(error));
      } else {
        setSearchData(null);
        console.log()
      }
       console.log(mealID);

    }

    // calling fetchSearchData function for entering text
    useEffect(() => 
      {fetchSearchData();
    }, [searchQuery]
  );
  

  // function to call recipe/meal data from api
  function fetchMealData(mealID) {
    console.log(mealID)
    console.log(testid)

    fetch(`https://api.spoonacular.com/recipes/${mealID}/information?includeNutrition=true`)
    .then(response => response.json())
    .then(mealData => {
      setMealData(mealData);
      console.log(mealData.results);
      console.log(id);
      })
    .catch( error => {
      console.log(error);
     } )
};

  // CONST TO SET UP LAYOUT
    const PreviewLayout = ({
      label,
      children,
      values,
      selectedValue,
      setSelectedValue,
      navigation,
    }) => (
      <View style={{ padding: 10, flex: 1, backgroundColor: '#084c74', height: '0%' }}>
        <Text style={styles.label}>{label}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => navigation.navigate(value)}
          style={[styles.button, selectedValue === value && styles.selected]}
        >
          <Text
            style={[
              styles.buttonLabel,
              selectedValue === value && styles.selectedLabel,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
        <View style={[styles.container, { [label]: selectedValue }]}>
          {children}
        </View>
        
      </View>
    );

  return (
      <PreviewLayout
        label="Nutrition"
        selectedValue={justifyContent}
        values={[
          'Booking Page',
          'Profile',
          'Gym locations',
          'About Us',
          'Privacy Policy',
          'Terms and Conditions',
          'Nutrition',
        ]}
        setSelectedValue={setJustifyContent}
        navigation={navigation}
        
      >

        {/* textinput one character at a time havent figured it out 100% yet*/}
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Search for nutritional information..."
            value = {inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
          {/* Add a button to trigger the search */}
          <TouchableOpacity style= {styles.searchButton} onPress={ fetchSearchData}>
            <Text style = {styles.buttonLabel} >Search</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.box}>
         {/* Add a new view to display the search results */}
        <ScrollView style={styles.resultsContainer} >
           {searchData && searchData.map(result => (
             <ScrollView key={result.id} style={styles.resultContainer} horizontal showsHorizontalScrollIndicator={false} flexDirection = 'row'>
              <Image source={{uri: result.image}} style={styles.resultImage} />
               <View style={styles.resultTextContainer}>
                <Text style={styles.resultTitle}>{result.title}</Text>
                <Text>Prep Time: {result.readyInMinutes} mins {console.log(result.readyInMinutes)}</Text>
               <Text>Serving Size: {result.servings}</Text>
               {/* Render "Get meal" button inside each search result */}
            <TouchableOpacity style= {styles.button} onPress={() =>
                  Linking.openURL(result.sourceUrl).catch((err) => console.error("Error opening URL:", err))}>
                  {console.log(result.sourceUrl)}
            <Text style = {styles.buttonLabel} >Get Meal</Text>
            </TouchableOpacity>
                      {/* Display nutritional information */}
           </View>
         </ScrollView>
          ))}
        </ScrollView>
        </View>
    </PreviewLayout>  
  );
  
}


/* 
{mealData && (
           <View style = {{marginLeft: 10} }>
             <Text>Calories: {mealData.calories}</Text>
             <Text>Carbs: {mealData.carbs}</Text>
             <Text>Fat: {mealData.fat}</Text>
             <Text>Protein: {mealData.protein}</Text>
           </View>
          )}
        <Text>Prep Time: {result.readyInMinutes} mins</Text>
        <Text>Serving Size: {result.servings}</Text>
        **/