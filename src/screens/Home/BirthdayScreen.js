import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import axios from 'axios';
import moment from 'moment';
import { WaveIndicator } from 'react-native-indicators';
import LottieView from "lottie-react-native"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
  

import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import themeContext from '../../cores/themeContext';

function BirthdayScreen({navigation}) {
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

  const [ birthday, setBirthday ] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [ texmonth, setTextMonth ] = useState([])
  let [locale, setLocale] = useState('');
  let [lang, setLang] = useState('')
  i18n.fallbacks = true
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = 'kz'


  let pushTokens = ['ExponentPushToken[sObo98Br4G7DG-Yr9LECeD]', 'ExponentPushToken[tmnUrkEOS1ZAUii-JuzTjW]'];

  async function sendPushNotification() {
    const message = {
      to: pushTokens,
      sound: 'default',
      title: 'Amg life',
      body: 'test',
      // data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  //--------- ЯЗЫКИ --------- //
  useEffect(()=>{
    if(locale !== ''){
      AsyncStorage.setItem('appLanguage', locale)
    }
  })
    
  useEffect(()=>{
        getData1()
  })

  const getData1 = () => { 
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

//--------- ДАТА СЕГОДНЯ --------- //
  const date = moment().format(`DD ${texmonth} YYYY`)
  const day = moment().format(`DD`)
  const mm = moment().format(`MM`)

//--------- ЗАПРОС ДНИ РОЖДЕНИЯ --------- //
  const btd = () => {
    setIsLoading(true)
    const config = {
      method:'get',
      url: `http://95.57.218.120/?apitest.helloAPI4={}`,
      headers: {  }
    }
    axios(config)
    .then(function(response){
      let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
      let parse_first = JSON.parse(info)
      let parse_second = JSON.parse(parse_first.response)
      let parse_third = parse_second.status
      setBirthday((JSON.stringify(parse_third)).split(';'))
      const month = moment().format('MM')

      if (month === '01'){setTextMonth(i18n.t('january'))}
      if (month === '02'){setTextMonth(i18n.t('february'))}
      if (month === '03'){setTextMonth(i18n.t('march'))}
      if (month === '04'){setTextMonth(i18n.t('april'))}
      if (month === '05'){setTextMonth(i18n.t('may'))}
      if (month === '06'){setTextMonth(i18n.t('june'))}
      if (month === '07'){setTextMonth(i18n.t('july'))}
      if (month === '08'){setTextMonth(i18n.t('august'))}
      if (month === '09'){setTextMonth(i18n.t('september'))}
      if (month === '10'){setTextMonth(i18n.t('october'))}
      if (month === '11'){setTextMonth(i18n.t('november'))}
      if (month === '12'){setTextMonth(i18n.t('december'))}
      setIsLoading(false)
    })
     .catch(function (error) {
      console.log(error);
      setIsLoading(false)
    })
  } 

  useEffect(()=>{
    btd()
  },[])

//--------- МАССИВ ДНИ РОЖДЕНИЯ --------- //
  const birthdayUsers = []
  if (birthday.length !== 1){
    for(let i = 0; i< birthday.length-1; i++){
      const bd = (birthday[i]).replace('"', '').replace(' ', '')
      birthdayUsers.push(
        <View style={[styles.birthdayItem, {backgroundColor:theme.bottomNavigationColor}]} key={Math.random()}>
          <View style={[styles.birthdayIcon,{backgroundColor:theme.iconColorBack}]}>
            <FontAwesome name="birthday-cake" size={19} color={theme.iconColor} />
          </View> 
          <View style={styles.birthdayText}><Text style={{color: theme.color}}>{bd}</Text></View>
        </View>
      )
    }
    } else {
        const noneBirthday = JSON.parse(birthday)
        birthdayUsers.push(
            <View style={styles.noneContainer} key={Math.random()}>
                <Text style = {styles.noneText}>
                  { lang === 'ch' ? i18n.t('birthdayWarning') : noneBirthday} 😕
                </Text>
            </View>
        )
    }
//--------- ИНДИКАТОР ЗАГРУЗКИ --------- //
  if(isLoading) {
    return(
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
        <WaveIndicator color={theme.loading}/>
      </View>
    )
  }

  return (
    <View style={{backgroundColor: isDarkMode === true ? '#262C38' : ''}}>
      <View style={styles.centered}>
        <View style={styles.dateContainer}>
          {/* <TouchableOpacity onPress={() => sendPushNotification()} ><Text>push to all users</Text></TouchableOpacity> */}
          <Text style={[styles.dateText,{color:theme.color}]}>{i18n.t('today')}: {date}</Text>
        </View>
      </View>
      <ScrollView style={styles.height100} showsVerticalScrollIndicator= {false}>
        <View style={styles.centered}>
          <View style={styles.width60}>
            {birthdayUsers}
          <View style={{marginBottom:80}}/>
          </View>
        </View>

      </ScrollView>    
    </View>
  );
}

export default BirthdayScreen;

const styles = StyleSheet.create({
  birthdayItem:{
    width: '100%', 
    height:50,  
    borderRadius: 15, 
    alignItems:'center', 
    marginBottom: 10, 
    paddingLeft:5, 
    flexDirection:'row'
  },
  birthdayIcon:{
    width: 40, 
    height: 40, 
    borderRadius: 12, 
    alignItems:'center',
    justifyContent:'center'
  },
  birthdayText:{
    marginLeft:10, 
    marginRight: 10, 
    width: windowWidth-150
  },
  noneContainer:{
    alignItems:'center',
    justifyContent: 'center',
    width: windowWidth-60,
    height: 50, 
    backgroundColor:'#F5DBDA', 
    borderRadius:15, marginTop: 30
  },
  noneText:{
    fontSize: 15, 
    textAlign:'center',
    color:"#D64D43", 
    fontWeight:'bold' 
  },
  centered:{
    alignItems:'center'
  },
  dateContainer:{
    width: windowWidth-60, 
    alignItems:'center', 
    marginBottom: 20, 
    marginTop: 10
  },
  dateText:{
    fontSize: 17, 
    fontWeight:'bold',
  },
  height100:{
    height:'100%'
  },
  width60:{
    width: windowWidth - 60
  }
})