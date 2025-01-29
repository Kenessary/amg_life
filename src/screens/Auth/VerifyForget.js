import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import qs from "qs";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomSheet } from "react-native-btr";
import PhoneInputComponent from "../../components/PhoneInput";
import OTPScreen from "../../components/OTPScreen";
import { UIActivityIndicator, WaveIndicator } from "react-native-indicators";
import themeContext from "../../cores/themeContext";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import COLORS from "../../cores/theme";
import { TextInput } from "react-native-paper";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../languages/localizations";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../styles/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function VerifyForget({ check }) {
  const navigation = useNavigation();

  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    if (locale !== "") {
      AsyncStorage.setItem("appLanguage", locale);
    }
  });

  useEffect(() => {
    getData();
  });

  const getData = () => {
    try {
      AsyncStorage.getItem("appLanguage").then((value) => {
        if (value != null) {
          //   console.log(value)
          setLang(value);
        }
      });
      // setIsLoading(false)
    } catch (error) {
      // setIsLoading(false)
      console.log(error);
    }
  };

  const [isWhatsNumber, setIsWhatsNumber] = useState(true);
  const [phoneNumber1, setPhoneNumber1] = useState("");
  // console.log(check === 'pass')

  const [otp, setOTP] = useState("");
  const [timer, setTimer] = useState(60);
  const timerText = i18n.t("getCodeRetry");

  useEffect(() => {
    if (visible1 === true) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  const formatTimer = (timer) => {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleResendCode = () => {
    if (timer === 0) {
      setTimer("");
    }
    setTimer(60);
    getNumbers();
  };

  const [otp1, setOTP1] = useState("");
  const [otp2, setOTP2] = useState("");
  const [otp3, setOTP3] = useState("");
  const [otp4, setOTP4] = useState("");
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  const handleVerifyOTP = () => {
    const otp = otp1 + otp2 + otp3 + otp4;
    setIsLoading(true);
    if (otp === code) {
      Alert.alert(i18n.t("successVerify"), i18n.t("successVerifyText"), [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("RestorePassword");
            setVisible1(false);
            setTimer(60);
            setOTP1("");
            setOTP2("");
            setOTP3("");
            setOTP4("");
          },
        },
      ]);
      setIsLoading(false);
    } else {
      Alert.alert(i18n.t("errorVerify"), i18n.t("errorVerifyText"));
      setIsLoading(false);
    }
  };

  const handleBackspace = (ref, setOTP) => {
    if (ref.current.isFocused() && !otp) {
      if (ref === input4Ref) {
        input3Ref.current.focus();
      } else if (ref === input3Ref) {
        input2Ref.current.focus();
      } else if (ref === input2Ref) {
        input1Ref.current.focus();
      }
    } else {
      setOTP((prevOTP) => prevOTP.slice(0, prevOTP.length - 1));
    }
  };

  const handleOTPChange = (ref, setOTP, text) => {
    setOTP(text.replace(/[^0-9]/g, "").slice(0, 1));
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

  const handlePhoneNumberChange = (phoneNumber) => {
    setPhoneNumber1(phoneNumber);
  };

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  // console.log(globalThis.type)к

  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const { iin } = useContext(AuthContext);
  const [respass, setresPass] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isSendMessage, setIsSendMessage] = useState("");

  // const restorePass = () => {
  //     setIsLoading(true)
  //     const data = qs.stringify({
  //       'infoiin': iin
  //     });
  //     const config = {
  //       method: 'post',
  //       url: 'http://95.57.218.120/?index',
  //       headers: {
  //         'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=',
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       },
  //       data : data
  //     };
  //     axios(config)
  //     .then(async function(response){
  //         let user = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
  //         let parsed = JSON.parse(user)
  //         let telephone = parsed.tel
  //         if (telephone === null){
  //             setresPass(telephone)
  //             AsyncStorage.setItem('restorepass', JSON.stringify(telephone))

  //         }
  //         setresPass(telephone)
  //         AsyncStorage.setItem('restorepass', JSON.stringify(telephone))
  //         setIsLoading(false)

  //     })

  //     .catch(function(error){
  //         console.log(error)
  //         setIsLoading(false)
  //     })
  // }

  useEffect(() => {
    // setIsLoading(true)
    setVisible1(false);
    const data = qs.stringify({
      infoiin: iin,
    });
    const config = {
      method: "post",
      url: "http://95.57.218.120/?index",
      headers: {
        Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(async function (response) {
        let user = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        let parsed = JSON.parse(user);
        let telephone = parsed.tel;
        if (telephone === null) {
          setresPass(telephone);
          AsyncStorage.setItem("restorepass", JSON.stringify(telephone));
        }
        setresPass(telephone);
        AsyncStorage.setItem("restorepass", JSON.stringify(telephone));
        // setIsLoading(false)
      })

      .catch(function (error) {
        console.log(error);
        // setIsLoading(false)
      });
  }, []);

  //   useEffect(()=>{
  //     setIsLoading(true)
  //     setVisible1(false)
  //     setIsLoading(false)
  // },[])

  // setVisible1(false)

  const getNumbers = () => {
    setIsLoading(true);
    const config = {
      method: "get",
      url: `http://95.57.218.120/?apitest.helloAPI515={}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        let parse_first = JSON.parse(info);
        let parse_second = parse_first.response;
        let recCode = JSON.parse(parse_second).status;
        setCode(recCode);
        const telphone = globalThis.respass.slice(1);
        const slicedPhone = phoneNumber1.slice(2);

        let data = `{\r\n    "chatId":"${
          isWhatsNumber === true ? "7" + telphone : "7" + slicedPhone
        }@c.us",\r\n    "message":"${i18n.t(
          "codeVerifyTitle"
        )}: ${recCode}"\r\n}`;

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://api.green-api.com/waInstance7103843536/sendMessage/9b4b62a22d4f46eaa6598d12b8a1a69a1293ab4375eb47fbbc",
          headers: {
            "Content-Type": "text/plain",
          },
          data: data,
        };
        axios(config)
          .then(function (response) {
            let idMess = response.data;
            console.log(idMess.idMessage);
            if (idMess !== "") {
              setVisible1(true), setIsWhatsNumber(true);
            }
            setIsSendMessage(idMess);
            setIsLoading(false);
          })
          .catch(function (error) {
            console.log(error);
            // setModalVisible2(false)
            setIsLoading(false);
          });
        //   setIsLoading(false)
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  // console.log()

  if (globalThis.respass.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.white,
        }}
      >
        <WaveIndicator key={Math.random()} color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        <View
          style={[
            styles.bottomNavigationView,
            { backgroundColor: Colors.white },
          ]}
        >
          <View style={{ width: "90%", marginTop: 15 }}>
            <Text
              style={{
                fontSize: 18,
                color: Colors.smoothBlack,
                fontWeight: "400",
              }}
            >
              {i18n.t("isnotverifidenumbertext")}
            </Text>
            <TouchableOpacity
              style={{
                height: 40,
                backgroundColor: "#2DA010",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginTop: 40,
                borderRadius: 10,
              }}
              onPress={() => Linking.openURL(`tel:${87132766272}`)}
            >
              <Ionicons name="md-call" size={18} color="white" />
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "500",
                  marginLeft: 7,
                }}
              >
                {i18n.t("call")}{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>

      <View style={{ backgroundColor: Colors.white, marginTop: 30 }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={{
            marginLeft: 30,
            marginTop: 30,
            display: visible1 === false ? "flex" : "none",
          }}
        >
          <AntDesign
            name="closesquare"
            size={24}
            color={Colors.grey}
            style={{ opacity: 0.5 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => (
            setVisible1(false), setIsSendMessage(""), setTimer(60)
          )}
          style={{
            marginLeft: 30,
            marginTop: 30,
            display: visible1 === true ? "flex" : "none",
          }}
        >
          <AntDesign
            name="leftsquare"
            size={24}
            color={Colors.grey}
            style={{ opacity: 0.5 }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "center",
          paddingTop: 20,
          backgroundColor: Colors.white,
        }}
      >
        <Text
          style={{ color: Colors.smoothBlack, fontSize: 20, fontWeight: "600" }}
        >
          {visible1 === false
            ? i18n.t("userCheckTitle")
            : i18n.t("codeVerifyTitle")}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          display: visible1 === false ? "flex" : "none",
          backgroundColor: Colors.white,
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ScrollView
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 5,
              paddingHorizontal: 20,
            }}
          >
            {/* <View style={{backgroundColor:'#BAE6FD', flexDirection:'row', borderRadius: 15, marginTop: 20}}>
                  <View style={{width: '20%', height:'100%', padding: 18, paddingTop:25}}>
                    <AntDesign name="exclamationcircle" size={30} color="#007FDB" />
                  </View>
                  <View style={{width: '80%',padding: 18, paddingLeft: 0, paddingTop: 25}}>
                    <Text style={{textAlign:'left', color: COLORS.black}}>
                    Код подтверждения будет отправлен на ваш номер WhatsApp(ватсап).
                    </Text>
                  </View>
                </View> */}
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                marginTop: 10,
                color: Colors.smoothBlack,
              }}
            >
              {i18n.t("whatsappWarning")}
            </Text>

            {/* <Text style={{fontWeight:'400', color:COLORS.black, fontSize: 16, marginTop: 10}}>
                  Көрсетілген нөмір сіздің WhatsApp(ватсап) нөміріңіз бе?
                </Text> */}
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: Colors.smoothBlack,
                  fontSize: 19,
                  marginTop: 40,
                  textDecorationLine: "underline",
                }}
              >
                {"+7" + globalThis.respass.slice(1)}
              </Text>

              {globalThis.verTick === true ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#B0F9AA",
                    padding: 5,
                    paddingLeft: 7,
                    paddingRight: 7,
                    borderRadius: 5,
                    marginTop: 12,
                  }}
                >
                  <AntDesign name="checkcircle" size={14} color="#0E8204" />

                  <Text
                    style={{
                      fontSize: 14,
                      marginLeft: 5,
                      color: "#0E8204",
                      fontWeight: "500",
                    }}
                  >
                    {" "}
                    {i18n.t("verifidenumber")}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FDE1BF",
                    padding: 5,
                    paddingLeft: 7,
                    paddingRight: 7,
                    borderRadius: 5,
                    marginTop: 12,
                  }}
                >
                  <AntDesign
                    name="exclamationcircle"
                    size={14}
                    color="#BE6906"
                  />

                  <Text
                    style={{
                      fontSize: 14,
                      marginLeft: 5,
                      color: "#BE6906",
                      fontWeight: "500",
                    }}
                  >
                    {i18n.t("notverifidenumber")}
                  </Text>
                </View>
              )}

              {/* <Text style={{fontWeight:'bold', color: theme.color, fontSize: 19, marginTop: 40, textDecorationLine:'underline'}}>
                    {JSON.stringify(globalThis.verTick)}
                  </Text> */}
              {/* <Text >{globalThis.verTick}</Text> */}
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 150,
              }}
            >
              <TouchableOpacity
                disabled={isLoading === false ? false : true}
                style={{
                  backgroundColor:
                    isLoading === false ? Colors.primary : "#B8B8B8",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  height: 40,
                  width: 200,
                }}
                onPress={() => getNumbers()}
              >
                {isLoading === false ? (
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      color: Colors.white,
                    }}
                  >
                    {i18n.t("getCodeText")}
                  </Text>
                ) : (
                  <UIActivityIndicator color="white" size={25} />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  marginTop: 15,
                }}
                onPress={() => (setVisible(true), setIsWhatsNumber(false))}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: Colors.primary,
                    textDecorationLine: "underline",
                  }}
                >
                  {i18n.t("isnotverifidenumber")}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          display: visible1 === true ? "flex" : "none",
          backgroundColor: Colors.white,
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ScrollView
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 5,
              paddingHorizontal: 20,
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  fontWeight: "400",
                  color: Colors.smoothBlack,
                  fontSize: 16,
                  marginTop: 10,
                }}
              >
                {i18n.t("codeVerifySubTitle")}
              </Text>
            </View>
            {/* <OTPScreen receivedCode={code} resend={getNumbers}/> */}

            <View style={styles.container}>
              <View style={styles.otpContainer}>
                <TextInput
                  ref={input1Ref}
                  value={otp1}
                  onChangeText={(text) =>
                    handleOTPChange(input1Ref, setOTP1, text)
                  }
                  keyboardType="numeric"
                  maxLength={1}
                  style={styles.otpInput}
                />
                <TextInput
                  ref={input2Ref}
                  value={otp2}
                  onChangeText={(text) =>
                    handleOTPChange(input2Ref, setOTP2, text)
                  }
                  keyboardType="numeric"
                  maxLength={1}
                  style={styles.otpInput}
                />
                <TextInput
                  ref={input3Ref}
                  value={otp3}
                  onChangeText={(text) =>
                    handleOTPChange(input3Ref, setOTP3, text)
                  }
                  keyboardType="numeric"
                  maxLength={1}
                  style={styles.otpInput}
                />
                <TextInput
                  ref={input4Ref}
                  value={otp4}
                  onChangeText={(text) =>
                    handleOTPChange(input4Ref, setOTP4, text)
                  }
                  keyboardType="numeric"
                  maxLength={1}
                  style={styles.otpInput}
                />
              </View>

              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  disabled={isLoading === false ? false : true}
                  style={{
                    width: 260,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:
                      isLoading === false ? Colors.primary : "#B8B8B8",
                    borderRadius: 15,
                  }}
                  onPress={handleVerifyOTP}
                >
                  {/* <Text style={{ color:theme.background, fontSize:16, fontWeight:'600'}}>Подтвердить</Text> */}

                  {isLoading === false ? (
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      {i18n.t("submit")}
                    </Text>
                  ) : (
                    <UIActivityIndicator color="white" size={30} />
                  )}
                </TouchableOpacity>

                {/* <TouchableOpacity disabled={isLoadingVerify === false ? false : true} style={{ height:50, backgroundColor: isLoadingVerify === false ? theme.loading : '#B8B8B8' , alignItems:'center', justifyContent:'center', borderRadius:10}} onPress={()=>{validateVerify()}}>
                    {
                        isLoadingVerify === false 
                        ? <Text style={{fontSize:16, fontWeight:'600', color: theme.background}}>Далее</Text> 
                        : <UIActivityIndicator color="white" size={30}/>
                    }
                    
                </TouchableOpacity> */}
              </View>

              <Text
                style={[
                  styles.timerText,
                  {
                    display: timer !== 0 ? "flex" : "none",
                    color: Colors.smoothBlack,
                  },
                ]}
              >
                {timerText} {formatTimer(timer)}
              </Text>
              {timer === 0 && (
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 15,
                  }}
                  onPress={handleResendCode}
                >
                  <Text
                    style={{
                      textDecorationLine: "underline",
                      color: Colors.smoothBlack,
                    }}
                  >
                    {i18n.t("getCodeText")}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    width: "30%",
    height: 40,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
  },
  bottomNavigationView: {
    width: "100%",
    height: 250,
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "white",
  },
  buttonSelectedContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "tomato",
    borderWidth: 2,
    width: "30%",
    height: 40,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
  },
  text: {
    fontSize: 14,
    color: "#4D4D4D",
    paddingVertical: 4,
  },
  selectedText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4D4D4D",
    paddingVertical: 4,
  },

  TextInputView: {
    borderBottomWidth: 1,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  TextInputText: {
    fontSize: 30,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
    color: "black",
  },

  underlineStyleBase: {
    width: 55,
    height: 55,
    color: COLORS.black,
    borderWidth: 3,
    fontSize: 22,
    borderRadius: 10,
    // borderBottomWidth: 1,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: windowWidth - 50,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 4,
  },
  button: {
    borderRadius: 8,
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    elevation: 2,
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
    fontSize: 16,
  },
  modalText: {
    marginBottom: 25,
    textAlign: "center",
    fontSize: 18,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  underlineStyleHighLighted: {
    borderColor: "#D64D43",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  otpInput: {
    width: 56,
    height: 56,
    marginHorizontal: 5,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "#7b7b7b",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "white",
    color: "#7b7b7b",
  },
  submitButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  submitButton: {
    width: 260,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D64D43",
    borderRadius: 15,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  timerText: {
    marginTop: 15,
    fontSize: 14,
    color: "#333",
  },
});
