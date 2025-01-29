import {
  Text,
  View,
  Dimensions,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Modal,
  Pressable,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import React, { Component, useContext, useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import qs from "qs";
import { UIActivityIndicator, WaveIndicator } from "react-native-indicators";
import { AuthContext } from "../../../context/AuthContext";
import Checkbox from "expo-checkbox";
import { BottomSheet } from "react-native-btr";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from "react-native";
import { TextInputOn } from "./TextInputOn";
import moment from "moment";
import { getListOngdu, getOneOngdu, sendFormOngdu } from "./api";
import { placeholder } from "i18n-js";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const data = [
  { label: "Скважина 5", value: "Скважина5" },
  { label: "Скважина 6", value: "Скважина6" },
];

export default function Ongdu({ navigation }) {
  const { iin } = useContext(AuthContext);

  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [oneDocument, setOneDocument] = useState("");

  const [isFocusedOilStart, setIsFocusedOilStart] = useState(false);
  let [inputs, setInputs] = useState({
    parameter1: "",
    parameter2: "",
    parameter3: "",
    parameter4: "",
    startOil: "",
    endOil: "",
    startGaz: "",
    endGaz: "",
    attention: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForSave, setIsLoadingForSave] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const [ispasssave, setIspasssave] = useState(false);
  globalThis.ispasssave = ispasssave;
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");
  let [oilPlotnost, setOilPlotnost] = useState("");
  let [statusRuch, setStatusRuch] = useState(false);
  let [statusRuchApi, setStatusRuchApi] = useState(false);
  const [isLoadingForOne, setIsLoadingForOne] = useState(false);

  const [oneDocId, setOneDocId] = useState("");

  // console.log(isDatePickerVisible)

  let [saved, setSaved] = useState("");
  let [send, setSend] = useState("");

  const [isFull, setIsFull] = useState(false);
  const [isFull1, setIsFull1] = useState(false);
  const [isShowBtns, setIsShowBtns] = useState(false);
  const [unId, setUnId] = useState("");

  const [showAlertOil, setShowAlertOil] = useState(false);

  const idUnique = moment().format(`YYYYMMDDhhmmss`);

  useEffect(() => {
    const idUnique = moment().format(`YYYYMMDDhhmmss`);
    setUnId(idUnique);
  }, []);

  const day = moment().format("DD.MM.YYYY");

  useEffect(() => {
    if (globalThis.isOneDoc === true) {
      getOneOngdu(
        globalThis.oneId,
        setIsLoadingForOne,
        setOneDocument,
        setIsFull1,
        setStatusRuchApi,
        inputs,
        setInputs,
        setStatusRuch,
        setStartDate,
        setEndDate,
        setValue,
        setOneDocId
      );
    }
  }, []);

  const resetAll = () => {
    setStatusRuch(false);
    setStartDate("");
    setEndDate("");
    setStatusRuchApi(false);
    const updatedInputs = {
      ...inputs,
      startOil: "",
      endOil: "",
      startGaz: "",
      endGaz: "",
    };
    setInputs(updatedInputs);
    toggleBottomNavigationView1();
    setIsContinue(false);
  };

  //   useEffect(()=>{
  //     // if(oneDocument !== ''){
  //     const aa = {...inputs, parameter1: globalThis.isOneDoc === true && oneDocument !== '' ? oneDocument[0].param1 : ''}
  //     globalThis.isOneDoc === true && oneDocument !== '' && setInputs(aa)
  //     // }

  //   },[])

  const resetInputarray = () => {
    const updatedInputs = {
      ...inputs,
      parameter1: "",
      parameter2: "",
      parameter3: "",
      parameter4: "",
    };
    setInputs(updatedInputs);
  };

  const continueEqualation = () => {
    if (
      startDate !== "" &&
      endDate !== "" &&
      inputs.startOil !== "" &&
      inputs.endOil !== "" &&
      inputs.startGaz !== "" &&
      inputs.endGaz !== ""
    ) {
      setStatusRuch(true),
        setIsFull(true),
        setIsContinue(true),
        toggleBottomNavigationView1();
    } else {
      setStatusRuch(true),
        setIsFull(false),
        setIsContinue(true),
        toggleBottomNavigationView1();
    }
  };

  useEffect(() => {
    if (
      startDate === "" &&
      endDate === "" &&
      inputs.startOil === "" &&
      inputs.endOil === "" &&
      inputs.startGaz === "" &&
      inputs.endGaz === ""
    ) {
      setIsShowBtns(false);
    } else {
      setIsShowBtns(true);
    }
  });

  const close = () => {
    if (
      startDate === "" &&
      endDate === "" &&
      inputs.startOil === "" &&
      inputs.endOil === "" &&
      inputs.startGaz === "" &&
      inputs.endGaz === ""
    ) {
      toggleBottomNavigationView1();
    } else {
      showTwoButtonAlert();
    }
  };

  const showTwoButtonAlert = () => {
    Alert.alert("Внимания", "Вы хотите сохранить ручной замер!?", [
      {
        text: "Нет",
        onPress: () => resetAll(),
        style: "cancel",
      },
      {
        text: "Продолжить и сохранить",
        onPress: () => continueEqualation(),
      },
    ]);
  };

  const inputsArray = [
    {
      name: "Рбуф",
      parameter: "parameter1",
      width: "47%",
      keyboard: "numbers-and-punctuation",
      multiline: false,
      height: 40,
      placeholder:
        globalThis.isOneDoc === true && oneDocument !== ""
          ? oneDocument[0].param1
          : inputs.parameter1,
    },
    {
      name: "Рм/к",
      parameter: "parameter2",
      width: "47%",
      keyboard: "numbers-and-punctuation",
      multiline: false,
      height: 40,
      placeholder:
        globalThis.isOneDoc === true && oneDocument !== ""
          ? oneDocument[0].param2
          : inputs.parameter2,
    },
    {
      name: "Рзлт",
      parameter: "parameter3",
      width: "47%",
      keyboard: "numbers-and-punctuation",
      multiline: false,
      height: 40,
      placeholder:
        globalThis.isOneDoc === true && oneDocument !== ""
          ? oneDocument[0].param3
          : inputs.parameter3,
    },
    {
      name: "Рлин",
      parameter: "parameter4",
      width: "47%",
      keyboard: "numbers-and-punctuation",
      multiline: false,
      height: 40,
      placeholder:
        globalThis.isOneDoc === true && oneDocument !== ""
          ? oneDocument[0].param4
          : inputs.parameter4,
    },
  ];

  const inputsAttention = [
    {
      name: "Примечания",
      parameter: "attention",
      width: "100%",
      keyboard: "default",
      multiline: true,
      height: 60,
      placeholder:
        globalThis.isOneDoc === true && oneDocument !== ""
          ? oneDocument[0].primechanie
          : inputs.attention,
    },
  ];

  const inputsOil = [
    {
      name: "Нефть показания\nначало",
      parameter: "startOil",
      width: "47%",
      keyboard: "numbers-and-punctuation",
      value: inputs.startOil,
      multiline: false,
      height: 40,
      placeholder:
        globalThis.isOneDoc === true && oneDocument !== ""
          ? oneDocument[0].ruchzamer1
          : inputs.startOil,
    },
    {
      name: "Нефть показания\nконец",
      parameter: "endOil",
      width: "47%",
      keyboard: "numbers-and-punctuation",
      value: inputs.endOil,
      multiline: false,
      height: 40,
      placeholder:
        globalThis.isOneDoc === true && oneDocument !== ""
          ? oneDocument[0].ruchzamer2
          : inputs.endOil,
    },
  ];
  const inputsGaz = [
    {
      name: "Газ показания\nначало",
      parameter: "startGaz",
      width: "47%",
      keyboard: "numbers-and-punctuation",
      value: inputs.startGaz,
      multiline: false,
      height: 40,
      placeholder:
        globalThis.isOneDoc === true && oneDocument !== ""
          ? oneDocument[0].ruchzamer4
          : inputs.startGaz,
    },
    {
      name: "Газ показания\nконец",
      parameter: "endGaz",
      width: "47%",
      keyboard: "numbers-and-punctuation",
      value: inputs.endGaz,
      multiline: false,
      height: 40,
      placeholder:
        globalThis.isOneDoc === true && oneDocument !== ""
          ? oneDocument[0].ruchzamer5
          : inputs.endGaz,
    },
  ];

  // console.log(startDate)

  const [visible, setVisible] = useState(false);

  // console.log(inputs.startGaz)

  //   const sendForm = (skvazhina, param1, param2) => {
  //     setIsLoading(true)
  //     const data = qs.stringify({
  //         'skvazhina': skvazhina ,
  //         'param1': param1,
  //         'param2': param2,
  //         'sendiin': iin,
  //         'guid1': ''
  //     })
  //     const config = {
  //         method: 'post',
  //         url: `http://95.57.218.120/?index`,
  //         headers: {
  //             'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=',
  //             'Content-Type': 'application/x-www-form-urlencoded'
  //           },
  //         data : data
  //     }
  //     axios(config)
  //     .then(function(response){
  //         let idMess = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
  //         setOutcome(JSON.parse(idMess))
  //         // console.log(idMess)
  //         setIsLoading(false)
  //         setIsVisible(true)
  //     })
  //     .catch(function(error){
  //         console.log(error)
  //         setIsLoading(false)
  //     })
  // }

  const backtolist = () => {
    navigation.navigate("OngduList", { shouldFetchData: true });
    globalThis.setIsOneDoc(false);
  };

  useEffect(() => {
    if (send.statussave === "Отправлено") {
      navigation.navigate("OngduList");
    }
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const datestr = new Date(date);
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };

    const localetime = datestr.toLocaleString("ru-RU", timeOptions);

    if (Platform.OS === "android") {
      const dateAndroid = new Date(localetime);
      const hours = dateAndroid.getHours();
      const minutes = dateAndroid.getMinutes();
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      setStartDate(formattedTime + ":00");
    } else {
      setStartDate(localetime + ":00");
    }

    hideDatePicker();
  };

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = (date) => {
    const datestr = new Date(date);

    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };

    const localetime = datestr.toLocaleString("ru-RU", timeOptions);

    if (Platform.OS === "android") {
      const dateAndroid = new Date(localetime);
      const hours = dateAndroid.getHours();
      const minutes = dateAndroid.getMinutes();
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      setEndDate(formattedTime + ":00");
    } else {
      setEndDate(localetime + ":00");
    }
    hideDatePicker1();
  };

  let date1 = new Date(`2023-01-01T${startDate}`);
  let date2 = new Date(`2023-01-01T${endDate}`);
  let timeDifference = (date2 - date1) / (1000 * 60);

  useEffect(() => {
    if (startDate.length !== 0 && endDate.length !== 0) {
      if (date1 > date2) {
        Alert.alert(
          "Ошибка",
          "Время конец замера не может быть меньше чем Время начало замера",
          [
            {
              text: "Изменить дату",
              onPress: () => setEndDate(""),
            },
          ],
          { cancelable: false }
        );
      }
    }
  });

  const startOilnum = Number(inputs.startOil);
  const endOilnum = Number(inputs.endOil);

  const startGaznum = Number(inputs.startGaz);
  const endGaznum = Number(inputs.endGaz);

  const isInvalidOil = inputs.endOil !== "" ? endOilnum < startOilnum : "";
  const isInvalidGaz = inputs.endGaz !== "" ? endGaznum < startGaznum : "";

  const calculateResultOil = () => {
    // Convert the input values to numbers and ensure default to 0 if empty
    const value1 = inputs.startOil ? Number(inputs.startOil) : 0;
    const value2 = inputs.endOil ? Number(inputs.endOil) : 0;

    const result = ((value2 - value1) / timeDifference) * 24 * 60;

    return result.toFixed(2); // Format the result to two decimal places
  };

  const resultOil =
    inputs.startOil !== "" &&
    inputs.endOil !== "" &&
    startDate !== "" &&
    endDate !== ""
      ? calculateResultOil()
      : endDate === ""
      ? ""
      : "0.00";

  const calculateResultGaz = () => {
    // Convert the input values to numbers and ensure default to 0 if empty
    const value1 = inputs.startGaz ? Number(inputs.startGaz) : 0;
    const value2 = inputs.endGaz ? Number(inputs.endGaz) : 0;

    const result = (((value2 - value1) / timeDifference) * 24 * 60) / resultOil;

    return result.toFixed(2); // Format the result to two decimal places
  };

  const resultGaz =
    inputs.startGaz !== "" && inputs.endGaz !== ""
      ? calculateResultGaz()
      : "0.00";

  const toggleBottomNavigationView1 = () => {
    setChecked(!isChecked);
  };

  const validate = () => {
    Keyboard.dismiss();
    sendForm(value, inputs.parameter1, inputs.parameter2);
  };

  // console.log(typeof(isChecked.toString()))
  const strbool = isChecked.toString();

  const validateSave = () => {
    Keyboard.dismiss();

    if (value === "") {
      Alert.alert("Ошибка", "Сначала выберите скважину", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    } else {
      sendFormOngdu(
        value,
        inputs.parameter1,
        inputs.parameter2,
        inputs.parameter3,
        inputs.parameter4,
        iin,
        statusRuch,
        startDate === "" ? "" : day + " " + startDate,
        endDate === "" ? "" : day + " " + endDate,
        inputs.startOil,
        inputs.endOil,
        startDate === "" && endDate === "" ? "" : resultOil,
        inputs.startGaz,
        inputs.endGaz,
        startDate === "" && endDate === "" ? "" : resultGaz,
        inputs.attention,
        globalThis.isOneDoc === true && oneDocument !== "" ? oneDocId : unId,
        "Сохранено",
        setIsLoadingForSave,
        setSaved,
        backtolist
      );
    }
  };

  // console.log(
  //   resultOil,
  //   unId)

  // console.log(startDate)

  const validateSend = () => {
    Keyboard.dismiss();
    if (value === "") {
      Alert.alert("Ошибка", "Сначала выберите скважину", [
        { text: "OK", style: "cancel" },
      ]);
    } else {
      sendFormOngdu(
        value,
        inputs.parameter1,
        inputs.parameter2,
        inputs.parameter3,
        inputs.parameter4,
        iin,
        statusRuch,
        startDate === "" ? "" : day + " " + startDate,
        endDate === "" ? "" : day + " " + endDate,
        inputs.startOil,
        inputs.endOil,
        startDate === "" && endDate === "" ? "" : resultOil,
        inputs.startGaz,
        inputs.endGaz,
        startDate === "" && endDate === "" ? "" : resultGaz,
        inputs.attention,
        globalThis.isOneDoc === true && oneDocument !== "" ? oneDocId : unId,
        "Отправлено",
        setIsLoading,
        setSend,
        backtolist
      );
    }
  };

  if (isLoadingForOne) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <WaveIndicator key={Math.random()} color="#D64D43" />
      </View>
    );
  }

  // const displayBtn = (value.length !== 0 && inputs.parameter1 !== '' && inputs.parameter2 !== '' && inputs.parameter3 !== '' && inputs.parameter4 !== '')
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", marginTop: 30 }}
    >
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            borderRadius: 20,
            alignItems: "center",
            paddingBottom: 15,
          }}
        >
          <View
            style={{
              padding: 5,
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
              marginTop: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => (
                  setOneDocument(""),
                  resetInputarray(),
                  globalThis.setOneId(""),
                  globalThis.setIsOneDoc(false),
                  navigation.goBack()
                )}
                style={{ padding: 5, paddingLeft: 0, width: "10%" }}
              >
                <AntDesign name="leftcircle" size={24} color="grey" />
              </TouchableOpacity>
              <View
                style={{ padding: 5, width: "100%", justifyContent: "center" }}
              >
                {globalThis.isToggle ? (
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      color: "#4d4d4d",
                    }}
                  >
                    Информация о замере
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      color: "#4d4d4d",
                    }}
                  >
                    Форма заполнения
                  </Text>
                )}
              </View>
            </View>

            {/* <Text style={{textAlign:'center', marginBottom:25, display: displayBtn ? 'none' : 'flex'}}>Заполните форму правильно, после этого появится кнопка отправки</Text> */}

            <View style={{ width: "100%", marginBottom: 10 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: "#4d4d4d",
                  marginBottom: 5,
                }}
              >
                Скважина
              </Text>
              <Dropdown
                disable={globalThis.isToggle}
                style={[
                  styles.dropdown,
                  // isFocus && { borderColor: "#0095E9" },
                  // isFocus && { borderWidth: 2 },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Выберите скважину" : "..."}
                searchPlaceholder="Search..."
                value={
                  globalThis.isOneDoc === true && oneDocument !== ""
                    ? oneDocument[0].skvazhina
                    : value
                }
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {inputsArray.slice(0, 2).map((el) => (
                <TextInputOn
                  editable={!globalThis.isToggle}
                  value={el.inputs}
                  key={el.parameter}
                  label={el.name}
                  setInputs={setInputs}
                  parameter={el.parameter}
                  width={el.width}
                  keyboardType={el.keyboard}
                  multiline={el.multiline}
                  height={el.height}
                  placeholder={`${el.placeholder}`}
                />
              ))}
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {inputsArray.slice(-2).map((el) => (
                <TextInputOn
                  editable={!globalThis.isToggle}
                  value={el.value}
                  key={el.parameter}
                  label={el.name}
                  setInputs={setInputs}
                  parameter={el.parameter}
                  width={el.width}
                  keyboardType={el.keyboard}
                  multiline={el.multiline}
                  height={el.height}
                  placeholder={el.placeholder}
                />
              ))}
            </View>

            <View
              style={{
                width: "100%",
                borderRadius: 10,
                borderWidth: 0.7,
                marginBottom: 10,
                marginTop: 10,
                padding: 5,
                paddingLeft: 8,
                borderColor: "gray",
                flexDirection: isContinue || statusRuchApi ? "column" : "row",
                alignItems:
                  isContinue || statusRuchApi ? "flex-start" : "center",
              }}
            >
              <Checkbox
                style={{
                  ...styles.checkbox,
                  display: isContinue || statusRuchApi ? "none" : "flex",
                }}
                disabled={globalThis.isToggle}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#0095E9" : undefined}
              />

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: isContinue || statusRuchApi ? "600" : "",
                }}
              >
                Ручной замер
              </Text>

              <TouchableOpacity
                onPress={toggleBottomNavigationView1}
                style={{
                  padding: 5,
                  backgroundColor: isFull || isFull1 ? "#2FB600" : "#D88E00",
                  display: isContinue || statusRuchApi ? "flex" : "none",
                  alignItems: "center",
                  marginTop: 5,
                  borderRadius: 5,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "white",
                    fontWeight: "600",
                    marginRight: 5,
                  }}
                >
                  {" "}
                  {isFull || isFull1
                    ? "Записано данные"
                    : " Записано неполные данные"}
                </Text>
                <AntDesign name="select1" size={16} color="white" />
              </TouchableOpacity>
            </View>

            {inputsAttention.map((el) => (
              <TextInputOn
                editable={!globalThis.isToggle}
                key={el.parameter}
                label={el.name}
                setInputs={setInputs}
                parameter={el.parameter}
                width={el.width}
                keyboardType={el.keyboard}
                multiline={el.multiline}
                height={el.height}
                placeholder={el.placeholder}
              />
            ))}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 10,
                display: globalThis.isToggle ? "none" : "flex",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  validateSave();
                }}
                style={{
                  width: "47%",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#07AB0D",
                  borderRadius: 10,
                  // display: displayBtn ? 'flex' : 'none'
                }}
              >
                {isLoadingForSave ? (
                  <UIActivityIndicator color="white" size={25} />
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "600", color: "white" }}
                  >
                    Сохранить
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  validateSend();
                }}
                style={{
                  width: "47%",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#0E9BEB",
                  borderRadius: 10,
                  // display: displayBtn ? 'flex' : 'none'
                }}
              >
                {isLoading ? (
                  <UIActivityIndicator color="white" size={25} />
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "600", color: "white" }}
                  >
                    Отправить
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView1}>
            <LottieView
              source={require("../../../../assets/animation/animation_lmr9pei7.json")}
              autoPlay
              loop={false}
              speed={0.9}
              style={{ width: 200, height: 200 }}
            />
            <View style={styles.modalContainer}>
              <Text
                style={{
                  marginBottom: 20,
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#4d4d4d",
                }}
              >
                Успешно отправлен
              </Text>
              <Pressable
                style={{
                  backgroundColor: "#0E9BEB",
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "600" }}
                >
                  OK
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <BottomSheet
        visible={isChecked}
        onBackButtonPress={toggleBottomNavigationView1}
        onBackdropPress={toggleBottomNavigationView1}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}
        <View
          style={[
            styles.bottomNavigationView,
            { backgroundColor: "white", zIndex: 30, height: "96%" },
          ]}
        >
          <View
            style={{
              width: "100%",
              height: 30,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Ручной замер
            </Text>
          </View>

          <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            automaticallyAdjustContentInsets={true}
            automaticallyAdjustsScrollIndicatorInsets={true}
          >
            <View
              style={{
                backgroundColor: "#F1F1F1",
                padding: 5,
                borderRadius: 5,
                marginTop: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingRight: 10,
                  paddingLeft: 10,
                  borderRadius: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ width: "47%", marginBottom: 10 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: "#4d4d4d",
                      marginBottom: 5,
                      paddingLeft: 2,
                    }}
                  >
                    Время начало{`\n`}замера:
                  </Text>
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={{
                      width: "100%",
                      height: 34,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: "#F1F1F1",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "500",
                        color: startDate.length !== 0 ? "#266AED" : "#4d4d4d",
                      }}
                    >
                      {startDate.length !== 0 ? startDate : "Выберите дату"}
                    </Text>
                    <DateTimePickerModal
                      isVisible={
                        globalThis.isToggle ? false : isDatePickerVisible
                      }
                      mode="time"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                      confirmTextIOS="Подтвердить"
                      cancelTextIOS="Отмена"
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ width: "47%", marginBottom: 10 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: "#4d4d4d",
                      marginBottom: 5,
                      paddingLeft: 2,
                    }}
                  >
                    Время конец{`\n`}замера:
                  </Text>
                  <TouchableOpacity
                    onPress={showDatePicker1}
                    style={{
                      width: "100%",
                      height: 34,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: "#F1F1F1",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "500",
                        color: endDate.length !== 0 ? "#266AED" : "#4d4d4d",
                      }}
                    >
                      {endDate.length !== 0 ? endDate : "Выберите дату"}
                    </Text>
                    <DateTimePickerModal
                      // disabled={globalThis.isToggle}
                      isVisible={
                        globalThis.isToggle ? false : isDatePickerVisible1
                      }
                      mode="time"
                      onConfirm={handleConfirm1}
                      onCancel={hideDatePicker1}
                      confirmTextIOS="Подтвердить"
                      cancelTextIOS="Отмена"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ display: startDate !== "" ? "flex" : "none" }}>
              <Text
                style={{
                  marginTop: 10,
                  marginLeft: 5,
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#4d4d4d",
                }}
              >
                Нефть
              </Text>

              <View
                style={{
                  backgroundColor: "#F1F1F1",
                  padding: 5,
                  borderRadius: 5,
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingRight: 10,
                    paddingLeft: 10,
                    borderRadius: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {inputsOil.map((el) => (
                      <TextInputOn
                        key={el.parameter}
                        label={el.name}
                        setInputs={setInputs}
                        editable={!globalThis.isToggle}
                        parameter={el.parameter}
                        width={el.width}
                        keyboardType={el.keyboard}
                        value={el.value}
                        multiline={el.multiline}
                        height={el.height}
                        placeholder={el.placeholder}
                      />
                    ))}
                  </View>

                  <View
                    style={{
                      width: "100%",
                      backgroundColor: "#FFE3E3",
                      padding: 5,
                      paddingLeft: 8,
                      paddingRight: 8,
                      justifyContent: "center",
                      borderRadius: 5,
                      marginBottom: 10,
                      display: isInvalidOil ? "flex" : "none",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#C30101",
                        fontWeight: "500",
                      }}
                    >
                      Показания конец не может быть меньше или равно Показания
                      начало
                    </Text>
                  </View>

                  {/* <View style={{width:'100%',  backgroundColor:'#FFE3E3', padding:5, paddingLeft:8, paddingRight:8, justifyContent:'center', borderRadius:5, marginBottom:10, display:endDate ==='' ? 'flex' : 'none'}}>
                  <Text style={{fontSize: 13, color:'#C30101', fontWeight:'500'}}>Выберите дату</Text>
                </View> */}

                  <View
                    style={{
                      width: "100%",
                      marginBottom: 10,
                      marginTop: 5,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: "#4d4d4d",
                        marginBottom: 5,
                        paddingLeft: 2,
                      }}
                    >
                      Плотность нефти:{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: "#4d4d4d",
                        marginBottom: 5,
                        paddingLeft: 2,
                      }}
                    >
                      {startOilnum > endOilnum ? "0.00" : resultOil}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: "#4d4d4d",
                        marginBottom: 5,
                        display: endDate === "" ? "none" : "flex",
                      }}
                    >
                      тн
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ display: inputs.startOil !== "" ? "flex" : "none" }}>
              <Text
                style={{
                  marginTop: 10,
                  marginLeft: 5,
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#4d4d4d",
                }}
              >
                Газ
              </Text>

              <View
                style={{
                  backgroundColor: "#F1F1F1",
                  padding: 5,
                  borderRadius: 5,
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingRight: 10,
                    paddingLeft: 10,
                    borderRadius: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {inputsGaz.map((el) => (
                      <TextInputOn
                        key={el.parameter}
                        label={el.name}
                        setInputs={setInputs}
                        editable={!globalThis.isToggle}
                        parameter={el.parameter}
                        width={el.width}
                        keyboardType={el.keyboard}
                        value={el.value}
                        multiline={el.multiline}
                        height={el.height}
                        placeholder={el.placeholder}
                      />
                    ))}
                  </View>

                  <View
                    style={{
                      width: "100%",
                      backgroundColor: "#FFE3E3",
                      padding: 5,
                      paddingLeft: 8,
                      paddingRight: 8,
                      justifyContent: "center",
                      borderRadius: 5,
                      marginBottom: 10,
                      display: isInvalidGaz ? "flex" : "none",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#C30101",
                        fontWeight: "500",
                      }}
                    >
                      Показания конец не может быть меньше или равно Показания
                      начало
                    </Text>
                  </View>
                  {/* 
                <View style={{width:'100%',  backgroundColor:'#FFE3E3', padding:5, paddingLeft:8, paddingRight:8, justifyContent:'center', borderRadius:5, marginBottom:10, display:endDate ==='' ? 'flex' : 'none'}}>
                  <Text style={{fontSize: 13, color:'#C30101', fontWeight:'500'}}>Выберите дату</Text>
                </View> */}

                  <View
                    style={{
                      width: "100%",
                      marginBottom: 10,
                      marginTop: 5,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "500",
                        color: "#4d4d4d",
                        marginBottom: 5,
                        paddingLeft: 2,
                      }}
                    >
                      Газовый фактор:{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: "#4d4d4d",
                        marginBottom: 5,
                        paddingLeft: 2,
                      }}
                    >
                      {startGaznum > endGaznum ? "0.00" : resultGaz} м3
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              width: "100%",
              height: 40,
              flexDirection: "row",
              justifyContent: "space-between",
              display: globalThis.isToggle ? "none" : "flex",
            }}
          >
            <TouchableOpacity
              onPress={close}
              style={{
                height: "100%",
                width: isShowBtns ? "48%" : "100%",
                backgroundColor: "#DB2222",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>Закрыть</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={continueEqualation}
              style={{
                height: "100%",
                width: "48%",
                backgroundColor: "#2684FF",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                display: isShowBtns ? "flex" : "none",
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                Продолжить
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              height: 40,
              flexDirection: "row",
              justifyContent: "space-between",
              display: globalThis.isToggle ? "flex" : "none",
            }}
          >
            <TouchableOpacity
              onPress={toggleBottomNavigationView1}
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "#DB2222",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  bottomNavigationView: {
    width: "100%",
    height: 250,
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  checkbox: {
    margin: 8,
    width: 23,
    height: 23,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    width: windowWidth - 50,
    height: 150,
    alignItems: "center",
    // justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 4,
  },
  modalView1: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: windowWidth - 50,
    height: 350,
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
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.7,
    borderRadius: 10,
    paddingHorizontal: 8,

    width: "100%",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#4d4d4d",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#4d4d4d",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
