import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, LogBox, Dimensions, Linking } from 'react-native';
// import { Divider, select } from "@react-native-material/core"
import _ from "lodash"
import axios from 'axios';
import moment from 'moment';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
} from 'react-native-indicators';
import { AuthContext } from '../../context/AuthContext';
import { WaveIndicator } from 'react-native-indicators';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import { Entypo } from '@expo/vector-icons';
import themeContext from '../../cores/themeContext';




export default function InfoDeparment({navigation}) {
  
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
    const {iin} = useContext(AuthContext)

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
  // LogBox.ignoreLogs(['[SyntaxError: JSON Parse error: Unrecognized token '/']'])
  let id = ''
  for (let i=0; i<=(globalThis.a).length; i++){
      if ( (globalThis.a)[i].descr === globalThis.s){
        // break
         let t = (globalThis.a)[i].id
         id = t
         break
    }
   }
  // console.log(id)

        //  console.log(globalThis.a)
  const [isLoading, setIsLoading] = useState(true)
  const [ workers, setWorkers ] = useState([])
  const [ department, setDepartment ] = useState([]) 
  // const {isLoading} = useContext(AuthContext)
  
  // console.log(workers.map((a)=> a.timereceive))
  const [ columns, setColumns ] = useState([
    "ФИО",
    "Должность",
    "Кабинет",
    "Телефон",
    "Факс",
    "Сотовый",
    "E-mail",
  ])

  const depsId = department.map((list)=>(list.id))
  globalThis.id = depsId
  // console.log(globalThis.id)

  
  useEffect(()=>{
    // setIsLoading(true)
  const config = {
    method:'get',
    url: `http://95.57.218.120/?apitest.helloAPIWithParams2222={"id":"${ iin ==='111111111111'? 182 : globalThis.id}"}`,
    headers: {  }
  }
  axios(config)
   .then(function(response){
    let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
    let parse_first = JSON.parse(info)
    let parse_second = JSON.parse(parse_first.response)
    let parse_third = parse_second.list
    // console.log(parse_third)
    let newArray = parse_third.map((list)=>{
      return {
        roditel : list.roditel,
        id: list.id, 
        fio: list.fio,
        doljnost: list.doljnost,
        cabinet: list.cabinet,
        raboch_tel: list.raboch_tel,
        sot_tel: list.sot_tel,
        email: list.email,
        // fax: list.fax,
        timein: list.timein,
        timeout: list.timeout,
        timereceive: list.timereceive
    }
    })
      setWorkers(newArray)
      // setIsLoading(false)
      // console.log(parse_third)
   })
   .catch(function (error) {
    console.log(error);
    // setIsLoading(false)
   })
  })

  useEffect(()=>{
    // setIsLoading(true)
    const config = {
      method:'get',
      url: `http://95.57.218.120/?apitest.helloAPIWithParams3333={"id":"${iin === '111111111111'? 179 : id}"}`,
      headers: {  }
    }
    axios(config)
     .then(function(response){
      let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
      let parse_first = JSON.parse(info)
      let parse_second = JSON.parse(parse_first.response)
      let parse_third = parse_second.list
      // console.log(parse_third)
      let newArray = parse_third.map((list)=>{
        return {id: list.id, name: list.name, roditel: list.roditel, prioritet: list.prioritet}
      })

      // const filteredData = newArray.filter(item => item.roditel === id);

      // // console.log(newArray)
        setDepartment(newArray)

   
        setIsLoading(false)

     })
     .catch(function (error) {
      console.log(error);
      setIsLoading(false)
     })
  },[])

  // useEffect(()=>{
  //   // setIsLoading(true)
  //   const config = {
  //     method:'get',
  //     url: `http://95.57.218.120/?apitest.helloAPIWithParams4444={"id":"${iin === '111111111111'? 179 : id}"}`,
  //     headers: {  }
  //   }
  //   axios(config)
  //    .then(function(response){
  //     let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
  //     let parse_first = JSON.parse(info)
  //     let parse_second = JSON.parse(parse_first.response)
  //     let parse_third = parse_second.list
  //     // console.log(parse_third)
  //     let newArray = parse_third.map((list)=>{
  //       return {id: list.id, name: list.name, roditel: list.roditel, prioritet: list.prioritet, children: list.children}
  //     })

  //     let chldrn = newArray[0].children
  //     let newArrayChld = chldrn.map((list)=> {
  //       return {id: list.id, name: list.name, prioritet: list.prioritet, roditel: list.roditel}
  //     })

  //     console.log(newArrayChld.length === 0)




   
  //       setIsLoading(false)

  //    })
  //    .catch(function (error) {
  //     console.log(error);
  //     setIsLoading(false)
  //    })
  // },[])
  
  useEffect(()=>{
    console.log(date)
  },[])
  // console.log(department === [])
  
   


// console.log(workers)

  // console.log(department)

  const date = moment().format('"YYYY-MM-DD 00:00:00"')


  // console.log("2023-01-14 09:29:51" > "2023-01-14 17:57:31")


  // if( workers === null && department === '') {
  //   return(
  //       <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:'white'}}>
  //           <WaveIndicator color="#D64D43"/>
  //       </View>
  //   )
  // }
  
  const tableHeader = (a) => (
  <View>
    <View>
    </View>
  
  <View style={[styles.tableHeader ,{backgroundColor: theme.tableHeaderBack}]}>
      <TouchableOpacity 
          style={styles.columnHeader} >
          <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
              {i18n.t('fioImia')}
          </Text>   
      </TouchableOpacity>
      <TouchableOpacity 
          style={styles.columnHeader} >
          <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
            {i18n.t('doljnost')}
          </Text> 
      </TouchableOpacity>
      <TouchableOpacity 
          style={styles.columnHeader} >
          <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
          {i18n.t('telphoneNum')}
          </Text>
          <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
          {i18n.t('cabinet')}
          </Text>  
      </TouchableOpacity>
      <TouchableOpacity 
          style={styles.columnHeader} >
          <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
          {i18n.t('sotovi')}
          </Text>
          <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
          {i18n.t('pochta')}
          </Text>  
      </TouchableOpacity>
  </View>
  </View>
  )

  let depr = []

  for ( let i = 0; i < department.length; i++){
    const a = department[i].id
      depr.push(
          <View key={i} style={styles.container}>
            <ScrollView nestedScrollEnabled={true}>
            <ScrollView  horizontal={true} style={{ width: "100%" }}>
              <View >
                <FlatList
                  data={department.filter(x => x.id === a )}
                  renderItem={({item}) => <Text style={{color:theme.color}}>{item.name}</Text>}
                  scrollEnabled={false}
                  style= {[styles.title]}
                />
              <View style={styles.container1}>
                <FlatList 
                  data={workers.filter(x => x.roditel === a )}
                  style={{width: windowWidth-20}}
                  // keyExtractor={(item, index) => index+""}
                  ListHeaderComponent={tableHeader}
                  // showsVerticalScrollIndicator={false}
                  stickyHeaderIndices={[0]}
                  // nestedScrollEnabled={false}
                  horizontal={false}
                  scrollEnabled={false}
                  renderItem={({item, index})=> {
                    // console.log(item.timein)
                    return (
                      <View style={{...styles.tableRow, backgroundColor:  isDarkMode === true ? index % 2 == 1 ? "#191E2D" : "#262C38" :  index % 2 == 1 ? "#F0EFEF" : "white" }}>
                        <Text style={{...styles.columnRowTxt, fontWeight:"bold", color: theme.color}}>{item.fio}</Text>
                        <Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.doljnost}</Text>
                        <Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.raboch_tel}{"\n"}<Text style={{...styles.columnRowTxtRoom, backgroundColor: item.timein>JSON.parse(date) && item.timein >item.timeout ? theme.green : "", color: isDarkMode === true ? 'white' : 'black' }}>{item.cabinet}</Text></Text>
                        <Text style={[styles.columnRowTxt, {color: theme.color}]}>
                          <TouchableOpacity onPress={()=> Linking.openURL(`tel:${'8'+Number(String(item.sot_tel).slice(1))}`)} style={{alignItems:'center'}}>
                        <Text style={{color:'#187D07', fontSize:11, marginTop:5,fontWeight:'600',textAlign:'center'}}>{item.sot_tel}</Text>
                    </TouchableOpacity>{"\n"}<Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.email}</Text></Text>
                      </View>
                    )}}
                />
              </View>
              </View> 
            </ScrollView>  

            </ScrollView>
          </View>
        ) 
  }

  if(workers.length === 0) {
    return(
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
      <WaveIndicator color={theme.loading}/>
    </View>
    )
}



  return(

    <View style={{flex:1,backgroundColor: isDarkMode === true ? '#262C38' : '#F2F2F2'}}>
      {/* <BackButton  goBack = {navigation.goBack}/>
      <Header>{globalThis.s}</Header> */}

      <View style={{flexDirection:'row', width: windowWidth-30, alignItems:'center', marginLeft: 15}}>
            <View><Text style={{fontSize: 20, color: theme.color, fontWeight:"bold", paddingVertical: 12}}>{globalThis.s}</Text></View>
      </View>
      <ScrollView nestedScrollEnabled={true} style={{ width: "100%"}} >
        {depr} 
        <View style={{marginBottom:80}}/>
      </ScrollView>
    </View>)
}

const styles = StyleSheet.create({
  container: {
  },
  container1: {
    marginLeft: 10
  },
  title:{
    marginTop:10,
    marginBottom: 10,
    marginLeft: 20

  },

  tableHeader: {
    flexDirection: "row",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
  },
  headerText:{
    alignItems:'center',
    justifyContent:'center',
    fontSize: 18,
    marginBottom: 10
  },
  tableRow: {
    flexDirection: "row",
    height: 60,
    border:1,
  },
  'tableRow:last-child': {
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  columnHeader: {
    width: "25%",
    justifyContent: "center",
    alignItems:"center"
  },
  columnHeaderTxt: {
    color: "black",
    fontWeight: "bold",
    fontSize: 10,
  },
  columnRowTxt: {
    textAlign:"center",
    width: "25%",
    fontSize: 10,
  },
  columnRowTxtRoom: {
    textAlign:"center",
    fontSize: 11,
    fontWeight:'600',
    // width:40,
    width: "25%",
    color: 'black',
  }
});