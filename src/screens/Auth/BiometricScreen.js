import React, {useState, useEffect, useContext} from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Image, Modal, Dimensions, Alert, Pressable,Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Code from '../../components/Code';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../context/AuthContext';
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import themeContext from '../../cores/themeContext';


// import * as LocalAuthentication from 'expo-local-authentication'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function BiometricScreen({navigation}){
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
  const [passcode, setPasscode] = useState(['','','',''])
  const [passcode1, setPasscode1] = useState(['','','',''])
  const [firstPassword, setFirstPassword] = useState('')
  const [firstPassword1, setFirstPassword1] = useState('')
  const [seconPass, setSecondPass] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [ isAuthenticated, setIsAutenticated ] = useState(false)
  const [ isBiometricSupported, setIsBiometricSupported ] = useState(false) 
  const { login, iin } = useContext(AuthContext)

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

  

  // console.log(seconPass)



  // useEffect(()=>{
  //   (async () => {
  //     const compatible = await LocalAuthentication.hasHardwareAsync()
  //     // console.log(compatible)
  //     setIsBiometricSupported(false)
  //   })()
  // })

 

  // function onAuthenticate() {
    
  //   const auth = LocalAuthentication.authenticateAsync({
  //     promptMessage: 'Authenticate with Touch ID',
  //     disableDeviceFallback: true,
  //     fallbackLabel: "enter password"
  //   })
  //   auth.then(result => {
  //     setIsAutenticated(result.success)
  //     console.log(result)
  //   })
  // }
  

useEffect(()=>{getData()}, [passcode])
useEffect(()=>{getData11()}, [passcode])
useEffect(()=>{getData111()}, [passcode1])

  useEffect(() => {
    if(!passcode.includes('')) {
      // handleSubmitPassCode();
      setTimeout(()=>{
        AsyncStorage.setItem('firstPassword',JSON.stringify(passcode))
        handleSubmitPassCode();
      },50)
    }
  }, [passcode]);

  const getData = () => { 
    try {
        AsyncStorage.getItem('firstPassword')
            .then(value => {
                if(value != null){
                    setFirstPassword(value)
                }
            })
    } catch(error){
        console.log(error)
    }
}

const getData11 = () => { 
  try {
      AsyncStorage.getItem('firstPassword')
          .then(value => {
              if(value != null){
                  setFirstPassword1(value)
              }
          })
  } catch(error){
      console.log(error)
  }
}

const getData111 = () => { 
  try {
      AsyncStorage.getItem('secondPass')
          .then(value => {
              if(value != null){
                  setSecondPass(value)
              }
          })
  } catch(error){
      console.log(error)
  }
}

const createTwoButtonAlert1 = () =>
Alert.alert(
  i18n.t('bioAlert'),
  i18n.t('bioAlert2'),
  [
    { 
        text: "OK",
        // onPress: () => console.log("Хорошо Pressed")
    }
  ]
);


  useEffect(() => {
    if(!passcode1.includes('')) {
      // handleSubmitPassCode();
      setTimeout(()=>{
        if (JSON.stringify(passcode1) === firstPassword1){
          // handleClearPassCode1();
          AsyncStorage.setItem('secondPass',JSON.stringify(passcode1))
          
          handleSubmitPassCode1();
          setModalVisible(false)
        }else {
          createTwoButtonAlert1()
          handleClearPassCode1();
        }
        
        // handleSubmitPassCode();
      },50)
    }
  }, [passcode1]);



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

  const onPressNumber1 = (num) => {
    let tempPassCode = [...passcode1];
    for(let i=0; i < tempPassCode.length; i++){
      if(tempPassCode[i] == '' ){
        tempPassCode[i]=num;
        // console.log(typeof(num))
        break;
      }else{
        continue;
      }
    }
    setPasscode1(tempPassCode)
  }

  const onPressBack1 =(num)=>{
    let tempPassCode = [...passcode1];
    for(let i=tempPassCode.length-1;i>=0;i--){
      if(tempPassCode[i]!=''){
        tempPassCode[i]='';
        break;
      }else{
        continue;
      }
    }
    setPasscode1(tempPassCode);
}


let numbers = [
  {num: 1},{num: 2},{num: 3},{num: 4},{num: 5},
  {num: 6},{num: 7},{num: 8},{num: 9},
  {id: 100, num: ' '},
  {id: 110, num: `0` }
]

const handleSubmitPassCode = () => {
  handleClearPassCode();
  // navigation.navigate('RepBiometricScreen')
  setModalVisible(true)
}
const handleClearPassCode = () => {
  setPasscode(['','','','']);
}


const handleSubmitPassCode1 = () => {
    setModalVisible(false)
    setModalVisible1(true)
    // navigation.navigate('HomeScreen')
}
const handleClearPassCode1 = () => {
  setPasscode1(['','','','']);
}

return (
  <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
  <StatusBar style={isDarkMode === true ? 'dark' : 'light'} />

  <View style={{ opacity : iin !== null && seconPass !== '' ? 0.1 : 1, marginTop: Platform.OS === 'ios' ? 40 : 40 }}>
  <View style={styles.swipe}>
    <View style={{marginTop: 50}}>
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
      <Text style={[styles.passCodeText, {color: theme.color}]}>{i18n.t('bioText')}</Text>
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

      <TouchableOpacity style={styles.number} key={Math.random()} 
      >
        <Text style={[styles.numberText, {color: theme.color}]}></Text>
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



  <Modal
        animationType="none"
        transparent={false}
        visible={modalVisible}
        // onRequestClose={() => {
        //   setModalVisible(!modalVisible);
        // }}
      >
        <View style={{width:windowWidth, height:windowHeight, backgroundColor: theme.background}}>

          <View>
            <View style={{marginLeft: 30, marginTop:40}}>
              {/* <Text>
                X
              </Text> */}
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons name="ios-chevron-back" size={23} color={isDarkMode === true ? 'white' : "#D64D43"} />
              </TouchableOpacity>
            </View>
  <View style={styles.swipe}>
   
    <View style={{marginTop: -25}}>
    {/* <Pressable
              // style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Hide Modal</Text>
            </Pressable> */}
           
            
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
      <Text style={[styles.passCodeText, {color: theme.color}]}> {i18n.t('bioTextRep')} </Text>
      </View>
      <View style={styles.codeContainer}>
        {
          passcode1.map(p=>{
            return <View style={p != '' ? [styles.code2, {backgroundColor: isDarkMode === true ? "#C0D5EE":"#D64D43"}]: [styles.code1, {backgroundColor: isDarkMode === true ? "grey":"rgba(0,0,0,0.12)"}]} key={p+Math.random()}></View>
          })
        }
      </View>
    </View>
  </View>
  <View style={{alignItems: 'center', justifyContent:'center'}}>
  <View style = {styles.numbersContainer1}>
    {/* {numbers.map(num=>{
      return ( 
      <TouchableOpacity style={styles.number} key={num.id} 
      onPress = {()=> onPressNumber(num.num)}
      >
        <Text style={styles.numberText}>{num.num}</Text>
      </TouchableOpacity>)
    })} */}

    <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[0].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[0].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[1].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[1].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[2].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[2].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[3].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[3].num}</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[4].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[4].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[5].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[5].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[6].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[6].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[7].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[7].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[8].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[8].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      >
        <Text style={styles.numberText}></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[10].num)}
      >
        <Text style={[styles.numberText, {color: theme.color}]}>{numbers[10].num}</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber(numbers[10].num)}
      >
        <Text style={styles.numberText}>{numbers[10].num}</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.number} key={Math.random()} onPress={()=>onPressBack1() }>
      <Text style={styles.numberText}> <Feather name="delete" size={32} color={theme.color} /> </Text>
    </TouchableOpacity>
  </View>
</View>
</View>
          


            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
          
        </View>

  </Modal>


  
  <Modal
        animationType="none"
        transparent={false}
        visible={modalVisible1}
        // onRequestClose={() => {
        //   setModalVisible(!modalVisible);
        // }}
      >
        <View style={{flex: 1, justifyContent:'center', alignItems:'center', backgroundColor: theme.background}}>
        <View style={{alignItems:'center'}}><Text style={{fontSize:18, fontWeight:'bold', color:theme.color}}>Touch ID / Face ID</Text></View>
        {/* <Image 
        source={require('../../../assets/iconoir_face-id.png')}
        style={{width: 70, height: 70}}
      /> */}
          
        <Ionicons name="ios-finger-print-outline" size={70} color={isDarkMode === true ? "#C0D5EE" : "#D64D43"} style={{marginTop: 50}} />
        <View style={{width:windowWidth-60, marginTop: 30, justifyContent:'center'}}>
        <Text style={{fontSize: 19, textAlign:'center', lineHeight: 30, color: theme.color}}>
          {i18n.t('bioTextTouch')}
        </Text>
        <View style={{justifyContent:'center', marginTop:50}}>
          <TouchableOpacity style={{backgroundColor: isDarkMode === true ? "#C0D5EE" : "#D64D43", width: '100%', height:50, alignItems:'center', justifyContent:'center', marginRight: 10, borderRadius: 10}} onPress={() =>{setModalVisible1(!modalVisible1),navigation.navigate('HomeScreen')}} >
            <Text style={{color:theme.background, fontSize: 18, fontWeight: '500'}}>{i18n.t('bioTextTouchId')}</Text>
          </TouchableOpacity>          
        </View>
        </View>
        </View>

      </Modal>

</SafeAreaView>
)
}



const styles = StyleSheet.create({
  container: {
    flex: 1
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
  },
  code2: {
    width: 13,
    height: 13,
    borderRadius: 13
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
    marginTop: 35,
    width: 282,
    height: 348,
    alignItems: 'center',
    justifyContent: 'center',

  },

  numbersContainer1:{
    flexDirection: 'row',
    flexWrap:'wrap',
    marginTop: -17,
    width: 282,
    height: 348,
    alignItems: 'center',
    justifyContent: 'center',

  },
  numberText: {
    fontSize: 32,
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































// import { Text, View, StyleSheet, Image, StatusBar, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
// import React, { Component } from 'react'
// import { Ionicons } from '@expo/vector-icons'; 
// import { Feather } from '@expo/vector-icons';
// import * as LocalAuthentication from 'expo-local-authentication'
// import AsyncStorage from '@react-native-async-storage/async-storage';


// export class BiometricScreen extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       passcode: [{id: 1, dot:''},{id: 2, dot:''},{id: 3, dot:''},{id: 4, dot:''}]
//     }
//   }


//    async authenticate() {
//     const result = await LocalAuthentication.authenticateAsync(LocalAuthentication.AuthenticationType.FINGERPRINT)
// }


  

//   _onPressNumber = num => {
//     let tempCode = this.state.passcode
//     for(let i = 0; i< tempCode.length; i++){
//       if(tempCode[i].dot == ''){
//         tempCode[i].dot = num
//         break
//       } else {
//         continue
//       }
//     }
//     this.setState({passcode: tempCode})
//     console.log(this.state.passcode)
//   }

//   _onPressCancel = () => {
//     let tempCode = this.state.passcode
//     for(var i = tempCode.length-1; i>=0; i--){
//       if(tempCode[i].dot != ''){
//         tempCode[i].dot = ''
//         break
//       }else{
//         continue
//       }
//     }
//     this.setState({passcode: tempCode})
//     AsyncStorage.setItem('passcode', JSON.stringify(this.state.passcode))
//     let a = AsyncStorage.getItem('passcode')
//     console.log(a)
//   }


//   render() {
//     let numbers = [
//       {id: 10, num: 1},{id: 20, num: 2},{id: 30, num: 3},{id: 40, num: 4},{id: 50, num: 5},
//       {id: 60, num: 6},{id: 70, num: 7},{id: 80, num: 8},{id: 90, num: 9},
//        {id: 100, num: <TouchableOpacity onPress={()=>this.authenticate()} ><Ionicons name="finger-print" size={32} color="black" /></TouchableOpacity>  },
//       {id: 110, num: 0},
//       { id: 120, 
//         num: <TouchableOpacity onPress={()=>this._onPressCancel()}>
//         <Feather name="delete" size={32} color="black" />
//         </TouchableOpacity> }
//     ]

//     return (
//       <SafeAreaView style={styles.container}>
//           <View style={styles.swipe}>
//             <View style={{marginTop: 100}}>
//               <Image 
//                 source={require('../../assets/bxs_lock-open-alt.png')}
//                 style={{width: 50, height: 50}}
//               />
//             </View>
//             <View style={{marginTop: 40}}>
//               <View>
//               <Text style={styles.passCodeText}>Введите код доступа</Text>
//               </View>
//               <View style={styles.codeContainer}>
//                 {
//                   this.state.passcode.map(p=>{
//                     let style = p.dot != '' ? styles.code2: styles.code1
//                     return <View style={style} key={p.id}></View>
//                   })
//                 }
//               </View>
//             </View>
//           </View>
//           <View style={{alignItems: 'center', justifyContent:'center'}}>
//           <View style = {styles.numbersContainer}>
//             {numbers.map(num=>{
//               return ( 
//               <TouchableOpacity style={styles.number} key={num.id} 
//               onPress = {()=> this._onPressNumber(num.num)}
//               >
//                 <Text style={styles.numberText}>{num.num}</Text>
//               </TouchableOpacity>)
//             })}
//           </View>
//         </View>
//         {/* <View style= {styles.buttons}>
//           <TouchableOpacity>
//             <Text style={styles.buttonText}>Забыли код?</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={()=>this._onPressCancel()}>
//             <Text style={styles.buttonText}>Отмена</Text>
//           </TouchableOpacity>
//         </View> */}
    
 
//       </SafeAreaView>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   }, 

//   swipe: {
//     height: 173,
//     alignItems:'center',
//     justifyContent: 'center'
//   }, 
//   passCodeText: {
//     fontSize: 22,
//     letterSpacing: 0.34,
//     lineHeight: 25
//   },
//   codeContainer: {
//     marginTop: 12,
//     flexDirection: 'row',
//     alignItems:'center',
//     justifyContent: 'space-around'
//   },
//   code1: {
//     width: 13,
//     height: 13,
//     borderRadius: 13,
//     backgroundColor: 'rgba(0,0,0,0.12)'
//   },
//   code2: {
//     width: 13,
//     height: 13,
//     borderRadius: 13,
//     backgroundColor: '#D64D43'
//   },
//   number:{
//     width: 75,
//     height: 75,
//     borderRadius: 75,
//     margin: 9,
//     // backgroundColor: 'rgba(204,32,20,0.1)',
//     justifyContent:'center',
//     alignItems:'center',
//   },
//   numbersContainer:{
//     flexDirection: 'row',
//     flexWrap:'wrap',
//     marginTop: 58,
//     width: 282,
//     height: 348,
//     alignItems: 'center',
//     justifyContent: 'center',

//   },
//   numberText: {
//     fontSize: 32,
//     color: "black",
//     letterSpacing: 0,
//     textAlign: 'center'
//   },
//   buttons: {
//     marginTop: 73,
//     marginLeft:46,
//     marginRight:46,
//     flexDirection: 'row',
//     alignItems:'center',
//     justifyContent: 'space-between'
//   },
//   buttonText: {
//     fontSize:16,
//     letterSpacing: -0.39,
//     textAlign: 'center'
//   }
// })

// export default BiometricScreen


// import * as LocalAuthentication from 'expo-local-authentication';
// import * as React from 'react';
// import { Button, Text, View } from 'react-native';



// const Colors = {   CANCELLED :'CANCELLED',
// DISABLED : 'DISABLED',
// ERROR : 'ERROR',
// SUCCESS : 'SUCCESS', };

// export function BiometricScreen () {

//   const [facialRecognitionAvailable, setFacialRecognitionAvailable] = React.useState(false);
//   const [fingerprintAvailable, setFingerprintAvailable] = React.useState(false);
//   const [irisAvailable, setIrisAvailable] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);
//   const [result, setResult] = React.useState(Colors);

  
//   const checkSupportedAuthentication = async () => {
//     const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
//     if (types && types.length) {
//       setFacialRecognitionAvailable(types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION));
//       setFingerprintAvailable(types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT));
//       setIrisAvailable(types.includes(LocalAuthentication.AuthenticationType.IRIS));
//     }
//   };


//   const authenticate = async () => {
//     if (loading) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const results = await LocalAuthentication.authenticateAsync();

//       if (results.success) {
//         setResult(Colors.SUCCESS);
//       } else if (results.error === 'unknown') {
//         setResult(Colors.DISABLED);
//       } else if (
//         results.error === 'user_cancel' ||
//         results.error === 'system_cancel' ||
//         results.error === 'app_cancel'
//       ) {
//         setResult(Colors.CANCELLED);
//       }
//     } catch (error) {
//       setResult(Colors.ERROR);
//     }

//     setLoading(false);
//   };

//   React.useEffect(() => {
//     checkSupportedAuthentication();
//   }, []);

//   let resultMessage;
//   switch (result) {
//     case Colors.CANCELLED:
//       resultMessage = 'Authentication process has been cancelled';
//       break;
//     case Colors.DISABLED:
//       resultMessage = 'Biometric authentication has been disabled';
//       break;
//     case Colors.ERROR:
//       resultMessage = 'There was an error in authentication';
//       break;
//     case Colors.SUCCESS:
//       resultMessage = 'Successfully authenticated';
//       break;
//     default:
//       resultMessage = '';
//       break;
//   }

//   let description;
//   if (facialRecognitionAvailable && fingerprintAvailable && irisAvailable) {
//     description = 'Authenticate with Face ID, touch ID or iris ID';
//   } else if (facialRecognitionAvailable && fingerprintAvailable) {
//     description = 'Authenticate with Face ID or touch ID';
//   } else if (facialRecognitionAvailable && irisAvailable) {
//     description = 'Authenticate with Face ID or iris ID';
//   } else if (fingerprintAvailable && irisAvailable) {
//     description = 'Authenticate with touch ID or iris ID';
//   } else if (facialRecognitionAvailable) {
//     description = 'Authenticate with Face ID';
//   } else if (fingerprintAvailable) {
//     description = 'Authenticate with touch ID ';
//   } else if (irisAvailable) {
//     description = 'Authenticate with iris ID';
//   } else {
//     description = 'No biometric authentication methods available';
//   }

  
//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>
//         {description}
//       </Text>
//       {facialRecognitionAvailable || fingerprintAvailable || irisAvailable ? (
//         <Button onPress={authenticate} title='Authenticate'>
//         </Button>
//       ) : null}
//       {resultMessage ? <Text>{resultMessage}</Text> : null}
//     </View>
//     )

// }

// export default BiometricScreen