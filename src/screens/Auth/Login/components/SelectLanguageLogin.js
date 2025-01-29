import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import i18n from "i18n-js";
import { Colors } from "../../../../styles/colors";
import { Octicons } from "@expo/vector-icons";

const kazakhFlag = require("../../../../../assets/flags/Kazakhstan.jpg");
const rusianFlag = require("../../../../../assets/flags/Russia.png");
const chineseFlag = require("../../../../../assets/flags/China.webp");

const languages = [
  {
    language: "Қазақша",
    shortTag: "kz",
    image: require("../../../../../assets/flags/Kazakhstan.jpg"),
  },
  {
    language: "中文",
    shortTag: "ch",
    image: require("../../../../../assets/flags/China.webp"),
  },
  {
    language: "Русский",
    shortTag: "ru",
    image: require("../../../../../assets/flags/Russia.png"),
  },
];

const SelectLanguageLogin = ({ setLocale, lang }) => {
  return (
    <View style={{ alignItems: "center" }}>
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
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const LanguageButton = ({ setLocale, lang, flag, shortCountryName, title }) => {
  return (
    <TouchableOpacity
      onPress={() => setLocale(shortCountryName)}
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

export default SelectLanguageLogin;
