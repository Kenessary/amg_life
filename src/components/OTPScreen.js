import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';

const OTPScreen = ({receivedCode, resend, generateCode, removeScreen}) => {
    const navigation = useNavigation();
    const [otp, setOTP] = useState('');
    const [timer, setTimer] = useState(60);
    const timerText = 'Отправить код повторно '

    useEffect(() => {
      const interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    const formatTimer = (timer) => {
        const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
        const seconds = (timer % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
      };
    
    const handleResendCode = () => {
        setTimer(60);
        resend()
    };


    const [otp1, setOTP1] = useState('')
    const [otp2, setOTP2] = useState('')
    const [otp3, setOTP3] = useState('')
    const [otp4, setOTP4] = useState('')
    const input1Ref = useRef(null)
    const input2Ref = useRef(null)
    const input3Ref = useRef(null)
    const input4Ref = useRef(null)


    const handleVerifyOTP = () => {
      const otp = otp1 + otp2 + otp3 + otp4;
        if (otp === receivedCode) {
            Alert.alert('Успешно!', 'Код правильный', [
                {
                  text: 'OK',
                  onPress: () => {navigation.navigate('ChangePassword')},
                },
              ]);
        } else {
          Alert.alert('Ошибка', 'Код неправильный, повторите снова')
        }
    }

    const handleBackspace = (ref, setOTP) => {
      if (ref.current.isFocused() && !otp) {
        if (ref === input4Ref) {
          input3Ref.current.focus()
        } else if (ref === input3Ref) {
          input2Ref.current.focus()
        } else if (ref === input2Ref) {
          input1Ref.current.focus()
        }
        } else {
          setOTP((prevOTP) => prevOTP.slice(0, prevOTP.length - 1))
        }
    }

    const handleOTPChange = (ref, setOTP, text) => {
      setOTP(text.replace(/[^0-9]/g, '').slice(0, 1));
        if (text.length === 1) {
          if (ref === input1Ref) {
            input2Ref.current.focus();
          } else if (ref === input2Ref) {
            input3Ref.current.focus();
          } else if (ref === input3Ref) {
            input4Ref.current.focus();
          }
        } else {
          handleBackspace(ref, setOTP);
        }
      };

      return(
        <View style={styles.container}>
          <View style={styles.otpContainer}>
            <TextInput
                ref={input1Ref}
                value={otp1}
                onChangeText={(text) => handleOTPChange(input1Ref, setOTP1, text)}
                keyboardType="numeric"
                maxLength={1}
                style={styles.otpInput}
            />
            <TextInput
                ref={input2Ref}
                value={otp2}
                onChangeText={(text) => handleOTPChange(input2Ref, setOTP2, text)}
                keyboardType="numeric"
                maxLength={1}
                style={styles.otpInput}
            />
            <TextInput
                ref={input3Ref}
                value={otp3}
                onChangeText={(text) => handleOTPChange(input3Ref, setOTP3, text)}
                keyboardType="numeric"
                maxLength={1}
                style={styles.otpInput}
            />  
            <TextInput
                ref={input4Ref}
                value={otp4}
                onChangeText={(text) => handleOTPChange(input4Ref, setOTP4, text)}
                keyboardType="numeric"
                maxLength={1}
                style={styles.otpInput}
            />  
          </View>

          <View style={{ alignItems:'center', justifyContent:'center', marginTop:10}}>
            <TouchableOpacity style={{ width:260, height:50, alignItems:'center', justifyContent:'center', backgroundColor:'#D64D43', borderRadius:15}} onPress={(handleVerifyOTP)}>
              <Text style={{ color:'white', fontSize:16, fontWeight:'600'}}>Подтвердить</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.timerText, {display: timer !== 0 ? 'flex' : 'none'}]}>
            {timerText}{formatTimer(timer)}
          </Text>
          {timer === 0 && (
            <TouchableOpacity style={{alignItems:'center', justifyContent:'center', marginTop: 15}} onPress={handleResendCode}>
              <Text style={{textDecorationLine:'underline', }}>Отправить код</Text>
            </TouchableOpacity>
)}
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    otpContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginVertical: 10,
    },
    otpInput: {
      width: 56,
      height: 56,
      marginHorizontal: 5,
      borderWidth: 3,
      borderRadius: 5,
      borderColor: '#7b7b7b',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor:'white',
      color:'#7b7b7b'
    },
    submitButtonContainer:{
      alignItems:'center', 
      justifyContent:'center', 
      marginTop:10
    },
    submitButton:{
      width:260, 
      height:50, 
      alignItems:'center', 
      justifyContent:'center', 
      backgroundColor:'#D64D43', 
      borderRadius:15
    },
    submitButtonText:{
      color:'white', 
      fontSize:16, 
      fontWeight:'600'
    },
    timerText: {
      marginTop: 15,
      fontSize: 14,
      color: '#333',
    },
  })

export default OTPScreen