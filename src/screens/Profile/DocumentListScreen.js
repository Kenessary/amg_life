import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { Component, useContext } from 'react'
import { Dimensions } from 'react-native';
import Header from '../../components/Header';
import { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useEffect } from 'react';
import { WaveIndicator } from 'react-native-indicators';
import BackButton from '../../components/BackButton';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from "@react-native-async-storage/async-storage"
import themeContext from '../../cores/themeContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const aas = Dimensions.get('screen').height

export default function DocumentListScreen ({navigation}) {

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
    const {iin} = useContext(AuthContext)
    const [ columns, setColumns ] = useState([
        {id: 1, name: 'Подготовка и переподготовка кадров AE-000001', date: '20.20.2022'},
        {id: 2, name: 'Документ', date: '20.20.2022'},
        {id: 3, name: 'Документ', date: '20.20.2022'},
        {id: 4, name: 'Документ', date: '20.20.2022'},
    ])
    const [ doclist, setDoclist ] = useState([])
    let aaa = []

    for (let i = 0; i< doclist.length; i++) {
      aaa.push(doclist[i].doc)
    }
    // console.log(aaa[0])
    const [ difference, setDifference ] = useState([])

    const [ asyncDocList, setAsyncDocList ] = useState([])
    const [ docName, setDocName ] = useState([])
    const [ docDate, setDocDate ] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const ad = []


    const eventfunc = () => {
      setIsLoading(true)
        const data = qs.stringify({
            // 'docsiin': '910304301020'
            'docsiin': iin 
          });
        const config = {
            method: 'post',
            url: 'http://95.57.218.120/?index',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
          };
        axios(config)
         .then(function(response){
          const info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
          const parsed = (JSON.parse(info)).list
          // console.log(parsed[0)
          let newArray = parsed.map((list)=>{ return {doc: list.doc} })

          const arrayOfObjects = [doclist, newArray]
          let dif = []

          if(JSON.stringify(arrayOfObjects[0]) !== JSON.stringify(arrayOfObjects[1])){
          function getDifference(array1, array2) {
            return array1.filter(object1 => {
              return !array2.some(object2 => {
                return object1.doc === object2.doc;
              });
            });
          }
          const difference = [
            ...getDifference(arrayOfObjects[0], arrayOfObjects[1]),
            ...getDifference(arrayOfObjects[1], arrayOfObjects[0])
          ];
          // console.log(difference)
          dif.push(difference)
          arrayOfObjects.shift()
          } else {
            arrayOfObjects.shift()
            // setDoclist(arrayOfObjects[0])
            setDifference('')
          }

          setDifference(dif[0])
          setDoclist(arrayOfObjects[0])

          // arrayOfObjects.push([{"doc": "Test_imya_documenta"}, {"doc": "test1"}, {"doc": "test2"}, {"doc": "test3"}, {"doc": "test4"}, {"doc": "test5"}, {"doc": "test6"}])
      


            //   arrayOfObjects.shift()

            // console.log(arrayOfObjects)

          

          // function getDifference(array1, array2) {
          //   return array1.filter(object1 => {
          //     return !array2.some(object2 => {
          //       return object1.doc === object2.doc;
          //     });
          //   });
          // }
          // const difference = [
          //   ...getDifference(arrayOfObjects[0], arrayOfObjects[1]),
          //   ...getDifference(arrayOfObjects[1], arrayOfObjects[0])
          // ];
      
          // console.log(difference);

          // console.log(getDifference(arrayOfObjects[0], arrayOfObjects[1]));

          // arrayOfObjects.push(newArray)


          // if(arrayOfObjects.length === 2)
            
          // }

          // console.log(arrayOfObjects.length)

          // if (JSON.stringify(arrayOfObjects[0]) !== JSON.stringify(arrayOfObjects[1])){
          //   console.log(arrayOfObjects[0][0].doc)
          //   console.log(arrayOfObjects[1])
          // }







           
        //    const getNewElements = (eventList) => {  
        //     const newItems = [];
        //     const localStateEvents = [...doclist.map((item)=>item.doc)]
        //     for(const item of eventList) {
        //         if(!localStateEvents.includes(item.doc)) {
        //             newItems.push(item);
        //         }
        //     }
        //     return newItems;
        // }
        // const newElements = getNewElements(newArray)
        // // console.log(doclist)


        // if(newElements.length >= 0){
        //   // console.log("fire")
        //   console.log("Новые данные: ", newElements)
        //   setDoclist(newArray)
        //   // AsyncStorage.setItem('doclist', JSON.stringify(doclist))
        // } else {
        //   setDoclist(newArray)
        // }

        //  AsyncStorage.setItem('doclist', JSON.stringify(doclist))


           setIsLoading(false)
          //  console.log(parsed)
         })
         .catch(function (error) {
          console.log(error);
          setIsLoading(false)
         })
    }






    // console.log(doclist)


    

    useEffect(()=>{
      // setInterval(()=>{
      //   eventfunc()
      // }, 30000)

      eventfunc()
    },[])

    // console.log(difference)
    // console.log(doclist)



    // useEffect(()=>{
    //     setIsLoading(true)
    //     const data = qs.stringify({
    //         // 'docsiin': '910304301020'
    //         'docsiin': iin 
    //       });
    //     const config = {
    //         method: 'post',
    //         url: 'http://95.57.218.120/?index',
    //         headers: { 
    //           'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         data : data
    //       };
    //     axios(config)
    //      .then(function(response){
    //         const info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
    //         const parsed = (JSON.parse(info)).list
    //         let newArray = parsed.map((list)=>{
    //         return {
    //           // doc: (list.doc).split(' от ')[0],
    //           // date: ((list.doc).split(' от ')[1]).split(' ')[0],
    //           // hour: ((list.doc).split(' от ')[1]).split(' ')[1],
    //           doc: list.doc
    //         }
    //        })
    //       //  setDoclist(newArray)
           
    //        const getNewElements = (eventList) => {  
    //         const newItems = [];
    //         const localStateEvents = [...doclist.map((item)=>item.doc)]
    //         for(const item of eventList) {
    //             if(!localStateEvents.includes(item.doc)) {
    //                 newItems.push(item);
    //             }
    //         }
    //         return newItems;
    //     }
    //     const newElements = getNewElements(newArray)
    //     // console.log(doclist)


    //     if(newElements.length >= 0){
    //       // console.log("fire")
    //       console.log("Новые данные: ", newElements)
    //       setDoclist(newArray)
    //       // AsyncStorage.setItem('doclist', JSON.stringify(doclist))
    //     } else {
    //       setDoclist(newArray)
    //     }

    //     //  AsyncStorage.setItem('doclist', JSON.stringify(doclist))


    //        setIsLoading(false)
    //       //  console.log(parsed)
    //      })
    //      .catch(function (error) {
    //       console.log(error);
    //       setIsLoading(false)
    //      })
    //   },[])

      useEffect(()=>{
        getData1()
    }, [])

    // console.log(JSON.parse(asynEvent))

      const getData1 = () => { 
        try {
            AsyncStorage.getItem('doclist')
                .then(value => {
                    if(value != null){
                        setAsyncDocList(value)
                    }
                })
        } catch(error){
            console.log(error)
        }
    }


      // console.log(doclist)
      

    //   console.log(docName)
// console.log(ad)
   
// for (let i = 0; i< doclist.length; i++ ){
//     const string = (doclist[i]).doc
//     const result =  string.slice(0,(string).indexOf(' от ') )
//     // setDocName(result)
//     // ad.push(result)
//     // let newArray = ad.map((list)=>{
//     //     return {docName: result[i]}
//     // })
//     // setDocName(newArray)
//   }
// console.log(docName)
if(isLoading) {
  return(
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:'white'}}>
          <WaveIndicator color="#D64D43"/>
      </View>
  )
}
      
      
    const tableHeader = (a) => (
        <View>
          <View>
          </View>
        
        <View style={styles.tableHeader}>
            <TouchableOpacity 
                style={styles.columnHeader1} >
                <Text style={styles.columnHeaderTxt}>
                    №
                </Text>   
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.columnHeader2} >
                <Text style={styles.columnHeaderTxt}>
                    Заголовок документа
                </Text> 
            </TouchableOpacity>
       
        </View>
        </View>
        )

        let docs = []

        for (let i=0; i < doclist.length; i++){
          docs.push(
            
            <View key={i} style={{ width: windowWidth-40, marginBottom:10, height: 76, backgroundColor: isDarkMode === true ? '#191E2D' : '#F4F4F4', alignItems:'center', borderRadius: 15}}>
              <View style={{ width: windowWidth-90, height: 34, marginTop: 8}} >
                <View style={{flexDirection:'row'}}>
                  <Text style={{color: theme.color}}>{i+1}. </Text>
                  <Text style={{color: theme.color}}>{(doclist[i]).doc}</Text>
                </View>
                <View style={{ width: windowWidth-90, marginTop: 7, marginBottom: 8, flexDirection:'row', justifyContent:'flex-end'}}>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    {/* <Feather name="calendar" size={14} color="#4D4D4D" /> */}
                    <Text style={{marginLeft:2, color: theme.color}}>{(doclist[i]).date}</Text>
                  </View>
                  {/* <View style={{flexDirection:'row', alignItems:'center', marginLeft:15}}>
                    <Feather name="clock" size={14} color="#4D4D4D"/>
                    <Text style={{marginLeft:2, color: '#4D4D4D'}}>{(doclist[i]).hour}</Text>
                  </View> */}
              </View>
              </View>
            </View>        
        
          )
        }


    return (
        
      <View style={{...styles.container, backgroundColor: theme.background}} >
      <ScrollView  style={{ width: "100%", marginTop:10}} >
      <View style={{alignItems: 'center'}}>
        {docs}
        <View style={{marginTop:80}}/>
        </View>
      </ScrollView>
      </View>
    )
}







const styles = StyleSheet.create({
    container: {
      width: windowWidth, 
      height: windowHeight
    },
    container1: {
      // marginLeft: 10

    },
    title:{
      marginTop:10,
      marginBottom: 10,
      marginLeft: 20
  
    },
  
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#F5DA81",
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
      ':last-child': {
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
      },
    },


    columnHeader: {
      width: "25%",
      justifyContent: "center",
      alignItems:"center"
    },
    columnHeader1: {
      width: "10%",
      justifyContent: "center",
      alignItems:"center"
    },
    columnHeader2: {
        width: "90%",
        justifyContent: "center",
        alignItems:"center"
      },
      columnHeader3: {
        width: "25%",
        justifyContent: "center",
        alignItems:"center"
      },
    columnHeaderTxt: {
      color: "black",
      fontWeight: "bold",
      fontSize: 10,
    },
    columnRowTxt1: {
      textAlign:"center",
      width: "10%",
      fontSize: 10,
    },
    columnRowTxt2: {
        textAlign:"center",
        width: "90%",
        fontSize: 10,
      },
      columnRowTxt3: {
        textAlign:"center",
        width: "25%",
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


  // дата и время
      // doc: (list.doc).split(' от ')[0],
      // date: ((list.doc).split(' от ')[1]).split(' ')[0],
      // hour: ((list.doc).split(' от ')[1]).split(' ')[1],