import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import Loader from "../../../components/Loader";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../../languages/localizations";
import { Colors } from "../../../styles/colors";
import RegisterContainer from "./components/RegisterContainer";
import { getLanguage, localeCheck } from "../../../languages/languageLoad";

export default function RegisterScreen() {
  const [loading, setLoading] = React.useState(false);

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
      <Loader visible={loading} />
      <RegisterContainer setLoading={setLoading} />
    </SafeAreaView>
  );
}
