import { View, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { kz, ru, ch } from "../../../languages/localizations";
import i18n from "i18n-js";
import { Colors } from "../../../styles/colors";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";
import EventsList from "./components/EventsList";
import FilterButton from "./components/FilterButton";
import { getLanguage, localeCheck } from "../../../languages/languageLoad";
import { getEvents } from "./api/api";
import YearFilter from "./components/YearFilter";
import NewsLoader from "../NewsScreen/loader/NewsLoader";

export default function EventsScreen({ navigation }) {
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    localeCheck(locale), getLanguage(setLang);
  });

  const [event, setEvent] = useState([]);
  console.log(event);
  const [isLoading, setIsLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getEvents(setIsLoading, setEvent, year, month);
  }, []);

  return (
    <View style={styles.container}>
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={i18n.t("events")}
        backButton={backButton()}
        height={"15%"}
        rightButton={
          <FilterButton isLoading={isLoading} setVisible={setVisible} />
        }
      />
      {isLoading ? (
        <NewsLoader height={120} />
      ) : event.length === 0 ? (
        <View style={{ width: "100%", marginTop: 15, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 16,
              color: Colors.smoothBlack,
              fontWeight: "600",
            }}
          >
            События не найдены
          </Text>
        </View>
      ) : (
        <EventsList event={event} />
      )}

      <YearFilter
        visible={visible}
        setVisible={setVisible}
        choosenYear={year}
        choosenMonth={month}
        setMonth={setMonth}
        setYear={setYear}
        setIsLoading={setIsLoading}
        setEvent={setEvent}
      />
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
