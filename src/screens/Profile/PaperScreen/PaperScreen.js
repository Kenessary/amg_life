import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../../languages/localizations";
import { Colors } from "../../../styles/colors";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";
import { getLanguage, localeCheck } from "../../../languages/languageLoad";
import DatePickerForPaper from "./components/DatePickerForPaper";
import Paper from "./components/Paper";
import { currentDate } from "./api/api";

export default function PaperScreen() {
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    localeCheck(locale), getLanguage(setLang);
  });

  const [valueMonth, setValueMonth] = useState(null);
  console.log(valueMonth);
  const [valueYear, setValueYear] = useState(null);
  const [textMonth, setTextMonth] = useState([]);
  const [list, setList] = useState([]);
  const [nas, setNas] = useState([]);
  const [uder, setUder] = useState([]);
  const [visible, setvisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setvisible(!visible);
  };

  const itog = [
    i18n.t("itogNas"),
    " ",
    list.nachisleno,
    i18n.t("itogUder"),
    list.uderzhano,
  ];

  useEffect(() => {
    currentDate(setValueMonth, setValueYear);
  }, []);

  return (
    <View style={styles.container}>
      <Paper
        visible={visible}
        setvisible={setvisible}
        toggleBottomNavigationView={toggleBottomNavigationView}
        textMonth={textMonth}
        valueYear={valueYear}
        list={list}
        nas={nas}
        uder={uder}
        itog={itog}
      />

      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={i18n.t("raschet")}
        backButton={backButton()}
        height={"15%"}
      />

      <DatePickerForPaper
        valueMonth={valueMonth}
        setValueMonth={setValueMonth}
        valueYear={valueYear}
        setValueYear={setValueYear}
        setList={setList}
        setNas={setNas}
        setUder={setUder}
        setTextMonth={setTextMonth}
        setvisible={setvisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: "100%",
  },
});
