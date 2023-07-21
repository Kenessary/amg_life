import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, Text} from 'react-native';
import COLORS from '../cores/theme';
import themeContext from '../cores/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Buttons = ({title, onPress = () => {}}) => {

    const theme = useContext(themeContext)
    const [isDarkMode, setIsDarkMode] = useState(false)
  
    useEffect(() => {
      // Load the user's preference from AsyncStorage
      loadDarkModePreference();
    });
  
    const loadDarkModePreference = async () => {
      try {
        const preference = await AsyncStorage.getItem('darkMode');
        if (preference !== null) {
          setIsDarkMode(JSON.parse(preference));
        }
      } catch (error) {
        console.log('Error loading dark mode preference:', error);
      }
    };
    return (
        <TouchableOpacity 
            activeOpacity={0.7}
            onPress={onPress} 
            style={{
                height: 55, 
                width: "100%", 
                backgroundColor: isDarkMode === true ? '#C0D5EE' : COLORS.blue, 
                justifyContent:'center', 
                alignItems:'center', 
                borderRadius: 10,
                marginVertical: 20
            }}
        >
            <Text style={{color:isDarkMode === true ? '#191E2D' : COLORS.white , fontWeight: 'bold', fontSize: 18}}>{title}</Text>
        </TouchableOpacity>
    );
}

export default Buttons;