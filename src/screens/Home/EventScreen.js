import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React,{ useContext, useEffect, useState } from 'react'
import { WaveIndicator } from 'react-native-indicators';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { kz, ru, ch } from '../../languages/localizations';
import i18n from 'i18n-js'
import axios from 'axios';

import LottieView from "lottie-react-native"
import themeContext from '../../cores/themeContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EventsScreen ({navigation}) {

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
  let [year, setYear] = useState('2023')
  // let [year1, setYear1] = useState('2023')
  let [uniqueYear, setUniqueYear] = useState('')
  // console.log(uniqueYear)

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
      getData18()
  })

  const getData18 = () => {
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


    const [ event, setEvent ] = useState([])
    const [ link, setLink ] = useState([])
    const [asynEvent, setAsyncEvent] = useState([])
    const [ docName, setDocName ] = useState([])
    const [ docDate, setDocDate ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

    // console.log(event)

    let event2023 = event.filter(function(value) { return (value.data_vv).slice(0,4) == year})

    globalThis.link = link

    useEffect(()=>{
        setIsLoading(true)
        const config = {
            method: 'post',
            url: 'http://95.57.218.120/?apitest.helloAPI3={}',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          };
        axios(config)
         .then(function(response){
            const info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '').replace(/---/g, '')
            const parsed = (JSON.parse(info)).response
            const parsed1 = JSON.parse(parsed)
            let newArray = parsed1.map((list)=>{
                return {id:list.id, data_vv: ((list.data_vv).split(' 00')[0]).split(' ')[0], nazvanie: list.nazvanie, ssilka: list.ssilka}
            })

            setEvent(newArray)
            const yr = []
            const yearWithMonth = newArray.map(uq=> uq.data_vv)

            for(let i=0; i< yearWithMonth.length; i++){
              const yEach = yearWithMonth[i].slice(0,4)
              // console.log(yEach)
              yr.push(yEach)
            }
            const unique = yr.filter((item, i, ar) => ar.indexOf(item) === i)
            setUniqueYear(unique)

           setIsLoading(false)
         })
         .catch(function (error) {
          console.log(error);
          setIsLoading(false)
         })
      },[])
      // console.log(event)

      // console.log(event)
      useEffect(()=>{
        getData1()
    }, [])

    // console.log(JSON.parse(asynEvent))

      const getData1 = () => {
        try {
            AsyncStorage.getItem('events')
                .then(value => {
                    if(value != null){
                        setAsyncEvent(value)
                    }
                })
        } catch(error){
            console.log(error)
        }
    }



      if(isLoading) {
        return(
          <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
          <WaveIndicator color={theme.loading}/>
        </View>
        )
      }



    const events = []
    for (let i=0; i < event2023.length; i++){
      // setLink(event[i].ssilka)
      // console.log((event[i].data_vv).slice(0,4) === '2023')
      events.push(
<TouchableOpacity key={i} style={{ marginBottom: 15}} onPress = {() => {navigation.navigate('EventPdfScreen'); setLink(event2023[i].ssilka)}}>
{/* <View style={{flexDirection:'row', width: windowWidth-20, marginTop: 0,justifyContent:'space-between',backgroundColor: "white", paddingLeft: 15, paddingRight:15, paddingTop:15, borderTopLeftRadius:15, borderTopRightRadius: 15 }}>
   </View> */}
     <View style={{ width: windowWidth-20, marginBottom:0, backgroundColor:theme.bottomNavigationColor, alignItems:'center', padding: 15, borderTopLeftRadius:15, borderTopRightRadius: 15}}>
   <View style={{width:windowWidth-20, paddingLeft:15, paddingRight:15}}>
       <Text style={{color: theme.color, fontSize:15,textAlign:'left'}}>
       {(event2023[i]).nazvanie}
       </Text>
   </View>
 </View>
 <View style={{flexDirection:'row', width: windowWidth-20, marginTop: 0,justifyContent:'flex-end',backgroundColor:theme.bottomNavigationColor, paddingLeft: 15, paddingRight:15, paddingBottom:15, borderBottomEndRadius: 15, borderBottomStartRadius:15 }}>
     <View style={{backgroundColor:theme.dateBack, width: 90, alignItems:'center',justifyContent:'center', borderRadius: 5,}} >
         <Text style={{color: '#4D4D4D', fontSize:14, color:'white'}}>
        {((event2023[i]).data_vv).split('-')[2]}.
        {((event2023[i]).data_vv).split('-')[1]}.
        {((event2023[i]).data_vv).split('-')[0]}
         </Text>
     </View>
     <View>

     </View>
   </View>
</TouchableOpacity>
      )
    }



    const yearArray = []

    for(let i = 0; i<uniqueYear.length; i++){
      yearArray.push(
        <TouchableOpacity key={i} style={[year === `${uniqueYear[i]}` ? [styles.selectedYear,{backgroundColor:theme.yearBack, borderColor: theme.yearBorder}] : [styles.year,{backgroundColor:theme.yearBack}]]} onPress = {() => setYear(`${uniqueYear[i]}`)}>
        <Text style={{color: theme.color}}>{uniqueYear[i]}</Text>
      </TouchableOpacity>
      )
    }


    return (
      <View style={[styles.container, {backgroundColor: isDarkMode === true ? '#262C38' : '#F2F2F2'}]} >

<View style={{flexDirection:'row',  marginTop:0, width: windowWidth-30, alignItems:'center', marginLeft: 15}}>
      </View>


      <View style={{alignItems:'center'}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
      <View style={{ height:50, alignItems:'center', flexDirection:'row'}}>
      {yearArray}

         </View>

        </ScrollView>

      </View>



      <ScrollView  style={{ width: "100%", height: '100%'}} fadingEdgeLength={0} >
        <View style={{alignItems:'center'}}>

{events}
<View style={{marginBottom:80}}/>


        </View>
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
  yearFirst: {
    width:60,
    height:30,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:10,
    marginRight:10,
    borderRadius:10,
  },
  selectedYearFirst:{
    width:60,
    height:30,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:10,
    marginRight:10,
    borderRadius:10,
    borderColor:'tomato',
    borderWidth: 2
  },

  year: {
    width:60,
    height:30,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:5,
    marginRight:5,
    borderRadius:10,
  },
  selectedYear:{
    width:60,
    height:30,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:5,
    marginRight:5,
    borderRadius:10,
    borderWidth: 2
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
    backgroundColor:'white',
    height:"100%",
    width:'100%'

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