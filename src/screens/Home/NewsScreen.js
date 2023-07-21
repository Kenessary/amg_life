import { Text, View,  Dimensions, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import BackButton from '../../components/BackButton';
import { WaveIndicator } from 'react-native-indicators';
import { Ionicons } from '@expo/vector-icons';

import axios, * as others from 'axios';
const cheerio = require("cheerio");

const url = "http://www.cnpc-amg.kz/?p=nov_list"

import LottieView from "lottie-react-native"


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const news_data = []

import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import themeContext from '../../cores/themeContext';


export default function NewsScreen({navigation}){
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




  const [ isLoading, setIsLoading ] = useState(false)
  const [ isWatch, setIsWatch ] = useState(false)
  const [ isWatch1, setIsWatch1 ] = useState(true)
  const [news, setNews] = useState()
  const [link, setLink] = useState()

  globalThis.link_new = link

  async function getGenre(){
    try{
      setIsWatch(false)
      setIsLoading(true)
        news_data.splice(0,news_data.length)
        const response = await axios.get(url)
  
        const $ = cheerio.load(response.data)
        const news = $("#content > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > div > ul > li")
        
        news.each(function(){
            date = $(this).find("span.date").text()
            label = $(this).find("span.title i").text()
            title = $(this).find("span.title a").text()
            href = $(this).find("span.title a").attr("href")
            news_data.push({date,label,title, href})
            setNews(news_data)
            
        })
        setIsLoading(false)
    }
    catch(error){
        console.error(error)
    }

}


useEffect(()=>{
  
  getGenre()
},[])

if(isLoading) {
  return(
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
    <WaveIndicator color={theme.loading}/>
  </View>
  )
}

const newscp = []
for (let i=0; i < news_data.length / 20; i++){
  newscp.push(
    <View key={i} style={{ marginTop: 10}}>
    <TouchableOpacity onPress = {() => {navigation.navigate('SingleNewsScreen'), setLink(news_data[i].href)}}>
    <View style={{flexDirection:'row', width: windowWidth-20, marginTop: 0,justifyContent:'space-between',backgroundColor:theme.bottomNavigationColor, paddingLeft: 15, paddingRight:15, paddingTop:15, borderTopLeftRadius:15, borderTopRightRadius: 15 }}>
     <Text style={{color: theme.color, fontSize:15,textAlign:'left',fontStyle:'italic'}} > {(news_data[i]).label} </Text>
       </View>
         <View style={{ width: windowWidth-20, marginBottom:0,backgroundColor:theme.bottomNavigationColor, alignItems:'center', padding: 15}}>
       <View style={{width:windowWidth-20, paddingLeft:15, paddingRight:15}}>
           <Text style={{color: theme.color, fontSize:15,textAlign:'left'}}>
           {(news_data[i].title).replace((news_data[i]).label, '')}
           </Text>
       </View>
     </View> 
     <View style={{flexDirection:'row', width: windowWidth-20, marginTop: 0,justifyContent:'space-between',backgroundColor:theme.bottomNavigationColor, paddingLeft: 15, paddingRight:15, paddingBottom:15, borderBottomEndRadius: 15, borderBottomStartRadius:15 }}>
         <View style={{backgroundColor: theme.dateBack, width: 90, alignItems:'center',justifyContent:'center', borderRadius: 5,}} >
             <Text style={{color:theme.color, fontSize:14, color:'white'}}>
             {(news_data[i]).date}
             </Text>
         </View>
         <View>
           {/* <TouchableOpacity onPress = {() => {navigation.navigate('SingleNewsScreen'), setLink(news_data[i].href)}} style={{ paddingLeft:15, paddingRight:15, borderRadius:5, borderWidth: 1 }}>
             <Text style={{color: '#4D4D4D', fontSize:14, fontWeight:'bold' }}>{i18n.t('read')}</Text>
           </TouchableOpacity> */}
         </View>
       </View>
    </TouchableOpacity>

    </View>
    

  )
}

const newscpFull = []
for (let i=0; i < news_data.length; i++){
  // setLink(event[i].ssilka)
  // console.log((news_data[0].title).replace((news_data[0]).label, ''))
  newscpFull.push(
    <View key={i} style={{ marginTop: 10}}>
    <TouchableOpacity onPress = {() => {navigation.navigate('SingleNewsScreen'), setLink(news_data[i].href)}}>
    <View style={{flexDirection:'row', width: windowWidth-20, marginTop: 0,justifyContent:'space-between',backgroundColor:theme.bottomNavigationColor, paddingLeft: 15, paddingRight:15, paddingTop:15, borderTopLeftRadius:15, borderTopRightRadius: 15 }}>
     <Text style={{color:theme.color, fontSize:15,textAlign:'left',fontStyle:'italic'}} > {(news_data[i]).label} </Text>
       </View>
         <View style={{ width: windowWidth-20, marginBottom:0, backgroundColor:theme.bottomNavigationColor, alignItems:'center', padding: 15}}>
       <View style={{width:windowWidth-20, paddingLeft:15, paddingRight:15}}>
           <Text style={{color:theme.color, fontSize:15,textAlign:'left'}}>
           {(news_data[i].title).replace((news_data[i]).label, '')}
           </Text>
       </View>
     </View> 
     <View style={{flexDirection:'row', width: windowWidth-20, marginTop: 0,justifyContent:'space-between',backgroundColor:theme.bottomNavigationColor, paddingLeft: 15, paddingRight:15, paddingBottom:15, borderBottomEndRadius: 15, borderBottomStartRadius:15 }}>
         <View style={{backgroundColor: theme.dateBack, width: 90, alignItems:'center',justifyContent:'center', borderRadius: 5,}} >
             <Text style={{color:theme.color, fontSize:14, color:'white'}}>
             {(news_data[i]).date}
             </Text>
         </View>
         <View>
           {/* <TouchableOpacity onPress = {() => {navigation.navigate('SingleNewsScreen'), setLink(news_data[i].href)}} style={{ paddingLeft:15, paddingRight:15,borderRadius:5, borderWidth: 1}}>
             <Text style={{color: '#4D4D4D', fontSize:14, fontWeight:'bold', marginLeft:5, marginRight:5 }}>{i18n.t('read')}</Text>
           </TouchableOpacity> */}
         </View>
       </View>
      
    </TouchableOpacity>
    </View>
    

  )
}

    return (
      <View style={[styles.container,{backgroundColor: isDarkMode === true ? '#262C38' : '#F2F2F2'}]}>
        <View style={{flexDirection:'row',  marginTop:10, width: windowWidth-30, alignItems:'center', marginLeft: 15}}>
        </View>
        <ScrollView  style={{ width: "100%", height: '100%'}} fadingEdgeLength={0} >
          <View style={{alignItems:'center'}}>

          {isWatch ? newscpFull : newscp}

          </View>
          <View style={{alignItems:'center'}}>
            {isWatch1 ? <TouchableOpacity style={{width:windowWidth-150, height: 50, borderColor:'#DC675F', borderWidth: 2, alignItems:'center', justifyContent:'center', marginTop: 10, marginBottom: 10, borderRadius: 50}}onPress={()=> {setIsWatch(true);setIsWatch1(false)}}><Text style={{fontSize: 16, color:'#DC675F', fontWeight:'bold'}}> Смотреть больше</Text></TouchableOpacity>: <></>}
          
          </View>

          <View style={{marginBottom:80}}/>
        </ScrollView>
      </View>
    )
}


const styles = StyleSheet.create({
  container:{
    // backgroundColor:'white',
    width: windowWidth, 
    height: windowHeight
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
    height: 90, 
    backgroundColor:'#D9D9D9', 
    alignItems:'center',
    // justifyContent:'space-between',
    // justifyContent:'center',

    borderRadius: 15,
    // flexDirection:'row'
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