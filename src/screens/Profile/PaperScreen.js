import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, LogBox, Dimensions, useWindowDimensions, Image, FlatList,  VirtualizedList } from 'react-native';
// import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WaveIndicator } from 'react-native-indicators';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import qs from "qs"
import axios from "axios";
import { ScrollView } from 'react-native-virtualized-view';
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import themeContext from '../../cores/themeContext'



const windowWidth = Dimensions.get('window').width;
export default function PaperScreen({navigation}) {

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


  if(isDarkMode === true){
    DropDownPicker.setTheme("DARK")
  }else{
    DropDownPicker.setTheme('LIGHT')
  }

  let [locale, setLocale] = useState('');
  // let [isLoading, setIsLoading] = useState('')
  let [lang, setLang] = useState('')

  i18n.fallbacks = true
  i18n.translations = { kz, ru, ch };
  // i18n.locale = lang
  
    useEffect(()=>{
      getData1()
  })

  if(lang === 'ch'){
    i18n.locale = lang
  }

  if(lang === 'kz'){
    i18n.locale = lang
  }

  if(lang === 'ru'){
    i18n.locale = lang
  }

  
    // console.log(lang)


  
  
  const getData1 = () => { 
      try {
        // setIsLoading(true)
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


  
  const [userIin, setUserIin] = useState([])
  // console.log(userIin)
  const [openMonth, setOpenMonth] = useState(false);
  const [valueMonth, setValueMonth] = useState(null);
  const [itemsMonth, setItemsMonth] = useState([
    {label: i18n.t('january1'), value: 1},
    {label: i18n.t('february1'), value: 2},
    {label: i18n.t('march1'), value: 3},
    {label: i18n.t('april1'), value: 4},
    {label: i18n.t('may1'), value: 5},
    {label: i18n.t('june1'), value: 6},
    {label: i18n.t('july1'), value: 7},
    {label: i18n.t('august1'), value: 8},
    {label: i18n.t('september1'), value: 9},
    {label: i18n.t('october1'), value: 10},
    {label: i18n.t('november1'), value: 11},
    {label: i18n.t('december1'), value: 12},
  ]);
  const [openYear, setOpenYear] = useState(false);
  const [valueYear, setValueYear] = useState(null);
  const [itemsYear, setItemsYear] = useState([
    {label: '2026', value: 2026},
    {label: '2025', value: 2025},
    {label: '2024', value: 2024},
    {label: '2023', value: 2023},
    {label: '2022', value: 2022},
    {label: '2021', value: 2021},
    {label: '2020', value: 2020},
    {label: '2019', value: 2019},
    {label: '2018', value: 2018},
    {label: '2017', value: 2017},
    {label: '2016', value: 2016},
    {label: '2015', value: 2015},
    {label: '2014', value: 2014},
    {label: '2013', value: 2013},
    {label: '2012', value: 2012},
    {label: '2011', value: 2011},
  ]);
  const [textMonth, setTextMonth] = useState([])
  const [list, setList] = useState([])
  const [nas, setNas] = useState([])
  const [nasFull, setNasFull] = useState([])
  const [uder, setUder] = useState([])
  const [shouldShow, setShouldShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false) 
  const [tableHead, setTableHead] = useState([i18n.t('nasch'), i18n.t('dni'), i18n.t('summa'), i18n.t('uder'), i18n.t('summa')])
  const itog = [i18n.t('itogNas'), ' ', list.nachisleno, i18n.t('itogUder'), list.uderzhano]
  const [response, setResponse] = useState([])

  

  useEffect(() => {
    getData()
    const today = new Date();
    const dd = String(today.getDate())
    const mm = String(today.getMonth() + 1)
    // console.log(JSON.parse(mm) === 1)
    const yyyy = today.getFullYear()
    const dayNumber = JSON.parse(dd)
    const monthNumber =JSON.parse(mm) 
    const yearNumber = JSON.parse(yyyy)

    if(monthNumber === 1 && dayNumber < 10){
      setValueMonth(12)
      setValueYear(yearNumber-1)
    }
    if(monthNumber === 1 && dayNumber === 10){
      setValueMonth(monthNumber)
      setValueYear(yearNumber)
    }
    if(monthNumber === 1 && dayNumber > 10){
      setValueMonth(monthNumber)
      setValueYear(yearNumber)
    }
    if(monthNumber !== 1 && dayNumber > 10){
      setValueMonth(monthNumber-1)
      setValueYear(yearNumber)
    }
    if(monthNumber !== 1 && dayNumber <= 10){
      setValueMonth(monthNumber-1)
      setValueYear(yearNumber)
    }
  }, [])

  const getData = () => {
    try{
      AsyncStorage.getItem('useriin')
       .then(value => {
        if(value != null){
          setUserIin(value)
        }
       })
      } catch(error) {
        console.log(error)
      }
  }

  // console.log(iin)

  const getPaper = (iin, god, mes) => {
    setIsLoading(true)
    const data = qs.stringify({
        'iin': iin,
        'god': god,
        'mes': mes,
    })
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
        let userList = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
        let parsedUserList = JSON.parse(userList)
        setList(parsedUserList)
        let nachislenia = parsedUserList.nachislenia
        let uderzhania = parsedUserList.uderzhania
        setNas(nachislenia)
        setUder(uderzhania)

        if (valueMonth === 1){setTextMonth(i18n.t('january'))}
        if (valueMonth === 2){setTextMonth(i18n.t('february'))}
        if (valueMonth === 3){setTextMonth(i18n.t('march'))}
        if (valueMonth === 4){setTextMonth(i18n.t('april'))}
        if (valueMonth === 5){setTextMonth(i18n.t('may'))}
        if (valueMonth === 6){setTextMonth(i18n.t('june'))}
        if (valueMonth === 7){setTextMonth(i18n.t('july'))}
        if (valueMonth === 8){setTextMonth(i18n.t('august'))}
        if (valueMonth === 9){setTextMonth(i18n.t('september'))}
        if (valueMonth === 10){setTextMonth(i18n.t('october'))}
        if (valueMonth === 11){setTextMonth(i18n.t('november'))}
        if (valueMonth === 12){setTextMonth(i18n.t('december'))}

        setIsLoading(false)
    })
    .catch(function(error){
        console.log(error)
        setIsLoading(false)
    })  
}
const leftRepElem = Array(list.levcount).fill(28)
const rightRepElem = Array(list.pravcount).fill(28)


  if(isLoading) {
    return(
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
      <WaveIndicator color={theme.loading}/>
    </View>
    )
  }

  const tableHeader = (a) => (
    <View>
      <View>
      </View>
    
      <View style={[styles.tableHeader, {backgroundColor: isDarkMode === true ? "#1C3F5C" : "#EAE9E9"}]}>
        <View 
            style={styles.columnHeader1} >
            <Text style={[styles.columnHeaderTxt,{color:theme.color}]}>
                {i18n.t('nasch')}
            </Text>   
        </View>
        <View
            style={styles.columnHeader2} >
            <Text style={[styles.columnHeaderTxt,{color:theme.color}]}>
                {i18n.t('dni')}
            </Text> 
        </View>
        <View
            style={styles.columnHeader3} >
            <Text style={[styles.columnHeaderTxt,{color:theme.color}]}>
                {i18n.t('summa')}
            </Text>
        </View>
    </View>
    </View>
    )

    const tableHeaderUder = (a) => (
      <View>
        <View>
        </View>
      
      <View style={[styles.tableHeader, {backgroundColor: isDarkMode === true ? "#1C3F5C" : "#EAE9E9"}]}>
          <View 
              style={styles.columnHeader4} >
              <Text style={[styles.columnHeaderTxt,{color:theme.color}]}>
                  {i18n.t('uder')}
              </Text>   
          </View>
          <View 
              style={styles.columnHeader5} >
              <Text style={[styles.columnHeaderTxt,{color:theme.color}]}>
                  {i18n.t('summa')}
              </Text> 
          </View>
      </View>
      </View>
      )
      
      const tableHeaderItog = (a) => (
        <View>
          <View>
          </View>
        
        <View style={[styles.tableHeader,{ backgroundColor: isDarkMode === true ? "#1C3F5C" : "#EAE9E9"}]}>
            <View 
                style={styles.columnHeader6} >
                <Text style={[styles.columnHeaderTxt,{color:theme.color}]}>
                    {itog[0]}
                </Text>   
            </View>
            <View 
                style={styles.columnHeader7} >
                <Text style={[styles.columnHeaderTxt,{color:theme.color}]}>
                    {itog[1]}
                </Text> 
            </View>
            <View 
                style={styles.columnHeader8} >
                <Text style={[styles.columnHeaderTxt,{color:theme.color}]}>
                    {itog[2]}
                </Text> 
            </View>
            <View 
                style={styles.columnHeader9} >
                <Text style={[styles.columnHeaderTxt,{color:theme.color}]}>
                    {itog[3]}
                </Text> 
            </View>
            <View 
                style={styles.columnHeader10} >
                <Text style={[styles.columnHeaderTxt,{color:theme.color}]}>
                    {itog[4]}
                </Text> 
            </View>
        </View>
        </View>
        )
     

  return (
    <View style={{backgroundColor: theme.background}}>
      <ScrollView  style={{height:'100%', marginBottom:100}} showsVerticalScrollIndicator={false}>
      {/* <View style={{flexDirection:'row',  marginTop:40, width: windowWidth-30, alignItems:'center', marginLeft: 15}}>
        <BackButton goBack = {navigation.goBack}/>
        <View style={{marginLeft: 15}}>
          <Text style={{fontSize: 20, color: "#4D4D4D", fontWeight:"bold", paddingVertical: 12}}>
            Расчетный листок
          </Text>
        </View>
      </View> */}
      {/* <ScrollView> */}

      <View style= {styles.page}>
        <View style={[styles.pickerContainer, {backgroundColor: isDarkMode === true ? "#191E2D" : "white"}]}>
          <View style={styles.datePickers}>
            <View style={styles.yearPicker}>
              <DropDownPicker
                open={openMonth}
                value={valueMonth}
                items={itemsMonth}
                setOpen={setOpenMonth}
                setValue={setValueMonth}
                setItems={setItemsMonth}
                labelStyle={{color:theme.color}}
                style={{width: 120, borderWidth:0.5,borderColor:'#4d4d4d', backgroundColor: theme.background}}
                containerStyle={{width: 120, borderRadius: 0}}
                badgeSeparatorStyle = {{borderWidth:2}}
                itemSeparator={true}
                itemSeparatorStyle={{width: windowWidth, marginLeft: 5, opacity: 0.1}}
                placeholder="Месяц"
                searchable={false}
                modalTitle={i18n.t('chooseMonth')}
                modalAnimationType="slide"
                listMode="MODAL"
                modalContentContainerStyle={{
                  backgroundColor: theme.background,
                }}
                modalTitleStyle={
                  {
                    fontWeight:'bold',
                    color: theme.color
                  }
                }
              />
            </View>
            <View style={styles.monthPicker}>          
              <DropDownPicker
                open={openYear}
                value={valueYear}
                items={itemsYear}
                setOpen={setOpenYear}
                setValue={setValueYear}
                setItems={setItemsYear}
                labelStyle={{color:theme.color}}
                style={{width: 120, borderWidth:0.5,borderColor:'#4d4d4d', backgroundColor: theme.background}}
                containerStyle={{width: 120, borderRadius: 0}}
                dropDownContainerStyle={{width: 120, borderWidth:0,}}
                badgeSeparatorStyle = {{borderWidth:2}}
                itemSeparator={true}
                itemSeparatorStyle={{width: windowWidth, marginLeft: 5, opacity: 0.1}}
                placeholder="Год"
                searchable={false}
                modalTitle={i18n.t('chooseYear')}
                modalAnimationType="slide"
                listMode="MODAL"
                modalContentContainerStyle={{
                  backgroundColor: theme.background,
                }}
                modalTitleStyle={
                  {
                    fontWeight:'bold',
                    color:theme.color
                  }
                }
              />

            </View>
          </View> 

          <TouchableOpacity
            style={{width: windowWidth-100, height:50, backgroundColor: isDarkMode ? "#C0D5EE" :  '#D64D43', borderRadius:15, alignItems:'center', justifyContent:'center', marginTop:20, marginBottom:20}}
            onPress = {()=> {getPaper(userIin, valueYear, valueMonth); setShouldShow()}}
          >
            <Text style={{fontSize: 16, color:theme.background, fontWeight:'700'}}>{i18n.t('loadPaper')}</Text>
          </TouchableOpacity>
        </View>
        

      {!shouldShow ? (
        
        
<View style={[styles.paper, {backgroundColor: isDarkMode === true ? "#191E2D" : "white"}]}>
  
<View style={styles.container}>
      <Text style={[styles.paperHeader, {color: isDarkMode === true ? 'white' : "green"}]}>{i18n.t('paperTitle')} {textMonth} {valueYear} {i18n.t('paperYear')}</Text>
      <View style={[styles.divider, {backgroundColor: isDarkMode === true ? "white" : "green" }]}></View>
      {/* <ScrollView  style={{height:'100%'}} showsVerticalScrollIndicator={false}> */}
      <Text style={{textAlign: 'left', fontSize: 12, width: windowWidth-20, marginBottom: 5, marginLeft: 10, color:theme.color}}>{i18n.t('saldoBas')} {list.saldo_nach}</Text>
 


        <View style={{flexDirection: 'row', width: "100%"}}>
                <FlatList 
                  data={nas}
                  listKey={1}
                  style={{width:"60%"}}
                  keyExtractor={(item, index) => index+""}
                  ListHeaderComponent={tableHeader}
                  // showsVerticalScrollIndicator={false}
                  stickyHeaderIndices={[0]}
                  // nestedScrollEnabled={false}
                  horizontal={false}
                  scrollEnabled={false}
                  renderItem={({item, index})=> {
                    // console.log(item.timein)
                    return (
                      <View style={{...styles.tableRow, backgroundColor: isDarkMode === true ? "#191E2D" : "white"}}>
                        <Text style={{...styles.columnRowTxt1, color: theme.color}}>{item.rasch}</Text>
                        <Text style={{...styles.columnRowTxt2,color: theme.color}}>{item.otrabotano}</Text>
                        <Text style={{...styles.columnRowTxt3,color: theme.color}}>{item.summa}</Text>
                      </View>
                    )}}
                />

<FlatList 
                  data={uder}
                  style={{width:"40%"}}
                  listKey={2}
                  keyExtractor={(item, index) => index+""}
                  ListHeaderComponent={tableHeaderUder}
                  // showsVerticalScrollIndicator={false}
                  stickyHeaderIndices={[0]}
                  // nestedScrollEnabled={false}
                  horizontal={false}
                  scrollEnabled={false}
                  renderItem={({item, index})=> {
                    // console.log(item.timein)
                    return (
                      <View style={{...styles.tableRow, backgroundColor: isDarkMode === true ? "#191E2D" : "white"}}>
                        <Text style={{...styles.columnRowTxt4, color: theme.color}}>{item.rasch}</Text>
                        <Text style={{...styles.columnRowTxt5, color: theme.color}}>{item.summa}</Text>
                      </View>
                    )}}
                />
        </View>

        <FlatList 
                  // data={{}}
                  style={{width:"100%"}}
                  keyExtractor={(item, index) => index+""}
                  ListHeaderComponent={tableHeaderItog}
                  // showsVerticalScrollIndicator={false}
                  stickyHeaderIndices={[0]}
                  // nestedScrollEnabled={false}
                  horizontal={false}
                  scrollEnabled={false}
                />

        <Text style={{textAlign: 'left', fontSize: 12,width: windowWidth-20, marginBottom: 2, marginTop: 5, marginLeft: 10, color:theme.color}}>
        {i18n.t('saldoAiak')} {list.saldo_kon}
        </Text>
        <Text style={{textAlign: 'left', fontSize: 12,width: windowWidth-20, marginBottom: 5, marginTop: 5, marginLeft: 10, color:theme.color}}>
        {i18n.t('chisla10')}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 12, color: isDarkMode === true ? "white" :'red', fontWeight: 'bold',width: windowWidth-20, marginBottom: 2, marginLeft: 10}}>
        {i18n.t('osms')}
        </Text>
        <Text style={{textAlign: 'justify', fontSize: 12, width: windowWidth-20, marginLeft: 10, color:theme.color}}>
        {i18n.t('footerText')}
        </Text>
        <View style={{marginBottom:30}}/>

      {/* </ScrollView> */}
      {/* </ScrollView> */}
      </View> 
      </View>

      
     
      
  ):
  <View style={{alignItems: 'center', marginTop: 10}}> 
  <View style={{width: windowWidth-20, height: 100,backgroundColor: isDarkMode === true ? "#191E2D" : "white", justifyContent: 'center', borderRadius: 10}}>
    <Text style={{textAlign:'center', color: '#B3B3B3', fontSize: 16}}>{i18n.t('paperWarning')}</Text>
    </View>
    </View>}
      </View>

      {/* </ScrollView> */}


      </ScrollView>
    
    </View>
  );
}


const styles = StyleSheet.create({
  container: { paddingTop: 20, alignItems: 'center',},
  head: {  height: 30},
  wrapper: { flexDirection: 'row', width: 330},
  titleRasch: { flex: 1,},
  row: {  height: 28  },
  text: { textAlign: 'center', fontSize: 10, fontWeight:'bold'},
  textCol: { textAlign: 'center', fontSize: 10},
  page: { alignItems:'center' },
  pickerContainer: {
    alignItems:'center', 
    marginTop: 10,
    width: windowWidth-20,
    // borderColor:'#E4E4E4',
    borderRadius:10
  },
  datePickers: { flexDirection:'row', marginTop: 10 },
  yearPicker: { width: 120, marginRight: 30 },
  monthPicker: { width: 120 },
  submitBtn: { width: 270, marginBottom: 15, borderRadius: 15 },
  paper : { width: windowWidth-10, paddingBottom: 20, borderRadius: 15, marginTop:10 },
  paperHeader: {width: windowWidth-10, textAlign: 'center', fontSize: 15, fontWeight:'bold'},
  divider: {height: 1, width: windowWidth-30, marginBottom: 10, marginTop: 5},
  saldo_nach: {textAlign: 'left', fontSize: 12},
  saldo_n: {width: windowWidth-20, marginBottom: 5, marginLeft: 10},
  header:{
    fontSize: 23,
    color: "#4D4D4D",
    fontWeight:"bold",
    paddingVertical: 12,
    // marginTop: 50,
    // width: windowWidth
  },
  image:{
    width: 18,
    height: 18,
    color: '#555555'
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
  height: 35,
  // borderWidth:1,
},
headerText:{
  alignItems:'center',
  justifyContent:'center',
  fontSize: 18,
  marginBottom: 10
},
tableRow: {
  flexDirection: "row",
  height: 32,
  border:1,
},
'tableRow:last-child': {
  borderBottomEndRadius: 10,
  borderBottomStartRadius: 10,
},
columnHeader1: {
  width: "38.5%",
  justifyContent: "center",
  alignItems:"center"
},
columnHeader2: {
  width: "28%",
  justifyContent: "center",
  alignItems:"center"
},
columnHeader3: {
  width: "33.5%",
  justifyContent: "center",
  alignItems:"center"
},
columnHeader4: {
  width: "60%",
  justifyContent: "center",
  alignItems:"center"
},
columnHeader5: {
  width: "40%",
  justifyContent: "center",
  alignItems:"center"
},
columnHeader6: {
  width: "25%",
  justifyContent: "center",
  alignItems:"center"
},
columnHeader7: {
  width: "15%",
  justifyContent: "center",
  alignItems:"center"
},
columnHeader8: {
  width: "20%",
  justifyContent: "center",
  alignItems:"center"
},
columnHeader9: {
  width: "22%",
  justifyContent: "center",
  alignItems:"center"
},
columnHeader10: {
  width: "18%",
  justifyContent: "center",
  alignItems:"center"
},
columnHeaderTxt: {
  fontWeight:'bold',
  fontSize: 11,
},
columnRowTxt1: {
  textAlign:"center",
  // backgroundColor: 'grey',
  width: "38.5%",
  fontSize: 10,
},
columnRowTxt2: {
  textAlign:"center",
  width: "28%",
  fontSize: 10,
  height:50
},
columnRowTxt3: {
  textAlign:"center",
  width: "33.5%",
  fontSize: 10,
},
columnRowTxt4: {
  textAlign:"center",
  width: "60%",
  fontSize: 10,
},
columnRowTxt5: {
  textAlign:"center",
  width: "40%",
  fontSize: 10,
},
columnRowTxtRoom: {
  textAlign:"center",
  fontSize: 10,
  // width:40,
  width: "25%",
  color: 'black'
}

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      marginTop: 10,
      fontSize: 16,
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      borderWidth: 1,
      borderColor: '#B3B3B3',
      borderRadius: 15,
      backgroundColor: 'white',
      color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 0,
    borderColor: 'gray',
    borderRadius: 15,
    backgroundColor: 'white',
    color: 'black',
},
});


