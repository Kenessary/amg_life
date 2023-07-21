import { Modal, ScrollView, Text, View,Keyboard, TouchableOpacity, TextInput, Dimensions, StyleSheet,Pressable,Linking, Alert } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Input from '../../components/Input'
import Buttons from '../../components/Buttons'
import COLORS from '../../cores/theme'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import qs from "qs"
import axios from "axios"
import { WaveIndicator } from 'react-native-indicators'
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import themeContext from '../../cores/themeContext'




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function ChangePassword (){
    let [locale, setLocale] = useState('');
    let [lang, setLang] = useState('')



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


    const {iin, logoutRes, restoreIin, newPassword, logout} = useContext(AuthContext)
    const [respass, setresPass] = useState('')
    const [randomNumber, setRandomNumber] = useState('')
    const [inputsRenew, setInputsRenew] = useState({ parol: '', parol2: ''})
    const [inputs4, setInputs4] = useState({code: ''})
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [modalVisible5, setModalVisible5] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isActive, setActive] = useState(false);
    const [errorsRenew, setErrorsRenew] = useState({})
    const [isCode, setIsCode] = useState('')
    const [codeField, setCodeField] = useState('')

    // console.log(iin)
    const back = () => {
        logoutRes()
        setCodeField('')
        setRandomNumber('')
        setModalVisible3(false)
        setModalVisible4(false)
        setModalVisible5(false)
    }

    const validateRenew = () => {
        Keyboard.dismiss()
        let valid = true
        if(!inputsRenew.parol){
            handleErrorRenew( i18n.t('erPass'), 'parol')
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
            logout()
            newPassword(iin, inputsRenew.parol)
            Alert.alert(i18n.t('uspehParol'))
        }
    }

    const handleOnChange4 = (text, input) => {
        setInputs4(prevState=>({...prevState, [input]: text}))
    }
    const handleOnChangeRenew = (text, input) => {
        setInputsRenew(prevState=>({...prevState, [input]: text}))
    }
    const handleErrorRenew = (errorMessage, input) => {
        setErrorsRenew(prevState=>({...prevState, [input]: errorMessage}))
    }

    
    const sendCode = () => {
        const val = Math.floor(1000 + Math.random() * 9000);
        // console.log(val)
        setRandomNumber(val)
        setIsLoading(true)
        const data = qs.stringify({
            'whatsnum': respass,
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

    const restorePass = () => {
        setIsLoading(true)
        const data = qs.stringify({
          'infoiin': iin
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
            if (telephone === null){
                setresPass(telephone)
                AsyncStorage.setItem('restorepass', JSON.stringify(telephone))
                
            }
            setresPass(telephone)
            AsyncStorage.setItem('restorepass', JSON.stringify(telephone))
            setIsLoading(false)
            
        })
      
        .catch(function(error){
            console.log(error)
            setIsLoading(false)
        }) 
    }
    // console.log(randomNumber)

    useEffect(()=>{
        restorePass()
    },[])

    const verification = () => {
        if( randomNumber != '' && inputs4.code != '' && randomNumber == inputs4.code){
            setModalVisible4(true)
        }
        if( randomNumber != '' && inputs4.code != '' && randomNumber != inputs4.code){
            setModalVisible4(false)
            Alert.alert(i18n.t('codeMatch'))
        }
        if( randomNumber === '' && inputs4.code === '' && randomNumber == inputs4.code){
            setModalVisible4(false)
        }
        
    }

    if(isLoading) {
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
            <WaveIndicator color={theme.loading}/>
          </View>
        )
    }

    return (
      <View style={{backgroundColor: theme.background, height:'100%'}}>
           {/* <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                <ScrollView 
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: 5,
                        paddingHorizontal: 20
                    }}
                >
                    <Text style={{fontWeight:'bold', color:COLORS.black, fontSize: 18, marginTop: 10}}>
                        {iin}
                    </Text>
                    <View>
                        <View style={{backgroundColor:'#BAE6FD', flexDirection:'row', borderRadius: 15, marginTop: 20}}>
                            <View style={{width: '20%', height:'100%', padding: 18, paddingTop:25}}>
                                <AntDesign name="exclamationcircle" size={30} color="#007FDB" />
                            </View>
                            <View style={{width: '80%',padding: 18, paddingLeft: 0, paddingTop: 25}}>
                                <Text style={{textAlign:'left', color: COLORS.black}}>
                                {i18n.t('sendCodeTextWarning')}
                                </Text>
                            </View>
                        </View>
                        <Buttons title={i18n.t('call')} onPress={()=> Linking.openURL(`tel:${87132766272}`)}/>
                    </View>
                </ScrollView>
            </View> */}

<View style={{alignItems:'center', justifyContent:'center', paddingTop: 0, opacity: modalVisible5 ? 0.3 : 1}}>

{/* 
<Text style={{color: COLORS.black, fontSize: 20, fontWeight: 'bold'}}>
            {i18n.t('renewParol')}
            </Text> */}
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
                    <Buttons title={i18n.t('renewParolChange')} onPress={validateRenew}/>
                </View>

                {/* <TouchableOpacity activeOpacity={0.7} onPress={()=>setModalVisible5(true)} style={{ height: 45, width: "100%", backgroundColor: '#F5DBDA', justifyContent:'center', alignItems:'center', borderRadius: 10,}}>
                    <Text style={{color: '#D64D43', fontWeight: 'bold', fontSize: 18}}>{i18n.t('renewParolCancel')}</Text>
                </TouchableOpacity> */}




                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible5}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{i18n.t('renewParolCancelModal')}</Text>
                        <View style={{flexDirection:'row'}}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress = {back}
                        >
                            <Text style={styles.textStyle}>{i18n.t('daYes')}</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible5(!modalVisible5)}
                        >
                            <Text style={styles.textStyle}>{i18n.t('netNo')}</Text>
                        </Pressable>

                        </View>
                    </View>
                    </View>
                </Modal>
            </View>
                </View>



        {/* <Modal 
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
                    <Input
                        keyboardType="numeric"  
                        error={errorsCode.iinCode}
                        onFocus={()=>{
                            handleErrorCode(null, 'iinCode')
                        }}
                        placeholder = "Введите ИИН"
                        onChangeText={(text)=>handleOnChangeCode(text, 'iinCode')}
                        maxLength={4}
                    
                    />

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
                    <Text style={{color: 'white', fontSize: 16, fontWeight:'bold'}}> <FontAwesome name="whatsapp" size={20} color="white" /> {i18n.t('openApp')}</Text>
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
                    <Buttons title={i18n.t('renewParolChange')} onPress={validateRenew}/>
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
                        <Text style={styles.modalText}>{i18n.t('renewParolCancelModal')}</Text>
                        <View style={{flexDirection:'row'}}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress = {back}
                        >
                            <Text style={styles.textStyle}>{i18n.t('daYes')}</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible5(!modalVisible5)}
                        >
                            <Text style={styles.textStyle}>{i18n.t('netNo')}</Text>
                        </Pressable>

                        </View>
                    </View>
                    </View>
                </Modal>
            </View>
                </View>







            </Modal> 

        </Modal>
             */}
      </View>
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
          borderColor:'tomato',
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
        color: '#4D4D4D',
        paddingVertical: 4
      },
      selectedText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#4D4D4D',
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