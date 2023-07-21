import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native"
import { BASE_URL, INDEX_URL } from "../config"
import axios from "axios"
import qs from "qs"
import i18n from 'i18n-js'
import { kz, ru, ch } from '../languages/localizations';





export const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [userInfo, setUserInfo] = useState({});
    const [splashLoading, setSplashLoading] = useState(false)
    const [iin, setIin] = useState('')
    const [status, setStatus] = useState({})
    const [restores, setRestores] = useState(null)
    const [restoresp, setRestoresp] = useState(null)
    const [newPasswords, setNewPasswords] = useState(null)
    const [restoreIin, setRestoreIin] = useState(null)
    const [mod, setMod] = useState(false)
    const [isApparat, setIsApparat] = useState({})
    const [historyStatus, setHistoryStatus] = useState('')
    let [openedLength, setOpenedLength] = useState('')
  

    // console.log(userInfo)

    // console.log(iin.length === 0)

    const historyOpened = () =>{
        // setIsLoading(true)
        const data = qs.stringify({
          'getnotifhistoryiin': iin 
        });
        const config = {
          method: 'post',
          url: 'http://95.57.218.120/?index',
          headers: { 
            'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };
        axios(config)
          .then(async function(response){
          let user = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
          let parsed = JSON.parse(user)
          let parsedL = parsed.list
          let status_parsed = parsed.status
          const a = []
          if(status_parsed !== 'Нет данных' && parsedL !== undefined){
            for (let i = 0; i < parsedL.length; i++){
              if(parsedL[i].opened === 0){
                a.push(parsedL[i].opened)
              }
            }
          }
          if (a.length !== 0){
            setOpenedLength(a.length)
          }
          // setHistoryStatus(status_parsed)
          setIsLoading(false)
          })
          .catch(function(error){
              console.log(error)
              setIsLoading(false)
          }) 

    }
     
    useEffect(()=>{
        if(iin !== ''){
            historyOpened()
        }
    })
    
    // console.log(isApparat)

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
        getDataR()
    })
    
    const getDataR = () => { 
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




    const register = (findadduseriin, findadduserp, findaddusertel) => {
        setIsLoading(true)
        const data = qs.stringify({
            'findadduseriin': findadduseriin,
            'findadduserp': findadduserp,
            'findaddusertel': findaddusertel,
        })
        const config = {
            method: 'post',
            url:`${BASE_URL}`,
            headers: { 
                'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data : data  
        }
        axios(config)
        .then(function(response){
            let userInfo = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
            setUserInfo(JSON.parse(userInfo))
            Alert.alert(JSON.parse(userInfo))
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            setIsLoading(false)
        })
        .catch(function(error){
            console.log(error)
            setIsLoading(false)
        })  
    }

    const restore = (infoiin) => {
        setIsLoading(true)
        const data = qs.stringify({
          'infoiin': infoiin
        });
        const config = {
          method: 'post',
          url: 'http://95.57.218.120/?index',
          headers: { 
            'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };
        axios(config)
        .then(async function(response){
            let user = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
            let parsed = JSON.parse(user)
            let telephone = parsed.tel
            let iin = parsed.iin
            if (telephone === null){
                Alert.alert('Неверный ИИН')
                setRestores(telephone)
                AsyncStorage.setItem('restorepass', JSON.stringify(telephone))
                
            }
            setRestores(telephone)
            setRestoreIin(iin)
            AsyncStorage.setItem('restorepass', JSON.stringify(telephone))
            setIsLoading(false)
            
        })
      
        .catch(function(error){
            console.log(error)
            setIsLoading(false)
        }) 
    }

    const newPassword = (newparoliin, newparolp) => {
        setIsLoading(true)
        const data = qs.stringify({
          'newparoliin': newparoliin,
          'newparolp': newparolp
        });
        const config = {
          method: 'post',
          url: 'http://95.57.218.120/?index',
          headers: { 
            'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };
        axios(config)
        .then(async function(response){
            let user_password = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
            let parsed = JSON.parse(user_password)
            let newpassword = parsed.status
            setNewPasswords(newpassword)
            setIsLoading(false)  
        })
      
        .catch(function(error){
            console.log(error)
            setIsLoading(false)
        }) 
    }


    useEffect(()=>{
        getData()
    },[])

    const getData = () => { 
        try {
            AsyncStorage.getItem('restorepass')
                .then(value => {
                    if(value != null){
                        setRestoresp(value)
                    }
                })
        } catch(error){
            console.log(error)
        }
    }




    
    const login = async(finduseriin, finduserp) => {
       
        setIsLoading(true)
        const data = qs.stringify({
            'finduseriin': finduseriin,
            'finduserp': finduserp
        })
        const config = {
            method: 'post',
            url: 'http://95.57.218.120/?index',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            data : data  
        }
        axios(config)
        .then(async function(response){
            let user = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
            let parsed_user = JSON.parse(user)
            // console.log(parsed_user)`
            setUserInfo(parsed_user)
            let iin = parsed_user.iin
            let status = parsed_user.status
            let apparat = parsed_user.apparat
            let stolovaya = parsed_user.stolovaya
            let sotrpm = parsed_user.sotrpm
            // console.log(parsed_user)
            setIin(iin)
            setIsApparat(apparat)
            AsyncStorage.setItem('userApparat', apparat)
            AsyncStorage.setItem('userStolovaya', stolovaya)
            AsyncStorage.setItem('userSotrpm', sotrpm)
            setStatus(status)

            if (status === "IIN not found"){
                Alert.alert(i18n.t('erIinAlert'))
                setStatus(status)
                AsyncStorage.removeItem('useriin')
                AsyncStorage.removeItem('userInfo')
                setIsLoading(false)
            }
            if (status === "Invalid pwd"){
                Alert.alert(i18n.t('erPassAlert'))
                setStatus(status)
                AsyncStorage.removeItem('useriin')
                AsyncStorage.removeItem('userInfo')
                setIsLoading(false)
            }
            if (status === "Not found"){
                Alert.alert(i18n.t('erUserAlert'))
                setStatus(status)
                AsyncStorage.removeItem('useriin')
                AsyncStorage.removeItem('userInfo')
                setIsLoading(false)
            }
            if (response && response.data && iin !== null ) {
                await AsyncStorage.setItem('useriin', iin)
                globalThis.iinuser1 = iin
                await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            }
            
        
            setIsLoading(false)
        })
        .catch(function(error){
            console.log(error)
            setIsLoading(false)
        })  
    }

    // console.log(userInfo.status)

    // console.log(userInfo)

    const logout = () =>{
        setIsLoading(true)
        setIin(null)
        setModalVisible(false)
        // globalThis.isUseBio = ''
        AsyncStorage.removeItem('useriin')
        setUserInfo(null)
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userApparat')
        AsyncStorage.removeItem('userStolovaya.')
        AsyncStorage.removeItem('secondPass')
        AsyncStorage.removeItem('firstPassword')
        AsyncStorage.removeItem('pushMenu')
        // AsyncStorage.removeItem('appLanguage')
        setIsLoading(false)
    }

    const logoutRes = () =>{
        setRestores(null)
    }

    
    const isLoggedIn = async() => {
        try {
            setIsLoading(true)
            let useriin = await AsyncStorage.getItem('useriin')
            setIin(useriin)
            let userInfo = await AsyncStorage.getItem('userInfo')
            setUserInfo(userInfo)
            setIsLoading(false)
        } catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        isLoggedIn() 
     }, [])

     return(
        <AuthContext.Provider 
        value={{
            userInfo,
            iin,
            isLoading,
            splashLoading,
            setModalVisible,
            status,
            modalVisible,
            register,
            login,
            logout,
            restore,
            restores, 
            restoresp,
            logoutRes,
            newPassword,
            newPasswords,
            restoreIin,
            mod,
            isApparat,
            openedLength,
            setOpenedLength,
            historyOpened
        }}>
            {children}
        </AuthContext.Provider>
        )
}


