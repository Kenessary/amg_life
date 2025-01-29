import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../../languages/localizations";
import { Colors } from "../../../styles/colors";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";
import NewsList from "./components/NewsList";
import { getAllNews } from "./api/api";
import { getLanguage, localeCheck } from "../../../languages/languageLoad";
import NewsLoader from "./loader/NewsLoader";
import FilterButton from "./components/FilterButton";
import YearFilter from "./components/YearFilter";

const news_data = [];

export default function NewsScreen() {
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    localeCheck(locale), getLanguage(setLang);
  });

  const currentYear = new Date().getFullYear().toString();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    getAllNews(setIsLoading, news_data, year);
  }, []);

  return (
    <View style={styles.container}>
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={i18n.t("news")}
        backButton={backButton()}
        height={"15%"}
        rightButton={
          <FilterButton setVisible={setVisible} isLoading={isLoading} />
        }
      />
      {isLoading ? <NewsLoader height={150} /> : <NewsList news={news_data} />}
      <YearFilter
        visible={visible}
        setVisible={setVisible}
        choosenYear={year}
        setYear={setYear}
        setIsLoading={setIsLoading}
        newData={news_data}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    width: "100%",
    height: "100%",
  },
});
