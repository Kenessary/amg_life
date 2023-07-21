import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WaveIndicator } from 'react-native-indicators';
import { AuthContext } from '../../context/AuthContext';
import { kz, ru, ch } from '../../languages/localizations';
import axios from 'axios';
import qs from 'qs';
import i18n from 'i18n-js'
import themeContext from '../../cores/themeContext';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function VacationScreen({navigation}){

  
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

  useEffect(()=>{ if(locale !== ''){AsyncStorage.setItem('appLanguage', locale)}})
  useEffect(()=>{getData1()})
  
  const getData1 = () => { 
    try { AsyncStorage.getItem('appLanguage').then(value => {if(value != null){ setLang(value)}})
    } catch(error){ console.log(error) }
  }

  const {iin} = useContext(AuthContext)
  const [ otpusk, setOtpusk ] = useState([])
  const [vacation1, setVacation1] = useState()
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(()=>{
      setIsLoading(true)
      const data = qs.stringify({
          'otpuskiin': iin 
      });
      const config = {
        method: 'post',
          url: 'http://95.57.218.120/?index',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
      }
      axios(config)
        .then(function(response){
          const info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
          const parsed = (JSON.parse(info)).list
          // console.log(info)
          let newArray = parsed.map((list)=>{
            return { 
              nachalo: list.nachalo,
              konec: list.konec,
              dni: list.dni, 
              vid: list.vid,
              naprezhonnost: list.naprezhonnost,
              tyazh: list.tyazh,
              priarale: list.priarale,
              invalidnost: list.invalidnost,
              drugie: list.drugie
            }
          })

          // console.log(parsed.map(a=> a.dni))
          
          setOtpusk(newArray)
          setVacation1(parsed.map(a=> a.dni))
          setIsLoading(false)
         })
        .catch(function (error){
          console.log(error);
          setIsLoading(false)
        })
  },[])

  if(isLoading) {
    return(
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
      <WaveIndicator color={theme.loading}/>
    </View>
    )
  }

  const vacation = []
  for (let i = 0; i < otpusk.length; i++){
    vacation.push(
      <View key={i}  style={{...styles.card, backgroundColor: isDarkMode ? '#1C3F5C' : '#F4F4F4' }}>
        <View style={{...styles.cardHeader, backgroundColor: isDarkMode === true ? '#C0D5EE' : '#D64D43'}} >
          <View style={styles.cardHeaderInside}>
            <Text style={{...styles.cardHeaderText, color: theme.background}}>
              {((otpusk[i].vid).charAt(0)).toUpperCase()  + (otpusk[i].vid).slice(1)}
            </Text>
          </View>
        </View>
        <View style={styles.cardBodyField}>
          <View style={styles.cardBody20}>
            <View style={styles.paragraphField}>
              <Text style={{color: theme.color}}>{i18n.t('nachOtpusk')}</Text>
            </View>
            <View style={styles.paragraphNachalo}>
              <Text style={{color: theme.color}}>
                {((otpusk[i].nachalo).split(' ')[0]).split('-')[2]}.
                {((otpusk[i].nachalo).split(' ')[0]).split('-')[1]}.
                {((otpusk[i].nachalo).split(' ')[0]).split('-')[0]}
              </Text>
            </View>
          </View>
          <View style={styles.cardBody20}>
            <View style={styles.paragraphField}>
              <Text style={{color:theme.color}}>{i18n.t('konOtpusk')}</Text>
            </View>
            <View style={styles.paragraphKonec}>
              <Text style={{color:theme.color}}>
                {((otpusk[i].konec).split(' ')[0]).split('-')[2]}.
                {((otpusk[i].konec).split(' ')[0]).split('-')[1]}.
                {((otpusk[i].konec).split(' ')[0]).split('-')[0]}
              </Text>
            </View>
          </View>
          <View style={styles.cardBody20}>
            <View style={styles.paragraphField}>
              <Text style={{color:theme.color}}>{i18n.t('dniOtpusk')}</Text>
            </View>
            <View style={styles.paragraphText}>
              <Text style={{color:theme.color}}>{otpusk[i].dni}</Text>
            </View>
          </View>
          <View style={styles.cardBody40}>
            <View style={styles.paragraphField}>
              <Text style={{color:theme.color}}>{i18n.t('zaNapr')}</Text>
            </View>
            <View style={styles.paragraphText}>
              <Text style={{color:theme.color}}>{otpusk[i].naprezhonnost}</Text>
            </View>
          </View>
          <View style={styles.cardBody20}>
            <View style={styles.paragraphField}>
              <Text style={{color:theme.color}}>{i18n.t('zaTyazh')}</Text>
            </View>
            <View style={styles.paragraphText}>
              <Text style={{color:theme.color}}>{otpusk[i].tyazh}</Text>
            </View>
          </View>
          <View style={styles.cardBody40}>
            <View style={styles.paragraphField}>
              <Text style={{color:theme.color}}>{i18n.t('zaAral')}</Text>
            </View>
            <View style={styles.paragraphText}>
              <Text style={{color:theme.color}}>{otpusk[i].priarale}</Text>
            </View>
          </View>
          <View style={styles.cardBody20}>
            <View style={styles.paragraphField}>
              <Text style={{color:theme.color}}>{i18n.t('zaInvalid')}</Text>
            </View>
            <View style={styles.paragraphText}>
              <Text style={{color:theme.color}}>{otpusk[i].invalidnost}</Text>
            </View>
          </View>
          <View style={styles.cardBody20}>
            <View style={styles.paragraphField}>
            <Text style={{color:theme.color}}>{i18n.t('zaDrugie')}</Text>
            </View>
            <View style={styles.paragraphText}>
              <Text style={{color:theme.color}}>{otpusk[i].drugie}</Text>
            </View>
          </View>
        </View>
      </View>
  )}

  return (
    <View style={{...styles.container, backgroundColor: theme.background}} >      
      <ScrollView  style={{ width: "100%", marginTop:20}} >
        <View style={{alignItems:'center'}}>
          {vacation}
          <View style={{marginTop:80}}/>
        </View>
      </ScrollView>
    </View>
  )}

const styles = StyleSheet.create({
  container:{
    width: windowWidth, 
    height: '100%',
    // marginTop:20
  },
  header: {
    flexDirection:'row',
    width: windowWidth-60, 
    alignItems:'center', 
    marginTop:40, 
    marginLeft: 30 
  },
  headerText:{
    fontSize: 20, 
    color: "#4D4D4D",
    fontWeight:"bold", 
    paddingVertical: 12
  },

  indicator: {
    flex: 1, 
    justifyContent:'center', 
    alignItems: 'center', 
    backgroundColor:'white'
  },
  card:{
    width: windowWidth-40, 
    marginBottom:15, 
    height: 320, 
    alignItems:'center', 
    borderRadius: 15
  },
  cardHeader:{
    width: '100%', 
    height: 60, 
    // backgroundColor:'#D64D43',
    borderTopRightRadius: 10, 
    borderTopLeftRadius: 10, 
    justifyContent:'center'
  },
  cardHeaderInside:{
    width: '80%', 
    alignItems:'center', 
    flexDirection:'row',
    marginLeft: 20
  },
  cardHeaderText:{
    fontSize: 16,
    fontWeight:'bold'
  },
  cardBodyField: {
    width:'90%',
    height: 245,
    marginTop:5
  },
  cardBody20: {
    flexDirection:'row', 
    height: 20, 
    justifyContent:'space-between',
    marginBottom: 5
  },
  cardBody40: {
    flexDirection:'row', 
    height: 40, 
    justifyContent:'space-between',
    marginBottom: 5
  },
  paragraphField:{
    width: '70%'
  },
  paragraphNachalo:{
    width: '30%', 
    backgroundColor:'#229B18',  
    alignItems:'center', 
    borderRadius: 5
  },
  paragraphKonec:{
    width: '30%',
    backgroundColor:'#D64D43', 
    alignItems:'center', 
    borderRadius: 5
  },
  paragraphText:{
    width: '30%', 
    alignItems:'center'
  }
  
  });