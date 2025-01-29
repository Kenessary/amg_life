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
import { getListOngdu, sendFormOngdu } from "./api";
import { useRoute } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function OngduList({ navigation }) {
  const { iin } = useContext(AuthContext);
  const [isLoadingWan, setIsLoadingWan] = useState(false);
  const [isOneDoc, setIsOneDoc] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [oneId, setOneId] = useState("");

  const [oneIsFull, setOneIsFull] = useState("");
  const route = useRoute();

  globalThis.isOneDoc = isOneDoc;
  globalThis.setIsOneDoc = setIsOneDoc;
  globalThis.oneId = oneId;
  globalThis.setOneId = setOneId;

  globalThis.isToggle = isToggle;
  globalThis.setIsToggle = setIsToggle;

  globalThis.setIsLoadingWan = setIsLoadingWan;

  // const [all, setAll] = useState('')
  const [savedDocs, setSavedDocs] = useState("");
  const [sendedDocs, setSendedDocs] = useState("");
  // globalThis.setAll = setAll
  const [savedList, setSavedList] = useState("");

  // console.log(reversedArray)

  // const savedArr = all.filter(item => item.statusotpravki === "Сохранено")
  // const sendedArr = all.filter(item => item.statusotpravki === "Отправлено")

  useEffect(() => {
    getListOngdu(
      iin,
      setIsLoadingWan,
      setSavedDocs,
      setSendedDocs,
      setOneIsFull
    );

    if (route.params && route.params.shouldFetchData) {
      getListOngdu(
        iin,
        setIsLoadingWan,
        setSavedDocs,
        setSendedDocs,
        setOneIsFull
      ); // Call the fetchData function when shouldFetchData is true
    }
  }, [route.params]);

  if (isLoadingWan) {
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

  // console.log(all)

  const saved = [];

  for (let i = 0; i < savedDocs.length; i++) {
    saved.push(
      <TouchableOpacity
        onPress={() => {
          setOneId(savedDocs[i].id),
            setIsOneDoc(true),
            navigation.navigate("Ongdu");
        }}
        key={i}
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: "white",
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500", color: "#4d4d4d" }}>
            {savedDocs[i].skvazhina}
          </Text>
          {/* <View style={{padding:5, width:'40%', backgroundColor:'#D88E00', alignItems:"center", borderRadius:5, display:'flex'}}>
          <Text style={{textAlign:'center', fontSize:12, fontWeight:'600', color:'white'}}>Неполные данные</Text>
        </View> */}
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              width: "24%",
              padding: 5,
              borderColor: "#f1f1f1",
              alignItems: "center",
              borderRadius: 4,
              borderWidth: 2,
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                marginBottom: 5,
                fontSize: 16,
                color: "#4d4d4d",
              }}
            >
              Рбуф
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 14, color: "#4d4d4d" }}>
              {savedDocs[i].param1}
            </Text>
          </View>

          <View
            style={{
              width: "24%",
              padding: 5,
              borderColor: "#f1f1f1",
              alignItems: "center",
              borderRadius: 4,
              borderWidth: 2,
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                marginBottom: 5,
                fontSize: 16,
                color: "#4d4d4d",
              }}
            >
              Рм/к
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 14, color: "#4d4d4d" }}>
              {savedDocs[i].param2}
            </Text>
          </View>

          <View
            style={{
              width: "24%",
              padding: 5,
              borderColor: "#f1f1f1",
              alignItems: "center",
              borderRadius: 4,
              borderWidth: 2,
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                marginBottom: 5,
                fontSize: 16,
                color: "#4d4d4d",
              }}
            >
              Рзлт
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 14, color: "#4d4d4d" }}>
              {savedDocs[i].param3}
            </Text>
          </View>

          <View
            style={{
              width: "24%",
              padding: 5,
              borderColor: "#f1f1f1",
              alignItems: "center",
              borderRadius: 4,
              borderWidth: 2,
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                marginBottom: 5,
                fontSize: 16,
                color: "#4d4d4d",
              }}
            >
              Рлин
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 14, color: "#4d4d4d" }}>
              {savedDocs[i].param4}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ width: "48%", flexDirection: "row", alignItems: "center" }}
          >
            {savedDocs[i].statusruch === false ? (
              <Ionicons name="ios-close" size={18} color="#D6271C" />
            ) : (
              <Ionicons
                name="checkmark-sharp"
                size={18}
                color="#34B008"
                style={{ fontWeight: "600" }}
              />
            )}
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                marginLeft: 5,
                color: "#4d4d4d",
              }}
            >
              Ручной замер
            </Text>
          </View>

          <View
            style={{ width: "48%", alignItems: "flex-end", borderRadius: 4 }}
          >
            <Text style={{ fontWeight: "500", fontSize: 14, color: "#4d4d4d" }}>
              {savedDocs[i].current_date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const sended = [];

  for (let i = 0; i < sendedDocs.length; i++) {
    sended.push(
      <TouchableOpacity
        onPress={() => {
          setOneId(sendedDocs[i].id),
            setIsOneDoc(true),
            navigation.navigate("Ongdu");
        }}
        key={i}
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: "white",
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500", color: "#4d4d4d" }}>
            {sendedDocs[i].skvazhina}
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              width: "24%",
              padding: 5,
              borderColor: "#f1f1f1",
              alignItems: "center",
              borderRadius: 4,
              borderWidth: 2,
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                marginBottom: 5,
                fontSize: 16,
                color: "#4d4d4d",
              }}
            >
              Рбуф
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 14, color: "#4d4d4d" }}>
              {sendedDocs[i].param1}
            </Text>
          </View>

          <View
            style={{
              width: "24%",
              padding: 5,
              borderColor: "#f1f1f1",
              alignItems: "center",
              borderRadius: 4,
              borderWidth: 2,
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                marginBottom: 5,
                fontSize: 16,
                color: "#4d4d4d",
              }}
            >
              Рм/к
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 14, color: "#4d4d4d" }}>
              {sendedDocs[i].param2}
            </Text>
          </View>

          <View
            style={{
              width: "24%",
              padding: 5,
              borderColor: "#f1f1f1",
              alignItems: "center",
              borderRadius: 4,
              borderWidth: 2,
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                marginBottom: 5,
                fontSize: 16,
                color: "#4d4d4d",
              }}
            >
              Рзлт
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 14, color: "#4d4d4d" }}>
              {sendedDocs[i].param3}
            </Text>
          </View>

          <View
            style={{
              width: "24%",
              padding: 5,
              borderColor: "#f1f1f1",
              alignItems: "center",
              borderRadius: 4,
              borderWidth: 2,
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                marginBottom: 5,
                fontSize: 16,
                color: "#4d4d4d",
              }}
            >
              Рлин
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 14, color: "#4d4d4d" }}>
              {sendedDocs[i].param4}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "48%",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 4,
            }}
          >
            {sendedDocs[i].statusruch === false ? (
              <Ionicons name="ios-close" size={18} color="#D6271C" />
            ) : (
              <Ionicons
                name="checkmark-sharp"
                size={18}
                color="#34B008"
                style={{ fontWeight: "600" }}
              />
            )}
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                marginLeft: 5,
                color: "#4d4d4d",
              }}
            >
              Ручной замер
            </Text>
          </View>

          <View
            style={{ width: "48%", alignItems: "flex-end", borderRadius: 4 }}
          >
            <Text style={{ fontWeight: "500", fontSize: 14, color: "#4d4d4d" }}>
              {sendedDocs[i].current_date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: "100%" }}
    >
      <View
        style={{ width: windowWidth - 20, height: isToggle ? "9%" : "15%" }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Ongdu");
          }}
          style={{
            padding: 10,
            width: "100%",
            backgroundColor: "grey",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            flexDirection: "row",
            display: isToggle ? "none" : "flex",
          }}
        >
          <AntDesign name="pluscircle" size={18} color="white" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "white",
              marginLeft: 10,
            }}
          >
            Добавить
          </Text>
        </TouchableOpacity>

        <View
          style={{
            width: "100%",
            height: 30,
            marginBottom: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setIsToggle(false)}
            style={{
              height: "100%",
              width: "48%",
              backgroundColor: isToggle ? "white" : "#D64D43",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: isToggle ? "#D64D43" : "white",
                fontWeight: "600",
              }}
            >
              Сохраненные
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsToggle(true)}
            style={{
              height: "100%",
              width: "48%",
              backgroundColor: isToggle ? "#D64D43" : "white",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: isToggle ? "white" : "#D64D43",
                fontWeight: "600",
              }}
            >
              Отправленные
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ height: isToggle ? "81%" : "85%", width: windowWidth - 20 }}
      >
        {isToggle ? sended : saved}
      </ScrollView>
    </View>
  );
}
