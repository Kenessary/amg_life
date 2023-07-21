import { Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import themeContext from '../../cores/themeContext';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function OpenQr ({navigation}) {
  const theme = useContext(themeContext)

  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Load the user's preference from AsyncStorage
    loadDarkModePreference();
  }, []);

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
  

  let [otvetOpros, setOtvetOpros] = useState('')
  let [locale, setLocale] = useState('');
  let [lang, setLang] = useState('')
  i18n.fallbacks = true
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = 'kz'

  useEffect(()=>{
    if(locale !== ''){
      AsyncStorage.setItem('appLanguage', locale)
    }
  })
    
  useEffect(()=>{
    getData()
  })

  const getData = () => { 
    try {
      AsyncStorage.getItem('appLanguage')
      .then(value => {
        if(value != null){
          setLang(value)
        }
      })
    } catch(error){
      console.log(error)
    }
  }

  // const route = useRoute();
  // global.this = route.name

  // console.log(route.params)
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor: theme.background, height:'100%'}}>
 <StatusBar style= {isDarkMode ? 'light' : 'dark' } />
        <TouchableOpacity style={{width:windowWidth-80, backgroundColor: isDarkMode === true ? '#1C3F5C' :'#D64D43', height:70, alignItems:'center', justifyContent:'center', borderRadius:15, flexDirection:'row'}}
         onPress={() => navigation.navigate('DocumentScreen')}
        >
        <MaterialCommunityIcons name="qrcode-scan" color='white' size={24} style={{marginRight: 10}} />
        <Text style={{fontSize:20, color:'white'}}>{i18n.t('openQR')}</Text>
        </TouchableOpacity>

        
      </View>
    )
  
}