import { Text, View, Dimensions, TouchableOpacity, Image, Alert } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet } from 'react-native'
import themeContext from '../../cores/themeContext'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function ChangeLang() {

      
  const theme = useContext(themeContext)
  const [isDarkMode, setIsDarkMode] = useState(false);
  globalThis.dm = isDarkMode
  
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


    const a = () =>{
        Alert.alert(
            `${i18n.t('languageAlertTitle')}`,
            `${i18n.t('languageAlertBody')}`,
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          )

    }


    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor: theme.background}}>
                       <View style={{ alignItems:'center'}}>
        <View style={{width: windowWidth-20, height: 320, alignItems:'center'}}>
          <View style={{width:"100%", height:120, alignItems:'center', marginTop:30, borderColor:theme.color, borderWidth:1, borderRadius:15}}>
            <Text style={{fontSize:18, color:theme.color, marginTop:8}}>
            {i18n.t('selectLanguage')}
            </Text>

<View style={{flexDirection:'row', marginTop:10}}>

<TouchableOpacity onPress={() => {setLocale("kz");a()}} style={[lang === "kz" ? styles.buttonSelectedContainer : styles.buttonContainer]}>
  <Image source={require('../../../assets/flags/Kazakhstan.jpg')} style={{width: 29, height:20, borderRadius:2, marginRight: 10 }}/>
  <Text style={[lang === 'kz' ? [styles.selectedText, {color: theme.color}] : [styles.text, {color: theme.color}]]}>ҚАЗ</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => {setLocale("ru");a()}} style={[lang === "ru" ? styles.buttonSelectedContainer : styles.buttonContainer]}>
  <Image source={require('../../../assets/flags/Russia.png')} style={{width: 29, height:20, borderRadius:2, marginRight: 10 }}/>
  <Text style={[lang === 'ru' ? [styles.selectedText, {color: theme.color}] : [styles.text, {color: theme.color}]]}>РУС</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => {setLocale("ch");a()}} style={[lang === "ch" ? styles.buttonSelectedContainer : styles.buttonContainer]}>
  <Image source={require('../../../assets/flags/China.webp')} style={{width: 29, height:20, borderRadius:2, marginRight: 10 }}/>
  <Text style={[lang === 'ch' ? [styles.selectedText, {color: theme.color}] : [styles.text, {color: theme.color}]]}>中文</Text>
</TouchableOpacity>
</View>
          </View>
        </View>
      </View>
      </View>
    )
}


const styles =  StyleSheet.create({
    buttonContainer: {
        marginTop: 10, 
        flexDirection:'row',
        alignItems:'center',
        borderColor:'#D9D9D9',
        borderWidth: 1,
        width:'30%',
        height:40,
        borderRadius:15,
        paddingLeft:10,
        paddingRight:10,
        marginLeft:5
      },
      buttonSelectedContainer: {
          marginTop: 10, 
          flexDirection:'row',
          alignItems:'center',
          borderColor:'tomato',
          borderWidth: 2,
          width:'30%',
          height:40,
          borderRadius:15,
          paddingLeft:10,
          paddingRight:10,
          marginLeft:5
        },
      text: {
        fontSize: 14,
        color: '#4D4D4D',
        paddingVertical: 4
      },
      selectedText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#4D4D4D',
        paddingVertical: 4,
    
      },
})
