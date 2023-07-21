import { Text, TouchableOpacity, View, Dimensions, Keyboard, Modal, StyleSheet, Pressable } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import Input from '../../components/Input'
import { WaveIndicator } from 'react-native-indicators';
import axios from "axios";
import qs from "qs"
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import { AuthContext } from '../../context/AuthContext';
import themeContext from '../../cores/themeContext';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ChangePhone({navigation}) {

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
    const [disabled, setDisabled] = useState(true);
    const [inputs, setInputs] = useState({ phonetext: '' })
    const [errors, setErrors] = React.useState({})
    let [result, setResult] = useState('');
    let [locale, setLocale] = useState('');
    let [lang, setLang] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading1, setIsLoading1] = useState(false)
    let [modalResult, setModalResult] = useState(false)
    
    // console.log(result)

    
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

    // console.log(lang)


    const changePhone = (newparoliin, newtel) => {
        setIsLoading(true)
        const data = qs.stringify({
          'newparoliin': newparoliin,
          'newtel': newtel
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

            setResult(newpassword)
            if(newpassword.length !== 0){
              setModalResult(true)
            }
            setIsLoading(false)
        })
      
        .catch(function(error){
            console.log(error)
            setIsLoading(false)
        }) 
    }

    const validate = () => {
        Keyboard.dismiss()
        let valid = true
        if(inputs.phonetext.length !== 11 ){
            handleError(i18n.t('erTelephone'), 'phonetext')
            valid = false
        }
        if(valid){
            changePhone(iin, inputs.phonetext)
        }
    }

    const handleOnChange = (text, input) => {
        setInputs(prevState=>({...prevState, [input]: text}))
    }
    const handleError = (errorMessage, input) => {
        setErrors(prevState=>({...prevState, [input]: errorMessage}))
    }

    useEffect(()=>{
        if(inputs.phonetext !== ''){
            setDisabled(false)
        } else {
            setDisabled(true)
        }
      })



      if(isLoading) {
        return(
          <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
          <WaveIndicator color={theme.loading}/>
        </View>
        )
    }


    return (
        <View style={{backgroundColor: theme.background, height:'100%'}}>
        <View style={{alignItems:'center'}}>
          <View style={{width:windowWidth-30}}>
            <Input 
                keyboardType="numeric" 
                label= {i18n.t('telnumber')}
                error={errors.phonetext}
                    onFocus={()=>{
                        handleError(null, 'phonetext')
                    }}
                placeholder = {i18n.t('examplenumber')}
                onChangeText={(text)=>handleOnChange(text, 'phonetext')}
                maxLength={11}
            />
          </View>  
        <TouchableOpacity disabled={disabled} style={{width: 250, height:50, backgroundColor: disabled === true ? 'grey' : '#D64D43', alignItems:'center', justifyContent:'center', borderRadius:10}} onPress={() => validate()}>
            <Text style={{color:'white', fontSize:16, fontWeight:'500'}}>{i18n.t('changePhone')}</Text>
        </TouchableOpacity>
        </View>


        <Modal animationType="fade" transparent={true} visible={modalResult}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FontAwesome name="check-circle" size={70} color="#1CA510" />
              <View style={styles.modalContainer}>
                <Text style={styles.otvetOpros}>{result}</Text>
                <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {setModalResult(false); navigation.navigate('ProfileScreen')}}>
                  <Text style={{color:'#4d4d4d', fontSize:15, fontWeight:'600'}}>OK</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0
      },
      modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        width: windowWidth-40,
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
      modalContainer:{
        flexDirection:'column', 
        alignItems:'center'
      },
      otvetOpros:{
        fontSize:16, 
        fontWeight:'600', 
        marginBottom:10, 
        marginTop:10, 
        color:'#1CA510'
      },
      button: {
        borderRadius: 10,
        alignItems:'center',
        justifyContent:'center',
        width:100,
        height:40,
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
        elevation: 2
      },
      buttonClose: {
        backgroundColor: "white",
        borderColor:'#D64D43',
        borderWidth: 2
      }
})