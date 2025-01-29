import {
  Modal,
  ScrollView,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Pressable,
  Linking,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, {
  Component,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { AuthContext } from "../../context/AuthContext";
import Input from "../../components/Input";
import Buttons from "../../components/Buttons";
import COLORS from "../../cores/theme";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import qs from "qs";
import axios from "axios";
import { WaveIndicator } from "react-native-indicators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../languages/localizations";
// import PhoneInput from '../../components/PhoneInput'
import PhoneInputComponent from "../../components/PhoneInput";
import { TextInput } from "react-native-paper";
import OTPScreen from "../../components/OTPScreen";
import { Colors } from "../../styles/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function RestorePassword({ navigation, iinfor }) {
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
    getData1();
  });

  const getData1 = () => {
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

  const { iin, logoutRes, restoreIin, newPassword, logout } =
    useContext(AuthContext);
  const [respass, setresPass] = useState("");
  const [randomNumber, setRandomNumber] = useState("");
  const [inputsRenew, setInputsRenew] = useState({ parol: "", parol2: "" });
  const [inputs4, setInputs4] = useState({ code: "" });
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [modalVisible5, setModalVisible5] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setActive] = useState(false);
  const [errorsRenew, setErrorsRenew] = useState({});
  const [errorsCode, setErrorsCode] = useState({});
  const [isCode, setIsCode] = useState("");
  const [codeField, setCodeField] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // console.log(globalThis.resiin, "from login page");
  const [isLoadinChangePassword, setIsLoadingChangePassword] = useState(false);
  const [newPasswords, setNewPasswords] = useState("");

  const [code, setCode] = useState("");

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [isWhatsNumber, setIsWhatsNumber] = useState(true);

  const handlePhoneChange = (value) => {
    setPhoneNumber(value); // Update the local state with the unformatted phone number
  };

  useEffect(() => {
    setVisible2(true);
  }, []);

  // console.log(iin)
  const back = () => {
    logoutRes();
    setCodeField("");
    setRandomNumber("");
    setModalVisible3(false);
    setModalVisible4(false);
    setModalVisible5(false);
  };

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  const validateRenew = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputsRenew.parol) {
      handleErrorRenew(i18n.t("erPass"), "parol");
      valid = false;
    } else if (inputsRenew.parol.length < 4) {
      handleErrorRenew(i18n.t("passwordWarning5"), "parol");
      valid = false;
    }
    if (!inputsRenew.parol2) {
      handleErrorRenew(i18n.t("passwordRep"), "parol2");
      valid = false;
    } else if (inputsRenew.parol.length < 5) {
      handleErrorRenew(i18n.t("passwordWarning5"), "parol2");
      valid = false;
    } else if (inputsRenew.parol !== inputsRenew.parol2) {
      handleErrorRenew(i18n.t("passwordMatch"), "parol2");
      valid = false;
    }

    if (valid) {
      newPassword(
        globalThis.resiin,
        inputsRenew.parol,
        setIsLoadingChangePassword,
        setNewPasswords
      );
    }
  };

  useEffect(() => {
    if (newPasswords) {
      Alert.alert(
        "Успешно!", // Title of the alert
        `${newPasswords}`, // Message in the alert
        [
          {
            text: "OK",
            onPress: () => {
              back(), logout();
            },
          },
        ]
      );
    }
  }, [newPasswords]);

  const handleOnChange4 = (text, input) => {
    setInputs4((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleOnChangeRenew = (text, input) => {
    setInputsRenew((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleErrorRenew = (errorMessage, input) => {
    setErrorsRenew((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

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

        const telphone = respass.slice(1);
        const slicedPhone = phoneNumber1.slice(2);

        let data = `{\r\n    "chatId":"${
          isWhatsNumber === true ? "7" + telphone : "7" + slicedPhone
        }@c.us",\r\n    "message":"Код подтверждения: ${recCode}"\r\n}`;

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

  // console.log(globalThis.resiin);

  const restorePass = () => {
    setIsLoading(true);
    const data = qs.stringify({
      infoiin: globalThis.resiin,
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
        setIsLoading(false);
      })

      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };
  // console.log(randomNumber)

  useEffect(() => {
    restorePass();
  }, []);

  const handlePhoneNumberChange = (phoneNumber) => {
    setPhoneNumber1(phoneNumber);
  };

  const verification = () => {
    if (
      randomNumber != "" &&
      inputs4.code != "" &&
      randomNumber == inputs4.code
    ) {
      setModalVisible4(true);
    }
    if (
      randomNumber != "" &&
      inputs4.code != "" &&
      randomNumber != inputs4.code
    ) {
      setModalVisible4(false);
      Alert.alert(i18n.t("codeMatch"));
    }
    if (
      randomNumber === "" &&
      inputs4.code === "" &&
      randomNumber == inputs4.code
    ) {
      setModalVisible4(false);
    }
  };

  if (isLoading) {
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
    <View
      style={{
        backgroundColor: Colors.white,
        height: "100%",
        paddingTop: 30,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("LoginScreen")}
        style={{
          marginLeft: 30,
          marginTop: 30,
          display: visible1 === false ? "flex" : "none",
        }}
      >
        <AntDesign
          name="leftsquare"
          size={24}
          color={Colors.grey}
          style={{ opacity: 0.5 }}
        />
      </TouchableOpacity>

      <View style={{ opacity: modalVisible5 ? 0.3 : 1 }}>
        <View
          style={{
            marginVertical: 15,
            width: windowWidth - 60,
            marginLeft: 30,
          }}
        >
          <Input
            iconName="lock-outline"
            label={i18n.t("password")}
            error={errorsRenew.parol}
            onFocus={() => {
              handleErrorRenew(null, "parol");
            }}
            placeholder={i18n.t("passwordLabel")}
            password
            onChangeText={(text) => handleOnChangeRenew(text, "parol")}
          />
          <View style={{ marginTop: -15 }}>
            <Input
              iconName="lock-outline"
              label={i18n.t("passwordRep")}
              error={errorsRenew.parol2}
              onFocus={() => {
                handleErrorRenew(null, "parol2");
              }}
              placeholder={i18n.t("passwordLabel")}
              password
              onChangeText={(text) => handleOnChangeRenew(text, "parol2")}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={validateRenew}
              style={{
                width: "100%",
                padding: 15,
                backgroundColor: Colors.primary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
              }}
            >
              {isLoadinChangePassword ? (
                <ActivityIndicator color={Colors.white} size={"small"} />
              ) : (
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {i18n.t("renewParolChange")}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: -15 }}>
            {/* <Buttons title='send' onPress={sendToWhatsApp}/> */}
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible5}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  {i18n.t("renewParolCancelModal")}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={back}
                  >
                    <Text style={styles.textStyle}>{i18n.t("daYes")}</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible5(!modalVisible5)}
                  >
                    <Text style={styles.textStyle}>{i18n.t("netNo")}</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
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
    height: 400,
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
});
