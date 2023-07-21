import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity ,Keyboard, Modal, Pressable, Linking, Switch } from 'react-native';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { List } from "react-native-paper";
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Entypo, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import LottieView from "lottie-react-native"

import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
const now = new Date()

// console.log(now)

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
  
      if(finalStatus === 'granted'){
        const now = new Date();
        const targetTime = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 15, 13, 0, 0)
        if (targetTime < now) {
          targetTime.setDate(targetTime.getDate());
        }
        const timeInterval = targetTime.getTime() - now.getTime()
  
        const schedulingOptions = {
          content: {
            title: 'AMG-Life',
            body: 'Доступна новая версия приложения. Попробуйте прямо сейчас',
          },
          trigger: {
            seconds: timeInterval / 1000
          },
        };
        Notifications.scheduleNotificationAsync(schedulingOptions)
      }
  
      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      // globalThis.expousertoken = token
      // AsyncStorage.setItem('globalExpoPush', token)
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  }

function SettingsScreen({navigation}) {

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
                      setLang(value)
                  }
              })
      } catch(error){
          console.log(error)
      }
  }

    const {logout, iin, restore} = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View style={{...styles.container, opacity: modalVisible ? 0.3 : 1, alignItems:'center'}}>
            <StatusBar style='dark'/>
            <SafeAreaView>
            <View style={{marginTop: 20, alignItems:'center', borderWidth: 1, width:windowWidth-40, borderRadius:15, borderColor:'#E4E4E4'}}>


  
            <View style={{width: windowWidth - 30, marginBottom: 2}}>
                <List.Item
                    title = {i18n.t('changeParol')}
                    titleStyle={{color:'#4D4D4D'}}
                    onPress = {() => {navigation.navigate('ChangePassword')}}
                    // right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color="#4D4D4D" />}
                    left = {() => <MaterialCommunityIcons name="form-textbox-password" style={{marginLeft:20, marginRight:-5}} size={20} color="#4D4D4D" />}
                    rippleColor='transparent'
                />
            </View>



            
            


            {/* <View style={{width: windowWidth - 60, backgroundColor: '#E4E4E4', height:1, marginBottom: 2}}/> */}
{/* 
            <View style={{width: windowWidth - 30, marginBottom: 2}}>
                            <List.Item
                                title = "Изменить язык"
                                titleStyle={{color:'#4D4D4D'}}
                                onPress = {() => navigation.navigate('ChangeLanguage')}
                                rippleColor='transparent'
                                right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color="#4D4D4D" />}
                            />
            </View> */}

            </View>

            {/* <View style={{marginTop: 10, alignItems:'center', borderWidth: 1, width:windowWidth-40, borderRadius:15, borderColor:'#E4E4E4'}}>
            <View style={{width: windowWidth - 30, marginBottom: 2}}>
                <List.Item
                    title = 'Темный режим'
                    titleStyle={{color:'#4D4D4D'}}
                    // onPress = {() => {navigation.navigate('ChangePassword')}}
                    // right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color="#4D4D4D" />}
                    right = {() => <Switch />}
                    rippleColor='transparent'
                />
            </View>

            </View> */}

<View style={{marginTop: 10, alignItems:'center', borderWidth: 1, width:windowWidth-40, borderRadius:15, borderColor:'#E4E4E4'}}>
            <View style={{width: windowWidth - 30, marginBottom: 2}}>
                <List.Item
                    title = {i18n.t('changePhone')}
                    titleStyle={{color:'#4D4D4D'}}
                    onPress = {() => {navigation.navigate('ChangePhone')}}
                    // right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color="#4D4D4D" />}
                    left = {() => <MaterialIcons name="phone-iphone" style={{marginLeft:20, marginRight:-5}} size={20} color="#4D4D4D" />}
                    rippleColor='transparent'
                />
            </View>
  </View>


{/* <TouchableOpacity   onPress = {() => {navigation.navigate('ChangeLang')}}><Text>eeeeeeeeeeeeeeeeeeeeee</Text></TouchableOpacity> */}

  <View style={{marginTop: 10, alignItems:'center', borderWidth: 1, width:windowWidth-40, borderRadius:15, borderColor:'#E4E4E4'}}>
            <View style={{width: windowWidth - 30, marginBottom: 2}}>
                <List.Item
                    title = {i18n.t('changeLanguage')}
                    titleStyle={{color:'#4D4D4D'}}
                    onPress = {() => {navigation.navigate('ChangeLang')}}
                    // right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color="#4D4D4D" />}
                    left = {() => <MaterialIcons name="language" style={{marginLeft:20, marginRight:-5}} size={20} color="#4D4D4D" />}
                    rippleColor='transparent'
                />
            </View>
  </View>


            

            {/* <View>
            <TouchableOpacity onPress={()=> registerForPushNotificationsAsync().then(token => globalThis.asexpo = token)}>
        <Text style={styles.buttonText}>Send Scheduled Notification</Text>
      </TouchableOpacity>
            </View> */}
{/* 
            <View style={{marginTop: 20, alignItems:'center', borderWidth: 1, width:windowWidth-40, borderRadius:15, borderColor:'#E4E4E4'}}>
            <View style={{width: windowWidth - 30, marginBottom: 2}}>
                <List.Item
                    title = {i18n.t('contacts')}
                    titleStyle={{color:'#4D4D4D'}}
                    onPress = {() => {navigation.navigate('ContactsScreen')}}
                    right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color="#4D4D4D" />}
                    rippleColor='transparent'
                />
            </View>
            <View style={{width: windowWidth - 60, backgroundColor: '#E4E4E4', height:1, marginBottom: 2}}/>
            <View style={{width: windowWidth - 30, marginBottom: 2}}>
                <List.Item
                    title = {i18n.t('adminpo')}
                    titleStyle={{color:'#4D4D4D'}}
                    onPress = {() => {navigation.navigate('AdminPO')}}
                    right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color="#4D4D4D" />}
                    rippleColor='transparent'
                />
            </View>
            </View> */}




        {/* <View style={{marginTop: 100, alignItems:'center'}}>

                <TouchableOpacity 
                    // onPress = {()=> logout()}
                    onPress={() => setModalVisible(true)}
                    style={{
                            width: windowWidth - 40, 
                            // backgroundColor: '#F5DBDA',
                            flexDirection:'row', 
                            borderWidth: 1.8,
                            borderColor:"#D64D43",
                            height: 48, 
                            borderRadius: 10, 
                            // marginTop: 200, 
                            alignItems:'center', 
                            justifyContent: 'center'
                    
                            }}>
                    <Text style={{fontSize: 20, fontWeight: '600', color:'#D64D43', marginRight:10}}>{i18n.t('exit')}</Text>
                    <Ionicons name="exit-outline" size={24} color="#D64D43" />
                </TouchableOpacity>
        </View> */}
                {/* <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{i18n.t('exitWarning')}</Text>
                        <View style={{flexDirection:'row'}}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress = {()=> logout()}
                        >
                            <Text style={styles.textStyle}>{i18n.t('daYes')}</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.button, styles.buttonClose1]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={{color:"#D64D43", fontWeight: "bold", textAlign: "center", fontSize: 16}}>{i18n.t('netNo')}</Text>
                        </Pressable>

                        </View>
                    </View>
                    </View>
                </Modal> */}
            
    </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        width: windowWidth, 
        height: windowHeight 
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#007aff',
        padding: 10,
        borderRadius: 5,
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        width: windowWidth-50,
        height: 150,
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
        borderRadius: 8,
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
        elevation: 2,
        borderWidth: 2,
        borderColor:'#D64D43',
        // backgroundColor:'white'
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#D64D43",
      },
      buttonClose1: {
        backgroundColor:'white'
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16
      },
      modalText: {
        marginBottom: 25,
        textAlign: "center",
        fontSize: 18
      }
})

export default SettingsScreen;