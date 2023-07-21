import React, { useContext, useEffect, useRef, useState } from 'react'
import 'localstorage-polyfill';
import { Provider } from 'react-native-paper'
import { theme } from './src/cores/theme'
import { AuthContext, AuthProvider } from './src/context/AuthContext'
import Navigation from './src/components/Navigation'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import NetInfo from '@react-native-community/netinfo'
import { Alert } from 'react-native';

export default function App({navigation}) {
  const [notification, setNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [historyNotification, setHistoryNotification] = useState('')
  const [hNotification, setHNotification] = useState('')
  const notificationListener = useRef();
  const responseListener = useRef();

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
  
      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
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
  

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => globalThis.asexpo = token);

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const { data } = response.notification
    });


    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  });

  const checkInternetConnection = async () => {
    const netInfo = await NetInfo.fetch();
  
    if (netInfo.isConnected) {
      // console.log('The device is connected to the internet.');
    } else {
      Alert.alert(
        'Нет интернета',
        'Подключитесь к интернету',
        [
          {
            text: 'OK',
            style: 'cancel',
          }
        ],
        { cancelable: false }
      );
    }
  };



  useEffect(()=>{
    checkInternetConnection()
  },[])

  return (
    <AuthProvider>
      <Provider theme={theme}>
        <Navigation/>
      </Provider>
    </AuthProvider>
  )
}