import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import Header from '../../components/Header';
import { FontAwesome5, Feather, FontAwesome, Ionicons } from '@expo/vector-icons'; 
import moment from 'moment';
import axios from 'axios';
import qs from 'qs'
import { WaveIndicator } from 'react-native-indicators';
import { AuthContext } from '../../context/AuthContext';
import BackButton from '../../components/BackButton';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import LottieView from "lottie-react-native"




import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import { StatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Clipboard from 'expo-clipboard';
import themeContext from '../../cores/themeContext';


function FoodMenuScreen({navigation, goBack}) {

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

    const {iin} = useContext(AuthContext)
    const [ menu, setMenu ] = useState('')
    const [ menuNo, setMenuNo ] = useState([])
    const [ balance, setBalance ] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [shouldShow, setShouldShow] = useState(false)
    const [ texmonth, setTextMonth ] = useState([])

    // console.log(menu)

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
    // console.log(JSON.parse(menu))

    // const getMonth = () => {
    //     const month = moment().format('MM')
    //     return texmonth
    // }

    // getMonth()

    const date = moment().format(`DD ${texmonth} YYYY`)


//   setInterval(() => {
//             if(1 === 1){
//                 console.log("App")
//             }
//         }, 1000);


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
            setMenuNo(parse_third)
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

            // console.log(parse_first)

            setIsLoading(false)
         })
         .catch(function (error) {
          console.log(error);
          setIsLoading(false)
         })
      },[])

      

      
    useEffect(()=>{
        setIsLoading(true)
        const data = qs.stringify({
            'balanspitiin': iin 
          });
        const config = {
            method: 'post',
            url: 'http://95.57.218.120/?index',
            headers: { 
              'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        }
        axios(config)
         .then(function(response){
            let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
            setBalance((JSON.parse(info)).status)
            setIsLoading(false)
         })
         .catch(function (error) {
          console.log(error);
          setIsLoading(false)
         })
      },[])

    const foods = []
    // const date = new Date().toDateString()
    

    if (menu.length !== 1) {
        for(let i = 0; i< menu.length-2; i++){
            const eat = (menu[i]).replace('"', '').replace(' ', '')
    
            foods.push(
                <View style={{ flexDirection:'row', marginBottom: 20,}} key={Math.random()}>
                    <FontAwesome name="circle" size={15} color={isDarkMode === true ? '#C0D5EE' : '#D64D43'} style={{marginTop:3}}/>
                    <View style={{marginLeft: 5 }}>
                        <Text style={{color: theme.color, fontSize: 16}} key={Math.random()}>{eat}</Text>
                    </View>
                </View> 
            )
        }
    } else {
        const noneMenu = JSON.parse(menu)
        // console.log(noneMenu)
        foods.push(
            <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}} key={Math.random()}>


<View style={{width:"auto", height:'auto', alignItems:'center', backgroundColor:'#FFE6D9', padding:15, borderRadius:50}}>
<LottieView
            source={require("../../../assets/animation/137365-food.json")}
            autoPlay
            loop={true}
            speed={1.3}
            style={{width:160, height:160}}
          />

          <View style={{width:windowWidth-120, marginTop:15}}>
          <Text style = {{fontSize: 18, textAlign:'center',color:"#D64D43", fontWeight:'bold', lineHeight:27}}>{lang ==='kz' || lang ==='ch' ? i18n.t('foodwarning') : noneMenu}</Text>
          </View>
</View>
        </View>
        )

    }

    // for(let i = 0; i< menu.length-1; i++){
    //     const eat = (menu[i]).replace('"', '').replace(' ', '')

    //     foods.push(
    //         <View style={{ height: 40, flexDirection:'row', marginBottom: 20}} key={Math.random()}>
    //             <FontAwesome name="circle" size={20} color="#D64D43" style={{marginTop:3}}/>
    //             <View style={{marginLeft: 5, width: windowWidth/1.3}}>
    //                 <Text style={{color:'black', fontSize: 16}} key={Math.random()}>{eat}</Text>
    //             </View>
    //         </View> 
    //     )
    // }

    

    if(isLoading) {
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems: 'center',backgroundColor: isDarkMode === true ? "#191E2D" : 'white' }}>
                <WaveIndicator color={theme.loading}/>
            </View>
        )
    }

    

    return (
        
        <View style={{backgroundColor: theme.menuBalance}}>
            <StatusBar style='light'/>
            {/* <Text style={styles.header}>Меню столовая</Text> */}
            <View style={{flexDirection:'row', width: windowWidth-60, alignItems:'center', marginTop:0, marginLeft: 30 }}>
                {/* <BackButton goBack = {navigation.goBack} style={{color:'white'}}/> */}
             </View>
            <View style={{alignItems: 'center'}}>
                <View style={[styles.balance, {backgroundColor: theme.menuBalance}]}>
                    <View style={{marginBottom: 10, flexDirection:'row'}} >
                        <FontAwesome5 name="money-check" size={18} color="white" />
                        <Text style={{fontSize: 18, marginLeft: 5, color: 'white', fontWeight:'semi-bold'}}>{i18n.t('foodbalance')}: <Text style={{fontWeight: 'bold', color: 'white'}}>{balance}</Text></Text>
                    </View>
                    <View style={{width: '80%', height:1, backgroundColor:'white'}}/>
                    <View style={{marginTop: 10,flexDirection:'row'}}>
                        <Feather name="clock" size={20} color="white" />
                        <Text style={{fontSize: 18, marginLeft: 5, color: 'white', fontWeight:'semi-bold'}}>{i18n.t('foodtime')}: <Text style={{fontWeight: 'bold', color:'white'}}>12:45-14:00</Text></Text>
                    </View>
                </View>

                <View style={[styles.foodmenu, {backgroundColor: isDarkMode === true ? '#1C3F5C': 'white'}]}>
                <Text style={{position:'absolute', top:21, fontSize:18, fontWeight:'medium', color: theme.color}}>{date}</Text>
                <View style={styles.foods}>
                   {/* { !shouldShow ? <View style={{alignItems:'center'}}><Text>{menuNo}</Text></View> : {foods}}  */}
                   {foods}
                </View>
                {/* <Text style={{position:'absolute', top:421, fontSize:28, fontWeight:'bold', color:'black'}}>Приятного аппетита!!!</Text> */}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        fontSize: 24,
        color: "white",
        fontWeight:"bold",
        paddingVertical: 12,
        marginTop: 50,
        marginLeft: 30
    },
    balance: {
        // height: 40,
        top: 15,
        width: windowWidth - 40,
        // height: 150,
        // flexDirection: 'row',
        padding: 15,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 15,
        
    },
    foodmenu: {
        width: '100%',
        height: windowHeight,
        top: 50,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:50
    },
    time: {
        width: 320,
        height: 50,
        backgroundColor:'#F2F2F2',
        position:'absolute',
        top: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent:'center'
    },
    foods: {
        width: windowWidth - 60,
        position: 'absolute', 
        top: 60
    }
})

export default FoodMenuScreen;