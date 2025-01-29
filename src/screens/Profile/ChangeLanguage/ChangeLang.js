import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../../languages/localizations";
import { StyleSheet } from "react-native";
import { Colors } from "../../../styles/colors";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";
import { Octicons } from "@expo/vector-icons";
import { getLanguage, localeCheck } from "../../../languages/languageLoad";

export default function ChangeLang() {
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    localeCheck(locale), getLanguage(setLang);
  });

  const a = () => {
    Alert.alert(
      `${i18n.t("languageAlertTitle")}`,
      `${i18n.t("languageAlertBody")}`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  const languages = [
    {
      language: "Қазақша",
      shortTag: "kz",
      image: require("../../../../assets/flags/Kazakhstan.jpg"),
    },
    {
      language: "中文",
      shortTag: "ch",
      image: require("../../../../assets/flags/China.webp"),
    },
    {
      language: "Русский",
      shortTag: "ru",
      image: require("../../../../assets/flags/Russia.png"),
    },
  ];

  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        backgroundColor: Colors.background,
      }}
    >
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={i18n.t("changeLanguage")}
        backButton={backButton()}
        height={"15%"}
      />

      <View style={{ alignItems: "center", width: "90%" }}>
        <View style={styles.container}>
          <View style={styles.selectLanguageContainer}>
            <Text style={styles.title}>{i18n.t("selectLanguage")}</Text>

            <View style={{ marginTop: 10 }}>
              {languages.map((language) => (
                <LanguageButton
                  key={Math.random()}
                  setLocale={setLocale}
                  lang={lang}
                  flag={language.image}
                  shortCountryName={language.shortTag}
                  title={language.language}
                  alert={a}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const LanguageButton = ({
  setLocale,
  lang,
  flag,
  shortCountryName,
  title,
  alert,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setLocale(shortCountryName), alert();
      }}
      style={[
        lang === shortCountryName
          ? [styles.buttonSelectedContainer]
          : styles.buttonContainer,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={flag}
          style={{
            width: 29,
            height: 20,
            borderRadius: 5,
            marginRight: 10,
          }}
        />
        <Text
          style={[
            lang === shortCountryName
              ? [styles.selectedText, { color: "#4d4d4d" }]
              : [styles.text, { color: "#4d4d4d" }],
          ]}
        >
          {title}
        </Text>
      </View>
      {lang === shortCountryName && (
        <Octicons name="check-circle-fill" size={18} color={Colors.primary} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center" },
  selectLanguageContainer: {
    width: "100%",
    padding: 20,
    paddingTop: 20,
    marginTop: 10,
    backgroundColor: Colors.white,
    borderRadius: 25,
  },
  title: {
    fontSize: 18,
    color: "#4d4d4d",
  },
  buttonSelectedContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D9D9D9",
    borderWidth: 1,

    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
  },
  selectedText: {
    fontSize: 15,
    fontWeight: "600",
    paddingVertical: 4,
  },
  text: {
    fontSize: 14,
    paddingVertical: 4,
  },
});
