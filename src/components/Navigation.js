import React, { useContext, useState, useEffect } from "react"
import { NavigationContainer, DarkTheme,DefaultTheme } from "@react-navigation/native"
// import { createStackNavigator } from "@react-navigation/native-stack"
import { AuthContext } from "../context/AuthContext"
import { View } from "react-native"
import { WaveIndicator } from "react-native-indicators"
import AppStack from "./navigation/AppStack";
import AuthStack from "./navigation/AuthStack"; 
import AsyncStorage from "@react-native-async-storage/async-storage"
import { EventRegister } from "react-native-event-listeners"

import themeContext from "../cores/themeContext"
import theme from "../cores/darkModeTheme"



const Navigation = () => {
    const theme1 = useContext(themeContext)

    const [isDarkMode, setIsDarkMode] = useState(false)

    const {isLoading, iin} = useContext(AuthContext)
    const [secPass, setSecPass] = useState(null)
    // console.log(iin)
    // console.log(secPass)
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

    
    useEffect(()=>{
        let eventListener = EventRegister.addEventListener("changeTheme", (data) => {
            setIsDarkMode(data)
            // console.log(data)
        })
        return () => {
            EventRegister.removeEventListener(eventListener)
        }
    })


    useEffect(()=>{getData111()}, [])
    

    const getData111 = () => { 
        try {
            AsyncStorage.getItem('secondPass')
                .then(value => {
                    if(value != null){
                        setSecPass(value)
                    }
                })
        } catch(error){
            console.log(error)
        }
      }
    
    if(isLoading) {
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
            <WaveIndicator color={isDarkMode === true ? '#C0D5EE' : '#D64D43'}/>
          </View>
        )
    }

    // console.log(iin)
    return (
        <themeContext.Provider value={isDarkMode === true ? theme.dark : theme.light}>
            <NavigationContainer >
                {iin === null ? <AuthStack/> : <AppStack/>}
            </NavigationContainer>
        </themeContext.Provider>
    )
}


export default Navigation
