import { Text, View, StyleSheet,  Dimensions, TouchableOpacity, ScrollView, Linking, Platform } from 'react-native'
import React, { Component, useEffect, useState, useContext } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext'; 
import { WaveIndicator } from 'react-native-indicators';
import axios from "axios";
import qs from "qs"
import moment from 'moment';
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import AsyncStorage from "@react-native-async-storage/async-storage";
import themeContext from '../../cores/themeContext';
import { StatusBar } from 'expo-status-bar';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function NotificationHistory({navigation}) {


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

  const [isLoading, setIsLoading] = useState(false)
  const [historyNotification, setHistoryNotification] = useState('')
  const [historyStatus, setHistoryStatus] = useState('')
  const [groupedHistory, setGroupedHistory] = useState('')
  let [locale, setLocale] = useState('');
  let [lang, setLang] = useState('')
 
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

  i18n.fallbacks = true
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = 'kz'

 

  // console.log(groupedHistory)
  const {iin, openedLength, setOpenedLength} = useContext(AuthContext)

  
 

  if(historyNotification.length !== 0){
    historyNotification.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.hour}`);
      const dateB = new Date(`${b.date}T${b.hour}`);
      return dateB - dateA;
    });
  }


  // const a = []
  // for (let i = 0; i<historyNotification.length; i++){
  //   if(historyNotification[i].opened === 0){
  //     a.push(historyNotification[i].opened)
  //   }
  // }
 
  const openAppStore = () => {
    Linking.openURL('https://apps.apple.com/kz/app/amg-life/id1594409514'); // Replace with your app's App Store URL
  };

  const openGooglePlayStore = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=kz.portmasterplus.cnpcamglife'); // Replace with your app's Google Play Store URL
  };


  useEffect(()=>{
    setIsLoading(true)
    const data = qs.stringify({
      'getnotifhistoryiin': iin 
    });
    const config = {
      method: 'post',
      url: 'http://95.57.218.120/?index',
      headers: { 
        'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    axios(config)
      .then(async function(response){
      let user = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
      let parsed = JSON.parse(user)
      let parsedL = parsed.list
      let status_parsed = parsed.status
      
      
      // setHNotification(parsedL)
      // console.log(status_parsed)
      let newArray = parsedL.map((list) => {
        return{
          title: list.title, 
          body: list.body, 
          opened: list.opened, 
          type: list.type,
          date: (list.date).split(' ')[0],
          hour: (list.date).split(' ')[1], 
          
        }
      })

      setHistoryStatus(status_parsed)
      setHistoryNotification(newArray)
      console.log(newArray)
      setIsLoading(false)
      })
      .catch(function(error){
          console.log(error)
          setIsLoading(false)
      }) 
  },[])

  useEffect(()=>{
    setOpenedLength(0)
  },[])

  const date = moment().format(`YYYY-MM-DD`)
  const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
  
  let notifications = []

  for (let i=0; i < historyNotification.length; i++){
    const time = (historyNotification[i].hour).split(':')
    notifications.push( 

      <View key={i}>

<StatusBar style= {isDarkMode ? 'light' : 'dark' } />

      <View style={{flexDirection:'row', marginBottom:30, marginLeft:10}}>
        

<View style={{width:40, height:40, backgroundColor: isDarkMode === true ? '#1C3F5C' : '#f4f4f4' , borderRadius:10, marginTop:2, alignItems:'center', justifyContent:'center'}}>
 <MaterialIcons name={ 
  historyNotification[i].type === 'message' 
  ? 'forum' 
  : historyNotification[i].type === 'menu' 
  ? 'local-dining' 
  : historyNotification[i].type === 'update' 
  ? 'system-update' 
  : historyNotification[i].type === 'edo' 
  ? 'insert-drive-file' 
  : '' } size={24} color={isDarkMode === true ? '#C0D5EE' : 'grey'} /> 

</View>
        <View style={{width:windowWidth-70, backgroundColor: theme.notificationCardColor, marginLeft:8, padding:10, paddingLeft:20, paddingRight:20, borderRadius:16}}>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <Text style={{fontSize:18, fontWeight:'600', color: theme.color}}>{historyNotification[i].title}</Text>

            <View style={{flexDirection:'row', alignItems:'center', display: historyNotification[i].opened === 0 ? 'flex' : 'none' }}>
            <Text style={{fontSize:16, fontWeight:'400', color: theme.color, marginRight:5}}>Новое</Text>
            <View style={{width:10, height:10, backgroundColor:'#25AD03', borderRadius:10}}></View>
            </View>

          </View>

          <View style={{marginTop:5}}>
            <Text style={{fontSize:16, fontWeight:'400', color: theme.color}}>{historyNotification[i].body}</Text>
          </View>

         {
          historyNotification[i].type !== 'edo' && historyNotification[i].type !== 'message'
          ? <TouchableOpacity 
              style={{marginTop:15, width:'100%', alignItems:'center', backgroundColor: isDarkMode ? '#C0D5EE' : '#D64D43', padding:8,borderRadius:10}} 
              onPress={()=> historyNotification[i].type === 'menu' 
              ? navigation.navigate('FoodMenuScreen') 
              : (Platform.OS === 'ios' 
                  ? openAppStore()
                  : openGooglePlayStore()
                )
              }
            >
            <Text style={{fontSize:16, fontWeight:'400', color: isDarkMode === true ? '' :'white'}}>{historyNotification[i].type === 'menu' ? 'Меню': historyNotification[i].type === 'update' ? 'Обновить приложения' : '' }</Text>
          </TouchableOpacity> : <></> } 

          <View style={{justifyContent:'space-between', marginTop:10, flexDirection:'row'}}>
            <View>
              <Text style={{fontSize:13, fontWeight:'400', color: theme.color}}>
                { 
                  historyNotification[i].date === date 
                  ? i18n.t('today') 
                  : historyNotification[i].date === yesterday 
                  ? i18n.t('yesterday')  
                  : historyNotification[i].date 
                }
              </Text>
            </View>

            <View>
              <Text style={{fontSize:13, fontWeight:'400', color: theme.color}}>{time[0]}:{time[1]}</Text>
            </View>
          </View>
        
        </View>
</View>
      </View>

    )
  }


  if(isLoading) {
    return(
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
      <WaveIndicator color={theme.loading}/>
    </View>
    )
  }

    return (
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <View style={{alignItems:'center', marginBottom:20}}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, {color: theme.color}]}>{i18n.t('notification')}</Text>
        </View>
        </View>
        <View>

          <ScrollView>
            {/* {notifications} */}

      {historyStatus !== "Нет данных" ? notifications : <View style={{alignItems:'center'}}><Text style={{fontSize:22, color:theme.color, fontWeight:'600'}}> <Entypo name="archive" size={28} color={theme.color} style={{marginRight:5}} /> {historyStatus}</Text></View>}
      <View style={{marginBottom:150}}></View>

          </ScrollView>


{/* <View style={{flexDirection:'row', marginTop:12, marginLeft:10}}>

<View style={{width:40, height:40, backgroundColor:'#F4F4F4', borderRadius:10, marginTop:2, alignItems:'center', justifyContent:'center'}}>
 <MaterialIcons name={ 
  type === null 
  ? 'forum' 
  : type === 'menu' 
  ? 'local-dining' 
  : type === 'update' 
  ? 'system-update' 
  : type === 'edo' 
  ? 'insert-drive-file' 
  : '' } size={24} color="grey" /> 

</View>
        <View style={{width:windowWidth-70, backgroundColor:'#F5F5F5', marginLeft:8, padding:10, paddingLeft:20, paddingRight:20, borderRadius:16}}>
          <View>
            <Text style={{fontSize:18, fontWeight:'600', color:'#4d4d4d'}}>AMG-Life</Text>
          </View>

          <View style={{marginTop:5}}>
            <Text style={{fontSize:16, fontWeight:'400', color:'#4d4d4d'}}>Меню доступно</Text>
          </View>

          <TouchableOpacity style={{marginTop:15, width:'100%', alignItems:'center', backgroundColor:'#D64D43', padding:8,borderRadius:10}}>
            <Text style={{fontSize:16, fontWeight:'400', color:'white'}}>Подробнее</Text>
          </TouchableOpacity>

          <View style={{alignItems:'flex-end', marginTop:5}}>
            <View>
              <Text style={{fontSize:13, fontWeight:'400', color:'#4d4d4d'}}>14:05</Text>
            </View>
          </View>
        
        </View>
</View> */}

        </View>


        
      </View>
    )
}

const styles = StyleSheet.create({
  container:{
    width: windowWidth, 
    height: windowHeight
  },
  header:{
    flexDirection:'row', 
    marginTop: Platform.OS === 'ios' ? 45 : 30, 
    alignItems:'center', 
    justifyContent:'space-between', 
    width:windowWidth-40
  },
  headerTitle:{
    fontSize: 24,
    fontWeight:"bold",
  },
  socialnet:{
    alignItems:'center', 
    width:150, 
    padding:5, 
    flexDirection:'row', 
    justifyContent:'space-around'
  },
  listItem:{
    fontSize:17, 
    color:'#4D4D4D'
  },
  centered:{
    alignItems:'center'
  },
  listwrapper: {
    marginBottom: 0,
    width: windowWidth-30,
  },
  listwrapper1: {
    marginBottom: 0,
    width: windowWidth-30,
  },
  menuOpros:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  menuOprosHeader:{
    width:windowWidth-40, 
    padding:15, 
    borderRadius:15, 
    paddingBottom:-10
  },
  menuOprosTitleCenter: {
    alignItems:'center', 
    justifyContent:'center'
  },
  menuOprosTitle:{
    fontSize:18, 
    fontWeight:'600', 
    color:'#D64D43', 
    marginBottom: 15
  },
  buttonContainer:{
    width:windowWidth-40, 
    height:60, 
    flexDirection:'row', 
    alignItems:"center", 
    justifyContent:'center',
    marginTop: 20
  },
  buttonYes:{
    alignItems:'center', 
    justifyContent:'center', 
    width:90, 
    height:50, 
    backgroundColor:'#D64D43', 
    marginRight:70, 
    borderRadius:15
  },
  buttonYesText:{
    fontSize:18, 
    fontWeight:'500', 
    color:'white'
  },
  buttonNo:{
    alignItems:'center', 
    justifyContent:'center', 
    width:90, 
    height:50, 
    backgroundColor:'white', 
    borderRadius:15, 
    borderColor:'#D64D43', 
    borderWidth:3
  },
  buttonNoText:{
    fontSize:18,
    fontWeight:'500',
    color:'#D64D43'
  },
  modalContainer:{
    flexDirection:'column', 
    alignItems:'center'
  },
  otvetOpros:{
    fontSize:16, 
    fontWeight:'600', 
    marginBottom:10, 
    marginTop:10, 
    color:'#1CA510'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width: windowWidth-40,
    height: 200,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 4
  },
  button: {
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "white",
    borderColor:'#D64D43',
    borderWidth: 2
  }
})