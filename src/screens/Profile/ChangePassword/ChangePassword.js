import { View, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../../languages/localizations";
import { Colors } from "../../../styles/colors";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";
import { getLanguage, localeCheck } from "../../../languages/languageLoad";
import { getNumbers } from "../../Auth/Login/components/LoginVerification/api/loginVerificationApi";
import ChangePasswordContainer from "./components/ChangePasswordContainer";
import CodeVerification from "../CodeVerification/CodeVerification";
import { AuthContext } from "../../../context/AuthContext";

export default function ChangePassword({ route }) {
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";
  useEffect(() => {
    localeCheck(locale), getLanguage(setLang);
  });

  const [timer, setTimer] = useState(60);

  const [visible1, setVisible1] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const { iin, userInfo } = useContext(AuthContext);

  const [isSendMessage, setIsSendMessage] = useState("");

  const handleResendCode = () => {
    setTimer(60);
    getNumbers(
      setCode,
      setIsLoading,
      route.params,
      setVisible1,
      setIsSendMessage
    );
  };

  // console.log(globalThis.userp.isforeign, "cangegegeg");

  useEffect(() => {
    if (iin === "111111111111" || globalThis.userp.isforeign !== "0") {
      setVisible1(false);
    } else {
      getNumbers(
        setCode,
        setIsLoading,
        route.params,
        setVisible1,
        setIsSendMessage
      );
    }
  }, []);

  return (
    <View
      style={{
        backgroundColor: Colors.background,
        height: "100%",
        alignItems: "center",
      }}
    >
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={i18n.t("changeParol")}
        backButton={backButton()}
        height={"15%"}
      />

      {isLoading ? (
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
        <ChangePasswordContainer />
      )}
    </View>
  );
}
