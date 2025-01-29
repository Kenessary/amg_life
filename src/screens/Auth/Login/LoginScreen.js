import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../../languages/localizations";
import LoginContainer from "./components/LoginContainer";
import { Colors } from "../../../styles/colors";
import VerifyForgetPass from "./components/VerifyForgetPass";
import { getLanguage, localeCheck } from "../../../languages/languageLoad";

export default function LoginScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    localeCheck(locale);
    getLanguage(setLang);
  });

  return (
    <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
      <StatusBar style={"dark"} />

      <LoginContainer
        setModalVisible={setModalVisible}
        setLocale={setLocale}
        lang={lang}
      />

      <VerifyForgetPass
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </SafeAreaView>
  );
}
