import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, BackHandler, Alert, Platform, Linking, AppState } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from '../../context/AuthContext';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import * as Updates from 'expo-updates';
import { WaveIndicator } from 'react-native-indicators';
import * as Application from 'expo-application'
import themeContext from '../../cores/themeContext';
// import { BackHandler } from 'react-native';





export default function ChangeLanguage ({navigation}) {
    let [locale, setLocale] = useState('');
    let [lang, setLang] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

    
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
  

    i18n.fallbacks = true
    i18n.translations = { kz, ru, ch };
    i18n.locale = lang;
    i18n.defaultLocale = 'kz'

 

  const showAlert = () => {
    Alert.alert(
      i18n.t('languageAlertTitle')
      [
        {
          text: 'OK',
          style: 'cancel',
        }
      ],
      { cancelable: false }
    );
  };




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
                    //   console.log(value)
                        setLang(value)
                    }
                })
            // setIsLoading(false)
        } catch(error){
            // setIsLoading(false)
            console.log(error)
        }
    }

    // if(isLoading) {
    //   return(
    //     <View style={styles.indicator}>
    //       <WaveIndicator color="#D64D43"/>
    //     </View>
    //   )
    // }


    return (
      <View style={{}}>
                      <View style={{ alignItems:'center', backgroundColor:'white', height: "100%"}}>
        <View style={{width: windowWidth-20, height: 320, alignItems:'center'}}>
          <View style={{width:windowWidth-60, height:120, alignItems:'left', marginTop:10}}>
            <Text style={{fontSize:18, color:'#4D4D4D', marginTop:8, marginLeft: 10}}>
            {i18n.t('selectLanguage')}
            </Text>

<View style={{flexDirection:'column', marginTop:10, }}>
{/* <Button title="ҚАЗ" onPress={() => setLocale("kz")} /> */}
<TouchableOpacity onPress={() => {setLocale("kz");showAlert()}} style={[lang === "kz" ? styles.buttonSelectedContainer : styles.buttonContainer]}>
  <Image source={require('../../../assets/flags/Kazakhstan.jpg')} style={{width: 29, height:20, borderRadius:2, marginRight: 10 }}/>
  <Text style={[lang === 'kz' ? styles.selectedText : styles.text]}>Қазақша</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => {setLocale("ru");showAlert()}} style={[lang === "ru" ? styles.buttonSelectedContainer : styles.buttonContainer]}>
  <Image source={require('../../../assets/flags/Russia.png')} style={{width: 29, height:20, borderRadius:2, marginRight: 10 }}/>
  <Text style={[lang === 'ru' ? styles.selectedText : styles.text]}>Русский</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => {setLocale("ch");showAlert()}} style={[lang === "ch" ? styles.buttonSelectedContainer : styles.buttonContainer]}>
  <Image source={require('../../../assets/flags/China.webp')} style={{width: 29, height:20, borderRadius:2, marginRight: 10 }}/>
  <Text style={[lang === 'ch' ? styles.selectedText : styles.text]}>中国人</Text>
</TouchableOpacity>
</View>
          </View>
        </View>
      </View>
      </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10, 
        flexDirection:'row',
        alignItems:'center',
        borderColor:'#D9D9D9',
        borderWidth: 1,
        width: 250,
        height:50,
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
          width:250,
          height:50,
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
    
      }
  });