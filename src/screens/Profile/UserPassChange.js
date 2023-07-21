import { Dimensions, Text, View, TouchableOpacity, Keyboard, Alert } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import Input from "../../components/Input"
import { WaveIndicator } from 'react-native-indicators';
import axios from "axios";
import qs from "qs"
import themeContext from '../../cores/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../../cores/theme';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function UserPassChange({navigation}) {
  
  const theme = useContext(themeContext)
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
  
    const [inputs, setInputs] = useState({ iin: ''})
    const [errors, setErrors] = React.useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [shouldShow, setShouldShow] = useState(true);
    const [userSearch, setUserSearch] = useState('')
    const [newPasswords, setNewPasswords] = useState('')

    // console.log(inputs)
    
    const validate = () => {
        Keyboard.dismiss()
        let valid = true
        if(!inputs.iin){
            handleError('Пожалуйста, введите ИИН', 'iin')
            valid = false
        }else if(inputs.iin.length < 12 ){
            handleError('Пожалуйста, введите ИИН', 'iin')
            valid = false
        }
        if(valid){
            // navigation.navigate('BiometricScreen')
            searchUser(inputs.iin)
            // navigation.navigate('BiometricScreen')
        }
    }

    const validateRenew = () => {
            newPassword(inputs.iin)
            navigation.goBack()
            Alert.alert('Пароль успешно обновлен')
    }

    const handleOnChange = (text, input) => {
        setInputs(prevState=>({...prevState, [input]: text}))
    }

    const handleError = (errorMessage, input) => {
        setErrors(prevState=>({...prevState, [input]: errorMessage}))
    }



   const searchUser = (iinUser) =>{   
        setIsLoading(true)
         const data = qs.stringify({
           'infoiin': iinUser
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
             setUserSearch(parsed)
             setIsLoading(false)
         })
         .catch(function(error){
             console.log(error)
             setIsLoading(false)
         }) 

   }  

   const newPassword = (newparoliin) => {
    setIsLoading(true)
    const data = qs.stringify({
      'newparoliin': newparoliin,
      'newparolp': '1234'
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

  if(isLoading) {
    return(
        <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:'white'}}>
            <WaveIndicator color="#D64D43"/>
        </View>
    )
  }
  
    return (
      <View style={{alignItems:'center', height: '100%', backgroundColor: theme.background}}>
        <View style={{marginVertical: 15, width:windowWidth-40}}>
        <Input
                    keyboardType="numeric" 
                    iconName='account-outline' 
                    label= 'ИИН'
                    error={errors.iin}
                    onFocus={()=>{
                        handleError(null, 'iin')
                    }}
                    placeholder = 'ИИН'
                    onChangeText={(text)=>handleOnChange(text, 'iin')}
                    maxLength={12}
                />

<TouchableOpacity 
                    onPress = {()=> {validate(); setShouldShow()}}
                    // onPress={() => setModalVisible(true)}
                    // onPress = {() => {navigation.navigate('UserPassChange')}}
                    style={{width: windowWidth - 40, 
                            // backgroundColor: '#F5DBDA', 
                           
                            // borderWidth: 1,
                            // borderColor:"#D64D43",
                            backgroundColor:"#D64D43",
                            height: 56, 
                            borderRadius: 10, 
                            // marginTop: 200, 
                            alignItems:'center', 
                            justifyContent: 'center', 
                            marginTop:5
                            }}>
                    <View style={{width: windowWidth - 60,  flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    {/* <FontAwesome5 name="user-cog" size={24} color="white"  /> */}
                    <Text style={{fontSize: 16, fontWeight: '500', color:'white'}}>Поиск пользователя</Text>
                    </View>
                </TouchableOpacity>


                {!shouldShow && (inputs.iin).length === 12 ? (
                <View style={{alignItems:'center', marginTop:30}}>

<View style={{width: windowWidth - 40, marginBottom: 0, paddingBottom:15,paddingTop:15, borderRadius: 15, borderWidth:1, borderColor:'#E4E4E4'}}>
  <View style={{marginBottom:10, marginLeft:15, marginRight: 15, flexDirection:'row', alignItems:'center'}}>
  <Text style={{fontSize: 20, fontWeight: '500', color: '#4D4D4D',}}>{userSearch.fio}</Text>

  </View>
  <View style={{backgroundColor:'#E4E4E4', width: "100%", height:1}}></View>
  <View style={{flexDirection:'row', marginTop: 10, marginLeft:15,marginRight: 15}}>
    <Text style={{marginRight:10, fontWeight:'bold', color: '#4D4D4D'}}>ИИН:</Text>
    <Text style={{color: '#4D4D4D'}}>{userSearch.iin}</Text>
  </View>
  <View style={{flexDirection:'row', marginTop: 10, marginLeft:15,marginRight: 15}}>
    <Text style={{marginRight:10, fontWeight:'bold', color: '#4D4D4D'}}>Номер телефона:</Text>
    <Text style={{color: '#4D4D4D'}}>{userSearch.tel}</Text>
  </View>
</View>

<Text style={{fontSize: 16, marginTop:40}}>Стандартный пароль: 1234</Text>

<TouchableOpacity 
                    onPress = {()=> validateRenew()}
                    // onPress={() => setModalVisible(true)}
                    // onPress = {() => {navigation.navigate('UserPassChange')}}
                    style={{width: windowWidth - 40, 
                            // backgroundColor: '#F5DBDA', 
                           
                            borderWidth: 1,
                            borderColor:"#D64D43",
                            // backgroundColor:"#D64D43",
                            height: 56, 
                            borderRadius: 10, 
                            // marginTop: 200, 
                            alignItems:'center', 
                            justifyContent: 'center', 
                            marginTop:10
                            }}>
                    <View style={{width: windowWidth - 60,  flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    {/* <FontAwesome5 name="user-cog" size={24} color="white"  /> */}
                    <Text style={{fontSize: 16, fontWeight: '500', color:'#D64D43'}}>Сбросить пароль</Text>
                    </View>
                </TouchableOpacity>

</View>

) : <></>}

        </View>
      </View>
    )

}