import { TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AntDesign } from "@expo/vector-icons";

import i18n from "i18n-js";
import { kz, ru, ch } from "../../../../../languages/localizations";
import { getNumbers } from "./api/loginVerificationApi";
import SendCodetoPhone from "./components/SendCodetoPhone";
import TopBarNavigation from "../../../../../components/TopBarNavigation";
import { Colors } from "../../../../../styles/colors";
import { StatusBar } from "expo-status-bar";
import CodeVerification from "./components/CodeVerification";
// import {
//   getPhone,
//   getTelephone,
// } from "../../../../../context/api/getTelePhone";

export default function LoginVerify({
  isCodeSuccesVerification,
  setIsCodeSuccesVerification,
}) {
  const [timer, setTimer] = useState(60);

  const handleResendCode = () => {
    setTimer(60);
    getNumbers(setCode, setIsLoading, phone, setVisible1, setIsSendMessage);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPhone, setIsLoadingPhone] = useState(false);
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const { iin, logout, phoneNumber } = useContext(AuthContext);

  const [visible1, setVisible1] = useState(false);
  const [isSendMessage, setIsSendMessage] = useState("");

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
          setLang(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getPhone(iin, setPhone, setIsLoadingPhone);
  // }, []);

  const backButton = () => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            visible1
              ? (setVisible1(false), setIsSendMessage(""), setTimer(60))
              : logout()
          }
          style={{
            paddingRight: 10,
          }}
        >
          <AntDesign name="left" size={24} color={Colors.smoothBlack} />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        backgroundColor: Colors.background,
        display: isCodeSuccesVerification ? "none" : "flex",
      }}
    >
      <StatusBar style="dark" />
      <TopBarNavigation
        isHome={false}
        backButton={backButton()}
        title={
          visible1 === false
            ? i18n.t("userCheckTitle")
            : i18n.t("codeVerifyTitle")
        }
        height={"14%"}
      />

      <SendCodetoPhone
        visible1={visible1}
        phone={phoneNumber}
        isLoading={isLoading}
        isLoadingPhone={isLoadingPhone}
        setCode={setCode}
        setIsLoading={setIsLoading}
        setVisible1={setVisible1}
        setIsSendMessage={setIsSendMessage}
      />

      <CodeVerification
        visible1={visible1}
        handleResendCode={handleResendCode}
        code={code}
        setVisible1={setVisible1}
        timer={timer}
        setTimer={setTimer}
        setIsCodeSuccesVerification={setIsCodeSuccesVerification}
      />
    </View>
  );
}
