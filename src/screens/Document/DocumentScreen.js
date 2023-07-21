import React, { useContext, useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Text, Button , Dimensions, ActivityIndicator,Pressable, TouchableOpacity, Linking, NativeModules, Platform, Image, Alert} from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import base64 from 'react-native-base64'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import qs from "qs"
import { Modal } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import CameraPhone from './Camera'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import ButtonCamera from './CameraComponents/ButtonCamers'
import { StatusBar } from 'expo-status-bar'
import { Camera, CameraType } from 'expo-camera'
import { WaveIndicator } from 'react-native-indicators'
import { MaterialIcons } from '@expo/vector-icons';
// import { useRoute } from '@react-navigation/native'




// import { btoa, atob } from 'react-native-quick-base64'

import { encode, decode } from 'js-base64';
import themeContext from '../../cores/themeContext'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function DocumentScreen({navigation}) {


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

    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)
    const [text, setText] = useState('')
    const [qrData, setQrData] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [vhodResult, setVhodResult] = useState('')
    const {iin, logout} = useContext(AuthContext)


    const [hasCameraPermission, setHasCameraPermission] = useState(null)
    const [image, setImage] = useState(null)
    const [imageBase64, setImageBase64] = useState('')
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const [takePicturess, setTakePictures] = useState('')
    const cameraRef = useRef(null)
    const [modalPicture, setModalPicture] = useState(false)
    const [modalErrorp, setModalErrorp] = useState(false)

    const [podpisInfo, setPodpisInfo] = useState('')
    const [podpisModal, setPodpisModal] = useState(false)




    useEffect(()=>{
        (async() =>{
            // MediaLibrary.requestPermissionsAsync()
            const cameraStatus = await Camera.requestCameraPermissionsAsync() 
            setHasCameraPermission(cameraStatus.status === 'granted')
        })()
    })

    const takePicture = async () =>{
        if(cameraRef){
            try{
                const options = { quality: 0.2, base64: true, doNotSave: true }
                const data = await cameraRef.current.takePictureAsync(options)
                setImageBase64(data.base64)
                setImage(data.uri)
            } catch(e) {
                console.log(e)
            }
        }
    }

    if (hasCameraPermission === false){
        return <Text>Нет доступа к камере</Text>
    }

    const openAppSettings = () => {
        if (Platform.OS === 'ios') {
          Linking.openURL("app-settings:");
        } else {
          RNAndroidOpenSettings.appDetailsSettings();
        }
      }


    const askForCameraPermission = () =>{
        (async () =>{
            const {status} = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status == 'granted')
        })()
    }

    useEffect(()=>{
        askForCameraPermission()
    },[])

    
    useEffect(()=>{
        if(vhodResult !== ''){

            setTimeout(()=>{
                setModal(true)
            },500)
        }
    })

    useEffect(()=>{
        if(podpisInfo !== ''){
            setPodpisModal(true)
        }
    })

    useEffect(()=>{
        if(takePicturess!==''){
            setModalPicture(true)
        }
    })

    const qrPodpis = (docnamemd, docuid, dociin, docsovpadenie) => {
        // setIsLoading(true)
        
        const dataSp = qs.stringify({
            'docnamemd': docnamemd,
            'docuid': docuid,
            'dociin': dociin,
            'docsovpadenie':docsovpadenie
        })
        const config = {
            method: 'post',
            url: 'http://95.57.218.120/?index',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            data : dataSp 
        }
        axios(config)
        .then(function(response){
            let user = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
            let parsed_user = JSON.parse(user) 
            setPodpisInfo(parsed_user)
            // console.log(user)
            // console.log('wdwdwddwdwdwdwdd')
            // setIsLoading(false)
        })
        .catch(function(error){
            console.log(error)
            // setIsLoading(false)
        })  
    }


    const handleBarCodeScaned = ({type, data}) => {
        try{
            setScanned(true)
            setText(data)
            const a = decode(data.replace(/\s/g,''))
            const parsedA = JSON.parse(a)
            if(parsedA.vhod === "1"){
                qrscan(iin, parsedA.guid, parsedA.nowdate, parsedA.ipaddress)
            }
            if(parsedA.vhod === "0"){
                qrPodpis(parsedA.namemd, parsedA.uid, parsedA.iin, iin)
            }
            setQrData(parsedA)
        } catch(er){
            if(er) {
                setModalErrorp(true)
            }
        }
    }

    if(hasPermission === null){
        return(
            <View style={[styles.container, {backgroundColor: theme.background}]}>
                <Text>Запрос на разрешение камеры</Text>
            </View>
        )
    }

    // console.log(vhodResult)

    
    if(hasPermission === false){
        return(
            <View style={styles.container}>
            <Text style={{margin: 10}}>Нет доступа к камере</Text>
            <Button title={'Разрешить доступ к камере'} onPress = {openAppSettings}/>
        </View>
        )
    }
    // console.log(hasPermission)

    const qrscan = (docoborotiin, docoborotguid, docoborotnowdate, docoborotipaddress) => {
        // setIsLoading(true)
        
        const data = qs.stringify({
            'docoborotiin': docoborotiin,
            'docoborotguid': docoborotguid,
            'docoborotnowdate': docoborotnowdate,
            'docoborotipaddress': docoborotipaddress
        })
        const config = {
            method: 'post',
            url: 'http://95.57.218.120/?index',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            data : data  
        }
        axios(config)
        .then(function(response){
            let user = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
            let parsed_user = JSON.parse(user)
            setVhodResult(parsed_user)
            // console.log('78963205896325865320')
            // setIsLoading(false)
        })
        .catch(function(error){
            console.log(error)
            // setIsLoading(false)
        })  
    }

    const takePictures = (docfilephoto, docavtoriinphoto, docmobileiinphoto, docguidphoto) => {
        setIsLoading(true)
        
        const data = qs.stringify({
            'docfilephoto': docfilephoto,
            'docavtoriinphoto': docavtoriinphoto,
            'docmobileiinphoto': docmobileiinphoto,
            'docguidphoto': docguidphoto
        })
        const config = {
            method: 'post',
            url: 'http://95.57.218.120/?index',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            data : data  
        }
        axios(config)
        .then(function(response){
            let user = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
            let parsed_user = JSON.parse(user)
            setTakePictures(parsed_user)
            setIsLoading(false)
        })
        .catch(function(error){
            console.log(error)
            setIsLoading(false)
        })  
    }

    // console.log(JSON.stringify(podpisInfo))



    // console.log(scanned)




    



    // console.log(podpisInfo)

    // if(text !== '' || qrData.vhod === '2'){
       
    // }

    // if(isLoading) {
    //     return(
    //       <Modal style={{width: 290, height:200, alignItems:'center', justifyContent:'center'}}>
    //         <WaveIndicator color="#D64D43"/>
    //       </Modal>
    //     )
    //   }



    return(
        <View style={{ flex: 1,alignItems:'center', justifyContent:'center', width:'100%', height:'100%', backgroundColor: theme.background}}>
            {qrData.vhod === '2' 
            ?
            <View style={{flex:1, justifyContent:'center', backgroundColor:'#000', paddingBottom:20, width:'100%', height:'100%'}}>
            <StatusBar style='light'/>
            {!image ?
            <Camera style={{flex:1, height: '100%'}} type={type} flashMode={flash} ref={cameraRef} focusable={true}>
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    paddingHorizontal:30, marginTop:20
                }}>
                         <ButtonCamera icon={'chevron-left'} color="#f1f1f1" onPress={() => {navigation.goBack();setScanned(false);setQrData('')}}/>
                    <ButtonCamera icon={'flash'} color={flash === Camera.Constants.FlashMode.off ? '#f1f1f1' : '#E9B01E'} onPress={()=>{
                        setFlash(flash === Camera.Constants.FlashMode.off 
                            ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)
                    }}/>
                </View>
            </Camera>
            :
            <Image source={{uri: image}} style={{flex:1}}/>}
    
            <View>
                {image ? 
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        paddingHorizontal:30,
                    }}>
                        <ButtonCamera title={'Переснять'} icon='retweet' onPress={() => setImage(null)}/>
                        <ButtonCamera title={'Отправить'} icon='paper-plane' onPress={() =>  {takePictures(imageBase64, qrData.iin, iin, qrData.uid)} }/>
                    </View>
                    :
                    <ButtonCamera title={'Сфотографировать'} icon="camera" onPress={takePicture}/>
                }
            </View>


            <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalPicture}
            >
     <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <FontAwesome name="check-circle" size={70} color="#1CA510" />
                        <View style={{flexDirection:'column', alignItems:'center'}}>
                          <Text style={{fontSize:16, fontWeight:'600', marginBottom:10, marginTop:10, color:'#1CA510'}}>{takePicturess.message}</Text>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {setTakePictures('');setModalPicture(false);navigation.goBack();setScanned(false);setQrData(''); setImage(null)}}
                        >
                            <Text style={styles.textStyle}>OK</Text>
                        </Pressable>

                        </View>
                    </View>
                    </View>
            </Modal>

            <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isLoading}
            >
     <View style={styles.centeredView}>
                    <View style={styles.modalViewLoad}>

                    <WaveIndicator color="#D64D43"/>

                    </View>
                    </View>
            </Modal>
          </View>
            :
            <View style={{alignItems:'center'}}>
            <Text style={{marginBottom: 20, fontSize:18, fontWeight:'500', color: theme.color}}>Сканируйте QR-код</Text>
            <View style={{width: 313, height:313, borderWidth:12, borderColor: isDarkMode === true ? "#C0D5EE" : '#D64D43', borderRadius:36, alignItems:'center', justifyContent:'center'}}>
            <View style={styles.barcodebox}>
                <BarCodeScanner 
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScaned}
                    style={{height: 800, width: 400}}
                />
            </View>
            </View>

            <TouchableOpacity style={{width:300, height: 50, backgroundColor: isDarkMode === true ? '#1C3F5C' : '#F5DBDA', alignItems:'center', justifyContent:'center', marginTop:20, borderRadius:15}} onPress={() => navigation.goBack()}>
                <Text style={{fontSize:18, fontWeight:'600', color: isDarkMode === true ? 'white' :'#D64D43'}}>Назад</Text>
            </TouchableOpacity>
            {/* {scanned && <Button title={'Сканировать еще раз'} onPress={()=> setScanned(false)} color='tomato'/>} */}
            <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modal}
            >
     <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <FontAwesome name="check-circle" size={70} color="#1CA510" />
                        <View style={{flexDirection:'column', alignItems:'center'}}>
                          <Text style={{fontSize:16, fontWeight:'600', marginBottom:10, marginTop:10, color:'#1CA510'}}>{vhodResult.message}</Text>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            // disabled={}
                            onPress={() => {setVhodResult('');setModal(false);navigation.goBack();setScanned(false)}}
                        >
                            <Text style={styles.textStyle}>OK</Text>
                        </Pressable>

                        </View>
                    </View>
                    </View>
            </Modal>

            <Modal
                    animationType="fade"
                    transparent={true}
                    visible={podpisModal}
            >
     <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <FontAwesome name="check-circle" size={70} color="#1CA510" />
                        <View style={{flexDirection:'column', alignItems:'center'}}>
                          <Text style={{fontSize:16, fontWeight:'600', marginBottom:10, marginTop:10, color:'#1CA510'}}>{podpisInfo.status}</Text>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {setPodpisInfo('');setPodpisModal(false);navigation.goBack();setScanned(false)}}
                        >
                            <Text style={styles.textStyle}>OK</Text>
                        </Pressable>

                        </View>
                    </View>
                    </View>
            </Modal>

            {/* <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isLoading}
            >
     <View style={styles.centeredView}>
                    <View style={styles.modalViewLoad}>

                    <WaveIndicator color="#D64D43"/>

                    </View>
                    </View>
            </Modal> */}

            <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalErrorp}
            >
     <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    {/* <FontAwesome name="check-circle" size={70} color="#1CA510" /> */}
                    <MaterialIcons name="error" size={70} color="#F21010" />
                        <View style={{flexDirection:'column', alignItems:'center'}}>
                          <Text style={{fontSize:16, fontWeight:'600', marginBottom:10, marginTop:10, color:'#F21010'}}>QR-код не распознан</Text>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {navigation.goBack();setScanned(false);setModalErrorp(false)}}
                        >
                            <Text style={{color:'#D64D43'}}>Сканировать повторно</Text>
                        </Pressable>

                        </View>
                    </View>
                    </View>
            </Modal>


            </View>

    }     


            </View>
        // </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    barcodebox: {
        backgroundColor:'tomato',
        alignItems:'center',
        justifyContent:'center',
        height:300,
        width:300,
        overflow:'hidden',
        borderRadius:30,
    },
    mainText:{
        fontSize:16,
        margin: 20
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
        width: 290,
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
      modalViewLoad: {
        backgroundColor: "white",
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
      },
})