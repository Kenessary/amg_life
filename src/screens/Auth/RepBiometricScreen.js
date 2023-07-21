import React, {useState, useEffect, useContext} from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Code from '../../components/Code';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../context/AuthContext';
// const getSerialNumbers = (count) => {
//   const numbersArray = [];
//   for(let i = 0; i < count; i++) {
//     numbersArray.push({
//       number:i.toString(),
//       isNumber: true
//     });
//   }
//   return numbersArray;
// }



export default function RepBiometricScreen({navigation}){
  const [passcode1, setPasscode1] = useState(['','','',''])
  const [secondPassword1, setSecondPassword1] = useState('')
  const [firstPassword1, setFirstPassword1] = useState('')
  // console.log(secondPassword)

  
  useEffect(()=>{
    getData1()
}, [passcode1])

  
useEffect(()=>{
  getData11()
}, [])


const createTwoButtonAlert1 = () =>
Alert.alert(
  "Код не совпадает",
  "Повторите попытку",
  [
    { 
        text: "Хорошо",
        onPress: () => console.log("Хорошо Pressed") 
    }
  ]
);


  useEffect(() => {
    if(!passcode1.includes('')) {
      // handleSubmitPassCode();
      setTimeout(()=>{
        if (JSON.stringify(passcode1) === firstPassword1){
          handleSubmitPassCode1();
        }else {
          createTwoButtonAlert1()
          handleClearPassCode1();
        }
        
        // handleSubmitPassCode();
      },500)
    }
  }, [passcode1]);


  const getData1 = () => { 
    try {
        AsyncStorage.getItem('secondPassword')
            .then(value => {
                if(value != null){
                    setSecondPassword1(value)
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

let numbers1 = [
  {num: 1},{num: 2},{num: 3},{num: 4},{num: 5},
  {num: 6},{num: 7},{num: 8},{num: 9},
  {id: 100, num: ' '},
  {id: 110, num: `0` }
]



const handleSubmitPassCode1 = () => {
    navigation.navigate('HomeScreen')
}
const handleClearPassCode1 = () => {
  setPasscode1(['','','','']);
}


return (
  <SafeAreaView style={styles.container}>

    <StatusBar style='dark' />
    {/* <Text>ef</Text> */}
  <View>
  <View style={styles.swipe}>
    <View style={{marginTop: 80}}>
      <Image 
        source={require('../../../assets/bxs_lock-open-alt.png')}
        style={{width: 50, height: 50}}
      />
    </View>
    <View style={{marginTop: 30}}>
      <View>
      <Text style={styles.passCodeText}>Повторите код {'\n'} для быстрого доступа</Text>
      </View>
      <View style={styles.codeContainer}>
        {
          passcode1.map(p=>{
            let style = p != '' ? styles.code2: styles.code1
            return <View style={style} key={p+Math.random()}></View>
          })
        }
      </View>
    </View>
  </View>
  <View style={{alignItems: 'center', justifyContent:'center'}}>
  <View style = {styles.numbersContainer}>
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
        <Text style={styles.numberText}>{numbers[0].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[1].num)}
      >
        <Text style={styles.numberText}>{numbers[1].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[2].num)}
      >
        <Text style={styles.numberText}>{numbers[2].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[3].num)}
      >
        <Text style={styles.numberText}>{numbers[3].num}</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[4].num)}
      >
        <Text style={styles.numberText}>{numbers[4].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[5].num)}
      >
        <Text style={styles.numberText}>{numbers[5].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[6].num)}
      >
        <Text style={styles.numberText}>{numbers[6].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[7].num)}
      >
        <Text style={styles.numberText}>{numbers[7].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[8].num)}
      >
        <Text style={styles.numberText}>{numbers[8].num}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      >
        <Text style={styles.numberText}></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber1(numbers[10].num)}
      >
        <Text style={styles.numberText}>{numbers[10].num}</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.number} key={Math.random()} 
      onPress = {()=> onPressNumber(numbers[10].num)}
      >
        <Text style={styles.numberText}>{numbers[10].num}</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.number} key={Math.random()} onPress={()=>onPressBack1() }>
      <Text style={styles.numberText}> <Feather name="delete" size={32} color="black" /> </Text>
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
    backgroundColor: 'white',
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
    color: "black",
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