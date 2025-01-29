import { View, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../../languages/localizations";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";
import { Colors } from "../../../styles/colors";
import { getLanguage, localeCheck } from "../../../languages/languageLoad";
import { ChangePhoneContainer } from "./components/ChangePhoneContainer";
import ModalSuccess from "./components/ModalSuccess";
import CodeVerification from "../CodeVerification/CodeVerification";
import { ActivityIndicator } from "react-native";
import { getNumbers } from "../../Auth/Login/components/LoginVerification/api/loginVerificationApi";
import { AuthContext } from "../../../context/AuthContext";

export default function ChangePhone({ route }) {
  let [result, setResult] = useState("");
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  let [modalResult, setModalResult] = useState(false);

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    localeCheck(locale), getLanguage(setLang);
  });

  const [timer, setTimer] = useState(60);

  const [visible1, setVisible1] = useState(true);
  const [isLoadingForCode, setIsLoadingForCode] = useState(false);
  const [code, setCode] = useState("");

  const [isSendMessage, setIsSendMessage] = useState("");
  const { iin, userInfo } = useContext(AuthContext);

  const handleResendCode = () => {
    setTimer(60);
    getNumbers(
      setCode,
      setIsLoadingForCode,
      route.params,
      setVisible1,
      setIsSendMessage
    );
  };

  useEffect(() => {
    if (iin === "111111111111" || globalThis.userp.isforeign !== "0") {
      setVisible1(false);
    } else {
      getNumbers(
        setCode,
        setIsLoadingForCode,
        route.params,
        setVisible1,
        setIsSendMessage
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={i18n.t("changePhone")}
        backButton={backButton()}
        height={"15%"}
      />

      {isLoadingForCode ? (
        <ActivityIndicator
          color={Colors.primary}
          size={"large"}
          style={{ marginTop: 50 }}
        />
      ) : visible1 ? (
        <CodeVerification
          visible1={visible1}
          setVisible1={setVisible1}
          code={code}
          timer={timer}
          setTimer={setTimer}
          handleResendCode={handleResendCode}
        />
      ) : (
        <ChangePhoneContainer
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setResult={setResult}
          setModalResult={setModalResult}
          modalResult={modalResult}
        />
      )}

      <ModalSuccess
        modalResult={modalResult}
        setModalResult={setModalResult}
        result={result}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: "100%",
    alignItems: "center",
  },
});
