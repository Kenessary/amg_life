import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, SafeAreaView, TextInput, FlatList, TouchableOpacity, Dimensions, Alert } from "react-native";
import { SelectList } from "react-native-dropdown-select-list"
import axios from "axios";
import Button from "../../components/Button";
// import TextInput from "../components/TextInput";
import { FontAwesome5 } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'

import { Ionicons } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
import { WaveIndicator } from 'react-native-indicators';
import BackButton from "../../components/BackButton";
import { Entypo } from '@expo/vector-icons';

import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import themeContext from "../../cores/themeContext";



export default function InfoguideScreen({navigation}){

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

    const [selected, setSelected] = useState([])
    const [search, setSearch] = useState([])
    const [text , setText] = useState([])
    const [shouldShow, setShouldShow] = useState(true);
    const [ columns, setColumns ] = useState([
        "ФИО",
        "Должность",
        "Кабинет",
        "Телефон",
        "Факс",
        "Сотовый",
        "E-mail",
        "Подразделение"
      ])
    const [isLoading, setIsLoading] = useState(false)

    // console.log(search[0].cabinet)
    const [data, setData] = useState(
        [
            {"descr": i18n.t('kmk'), "id": 524},
            {"descr": i18n.t('vspomogat'), "id": 520},
            {"descr": i18n.t('provkom'), "id": 498},
            {"descr": i18n.t('su'), "id": 2},
            {"descr": i18n.t('cnpcAtk'), "id": 13},
            {"descr": i18n.t('usnNP'), "id": 7},
            {"descr": i18n.t('uptoKo'), "id": 1},
            {"descr": i18n.t('uopT'), "id": 10},
            {"descr": i18n.t('nursultanPrav'), "id": 12},
            {"descr": i18n.t('ams'), "id": 14},
            {"descr": i18n.t('jngk'), "id": 11},
            {"descr": i18n.t('aen'), "id": 15},
            {"descr": i18n.t('ongdu'), "id": 16},
            {"descr": i18n.t('kngdu'), "id": 17},
            {"descr": i18n.t('nii'), "id": 276},
            {"descr": i18n.t('suoem'), "id": 161},
            {"descr": i18n.t('db'), "id": 89},
            {"descr": i18n.t('centIT'), "id": 179},
            {"descr": i18n.t('ad'), "id": 82},
            {"descr": i18n.t('drK'), "id": 168},
            {"descr": i18n.t('df'), "id": 142},
            {"descr": i18n.t('dpoz'), "id": 118},
            {"descr": i18n.t('dpd'), "id": 123},
            {"descr": i18n.t('dtr'), "id": 136},
            {"descr": i18n.t('ped'), "id": 149},
            {"descr": i18n.t('dks'), "id": 102},
            {"descr": i18n.t('dot'), "id": 113},
            {"descr": i18n.t('dRazvetki'), "id": 128},
            {"descr": i18n.t('dRazrabotki'), "id": 131},
            {"descr": i18n.t('dBurenie'), "id": 93},
            {"descr": i18n.t('do'), "id": 72},
            {"descr": i18n.t('ddn'), "id": 97},
            {"descr": i18n.t('dkptr'), "id": 107},
            {"descr": i18n.t('skbp'), "id": 177},
            {"descr": i18n.t('rukovot'), "id": 184},
            {"descr": i18n.t('agd'), "id": 77},
            {"descr": i18n.t('asp'), "id": 156}
        ]
    )
    // const a =  data.map((list)=>{
    //     return {id: list.id, descr: list.descr}
    // })
    globalThis.a = data

    // AsyncStorage.setItem('DepartmentsName', JSON.stringify(data))
    globalThis.s = selected

    // console.log(data)

    // console.log(data)
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




    const searchs = search.map((list)=>{
        return{
            fio: list.fio,
            doljnost: list.doljnost,
            cabinet: list.cabinet,
            raboch_tel: list.raboch_tel,
            sot_tel: list.sot_tel,
            email: list.email,
            fax: list.fax,
            predki: list.predki
        }
    })

    globalThis.search = searchs

        // useEffect(()=>{
        //     setIsLoading(true)
        //     const config = {
        //         method:'get',
        //         url: 'http://95.57.218.120/?apitest.helloAPI2={}',
        //         headers: { "Content-Type": "application/json" }
        //     }
        //     axios(config)
        //         .then(function (response){
        //             let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
        //             let parse_first = JSON.parse(info)
        //             let parse_second = JSON.parse(parse_first.response)
        //             let parse_third = parse_second.list
        //             // let newArray = parse_third.map((list)=>{
        //             //     return {id: list.id, descr: list.descr}
        //             // })

        //             // console.log(parse_third)
        //             let newArray = []

        //             for (let i = 0; i< parse_third.length; i++){
        //               newArray.push({id: parse_third[i].id, descr: parse_third[i].descr})
        //             }
        //             setData(newArray)
        //             // console.log(newArray)
        //             setIsLoading(false)


        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //             setIsLoading(false)
        //     })
        // },[])




        // console.log(data)

        if(isLoading) {
            return(
                <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:'white'}}>
                    <WaveIndicator color="#D64D43"/>
                </View>
            )
          }

    const tableHeader = () => (
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
                <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
                {i18n.t('fax')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.columnHeader} >
                <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
                {i18n.t('telphoneNum')}
                </Text>
                <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
                {i18n.t('pochta')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.columnHeadert} >
                <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
                {i18n.t('sotovi')}
                </Text>
                <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
                {i18n.t('podrazdelenie')}
                </Text>
            </TouchableOpacity>
        </View>
        </View>
      )


    const getSearch = () =>{
        setIsLoading(true)
        const config = {
            method:'get',
            url: `http://95.57.218.120/?apitest.helloAPIWithParams23={"data":"${text}"}`,
            headers: { "Content-Type": "application/json" }
        }
        axios(config)
            .then(function (response){
                let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
                let parse_first = JSON.parse(info)
                let parse_second = JSON.parse(parse_first.response)
                let parse_third = parse_second.list
                let newArray = parse_third.map((list)=>{
                    return {
                        fio: list.fio,
                        doljnost: list.doljnost,
                        cabinet: list.cabinet,
                        raboch_tel: list.raboch_tel,
                        sot_tel: list.sot_tel,
                        email: list.email,
                        fax: list.fax,
                        predki: list.predki
                    }
                })


                setSearch(newArray)

                // if (search[0].cabinet){
                //     Alert.alert('увувувув')
                // }

                setIsLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false)
        })
    }

    // console.log(text)
    return(
        <View style={{flex:1,backgroundColor: isDarkMode === true ? '#262C38' : '#F2F2F2'}}>

                <View style={{alignItems: 'center', justifyContent:'center', marginTop:15}}>

                    <SelectDropdown
	data={data.map((list)=> list.descr).sort()}
    dropdownIconPosition='right'
    dropdownStyle={{height: '60%', borderRadius:15, backgroundColor: theme.background}}
    rowTextStyle={{color: theme.color}}
    defaultButtonText={i18n.t('chooseDep')}
    selectedRowStyle = {{backgroundColor: '#D64D43'}}
    selectedRowTextStyle = {{color:'white'}}
    disableAutoScroll={true}
    // search={true}
    buttonStyle={{backgroundColor: theme.bottomNavigationColor, width: windowWidth-20, paddingLeft:24, paddingRight:11, borderRadius:10 }}
    buttonTextStyle={{textAlign:'left', fontSize:16, color: theme.color}}
	onSelect={(selectedItem, index) => {
		setSelected(selectedItem); navigation.navigate('InfoDepartment')
	}}
    // onFocus={(selectedItem)=>{selectedItem}}
    renderDropdownIcon={()=> <Entypo name="chevron-down" size={20} color={theme.color} />}
    // renderSearchInputLeftIcon = {()=> <FontAwesome5 name="search" size={13}/>}
	buttonTextAfterSelection={(selectedItem, index) => {
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		return item
	}}
/>

                    <View style={{marginTop: 5}}>
                    <View style={{flexDirection:'row', alignItems:'center', width: windowWidth-20, backgroundColor: theme.bottomNavigationColor, height: 50, borderRadius:10, marginTop: 10}}>
                        <TextInput
                            placeholder={i18n.t('searchguide')}
                            style={[styles.input, {color: theme.color}]}
                            onChangeText={text => setText(text)}
                            blurOnSubmit = {true}
                            placeholderTextColor={theme.color}

                        />

                        <TouchableOpacity
                        onPress = {()=> {getSearch(); setShouldShow()}}
                        //  onPress={() => navigation.navigate('SearchScreen')}
                        style={{width: 65 , height: 50, borderRadius: 10, marginLeft: 11, backgroundColor: theme.dateBack, alignItems:'center', justifyContent:'center'}}
                        ><FontAwesome5 name="search" size={18} color="white"/></TouchableOpacity>
                    </View>
                    {/* <SelectList
                        data={data.map((list)=> list.descr).sort()}
                        setSelected = {setSelected}
                        onSelect={() =>
                            navigation.navigate('InfoDepartment')
                        }
                        search = {false}
                        placeholder = "Выберите  подразделения"
                        dropdownStyles = {{width: windowWidth-20, borderColor: "transparent", backgroundColor: 'white', }}
                        boxStyles = {{width: windowWidth-20, borderColor: "transparent", backgroundColor: 'white'}}
                        dropdownTextStyles = {{fontSize: 16, color: "#4D4D4D"}}
                        inputStyles = {{fontSize: 16, color: "#4D4D4D"}}
                        maxHeight = {400}
                    /> */}

                    </View>

                </View>
                {!shouldShow ? (
                    <View>
                    <View style={{marginLeft: 15, marginTop: 15}}><Text style={{fontSize: 14, color: isDarkMode === true ? "white" : "#0D6106"}}> {i18n.t('searchguideresult')} <Text style={{fontWeight: 'bold', fontSize:13,color: isDarkMode === true ? "white" : "#0D6106" }}>{search.length}</Text></Text></View>
                    <View style={{alignItems:'center', marginTop: 15}}>
                       <View>

                    <View>
                        <View>
                            <FlatList
                            data={search}
                            style={{width: windowWidth-20, height: '60%'}}
                            keyExtractor={(item, index) => index+""}
                            ListHeaderComponent={tableHeader}
                            stickyHeaderIndices={[0]}
                            renderItem={({item, index})=> {
                            return (
                                <View style={{...styles.tableRow, backgroundColor: isDarkMode === true ? index % 2 == 1 ? "#191E2D" : "#262C38" :  index % 2 == 1 ? "#F0EFEF" : "white" }}>
                                <Text style={{...styles.columnRowTxt, fontWeight:"bold", color: theme.color}}>{item.fio}</Text>
                                <Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.doljnost}{"\n"}<Text style={[styles.columnRowTxtRoom , {color: theme.color}]}>{item.cabinet}</Text>{"\n"}<Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.fax}</Text></Text>
                                <Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.raboch_tel}{"\n"}<Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.email}</Text></Text>
                                <Text style={[styles.columnRowTxtt, {color: theme.color}]}>{item.sot_tel}{"\n"}<Text style={[styles.columnRowTxtt, {color: theme.color}]}>{item.predki}</Text></Text>
                                </View>
                            )}}
                            />
                        </View>
                    </View>
                   {/* </ScrollView> */}

                       </View>

                   </View>

                    </View>
                ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    list:{
        fontSize:16,
        marginLeft:30,
        marginBottom: 5
    },
    subHeader:{
        fontSize:17,
        fontWeight: '600',
        marginLeft:30,
        marginBottom: 10,
        color: "#D64D43",

    },
    input: {
        height: 50,
        borderWidth: 1,
        paddingLeft: 21,
        borderColor: "transparent",
        width: windowWidth-95,
        borderRadius: 10,
        fontSize: 16
      },

      container: {

    },
    container1: {
      // // flex: 1,
      // paddingTop:30, marginLeft: 15, marginRight:15,
    //   marginLeft: 10

    },
    title:{
      marginTop:10,
      marginBottom: 10,
      marginLeft: 20

    },

    tableHeader: {
      flexDirection: "row",
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
      height: 110,
    },
    columnHeader: {
      width: "21.6%",
      justifyContent: "center",
      alignItems:"center"
    },
    columnHeadert: {
        width: "35%",
        justifyContent: "center",
        alignItems:"center"
      },
    columnHeaderTxt: {
      fontWeight: "bold",
      fontSize: 10,
    },
    columnRowTxt: {
      textAlign:"center",
      width: "21.6%",
      fontSize: 10,
      height: 100
    },
    columnRowTxtt: {
        textAlign:"center",
        width: "35%",
        fontSize: 10,
        height: 100
      },
    columnRowTxtRoom: {
      textAlign:"center",
      fontSize: 10,
      width:40
    }
})
