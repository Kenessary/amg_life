import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Pressable, Modal } from 'react-native'
import React, { Component, useContext } from 'react'
import { Dimensions } from 'react-native';
import Header from '../../components/Header';
import { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useEffect } from 'react';
import { WaveIndicator } from 'react-native-indicators';
import { Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import BackButton from '../../components/BackButton';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import themeContext from '../../cores/themeContext';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SpecformScreen ({navigation}) {

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
      getData1()
  })
  
  const getData1 = () => { 
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

  
  
    const {iin} = useContext(AuthContext)
    const [ spec, setSpec ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        const data = qs.stringify({
            // 'specodjiin': '800325300074'
            'specodjiin': iin
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
            const parsed = (JSON.parse(info)).spec_odj_items
            let newArray = parsed.map((list)=>{
              return { 
                firm: list.firm,
                tovar: list.tovar,
                dat_pri: list.dat_pri, 
                kol_ost: list.kol_ost,
                st_ost: list.st_ost,
                sr_isp: list.sr_isp,
                dat_spis: list.dat_spis,
                kod_tov: list.kod_tov
              }
            })
            setSpec(newArray)
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

    const specod = []
    if (JSON.stringify(spec) !== ('[]')){
      for(let i = 0; i< spec.length; i++){
        specod.push(
            <View key={i} style={{...styles.card, backgroundColor: isDarkMode ? '#1C3F5C' : '#F4F4F4' }}>
            <View style={{...styles.cardHeader, backgroundColor: isDarkMode === true ? '#C0D5EE' : '#D64D43'}} >
              <View style={styles.cardHeaderInside}>
                <Text style={{...styles.cardHeaderText, color: theme.background}}>
                    {spec[i].firm}
                </Text>
              </View>
            </View>
            <View style={styles.cardBodyField}>
              <View style={{width:'100%', height:100, alignItems:'center', justifyContent:'center', borderRadius:15, marginBottom:10, borderColor:theme.color, borderWidth:1}}> 
                <Text style={{fontSize: 16, width: '90%', color: theme.color}}>{spec[i].tovar}</Text>
              </View>  
              <View style={styles.cardBody20}>
                <View style={styles.paragraphField}>
                  <Text style={{color: theme.color}}>{i18n.t('dataVydachi')}</Text>
                </View>
                <View style={styles.paragraphNachalo}>
                  <Text style={{...styles.paragraphNachaloText, color: theme.color}}>
                    {spec[i].dat_pri}
                  </Text>
                </View>
              </View>
    
              <View style={styles.cardBody20}>
                <View style={styles.paragraphField}>
                  <Text style={{color: theme.color}}>{i18n.t('dataSpisani')}</Text>
                </View>
                <View style={styles.paragraphKonec}>
                <Text style={{...styles.paragraphNachaloText, color: theme.color}}>
                    {spec[i].dat_spis}
                  </Text>
                </View>
              </View>
    
              <View style={styles.cardBody20}>
                <View style={styles.paragraphField}>
                  <Text style={{color: theme.color}}>{i18n.t('codeTovar')}</Text>
                </View>
                <View style={styles.paragraphText}>
                  <Text style={{color: theme.color}}>{spec[i].kod_tov}</Text>
                </View>
              </View>
    
              <View style={styles.cardBody20}>
                <View style={styles.paragraphField}>
                  <Text style={{color: theme.color}}>{i18n.t('kolichestvo')}</Text>
                </View>
                <View style={styles.paragraphText}>
                  <Text style={{color: theme.color}}>{spec[i].kol_ost}</Text>
                </View>
              </View>
    
              <View style={styles.cardBody20}>
                <View style={styles.paragraphField}>
                  <Text style={{color: theme.color}}>{i18n.t('stoimost')}</Text>
                </View>
                <View style={styles.paragraphText}>
                  <Text style={{color: theme.color}}>{spec[i].st_ost}</Text>
                </View>
              </View>
              
              <View style={styles.cardBody20}>
                <View style={styles.paragraphField}>
                  <Text style={{color: theme.color}}>{i18n.t('normaDnei')}</Text>
                </View>
                <View style={styles.paragraphText}>
                  <Text style={{color: theme.color}}>{spec[i].sr_isp}</Text>
                </View>
              </View>
    
            </View>
          </View>
        )
    } 
    }  else {
      const noneSpec = 'Сведений о спецодежде нет'
      specod.push(
          <View style={{alignItems:'center', justifyContent: 'center', width: windowWidth-60, height: 50, backgroundColor:'#F5DBDA', borderRadius:15, marginTop: 30, padding:5}} key={Math.random()}>
          <Text style = {{fontSize: 15, textAlign:'center',color:"#D64D43", fontWeight:'bold' }}>{noneSpec} 😕</Text>
      </View>
      )

  }
  


    return (
        <View style={{...styles.container, backgroundColor: theme.background}} >



            <ScrollView  style={{ width: "100%", marginTop:20}} >
            <View style={{alignItems:'center'}}>
                {specod}
                <View style={{marginTop:80}}/>
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:'white',
      width: windowWidth, 
      height: "100%"
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
      height: 335, 
      backgroundColor:'#F4F4F4', 
      alignItems:'center', 
      borderRadius: 15
    },
    cardHeader:{
      width: '100%', 
      height: 60, 
      backgroundColor:'#D64D43',
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
      color: '#4D4D4D', 
      fontSize: 16,
      color:'white', 
      fontWeight:'bold'
    },
    cardBodyField: {
      width:'90%',
      height: 260,
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
      width: '70%',
    },
    paragraphNachalo:{
      width: '30%', 
      backgroundColor:'#229B18',  
      alignItems:'center', 
      borderRadius: 5
    },
    paragraphNachaloText:{
      color: 'white'
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