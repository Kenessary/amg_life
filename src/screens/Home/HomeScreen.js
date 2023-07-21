import React, { useContext, useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Modal, Pressable, SafeAreaView, Alert, BackHandler, Linking, Platform, ScrollView, AppState, Image } from "react-native";
import { List } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";
import { BirthdayIcon, EventIcon, InfoguideIcon, NewsIcon, Addcon, Appdev, EventIconDark, InfoguideIconDark, BirthdayIconDark, NewsIconDark, AddconDark, AppdevDark} from "../../cores/helpers/icon";
import { theme } from "../../cores/theme";
import { FontAwesome, Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import axios from "axios";
import qs from "qs"
import FoodAdd from "./FoodAdd";
import MenuHide from "./MenuHide";
import { WaveIndicator } from "react-native-indicators";
import "react-native-gesture-handler"
import {BottomSheet} from "react-native-btr"


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import LottieView from "lottie-react-native"
import themeContext from "../../cores/themeContext";

export default function HomeScreen({navigation}){
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

  // change version before update
  const version = "1.2.9"

  const {iin, historyOpened} = useContext(AuthContext)
  let [apparat, setApparat] = useState('');
  let [stol, setStol] = useState('');
  let [fio, setFio] = useState('');
  let [opros, setOpros] = useState(false)
  let [isLoading, setIsLoading] = useState(false)
  let [isLoading1, setIsLoading1] = useState(false)
  let [menu, setMenu] = useState('')
  let [update, setUpdate] = useState('')
  let [modalResult, setModalResult] = useState(false)
  let [modalUpdate, setModalUpdate] = useState(false)
 
  let [modalSocial, setModalSocial] = useState(false)
  // let [modalResult1, setModalResult1] = useState(true)
  let [otvetOpros, setOtvetOpros] = useState('')
  let [locale, setLocale] = useState('');
  let [lang, setLang] = useState('')
  i18n.fallbacks = true
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = 'kz'

  // console.log(Constants.manifest2.extra.expoClient.version)

  // console.log(update)

// useEffect(()=>{
  
// },[])

const [visible, setVisible] = useState(false);
const [visible1, setVisible1] = useState(false);

const toggleBottomNavigationView = () => {
  //Toggling the visibility state of the bottom sheet
  setVisible(!visible);
};

const toggleBottomNavigationView1 = () => {
  //Toggling the visibility state of the bottom sheet
  setVisible1(!visible1);
};
//--------- СТОЛОВЫЙ ОПРОС --------- //  
  useEffect(()=>{
    setIsLoading(true)
    const data = qs.stringify({
      'oprosdlyastolovkiiin': iin 
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
      // historyOpened()
      if(parsed.status === 1){
        setOpros(true)
      }
      if(parsed.status === 0){
        setOpros(false)
      }
        setIsLoading(false)
      })
      .catch(function(error){
          console.log(error)
          setIsLoading(false)
      }) 
    },[])

//--------- ПУШ ТОКЕН --------- //
  const fetchDataEdo = () => {
    try {
      const data = qs.stringify({
      'pushedoiin': iin,
      'pushedotoken': globalThis.asexpo
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
      console.log(parsed) 
    })
  } catch (error) {
    console.error(error)}
  }

  useEffect(()=>{
    fetchDataEdo()
  },[])

  //--------- ВЕРСИЯ ПРИЛОЖЕНИЯ --------- //
  const fetchDataVersion = () => {
    try {
      const data = qs.stringify({
      'addinfoversionontableiin': iin,
      'addinfoversionontablever': version
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
      console.log(parsed) 
    })
  } catch (error) {
    console.error(error)}
  }

  useEffect(()=>{
    fetchDataVersion()
  },[])

//--------- МЕНЮ ДЛЯ ОПРОСА --------- //
  useEffect(()=>{
    setIsLoading(true)
    const config = {
      method:'get',
      url: `http://95.57.218.120/?apitest.helloAPI5={}`,
      headers: {  }
    }
    axios(config)
    .then(function(response){
      let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
      let parse_first = JSON.parse(info)
      let parse_second = JSON.parse(parse_first.response)
      let parse_third = parse_second.status
      setMenu((JSON.stringify(parse_third)).split(';'))
      setIsLoading(false)
    })
      .catch(function (error) {
      console.log(error);
      setIsLoading(false)
    })
  },[])
//--------- ПРОВЕРКА ОБНОВЛЕНИЯ --------- //
useEffect(()=>{
  setIsLoading(true)
  const config = {
    method:'get',
    url: `http://95.57.218.120/?apitest.helloAPIObnova={"ver":"${version}"}`,
    headers: {  }
  }
  axios(config)
  .then(function(response){
    let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
    let parse_first = JSON.parse(info)
    let parse_second = parse_first.response
    if(parse_second.status === false){
      setModalUpdate(true)
    }
    if(parse_second.status === true){
      setModalUpdate(false)
    }
    setIsLoading(false)
  })
    .catch(function (error) {
    console.log(error);
    setIsLoading(false)
  })
},[])

//--------- ЗАПИСЬ ОТВЕТА ОПРОС --------- //
  const otvet = (oprospitanieiin, oprospitanieotvet) => {
    setIsLoading1(true)
    const data = qs.stringify({
      'oprospitanieiin': oprospitanieiin,
      'oprospitanieotvet': oprospitanieotvet
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
      let user_password = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
      let parsed = JSON.parse(user_password)
      let oprStat = parsed.status
      setOtvetOpros(oprStat)
      if(oprStat.length !== 0){
        setModalResult(true)
      }
        setIsLoading1(false)
    })
    .catch(function(error){
      console.log(error)
      setIsLoading1(false)
    }) 
  }

//--------- ЯЗЫКИ --------- //    
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

//--------- ПРОВЕРКА НАЛИЧИЕ АППАРАТА --------- //
  useEffect(()=>{
    getDataApparat()
  },[])
  
  const getDataApparat = () => { 
    try {
      AsyncStorage.getItem('userApparat')
      .then(value => {
        if(value != null){
          setApparat(value)
        }
      })
      } catch(error){
        console.log(error)
      }
  }

//--------- ПРОВЕРКА НАЛИЧИЕ ПОВАРА --------- //
  useEffect(()=>{
    getDataStolovaya()
  },[])

  const getDataStolovaya = () => { 
    try {
      AsyncStorage.getItem('userStolovaya')
        .then(value => {
          if(value != null){
            setStol(value)
          }
        })
    } catch(error){
      console.log(error)
    }
  }

//--------- ЗАГЛУШКА ДЛЯ АНДРОИДА --------- //
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Выйти из приложения', 'Вы действительно хотите выйти из AMG-Life?!', [
        {
          text: 'Отмена',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Да', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

//--------- МАССИВ МЕНЮ --------- //
  const foods = []
  for(let i = 0; i< menu.length-1; i++){
    const eat = (menu[i]).replace('"', '').replace(' ', '')
    foods.push(
        <View style={{ height: 40, flexDirection:'row', marginBottom: 12,}} key={Math.random()}>
            <View style={{marginLeft: 5, width: windowWidth/1.3}}>
                <Text style={{color: theme.color, fontSize: 16}} key={Math.random()}>{eat}</Text>
            </View>
        </View> 
    )
  }

  useEffect(()=>{
    setIsLoading(true)
    const data = qs.stringify({
      'infoiin': iin 
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
        setFio(parsed.fio)
  
        // const day = moment().format(`DD`)
        // const mm = moment().format(`MM`)
        // const iinMonth = (parsed.iin).slice(2,4)
        // const iinDay = (parsed.iin).slice(4,6)
  
        // console.log(day === iinDay)
  
  //       await registerIndieID(`${iin}`, 5464, 'cq3oCzyrxvjyjKu8iBQDal');
  
        setIsLoading(false)
    })
  
    .catch(function(error){
        console.log(error)
        setIsLoading(false)
    }) 
  },[])

//--------- ИНДИКАТОР ЗАГРУЗКИ --------- //
  if(menu.length === 0) {
    return(
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
      <WaveIndicator color={theme.loading}/>
    </View>
    )
  }


  const openAppStore = () => {
    Linking.openURL('https://apps.apple.com/kz/app/amg-life/id1594409514'); // Replace with your app's App Store URL
  };

  const openGooglePlayStore = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=kz.portmasterplus.cnpcamglife'); // Replace with your app's Google Play Store URL
  };

  // console.log(Platform.OS)

//--------- ФРОНТЕНД СТРАНИЦЫ --------- //  
  return (
    <View style={{...styles.container, opacity: modalSocial ? 0.3 : 1, backgroundColor: theme.background, flex:1, zIndex:10}}>
      <View style={{position:'absolute', bottom:20, right:20, zIndex:30}}>
        <TouchableOpacity style={{width:70, height:70, backgroundColor:'#D64D43', borderRadius:50, alignItems:'center', justifyContent:'center'}} onPress={toggleBottomNavigationView1}>
        <Feather name="gift" size={30} color="white" />
        </TouchableOpacity>
      </View>


<BottomSheet
          visible={visible}

          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={toggleBottomNavigationView}
          //Toggling the visibility state on the clicking out side of the sheet
        >
          {/*Bottom Sheet inner View*/}
          <View style={[styles.bottomNavigationView, {backgroundColor: theme.background, zIndex:30}]}>
            <View
              style={{
              }}>
                <View style={{alignItems:'center'}}>
                <Text
                style={{
                  marginTop:5,
                  fontSize: 22,
                  fontWeight:"700",
                  // backgroundColor:'red'
                  color: theme.color
                }}>
                AMG-Life
              </Text>
                </View>

              <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:15}}>
                <TouchableOpacity 
                  style={{padding:8, borderWidth:2, borderRadius:15, borderColor:'#e4e4e4'}}
                  onPress={()=>Linking.openURL(`instagram://user?username=cnpc_kazakhstan`)}
                >
                  <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Image source={require('../../../assets/instagram.png')} style={{height:18, width:18}}/>
                    <Text style={{marginLeft:5, fontSize:14, color:theme.color,}}>cnpc_kazakhstan</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{padding:8, borderWidth:2, borderRadius:15, borderColor:'#e4e4e4'}}
                  onPress={()=>Linking.openURL('vnd.youtube://@cnpc-amg7239/CNPC-AMG/')}
                >
                  <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Entypo name="youtube" size={18} color="#FF0000" />
                    <Text style={{marginLeft:5, fontSize:14, color:theme.color,}}>CNPC AMG-Life</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:15}}>
                <TouchableOpacity 
                  style={{padding:8, borderWidth:2, borderRadius:15, borderColor:'#e4e4e4'}}
                  onPress={()=>Linking.openURL('http://facebook.com/cnpc.kazakhstan')}
                >
                  <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Image source={require('../../../assets/facebook.png')} style={{height:18, width:18}}/>
                    <Text style={{marginLeft:5, fontSize:14, color:theme.color,}}>cnpc.kazakhstan</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{padding:8, borderWidth:2, borderRadius:15, borderColor:'#e4e4e4'}}
                  onPress={()=>Linking.openURL('http://www.cnpc-amg.kz/')}
                >
                  <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <MaterialCommunityIcons name="web" size={18} color="#3771C8" />
                    <Text style={{marginLeft:5, fontSize:14, color:theme.color,}}>cnpc-amg.kz</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{alignItems:'center'}}>
                <Text
                style={{
                  marginTop:25,
                  fontSize: 16,
                  fontWeight:"500",
                  // backgroundColor:'red'
                  color:theme.color
                }}>
                Версия приложения: 1.2.9
              </Text>
                </View>


              
            </View>
          </View>
</BottomSheet>

<BottomSheet
          visible={visible1}

          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView1}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={toggleBottomNavigationView1}
          //Toggling the visibility state on the clicking out side of the sheet
        >
          {/*Bottom Sheet inner View*/}
          <View style={[styles.bottomNavigationView, {backgroundColor: theme.background, zIndex:30, height:450}]}>
           <View style={{width:"100%", alignItems:'center'}}>
            <Text style={{color:'white'}}>{fio}</Text>
           <LottieView
            source={require("../../../assets/animation/animation_lk13bsxz.json")}
            autoPlay
            loop={true}
            speed={0.6}
            style={{width:230, height:230, marginBottom:20}}
          />
            </View> 

          </View>
</BottomSheet>


      <StatusBar style= {isDarkMode ? 'light' : 'dark' } />
      <View style={{alignItems:'center'}}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, {color: theme.color}]}>{i18n.t('main')}</Text>
          <View>
          <TouchableOpacity 
            style={{padding:5,paddingLeft:10, paddingRight:10, backgroundColor: theme.background, flexDirection:'row', alignItems:'center', borderRadius:15, borderWidth: isDarkMode ? 1.3 : 0.8, borderColor: theme.borderColor}}
            // onPress={() => setModalSocial(true)}
            onPress={toggleBottomNavigationView}
            >
            <Image source={require('../../../assets/androidpush.png')} style={{width:20, height:20, marginRight:8}}/>
            <Text style={{fontSize:15, fontWeight:'600', color: theme.color}}>AMG-Life</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator= {false}>
        {stol === 'Yes' ? <FoodAdd onPress={()=> navigation.navigate('FoodMenuPanel')}/>: <></>}
        <View style={styles.centered}>
          <View style={styles.listwrapper1}>
            <List.Item
              title = {i18n.t('infoguide')}
              style = {styles.icon}
              rippleColor='transparent'
              onPress = {() => {navigation.navigate('InfoguideScreen')}}
              left = {color => isDarkMode === true ? <InfoguideIconDark fill={color}/> : <InfoguideIcon fill={color}/>}
              titleStyle={[styles.listItem, {color: theme.color}]}
            />
          </View>


        </View>
        <View style={styles.centered}>
          <TouchableOpacity style={styles.listwrapper}>
            <List.Item
              title = {i18n.t('events')}
              rippleColor='transparent'
              onPress = {() => {navigation.navigate('EventsScreen')}}
              left = {color => isDarkMode === true ? <EventIconDark fill={color}/> : <EventIcon fill={color}/>}
              titleStyle={[styles.listItem, {color: theme.color}]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.centered}>
          <View style={styles.listwrapper}>
            <List.Item
              title = {i18n.t('birthdays')}
              rippleColor='transparent'
              onPress = {() => {
                navigation.navigate('BirthdayScreen')
              }}
              left = {color => isDarkMode === true ? <BirthdayIconDark fill={color}/> : <BirthdayIcon fill={color}/>}
              titleStyle={[styles.listItem, {color: theme.color}]}
            />
          </View>
        </View>
        {apparat === 'Yes' ? <MenuHide onPress={()=> navigation.navigate('FoodMenuScreen')}/>: <></>}
        <View style={styles.centered}>
          <View style={styles.listwrapper}>
            <List.Item
              title = {i18n.t('news')}
              rippleColor='transparent'
              onPress = {() => {navigation.navigate('NewsScreen')}}
              left = {color => isDarkMode === true ? <NewsIconDark fill={color}/> : <NewsIcon fill={color}/>}
              titleStyle={[styles.listItem, {color: theme.color}]}
            />
          </View>
          <View style={styles.listwrapper}>
            <List.Item
              title = {i18n.t('contacts')}
              rippleColor='transparent'
              onPress = {() => {navigation.navigate('ContactsScreen')}}
              left = {color => isDarkMode === true ? <AddconDark fill={color}/> : <Addcon fill={color}/>}
              titleStyle={[styles.listItem, {color: theme.color}]}
            />
          </View>
          <View style={styles.listwrapper}>
            <List.Item
              title = {i18n.t('adminpo')}
              rippleColor='transparent'
              onPress = {() => {navigation.navigate('AdminPO')}}
              left = {color => isDarkMode === true ? <AppdevDark fill={color}/> : <Appdev fill={color}/>}
              titleStyle={[styles.listItem, {color: theme.color}]}
            />
          </View>
        </View>
        <View style={{marginBottom:60}}></View> 
      </ScrollView>

      
      <Modal animationType="fade" transparent={false} visible={modalUpdate}>
         <View style={{width:'100%', height:'100%', justifyContent:'flex-end', backgroundColor: theme.background}}>
          <View style={{alignItems:'center', marginBottom:60}}>
            <Text style={{textAlign:'center', fontSize:22, fontWeight:'600', color: theme.color}}>
            {i18n.t('updateAlert')}
            </Text>

          <TouchableOpacity onPress = {() => Platform.OS === 'ios' ? openAppStore() : openGooglePlayStore()} style={{width:windowWidth-80, height:60, backgroundColor: isDarkMode === true ? "#C0D5EE" : '#D64D43', marginTop:20, borderRadius:15, alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:theme.background, fontSize:20, fontWeight:'500'}}>{i18n.t('updateApp')}</Text>
          </TouchableOpacity>
          </View>
          {isDarkMode ===true  ?      <Image
        source={require('../../../assets/mobileUpdateDark.jpg')}
        style={{width:'100%', height:"50%"}}
        // style={styles.bottomImage}
      /> : <Image
      source={require('../../../assets/mobileupdate.jpg')}
      style={{width:'100%', height:"50%"}}
      // style={styles.bottomImage}
    /> }
         </View>
        </Modal>

        <Modal animationType="slide" transparent={false} visible={false}>
        <SafeAreaView style={styles.menuOpros}>
          <View style={{alignItems:'center', width:windowWidth-60}}>
            <Text style={{textAlign:'center', fontSize:20, lineHeight:27, fontWeight:"bold", marginBottom:20, color:'#4d4d4d'}}>В целях безопасности необходимо верифицировать номер телефона</Text>
            <LottieView
            source={require("../../../assets/animation/98065-security-tick.json")}
            autoPlay
            loop={true}
            speed={1.2}
            style={{width:230, height:230, marginBottom:20}}
          />

          <TouchableOpacity style={{width:"100%", height:50, backgroundColor:'#2684FF', alignItems:'center', justifyContent:'center', borderRadius:15}}>
            <Text style={{color:'white', fontSize:17, fontWeight:'bold'}}>Верифицировать</Text>
          </TouchableOpacity>
          </View>
        </SafeAreaView>
        </Modal>



      <Modal animationType="slide" transparent={false} visible={opros}>
        <SafeAreaView style={[styles.menuOpros, {backgroundColor: theme.background}]}>
          <View style={styles.menuOprosHeader}>
            <View style={styles.menuOprosTitleCenter}>
              <Text style={[styles.menuOprosTitle, {color: isDarkMode === true ? 'white' : '#D64D43' }]}>Меню на сегодня</Text>
            </View>
            {foods}
          </View>
          <Text style={{fontSize:20, color: theme.color}}>Будете сегодня обедать?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.buttonYes, {backgroundColor: isDarkMode === true ? "#C0D5EE" : '#D64D43'}]} onPress={()=> otvet(iin, 1)}>
              <Text style={[styles.buttonYesText, {color: theme.background}]}>Да</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonNo, {borderColor: isDarkMode === true ? "#C0D5EE" : "#D64D43"}]} onPress={()=> otvet(iin, 2)}>
              <Text style={[styles.buttonNoText, {color: theme.color}]}>Нет</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <Modal animationType="fade" transparent={true} visible={modalResult}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { backgroundColor: isDarkMode === true ? "#C0D5EE" : "white",}]}>
              {/* <FontAwesome name="check-circle" size={70} color="#1CA510" /> */}
              <LottieView
            source={require("../../../assets/animation/done.json")}
            autoPlay
            loop={false}
            speed={1.6}
            style={{width:150, height:150}}
          />
              <View style={styles.modalContainer}>
                <Text style={[styles.otvetOpros,{color: isDarkMode === true ?  "#262C38" :'#1CA510'}]}>{otvetOpros}</Text>
                <Pressable style={[styles.button, styles.buttonClose ,{borderColor: isDarkMode ? '#262C38' : '#D64D43'} ]} onPress={() => setOpros(false)}>
                  <Text style={styles.textStyle}>OK</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>


        

        <Modal animationType="fade" transparent={true} visible={isLoading1}>
          <View style={styles.centeredView}>
            <View style={[styles.modalViewLoad,{backgroundColor: theme.background}]}>
              <WaveIndicator color={theme.loading}/>
            </View>
          </View>
        </Modal>
        
      </Modal>
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
    marginTop: Platform.OS === 'ios' ? 40 : 30, 
    marginBottom:10,
    alignItems:'center', 
    justifyContent:'space-between', 
    width:windowWidth-40
  },
  modalViewLoad: {
    borderRadius: 20,
    width: 80,
    height: 80,
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
  bottomNavigationView: {
    width: '100%',
    height: 250,
    padding:20,
    borderTopLeftRadius:25,
    borderTopRightRadius:25
  },
  modalViewSocial: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: windowWidth-50,
    height: 320,
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
    fontSize:17
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
    marginRight:70, 
    borderRadius:15
  },
  buttonYesText:{
    fontSize:18, 
    fontWeight:'500'
  },
  buttonNo:{
    alignItems:'center', 
    justifyContent:'center', 
    width:90, 
    height:50, 
    borderRadius:15, 
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    borderRadius: 20,
    width: windowWidth-40,
    height: 300,
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
    borderWidth: 2
  }
})
