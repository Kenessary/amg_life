import { View, StyleSheet, ScrollView } from "react-native";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { WaveIndicator } from "react-native-indicators";
import { AuthContext } from "../../../context/AuthContext";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../../languages/localizations";
import { Colors } from "../../../styles/colors";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";
import { getSpecForm } from "./api/api";
import SpecFormList from "./components/SpecFormList";
import { getLanguage, localeCheck } from "../../../languages/languageLoad";
import SpecFormLoader from "./loader/SpecFormLoader";

export default function SpecformScreen() {
  const { iin } = useContext(AuthContext);
  const [spec, setSpec] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    localeCheck(locale), getLanguage(setLang);
  });

  useEffect(() => {
    getSpecForm(setIsLoading, iin, setSpec);
  }, []);

  return (
    <View style={styles.container}>
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={i18n.t("clothes")}
        backButton={backButton()}
        height={"15%"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", marginTop: 20 }}
      >
        {isLoading ? (
          <SpecFormLoader height={250} />
        ) : (
          <SpecFormList spec={spec} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background,
  },
});
