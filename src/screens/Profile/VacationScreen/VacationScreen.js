import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { kz, ru, ch } from "../../../languages/localizations";
import i18n from "i18n-js";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";
import { Colors } from "../../../styles/colors";
import { getVacation } from "./api/api";
import VacationList from "./components/VacationList";
import SpecFormLoader from "../SpecformScreen/loader/SpecFormLoader";
import { getLanguage, localeCheck } from "../../../languages/languageLoad";

export default function VacationScreen() {
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    localeCheck(locale), getLanguage(setLang);
  });

  const { iin } = useContext(AuthContext);
  const [otpusk, setOtpusk] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getVacation(setIsLoading, iin, setOtpusk);
  }, []);

  return (
    <View style={styles.container}>
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={i18n.t("vacation")}
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
          <VacationList otpusk={otpusk} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background,
  },
});
