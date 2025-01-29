import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../../languages/localizations";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";
import { Colors } from "../../../styles/colors";
import { getLanguage, localeCheck } from "../../../languages/languageLoad";
import BirtdayList from "./components/BirtdayList";
import { btd } from "./api/api";
import BirthdayLoading from "./components/BirthdayLoading";
import BirthdayRightView from "./components/BirthdayRightView";

function BirthdayScreen({ navigation }) {
  const [birthday, setBirthday] = useState([]);
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
    btd(setIsLoading, setBirthday);
  }, []);

  return (
    <View
      style={{
        backgroundColor: Colors.background,
        height: "100%",
      }}
    >
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        backButton={backButton()}
        title={i18n.t("birthdays")}
        height={"15%"}
        rightButton={<BirthdayRightView />}
      />
      {isLoading ? (
        <BirthdayLoading />
      ) : (
        <ScrollView
          style={styles.height100}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.centered}>
            <View style={styles.width60}>
              <BirtdayList birthday={birthday} lang={lang} />
              <View style={{ marginBottom: 80 }} />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

export default BirthdayScreen;

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
  },
  height100: {
    height: "100%",
    marginTop: 10,
  },
  width60: {
    width: "90%",
  },
});
