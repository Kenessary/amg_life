import React, { useState, useContext,  useEffect } from "react";
import COLORS, { theme } from "../../cores/theme";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Keyboard, Alert,Modal, StyleSheet, Pressable, Dimensions,Linking, TextInput, Image  } from "react-native";
import Input from "../../components/Input";
import Buttons from "../../components/Buttons";
import Loader from "../../components/Loader";
import { StatusBar } from "expo-status-bar";
// import { useTranslation } from 'react-i18next';
import LanguageSelector from "./LanguageSelector";
import qs from "qs"
import axios from "axios"
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import themeContext from "../../cores/themeContext";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LoginScreen({navigation}){
    const theme = useContext(themeContext)
    // const {t} = useTranslation();
    const [inputs, setInputs] = useState({ iin: '', parol: ''})
    const [inputsCode, setInputsCode] = useState({ iinCode: '' })
    const [inputsRenew, setInputsRenew] = useState({ parol: '', parol2: ''})
    const [inputs4, setInputs4] = useState({code: ''})
    const [errors, setErrors] = React.useState({})
    const [errorsCode, setErrorsCode] = useState({})
    const [errorsRenew, setErrorsRenew] = useState({})
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [modalVisible5, setModalVisible5] = useState(false);
    const [randomNumber, setRandomNumber] = useState('')
    const [isActive, setActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [codeField, setCodeField] = useState('')

    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
      // Load the user's preference from AsyncStorage
      loadDarkModePreference();
    });
  
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
    // const [isLoading, setIsLoading] = useState(false)
    const [isCode, setIsCode] = useState('')
    globalThis.iinuser = inputs.iin
    globalThis.paroluser =  inputs.parol


    const [loading, setLoading] = React.useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [seconPass, setSecondPass] = useState('')
    const { login,  logoutRes,  newPassword, restoreIin, restore, restores } = useContext(AuthContext)
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
        getData()
    })
    
    const getData = () => { 
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
        if(!inputs.parol){
            handleError(i18n.t('erPass'), 'parol')
            valid = false}
        if(valid){
            // navigation.navigate('BiometricScreen')
            login(inputs.iin, inputs.parol)
            // navigation.navigate('BiometricScreen')
        }
    }
    //-----validation Code from Whatsapp-------------
    const validateCode = () => {
        Keyboard.dismiss()
        let valid = true
        if(!inputsCode.iinCode){
            handleErrorCode(i18n.t('erIin'), 'iinCode')
            valid = false
        }else if(inputsCode.iinCode.length < 12 ){
            handleErrorCode(i18n.t('erIin'), 'iinCode')
            valid = false
        }
        if(valid){
            restore(inputsCode.iinCode)
        }
    }
    const back = () => {
        logoutRes()
        setCodeField('')
        setRandomNumber('')
        setModalVisible(false)
        setModalVisible1(false)
        setModalVisible3(false)
        setModalVisible4(false)
        setModalVisible5(false)
    }

    const validateRenew = () => {
        Keyboard.dismiss()
        let valid = true
        if(!inputsRenew.parol){
            handleErrorRenew(i18n.t('erPass'), 'parol')
            valid = false
        } else if (inputsRenew.parol.length < 4){
            handleErrorRenew(i18n.t('passwordWarning5'), 'parol')
            valid = false
        }
        if(!inputsRenew.parol2){
            handleErrorRenew(i18n.t('passwordRep'), 'parol2')
            valid = false
        } else if (inputsRenew.parol.length < 5){
            handleErrorRenew(i18n.t('passwordWarning5'), 'parol2')
            valid = false
        } else if (inputsRenew.parol !== inputsRenew.parol2){
            handleErrorRenew(i18n.t('passwordMatch'), 'parol2')
            valid = false
        }
        
        if(valid){
            back()
            newPassword(restoreIin, inputsRenew.parol)
            Alert.alert(i18n.t('uspehParol'))
        }
    }


    const handleOnChange = (text, input) => {
        setInputs(prevState=>({...prevState, [input]: text}))
    }
    const handleOnChange4 = (text, input) => {
        setInputs4(prevState=>({...prevState, [input]: text}))
    }
    const handleError = (errorMessage, input) => {
        setErrors(prevState=>({...prevState, [input]: errorMessage}))
    }
 //-----handle error Code Whatsapp-------------
    const handleOnChangeCode = (text, input) => {
        setInputsCode(prevState=>({...prevState, [input]: text}))
    }
    const handleErrorCode = (errorMessage, input) => {
        setErrorsCode(prevState=>({...prevState, [input]: errorMessage}))
    }
 //-----handle error Change Password-------------
    const handleOnChangeRenew = (text, input) => {
        setInputsRenew(prevState=>({...prevState, [input]: text}))
    }
    const handleErrorRenew = (errorMessage, input) => {
        setErrorsRenew(prevState=>({...prevState, [input]: errorMessage}))
    }

    // console.log(randomNumber)
    const sendCode = () => {
        const val = Math.floor(1000 + Math.random() * 9000);
        // console.log(val)
        setRandomNumber(val)
        setIsLoading(true)
        const data = qs.stringify({
            'whatsnum': restores,
            'whatstxt': val
        })
        const config = {
            method: 'post',
            url: `http://95.57.218.120/?index`,
            headers: { 
                'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data : data  
        }
        axios(config)
        .then(function(response){
            let idMess = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
            setIsCode(idMess)
            setModalVisible3(true)
            setIsLoading(false)
        })
        .catch(function(error){
            console.log(error)
            // setModalVisible2(false)
            setIsLoading(false)
        })  
    }

    useEffect(()=>{
        if(restores === null){
            setModalVisible(false)
        } else {
            setModalVisible1(true)
        }
    },[])

    const verification = () => {
        if( randomNumber != '' && inputs4.code != '' && randomNumber == inputs4.code){
            setModalVisible4(true)
        }
        if( randomNumber != '' && inputs4.code != '' && randomNumber != inputs4.code){
            setModalVisible4(false)
            Alert.alert('Код не совпадает. Повторите заново')
        }
        if( randomNumber === '' && inputs4.code === '' && randomNumber == inputs4.code){
            setModalVisible4(false)
        }
        
    }



    return (
    <SafeAreaView style={{backgroundColor: theme.background, flex: 1}}>
        <StatusBar style= {isDarkMode ? 'light' : 'dark' } />
        <ScrollView 
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            paddingTop: 30,
            paddingHorizontal: 20
        }}>
    
            <Text style={{color: theme.color, fontSize: 36, fontWeight: 'bold' }}>
                {i18n.t('login')}
            </Text>



            <Text style={{color: theme.color, fontSize: 16, marginVertical: 10 }}>
                {i18n.t('loginText')}
            </Text>
            <View style={{marginVertical: 15}}>
                <Input
                    keyboardType="numeric" 
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
                    iconName='lock-outline' 
                    label={i18n.t('password')}
                    error={errors.parol}
                    onFocus={()=>{
                        handleError(null, 'parol')
                    }}
                    placeholder = {i18n.t('passwordLabel')}
                    password
                    onChangeText={(text)=>handleOnChange(text, 'parol')}
                />
                                <View style={{width:windowWidth-40, alignItems:'flex-end', marginTop: 0 }}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={{textDecorationLine:'underline', color: theme.color,fontSize: 15}}>{i18n.t('forgetPassword')}</Text>
                    </TouchableOpacity>
                </View>

     
                <Buttons title={i18n.t('enter')}  onPress={()=>{validate()}}/>

                <View style={{alignItems: 'center'}}>
                    <View style = {{flexDirection: 'row', alignItems:'center'}}>
                        <Text style={{
                            color: theme.color, 
                            textAlign: 'center', 
                            fontSize: 16, 
                            fontWeight: 'bold'
                        }}>{i18n.t('isHaveAccount')}</Text>
                        <TouchableOpacity onPress={()=> navigation.navigate('RegisterScreen')} >
                            <Text style={{      
                                color: theme.yearBorder,  
                                fontSize: 16, 
                                fontWeight: 'bold', 
                                marginLeft: 5}}>
                                {i18n.t('register')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ alignItems:'center'}}>
        <View style={{width: windowWidth-20, height: 320, alignItems:'center'}}>
          <View style={{width:"100%", height:120, alignItems:'center', marginTop:30, borderColor:'#D9D9D9', borderWidth:1, borderRadius:15}}>
            <Text style={{fontSize:18, color:theme.color, marginTop:8}}>
            {i18n.t('selectLanguage')}
            </Text>

<View style={{flexDirection:'row', marginTop:10}}>

<TouchableOpacity onPress={() => setLocale("kz")} style={[lang === "kz" ? [styles.buttonSelectedContainer, {borderColor: theme.yearBorder}] : styles.buttonContainer]}>
  <Image source={require('../../../assets/flags/Kazakhstan.jpg')} style={{width: 29, height:20, borderRadius:2, marginRight: 10 }}/>
  <Text style={[lang === 'kz' ? [styles.selectedText, {color: theme.color}] : [styles.text, {color: theme.color}]]}>ҚАЗ</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => setLocale("ru")} style={[lang === "ru" ? [styles.buttonSelectedContainer, {borderColor: theme.yearBorder}] : styles.buttonContainer]}>
  <Image source={require('../../../assets/flags/Russia.png')} style={{width: 29, height:20, borderRadius:2, marginRight: 10 }}/>
  <Text style={[lang === 'ru' ? [styles.selectedText, {color: theme.color}] : [styles.text, {color: theme.color}]]}>РУС</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => setLocale("ch")} style={[lang === "ch" ?[styles.buttonSelectedContainer, {borderColor: theme.yearBorder}] : styles.buttonContainer]}>
  <Image source={require('../../../assets/flags/China.webp')} style={{width: 29, height:20, borderRadius:2, marginRight: 10 }}/>
  <Text style={[lang === 'ch' ? [styles.selectedText, {color: theme.color}] : [styles.text, {color: theme.color}]]}>中文</Text>
</TouchableOpacity>
</View>
          </View>
        </View>
      </View>















            </View>
        </ScrollView>
        <Modal 
            animationType="none"
            transparent={false}
            visible={modalVisible}
        >
            <ScrollView 
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                paddingTop: 30,
                paddingHorizontal: 20,
                backgroundColor: theme.background,
                flex: 1
            }}>
{/* 
<TouchableOpacity activeOpacity={0.7} onPress={()=>setModalVisible1(false)} style={{marginLeft: 15, marginTop:30}}>
                <AntDesign name="closesquare" size={24} color={COLORS.black} style={{opacity: 0.5}} />            
            </TouchableOpacity> */}
            {/* <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                <ScrollView 
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: 5,
                        paddingHorizontal: 20
                    }}
                > */}
                    <View style={{alignItems:'center', justifyContent:'center', marginTop:30}}>
                        <Text style={{color: theme.color, fontSize: 20, fontWeight: 'bold'}}>
                        {i18n.t('renewParol')}
                        </Text>
                    </View>
                    {/* <Text style={{color: COLORS.grey, fontSize: 16, marginTop: 20}}>
                    {i18n.t('sendCodeTextWhats')}
                    </Text> */}
                    {/* <Text style={{fontWeight:'bold', color:COLORS.black, fontSize: 18, marginTop: 10}}>
                        {restores}
                    </Text> */}
                    <View>
                        <View style={{backgroundColor:'#BAE6FD', flexDirection:'row', borderRadius: 15, marginTop: 20}}>
                            <View style={{width: '20%', height:'100%', padding: 18, paddingTop:25}}>
                                <AntDesign name="exclamationcircle" size={30} color="#007FDB" />
                            </View>
                            <View style={{width: '80%', height:'100%',padding: 18, paddingLeft: 0, paddingTop: 25}}>
                                <Text style={{textAlign:'left', color: COLORS.black}}>
                                {i18n.t('sendCodeTextWarning')}</Text>
                            </View>
                        </View>
                        {/* <Buttons title={i18n.t('codeesend')} onPress={sendCode}/> */}
                        <Buttons title={i18n.t('call')} onPress={()=> Linking.openURL(`tel:${87132766272}`)}/>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>setModalVisible(false)} style={{ height: 45, width: "100%", backgroundColor: '#F5DBDA', justifyContent:'center', alignItems:'center', borderRadius: 10,}}>
                        <Text style={{color: '#D64D43', fontWeight: 'bold', fontSize: 18}}>{i18n.t('back')}</Text>
                    </TouchableOpacity>
                    </View>
                {/* </ScrollView>
            </View> */}
                {/* <Text style={{color: COLORS.black, fontSize: 23, fontWeight: 'bold'}}>
                     {i18n.t('renewParol')}
                </Text>
                <Text style={{color: COLORS.black, fontSize: 16, marginTop: 20}}>
                {i18n.t('restoreParol')}
                </Text>
                <View>
                    <Input
                        keyboardType="numeric" 
                        iconName='account' 
                        error={errorsCode.iinCode}
                        onFocus={()=>{
                            handleErrorCode(null, 'iinCode')
                        }}
                        placeholder = {i18n.t('iinLabel')}
                        onChangeText={(text)=>handleOnChangeCode(text, 'iinCode')}
                        maxLength={12}
                    />
                    <Buttons title={i18n.t('restorettt')}  onPress={validateCode}/>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>setModalVisible(false)} style={{ height: 45, width: "100%", backgroundColor: '#F5DBDA', justifyContent:'center', alignItems:'center', borderRadius: 10,}}>
                        <Text style={{color: '#D64D43', fontWeight: 'bold', fontSize: 18}}>{i18n.t('back')}</Text>
                    </TouchableOpacity>

                </View> */}

{/* <View style={{alignItems:'center', justifyContent:'center', paddingTop: 40, opacity: modalVisible5 ? 0.3 : 1}}>


<Text style={{color: COLORS.black, fontSize: 20, fontWeight: 'bold'}}>
{i18n.t('renewParol')}
            </Text>
</View>

                <View style={{opacity: modalVisible5 ? 0.3 : 1}}>
                <View style={{marginVertical: 15, width: windowWidth-60, marginLeft:30}}>
                <Input 
                    iconName='lock-outline' 
                    label={i18n.t('password')}
                    error={errorsRenew.parol}
                    onFocus={()=>{
                        handleErrorRenew(null, 'parol')
                    }}
                    placeholder = {i18n.t('passwordLabel')}
                    password
                    onChangeText={(text)=>handleOnChangeRenew(text, 'parol')}
                />
                <View style={{marginTop:-15,}}>

                <Input 
                    iconName='lock-outline' 
                    label={i18n.t('passwordRep')}
                    error={errorsRenew.parol2}
                    onFocus={()=>{
                        handleErrorRenew(null, 'parol2')
                    }}
                    placeholder = {i18n.t('passwordLabel')}
                    password
                    onChangeText={(text)=>handleOnChangeRenew(text, 'parol2')}
                />
                </View>

                <View style={{marginTop:-15}}>
                    <Buttons title={i18n.t('renewParolChange')}  onPress={validateRenew}/>
                </View>

                <TouchableOpacity activeOpacity={0.7} onPress={()=>setModalVisible5(true)} style={{ height: 45, width: "100%", backgroundColor: '#F5DBDA', justifyContent:'center', alignItems:'center', borderRadius: 10,}}>
                    <Text style={{color: '#D64D43', fontWeight: 'bold', fontSize: 18}}>{i18n.t('renewParolCancel')}</Text>
                </TouchableOpacity>




                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible5}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Вы уверены, что хотите отменить восстановления?</Text>
                        <View style={{flexDirection:'row'}}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress = {back}
                        >
                            <Text style={styles.textStyle}>Да</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible5(!modalVisible5)}
                        >
                            <Text style={styles.textStyle}>Нет</Text>
                        </Pressable>

                        </View>
                    </View>
                    </View>
                </Modal>
            </View>
                </View> */}




            </ScrollView>
        </Modal>
        {/* <Modal 
            animationType="none"
            transparent={false}
            visible={modalVisible1}
        >
            <TouchableOpacity activeOpacity={0.7} onPress={()=>setModalVisible1(false)} style={{marginLeft: 15, marginTop:30}}>
                <AntDesign name="closesquare" size={24} color={COLORS.black} style={{opacity: 0.5}} />            
            </TouchableOpacity>
            <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                <ScrollView 
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: 5,
                        paddingHorizontal: 20
                    }}
                >
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color: COLORS.black, fontSize: 20, fontWeight: 'bold'}}>
                        {i18n.t('renewParol')}
                        </Text>
                    </View>
                    <Text style={{color: COLORS.grey, fontSize: 16, marginTop: 20}}>
                    {i18n.t('sendCodeTextWhats')}
                    </Text>
                    <Text style={{fontWeight:'bold', color:COLORS.black, fontSize: 18, marginTop: 10}}>
                        {restores}
                    </Text>
                    <View>
                        <View style={{backgroundColor:'#BAE6FD', height: 130, flexDirection:'row', borderRadius: 15, marginTop: 20}}>
                            <View style={{width: '20%', height:'100%', padding: 18, paddingTop:25}}>
                                <AntDesign name="exclamationcircle" size={30} color="#007FDB" />
                            </View>
                            <View style={{width: '80%', height:'100%',padding: 18, paddingLeft: 0, paddingTop: 25}}>
                                <Text style={{textAlign:'left', color: COLORS.black}}>
                                {i18n.t('sendCodeTextWarning')}</Text>
                            </View>
                        </View>
                        <Buttons title={i18n.t('codeesend')} onPress={sendCode}/>
                    </View>
                </ScrollView>
            </View>

        <Modal 
            animationType="none"
            transparent={false}
            visible={modalVisible3}
        >
            <TouchableOpacity activeOpacity={0.7} onPress={()=>setModalVisible3(false)} style={{marginLeft: 30, marginTop:30}}>
            <AntDesign name="closesquare" size={24} color={COLORS.black} style={{opacity: 0.5}} />            
            </TouchableOpacity>
            <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            
            <ScrollView 
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            paddingTop: 5,
            paddingHorizontal: 20
        }}>
        


<View style={{alignItems:'center', justifyContent:'center'}}>


<Text style={{color: COLORS.black, fontSize: 20, fontWeight: 'bold'}}>
{i18n.t('codeVerificationTitle')}
            </Text>
</View>

    
            <Text style={{color: COLORS.black, fontSize: 16, marginTop: 20}}>
            {i18n.t('codeVerificationText')}
            </Text>

<View style={{alignItems:'center'}}>



<View style={{alignItems:'center', justifyContent:'center'}}>
    
                    <TextInput
                        style={{height:50, width:160, borderColor: isActive ? '#D64D43' : '#787878', borderWidth:3, marginTop:15, marginBottom:15, fontSize:30, letterSpacing:3, borderRadius:15, fontWeight:'600', color:'#787878'}}
                        maxLength={4}
                        keyboardType='numeric'
                        keyboardAppearance='light'
                        textAlign={'center'}
                        onFocus={() => setActive(true)} 
                        onBlur={() => setActive(false)}
                        onChangeText={(text)=>handleOnChange4(text, 'code')}
                    />



                </View>

</View>

<View style={{flexDirection: 'row'}}>
    <Text style={{fontSize:15, opacity:0.7}}>{i18n.t('codeGetText')}</Text>
    <TouchableOpacity style={{marginLeft: 5}} onPress={sendCode} ><Text style={{textDecorationLine:'underline', fontSize:15, color:'#D64D43', fontWeight:'bold', opacity:0.90}}>{i18n.t('codeResend')}</Text></TouchableOpacity>
</View>

<TouchableOpacity activeOpacity={0.7} onPress={()=> Linking.openURL('whatsapp://app')} style={{ height: 45, width: "100%", backgroundColor: '#24BE41',alignItems:'center', justifyContent:'center', borderRadius: 10,marginTop:15}}>
                    <Text style={{color: 'white', fontSize: 16, fontWeight:'bold'}}> <FontAwesome name="whatsapp" size={20} color="white" />{i18n.t('openApp')}</Text>
            </TouchableOpacity>

<Buttons title={i18n.t('verification')}  onPress={verification}/>
          
  

            <View>


</View>
    
  
        </ScrollView>

            </View>

        
            <Modal 
            animationType="none"
            transparent={false}
            visible={modalVisible4}
            >
                <View style={{alignItems:'center', justifyContent:'center', paddingTop: 40, opacity: modalVisible5 ? 0.3 : 1}}>


<Text style={{color: COLORS.black, fontSize: 20, fontWeight: 'bold'}}>
{i18n.t('renewParol')}
            </Text>
</View>

                <View style={{opacity: modalVisible5 ? 0.3 : 1}}>
                <View style={{marginVertical: 15, width: windowWidth-60, marginLeft:30}}>
                <Input 
                    iconName='lock-outline' 
                    label={i18n.t('password')}
                    error={errorsRenew.parol}
                    onFocus={()=>{
                        handleErrorRenew(null, 'parol')
                    }}
                    placeholder = {i18n.t('passwordLabel')}
                    password
                    onChangeText={(text)=>handleOnChangeRenew(text, 'parol')}
                />
                <View style={{marginTop:-15,}}>

                <Input 
                    iconName='lock-outline' 
                    label={i18n.t('passwordRep')}
                    error={errorsRenew.parol2}
                    onFocus={()=>{
                        handleErrorRenew(null, 'parol2')
                    }}
                    placeholder = {i18n.t('passwordLabel')}
                    password
                    onChangeText={(text)=>handleOnChangeRenew(text, 'parol2')}
                />
                </View>

                <View style={{marginTop:-15}}>
                    <Buttons title={i18n.t('renewParolChange')}  onPress={validateRenew}/>
                </View>

                <TouchableOpacity activeOpacity={0.7} onPress={()=>setModalVisible5(true)} style={{ height: 45, width: "100%", backgroundColor: '#F5DBDA', justifyContent:'center', alignItems:'center', borderRadius: 10,}}>
                    <Text style={{color: '#D64D43', fontWeight: 'bold', fontSize: 18}}>{i18n.t('renewParolCancel')}</Text>
                </TouchableOpacity>




                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible5}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Вы уверены, что хотите отменить восстановления?</Text>
                        <View style={{flexDirection:'row'}}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress = {back}
                        >
                            <Text style={styles.textStyle}>Да</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible5(!modalVisible5)}
                        >
                            <Text style={styles.textStyle}>Нет</Text>
                        </Pressable>

                        </View>
                    </View>
                    </View>
                </Modal>
            </View>
                </View>

            </Modal>






        </Modal>



        </Modal> */}



    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10, 
        flexDirection:'row',
        alignItems:'center',
        borderColor:'#D9D9D9',
        borderWidth: 1,
        width:'30%',
        height:40,
        borderRadius:15,
        paddingLeft:10,
        paddingRight:10,
        marginLeft:5
      },
      buttonSelectedContainer: {
          marginTop: 10, 
          flexDirection:'row',
          alignItems:'center',
          borderWidth: 2,
          width:'30%',
          height:40,
          borderRadius:15,
          paddingLeft:10,
          paddingRight:10,
          marginLeft:5
        },
      text: {
        fontSize: 14,
        paddingVertical: 4
      },
      selectedText: {
        fontSize: 15,
        fontWeight: '600',
        paddingVertical: 4,
    
      },

    TextInputView:{
        borderBottomWidth: 1,
        width: 50,
        justifyContent:'center',
        alignItems:'center'
    },
    TextInputText:{
       fontSize:30
    },

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    borderStyleBase: {
        width: 30,
        height: 45,
      },
    
      borderStyleHighLighted: {
        borderColor: "#03DAC6",
        color:'black'
      },
    
      underlineStyleBase: {
        width: 55,
        height: 55,
        color:COLORS.black,
        borderWidth: 3,
        fontSize: 22,
        borderRadius: 10
        // borderBottomWidth: 1,
      },

      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#D64D43",
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
      },

      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    
      underlineStyleHighLighted: {
        borderColor: "#D64D43",
      },
  });