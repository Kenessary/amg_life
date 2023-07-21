import { Text, View, StyleSheet, Image } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import React, { Component, useState, useEffect, useRef, useContext } from 'react'
import ButtonCamera from './CameraComponents/ButtonCamers'
import { StatusBar } from 'expo-status-bar'
import themeContext from '../../cores/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function CameraPhone({navigation}) {
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
    const [hasCameraPermission, setHasCameraPermission] = useState(null)
    const [image, setImage] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const cameraRef = useRef(null)

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
                const options = { quality: 0.8, base64: true, doNotSave: true }
                const data = await cameraRef.current.takePictureAsync(options)
                console.log(data.base64)
                setImage(data.uri)
            } catch(e) {
                console.log(e)
            }
        }
    }

    if (hasCameraPermission === false){
        return <Text>Нет доступа к камере</Text>
    }


    return (
      <View style={{flex:1, justifyContent:'center', backgroundColor: '#000', paddingBottom:20, width:'100%', height:'100%'}}>
        <StatusBar style='light'/>
        {!image ?
        <Camera style={{flex:1}} type={type} flashMode={flash} ref={cameraRef} focusable={true}>
            <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                paddingHorizontal:30
            }}>
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
                    <ButtonCamera title={'Отправить'} icon='paper-plane'/>
                </View>
                :
                <ButtonCamera title={'Сфотографировать'} icon="camera" onPress={takePicture}/>
            }
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    }
})