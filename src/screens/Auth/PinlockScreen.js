import React, {useState, useEffect, useContext} from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native'; 
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; 
import Code from '../../components/Code';
import { StatusBar } from 'expo-status-bar';
import * as LocalAuthentication from 'expo-local-authentication'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AuthContext } from '../../context/AuthContext';
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import themeContext from '../../cores/themeContext';


export default function PinlockScreen({navigation}){

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


  let [locale, setLocale] = useState('');
  let [lang, setLang] = useState('')

  i18n.fallbacks = true
  i18n.translations = { kz, ru, ch };
  // i18n.locale = lang;
  // i18n.defaultLocale = 'kz'

  if(lang === 'ch'){
    i18n.locale = lang
  }

  if(lang === 'kz'){
    i18n.locale = lang
  }

  if(lang === 'ru'){
    i18n.locale = lang
  }

  useEffect(()=>{
      if(locale !== ''){
        AsyncStorage.setItem('appLanguage', locale)
      }
    })
  
    useEffect(()=>{
      getData18()
  })
  
  const getData18 = () => { 
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


  const [passcode, setPasscode] = useState(['','','',''])
  const [firstPassword, setFirstPassword] = useState('')
  const [fPassword, setFPassword] = useState('')
  const [ isAuthenticated, setIsAutenticated ] = useState(false)
  const [ isBiometricSupported, setIsBiometricSupported ] = useState(false) 
  const [ isError, setIsError ] = useState('')
  const [isFace, setIsFace] = useState('')
  const {iin, logout} = useContext(AuthContext)

  // globalThis.isA = isAuthenticated
  // console.log(globalThis.isA)


  useEffect(()=>{
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync()
      // console.log(compatible)
      setIsBiometricSupported(compatible)
    })
  })

  function onAuthenticate() {
    
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: i18n.t('facetouch'),
      disableDeviceFallback: true,
      fallbackLabel: i18n.t('bioTypePass'),
      cancelLabel: i18n.t('bioCancel')

    })
    auth.then(result => {
      setIsAutenticated(result.success)
      // console.log(result.success)
      setIsError(result.error)
      // console.log(result) 
    })
  }

  const ver = () => {
    if(isAuthenticated){
      navigation.navigate('HomeScreen')
    }
  }

  useEffect(()=>{
    ver()
  })

  useEffect(()=>{
    (async () => {
      const apapa = await LocalAuthentication.supportedAuthenticationTypesAsync()
      setIsFace(apapa)
    })()
  },[])



useEffect(()=>{
  if(iin !== null){
    onAuthenticate()
  }

},[])

  //   

  
// console.log(fPassword)
  useEffect(()=>{
    getData()
}, [passcode])

useEffect(()=>{
    getData1()
}, [])

// console.log(fPassword)

const createTwoButtonAlert = () =>
Alert.alert(
  i18n.t('errorPin'),
  i18n.t('bioAlert2'),
  [
    { 
        text: "OK", 
    },
    {
        text: i18n.t('bioForget'),
        onPress: () => {navigation.navigate('ChangePassword')},
      },
  ]
);


  useEffect(() => {
    if(!passcode.includes('')) {
      // handleSubmitPassCode();
      setTimeout(()=>{
        AsyncStorage.setItem('pinlock',JSON.stringify(passcode))
        if (JSON.stringify(passcode) === fPassword){
            handleSubmitPassCode();
        }else {
            createTwoButtonAlert()
            handleClearPassCode();
        }

      },0)
    }
  }, [passcode]);

  

  const getData1 = () => { 
    try {
        AsyncStorage.getItem('firstPassword')
            .then(value => {
                if(value != null){
                    setFPassword(value)
                }
            })
    } catch(error){
        console.log(error)
    }
}

  const getData = () => { 
    try {
        AsyncStorage.getItem('pinlock')
            .then(value => {
                if(value != null ){
                    setFirstPassword(value)
                }
            })
    } catch(error){
        console.log(error)
    }
}



  const onPressNumber = (num) => {
    let tempPassCode = [...passcode];
    for(let i=0; i < tempPassCode.length; i++){
      if(tempPassCode[i] == '' ){
        tempPassCode[i]=num;
        // console.log(typeof(num))
        break;
      }else{
        continue;
      }
    }
    setPasscode(tempPassCode)
  }

  // console.log(isFace[0])

  const onPressBack =(num)=>{
    let tempPassCode = [...passcode];
    for(let i=tempPassCode.length-1;i>=0;i--){
      if(tempPassCode[i]!=''){
        tempPassCode[i]='';
        break;
      }else{
        continue;
      }
    }
    setPasscode(tempPassCode);
}

let numbers = [
  {num: 1},{num: 2},{num: 3},{num: 4},{num: 5},
  {num: 6},{num: 7},{num: 8},{num: 9},
  {id: 100, num: ' '},
  {id: 110, num: `0` }
]

const handleSubmitPassCode = () => {
  navigation.navigate('HomeScreen')
}
const handleClearPassCode = () => {
  setPasscode(['','','','']);
}



return (
  <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
    {/* <StatusBar style='dark' /> */}
    <StatusBar style= {isDarkMode ? 'light' : 'dark' } />
  <View>
  <View style={styles.swipe}>
    <View style={{marginTop: 80}}>
    {isDarkMode === true ?   <Image 
        source={require('../../../assets/bxs_lock-open-alt-dark.png')}
        style={{width: 50, height: 50}}
      /> :   <Image 
      source={require('../../../assets/bxs_lock-open-alt.png')}
      style={{width: 50, height: 50}}
    />}
    </View>
    <View style={{marginTop: 30}}>
      <View>
      <Text style={[styles.passCodeText, {color: theme.color}]}>{i18n.t('pinlock')}</Text>
      </View>
      <View style={styles.codeContainer}>
      {
          passcode.map(p=>{
            return <View style={p != '' ? [styles.code2, {backgroundColor: isDarkMode === true ? "#C0D5EE":"#D64D43"}]: [styles.code1, {backgroundColor: isDarkMode === true ? "grey":"rgba(0,0,0,0.12)"}]} key={p+Math.random()}></View>
          })
        }
      </View>
    </View>
  </View>
  <View style={{alignItems: 'center', justifyContent:'center'}}>
  <View style = {styles.numbersContainer}>
    <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber(numbers[0].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[0].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber(numbers[1].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[1].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber(numbers[2].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[2].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber(numbers[3].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[3].num}</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber(numbers[4].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[4].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber(numbers[5].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[5].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber(numbers[6].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[6].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber(numbers[7].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[7].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber(numbers[8].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[8].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} onPress={()=>onAuthenticate()}
      >
        <Text style={styles.numberText}>
          {isFace[0] === 2 ?  <MaterialCommunityIcons name="face-recognition" size={32} color={theme.color} /> :<Ionicons name="finger-print" size={32} color={theme.color} />   }
          {/* <Ionicons name="finger-print" size={32} color="#black" /> */}
          {/* <Image source={require('../../../assets/iconoir_face-id.png')} style={{width: 40, height: 40}}/> */}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber(numbers[10].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[10].num}</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.number} key={Math.random()} onPress={()=>onPressBack() }>
      <Text style={[styles.numberText, {color: theme.color}]}> <Feather name="delete" size={32} color={theme.color} /> </Text>
    </TouchableOpacity>
  </View>
</View>
</View>


</SafeAreaView>
)
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  }, 

  swipe: {
    height: 173,
    alignItems:'center',
    justifyContent: 'center'
  }, 
  passCodeText: {
    fontSize: 18,
    letterSpacing: 0.34,
    lineHeight: 25, 
    textAlign:'center'
  },
  codeContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-around'
  },
  code1: {
    width: 13,
    height: 13,
    borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.12)'
  },
  code2: {
    width: 13,
    height: 13,
    borderRadius: 13,
    backgroundColor: '#D64D43'
  },
  number:{
    width: 75,
    height: 75,
    borderRadius: 75,
    margin: 9,
    // backgroundColor: 'rgba(204,32,20,0.1)',
    justifyContent:'center',
    alignItems:'center',
  },
  numbersContainer:{
    flexDirection: 'row',
    flexWrap:'wrap',
    marginTop: 45,
    width: 282,
    height: 348,
    alignItems: 'center',
    justifyContent: 'center',

  },
  numberText: {
    fontSize: 32,
    color: 'black',
    letterSpacing: 0,
    textAlign: 'center'
  },
  buttons: {
    marginTop: 73,
    marginLeft:46,
    marginRight:46,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between'
  },
  buttonText: {
    fontSize:16,
    letterSpacing: -0.39,
    textAlign: 'center'
  }
})
