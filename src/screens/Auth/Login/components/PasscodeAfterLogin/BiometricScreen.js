import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../../../../languages/localizations";
import LoginVerify from "../LoginVerification/LoginVerify";
import PassCodeScreen from "./components/PassCodeScreen";
import BiometricUse from "./components/BiometricUse";
import { Colors } from "../../../../../styles/colors";
import {
  getLanguage,
  localeCheck,
} from "../../../../../languages/languageLoad";

export default function BiometricScreen({}) {
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  const [isTypedSecond, setIsTypedSecond] = useState(false);
  const [isCodeSuccesVerification, setIsCodeSuccesVerification] = useState(
    globalThis.isforeign === "1" ? true : false
  );

  useEffect(() => {
    localeCheck(locale);
    getLanguage(setLang);
  });

  return (
    <View style={[styles.container, { backgroundColor: Colors.white }]}>
      <StatusBar style={"dark"} />
      {globalThis.isforeign !== "1" && (
        <LoginVerify
          isCodeSuccesVerification={isCodeSuccesVerification}
          setIsCodeSuccesVerification={setIsCodeSuccesVerification}
        />
      )}

      <View
        style={{
          ...styles.passcodeContainer,
          display: isCodeSuccesVerification ? "flex" : "none" /* turn of */,
        }}
      >
        <PassCodeScreen
          isTypedSecond={isTypedSecond}
          setIsTypedSecond={setIsTypedSecond}
        />

        <BiometricUse isTypedSecond={isTypedSecond} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  passcodeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
