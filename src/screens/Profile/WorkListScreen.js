import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, LogBox, Dimensions, useWindowDimensions, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Button from '../../components/Button';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import qs from "qs"
import axios from "axios";
import { WaveIndicator } from 'react-native-indicators';
// import { Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';
import { getStatusBarHeight } from "react-native-status-bar-height"
import { Ionicons } from '@expo/vector-icons';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function WorkListScreen({navigation}){
  LogBox.ignoreLogs(['Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`'])
  LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.'])
  const [user, setUser] = useState([])
  const [year, setYear] = useState([])
  const [month, setMonth] = useState([])
  const [textMonth, setTextMonth] = useState([])
  const [list, setList] = useState([])
  const [nas, setNas] = useState([])
  const [uder, setUder] = useState([])
  const [shouldShow, setShouldShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false) 
  const [tableHead, setTableHead] = useState(['Начислено', 'Дни/Часы', 'Сумма', 'Удержано', 'Сумма'])
  const itog = ['Итого начислено:', ' ', list.nachisleno, 'Итого удержено:', list.uderzhano]
  const [response, setResponse] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    try{
      AsyncStorage.getItem('useriin')
       .then(value => {
        if(value != null){
          setUser(value)
        }
       })
      } catch(error) {
        console.log(error)
      }
  }

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

        if (month === '01'){setTextMonth('январь')}
        if (month === '02'){setTextMonth('февраль')}
        if (month === '03'){setTextMonth('март')}
        if (month === '04'){setTextMonth('апрель')}
        if (month === '05'){setTextMonth('май')}
        if (month === '06'){setTextMonth('июнь')}
        if (month === '07'){setTextMonth('июль')}
        if (month === '08'){setTextMonth('август')}
        if (month === '09'){setTextMonth('сентябрь')}
        if (month === '10'){setTextMonth('октябрь')}
        if (month === '11'){setTextMonth('ноябрь')}
        if (month === '12'){setTextMonth('декабрь')}

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
      <View  style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
          <WaveIndicator color="#D64D43"/>
      </View>
  )
}

    return(
      <View>
      {/* <Header>Расчетный листок</Header> */}
      {/* <View><Text style={styles.header}>Расчетный листок</Text></View> */}
      <View style={{flexDirection:'row',  marginTop:40, width: windowWidth-30, alignItems:'center', marginLeft: 15}}>
            <BackButton goBack = {navigation.goBack}/>
            <View style={{marginLeft: 15}}><Text style={{fontSize: 20, color: "#4D4D4D", fontWeight:"bold", paddingVertical: 12}}>Расчетный листок</Text></View>
      </View>



      <View style= {styles.page}>
        <View style={styles.pickerContainer}>
          <View style={styles.datePickers}>
            <View style={styles.yearPicker}>
              <RNPickerSelect
                  // value= '2022'
                  onValueChange={(value) => setYear(value)}
                    items={[
                        { label: '2023', value: '2023' },
                        { label: '2022', value: '2022' },
                        { label: '2021', value: '2021' },
                        { label: '2020', value: '2020' },
                        { label: '2019', value: '2019' },
                        { label: '2018', value: '2018' },
                        { label: '2017', value: '2017' },
                        { label: '2016', value: '2016' },
                        { label: '2015', value: '2015' },
                        { label: '2014', value: '2014' },
                        { label: '2013', value: '2013' },
                        { label: '2012', value: '2012' },
                        { label: '2011', value: '2011' },
                    ]}
                    placeholder={{
                      label: 'Год'
                  }}
                  style={{ ...pickerSelectStyles}}
                />
            </View>
            <View style={styles.monthPicker}>
              <RNPickerSelect
                  // value= '12'
                  onValueChange={(value) => setMonth(value)}
                  // disabled ={true}
                    items={[
                        { label: 'Январь', value: '01' },
                        { label: 'Февраль', value: '02' },
                        { label: 'Март', value: '03' },
                        { label: 'Апрель', value: '04' },
                        { label: 'Май', value: '05' },
                        { label: 'Июнь', value: '06' },
                        { label: 'Июль', value: '07' },
                        { label: 'Август', value: '08' },
                        { label: 'Сентябрь', value: '09' },
                        { label: 'Октябрь', value: '10' },
                        { label: 'Ноябрь', value: '11' },
                        { label: 'Декабрь', value: '12' },
                    ]}
                    placeholder={{
                      label: 'Месяц'
                  }}
                  style={{ ...pickerSelectStyles }}
                />
            </View>
          </View>
          <Button mode="contained" 
              onPress = {()=> {getPaper(user, year, month); setShouldShow()}}
              style={styles.submitBtn}
          >Сформировать</Button>  
        </View>
        

      {!shouldShow ? (
        
<View style={styles.paper}>
<View style={styles.container}>
      <Row data={[`Расчетный листок за ${textMonth} ${year} года`]}  textStyle={styles.paperHeader}/>
      <View style={styles.divider}></View>
      <Row data={[`Сальдо на начало: ${list.saldo_nach}`]}  textStyle={styles.saldo_nach} style = {styles.saldo_n}/>
      <View>
  </View>

        <Table borderStyle={{borderWidth: 1}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={nas.map((left) => left.rasch)} style={styles.title} heightArr={leftRepElem} textStyle={styles.textCol}/>
            <Col data={nas.map((left) => left.otrabotano)} style={styles.title} heightArr={leftRepElem} textStyle={styles.textCol}/>
            <Col data={nas.map((left) => left.summa)} style={styles.title} heightArr={leftRepElem} textStyle={styles.textCol}/>
            <Col data={uder.map((right) => right.rasch)} style={styles.title} heightArr={rightRepElem}  textStyle={styles.textCol}/>
            <Col data={uder.map((right) => right.summa)} style={styles.title} heightArr={rightRepElem}  textStyle={styles.textCol}/>
          </TableWrapper>
          <Row data={itog} style={styles.head} textStyle={styles.text}/>
        </Table>

        <Row data={[`Сальдо на конец периода: ${list.saldo_kon}`]}  textStyle={{textAlign: 'left', fontSize: 12}} style={{width:330, marginBottom: 2, marginTop: 5}}/>
        <Row data={[`Взносы ОСМС:`]}  textStyle={{textAlign: 'justify', fontSize: 12, color:'red', fontWeight: 'bold'}} style={{width:330, marginBottom: 2}}/>
        <Row data={[`С 1 января 2020 года работодатель, помимо уплаты отчислений, будет удерживать с дохода работника и оплачивать взносы работника в размере 2% от объекта исчисления`]}  textStyle={{textAlign: 'justify', fontSize: 12}} style={{width:330}}/>

      </View> 
      </View>
  ):
  <View style={{alignItems: 'center', marginTop: 10}}> 
  <View style={{width: 350, height: 100, backgroundColor: "white", justifyContent: 'center', borderRadius: 10}}>
    <Text style={{textAlign:'center', color: '#B3B3B3', fontSize: 16}}>Чтобы посмотреть расчетный листок выберите дату</Text>
    </View>
    </View>}
      </View>
      </View>
      
    )

    
}


const styles = StyleSheet.create({
  container: { paddingTop: 20, alignItems: 'center'},
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
    backgroundColor: 'white', 
    width: 350, 
    borderRadius:10
  },
  datePickers: { flexDirection:'row', marginTop: 10 },
  yearPicker: { width: 120, marginRight: 30 },
  monthPicker: { width: 120 },
  submitBtn: { width: 270, marginBottom: 30, borderRadius: 15 },
  paper : { width: 350, backgroundColor:'white', marginTop: 10, paddingBottom: 20, borderRadius: 15 },
  paperHeader: { textAlign: 'center', fontSize: 15, fontWeight:'bold', color:'green' },
  divider: {height: 1, width: 330, backgroundColor: 'green', marginBottom: 10, marginTop: 5},
  saldo_nach: {textAlign: 'left', fontSize: 12},
  saldo_n: {width:330, marginBottom: 5},
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
