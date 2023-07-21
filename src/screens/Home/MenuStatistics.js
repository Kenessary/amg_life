import { Text, View, Dimensions } from 'react-native'
import React, { Component, useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { WaveIndicator } from 'react-native-indicators';
import moment from 'moment';
import themeContext from '../../cores/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MenuStatistics(){

  
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

  const date = moment().format(`DD.MM.YYYY`)
  const dateClock = moment().format(`hh:mm:ss`)

  const [ stats, setStats ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)

  
  const menuStats = () => {
      setIsLoading(true)
      const config = {
        method:'get',
        url: `http://95.57.218.120//?apitest.helloAPIWithParams13={"iin":" "}`,
        headers: {  }
      }
      axios(config)
       .then(function(response){
        let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
        let parse_first = JSON.parse(info)
        let parse_second = JSON.parse(parse_first.response)
        setStats(parse_second)
        setIsLoading(false)
       })
       .catch(function (error) {
        console.log(error);
        setIsLoading(false)
       })
  } 

  useEffect(()=>{
    menuStats()
},[])

  
if(isLoading) {
  return(
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
    <WaveIndicator color={theme.loading}/>
  </View>
  )
}


    return (
        <View style={{height:'100%', backgroundColor:theme.background}}>
          <View style={{alignItems:'center', marginTop:15}}>
          <Text style={{fontSize:17, fontWeight:'600', color: theme.color}} >Результаты на дату</Text>
          <Text style={{fontSize:17, fontWeight:'600', color: theme.color, marginTop:5, marginBottom:5}} >{date}</Text>
          <View style={{height:1, width:130, backgroundColor: theme.color}}/>
          <Text style={{fontSize:17, fontWeight:'600', color: theme.color, marginTop:5}} >{dateClock}</Text>

          </View>
          


          <View style={{alignItems:"center", marginTop:10}}>

          <View style={{width:windowWidth-20,padding:15, flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{width:"30%"}}>
              <View style={{width:"100%", height:40, backgroundColor:'#41B21A', alignItems:'center', justifyContent:'center', borderTopLeftRadius:15, borderTopRightRadius:15}}>
                <Text style={{color:'white', fontSize:18, fontWeight:'700'}}>Да</Text>
              </View>
              <View style={{width:"100%", height:70, backgroundColor:'#F4F4F4', alignItems:'center', justifyContent:'center', borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
                <Text style={{color:'#4d4d4d', fontSize:28, fontWeight:'700'}}>{stats.da}</Text>
              </View>
            </View>

            <View style={{width:"30%"}}>
              <View style={{width:"100%", height:40, backgroundColor:'#D64D43', alignItems:'center', justifyContent:'center', borderTopLeftRadius:15, borderTopRightRadius:15}}>
                <Text style={{color:'white', fontSize:18, fontWeight:'700'}}>Нет</Text>
              </View>
              <View style={{width:"100%", height:70, backgroundColor:'#F4F4F4', alignItems:'center', justifyContent:'center', borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
                <Text style={{color:'#4d4d4d', fontSize:28, fontWeight:'700'}}>{stats.net}</Text>
              </View>
            </View>

            <View style={{width:"30%"}}>
              <View style={{width:"100%", height:40, backgroundColor:'grey', alignItems:'center', justifyContent:'center', borderTopLeftRadius:15, borderTopRightRadius:15}}>
                <Text style={{color:'white', fontSize:14, fontWeight:'700'}}>Не ответили</Text>
              </View>
              <View style={{width:"100%", height:70, backgroundColor:'#F4F4F4', alignItems:'center', justifyContent:'center', borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
                <Text style={{color:'#4d4d4d', fontSize:28, fontWeight:'700'}}>{stats.ne_otvetili}</Text>
              </View>
            </View>
          </View>

          <View style={{width:windowWidth-20,padding:15, flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{width:"100%"}}>
              <View style={{width:"100%", height:40, backgroundColor:'#2E89DC', alignItems:'center', justifyContent:'center', borderTopLeftRadius:15, borderTopRightRadius:15}}>
                <Text style={{color:'white', fontSize:18, fontWeight:'700'}}>Всего опрошено</Text>
              </View>
              <View style={{width:"100%", height:50, backgroundColor:'#F4F4F4', alignItems:'center', justifyContent:'center', borderBottomLeftRadius:15, borderBottomRightRadius:15}}>
                <Text style={{color:'#4d4d4d', fontSize:28, fontWeight:'700'}}>{stats.vsego_opros}</Text>
              </View>
            </View>
          </View>
          </View>
        
      </View>
    )
}