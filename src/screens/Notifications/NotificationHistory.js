import { View, StyleSheet } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { WaveIndicator } from "react-native-indicators";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../languages/localizations";
import { Colors } from "../../styles/colors";
import TopBarNavigation from "../../components/TopBarNavigation";
import { getLanguage, localeCheck } from "../../languages/languageLoad";
import { getNotifications } from "./api/api";
import NotificationsList from "./components/NotificationsList";

export default function NotificationHistory() {
  const [isLoading, setIsLoading] = useState(false);
  const [historyNotification, setHistoryNotification] = useState("");
  const [historyStatus, setHistoryStatus] = useState("");
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    localeCheck(locale), getLanguage(setLang);
  });

  const { iin, setOpenedLength } = useContext(AuthContext);

  useEffect(() => {
    getNotifications(
      iin,
      setIsLoading,
      setHistoryStatus,
      setHistoryNotification
    );
  }, []);

  // console.log(historyNotification);

  useEffect(() => {
    setOpenedLength(0);
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.background,
        }}
      >
        <WaveIndicator key={Math.random()} color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={i18n.t("notification")}
        height={"15%"}
      />

      <NotificationsList
        historyNotification={historyNotification}
        historyStatus={historyStatus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background,
    alignItems: "center",
  },
});
