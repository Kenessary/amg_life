import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
    SafeAreaView, 
    ScrollView, 
    Text, 
    View, 
    TouchableOpacity,
    Keyboard,
    Alert} 
    from "react-native";
import Input from "../../components/Input";
import Buttons from "../../components/Buttons";
import Loader from "../../components/Loader";
import COLORS from "../../cores/theme";
import { BASE_URL } from "../../config";
import axios from "axios";
import qs from "qs"
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import themeContext from "../../cores/themeContext";


export default function RegisterScreen({navigation}){
    const theme = useContext(themeContext)
    const [inputs, setInputs] = React.useState({
        iin: '',
        tel: '',
        parol: '',
        parol2: ''
    })

    const [errors, setErrors] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const [userInfo, setUserInfo] = useState({});

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


    const validate = () => {
        Keyboard.dismiss()
        let valid = true
        if(!inputs.iin){
            handleError(i18n.t('erIin'), 'iin')
            valid = false
        }else if(inputs.iin.length < 12 ){
            handleError(i18n.t('erIin'), 'iin')
            valid = false
        }
        if(!inputs.tel){
            handleError(i18n.t('telephoneNumberLabel0'), 'tel')
            valid = false
        }
        if(!inputs.parol){
            handleError(i18n.t('erPass'), 'parol')
            valid = false
        } else if (inputs.parol.length < 5){
            handleError(i18n.t('passwordWarning5'), 'parol')
            valid = false
        }
        if(!inputs.parol2){
            handleError(i18n.t('passwordRep'), 'parol2')
            valid = false
        } else if (inputs.parol.length < 5){
            handleError(i18n.t('passwordWarning5'), 'parol2')
            valid = false
        } else if (inputs.parol !== inputs.parol2){
            handleError(i18n.t('passwordMatch'), 'parol2')
            valid = false
        }
        if(valid){
            register(inputs.iin, inputs.parol, inputs.tel)
        }
    }

    // const register = () => {
    //     setLoading(true)
    //     setTimeout(()=>{
    //         setLoading(false)
    //         try {
    //             AsyncStorage.setItem('user123', JSON.stringify(inputs))
    //             navigation.navigate('LoginScreen')
    //         } catch(error){
    //             Alert.alert('Ошибка','Что-то пошло не так')
    //         }
    //     }, 2000)
    // }

   const gotoLogin = () => {
    navigation.navigate('LoginScreen')
   }

    const register = (findadduseriin, findadduserp, findaddusertel) => {
        setLoading(true)
        const data = qs.stringify({
            'findadduseriin': findadduseriin,
            'findadduserp': findadduserp,
            'findaddusertel': findaddusertel,
        })
        const config = {
            method: 'post',
            url: `${BASE_URL}`,
            headers: { 
                'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data : data  
        }
        axios(config)
        .then(function(response){
            let userInfo = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
            let parsed = JSON.parse(userInfo)
            setUserInfo(userInfo)


            if(parsed.status === 'Not found'){
                  Alert.alert(
                    'Пользователь не найден',
                    'Попробуйте снова',
                    [
                      {
                        text: 'OK',
                        style: 'cancel',
                      },
                    ],
                    { cancelable: false }
                  );
            }

            if(parsed.status === 'Ok'){
                  Alert.alert(
                    'Вы успешно зарегистрировались',
                    'Войти в личный кабинет',
                    [
                      {
                        text: 'Войти',
                        onPress: ()=> navigation.navigate('LoginScreen'),
                      },
                    ],
                    { cancelable: false }
                  );
            }

            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            // console.log(JSON.parse(userInfo.fio))
            setLoading(false)
        })
        .catch(function(error){
            console.log(error)
            setLoading(false)
        })  
    }

    const handleOnChange = (text, input) => {
        setInputs(prevState=>({...prevState, [input]: text}))
    }

    const handleError = (errorMessage, input) => {
        setErrors(prevState=>({...prevState, [input]: errorMessage}))
    }

    return (
    <SafeAreaView style={{backgroundColor: theme.background, flex: 1}}>
        <Loader visible={loading}/>
            <ScrollView 
            automaticallyAdjustKeyboardInsets={true}
            contentContainerStyle={{
                paddingTop: 30,
                paddingHorizontal: 20
            }}>
                <Text style={{color: theme.color, fontSize: 36, fontWeight: 'bold' }}>
                    {i18n.t('register')}
                </Text>
                <Text style={{color: theme.color, fontSize: 16, marginVertical: 10 }}>
                    {i18n.t('registerText')}
                </Text>
            <View style={{marginVertical: 15}}>
                <Input
                    keyboardType="number-pad" 
                    iconName='account-outline' 
                    label={i18n.t('iin')}
                    error={errors.iin}
                    onFocus={()=>{
                        handleError(null, 'iin')
                    }}
                    placeholder = {i18n.t('iinLabel')}
                    onChangeText={(text)=>handleOnChange(text, 'iin')}
                    maxLength={12}
                />
                <Input 
                    keyboardType="number-pad"
                    iconName='phone-outline' 
                    error={errors.tel}
                    onFocus={()=>{
                        handleError(null, 'tel')
                    }}
                    label= {i18n.t('telephoneNumber')}
                    placeholder = {i18n.t('telephoneNumberLabel')}
                    onChangeText={(text)=>handleOnChange(text, 'tel')}
                />
                <Input 
                    iconName='lock-outline' 
                    label= {i18n.t('password')}
                    error={errors.parol}
                    onFocus={()=>{
                        handleError(null, 'parol')
                    }}
                    placeholder = {i18n.t('passwordLabel')}
                    password
                    onChangeText={(text)=>handleOnChange(text, 'parol')}
                />
                <Input 
                    iconName='lock-outline' 
                    label={i18n.t('passwordRep')}
                    error={errors.parol2}
                    onFocus={()=>{
                        handleError(null, 'parol2')
                    }}
                    placeholder = {i18n.t('passwordLabel')}
                    password
                    onChangeText={(text)=>handleOnChange(text, 'parol2')}
                />
                
                <Buttons title={i18n.t('register2')} onPress={validate}/>
                <View style={{alignItems: 'center'}}>
                    <View style = {{flexDirection: 'row', alignItems:'center'}}>
                        <Text style={{
                            color: theme.color, 
                            textAlign: 'center', 
                            fontSize: 16, 
                            fontWeight: 'bold'
                        }}>{i18n.t('isHaveAccount2')}</Text>
                        <TouchableOpacity onPress={()=> navigation.navigate('LoginScreen')} >
                            <Text style={{      color: theme.yearBorder, 
                            fontSize: 16, 
                            fontWeight: 'bold', 
                            marginLeft: 5}}>{i18n.t('enter')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    ) 
}
