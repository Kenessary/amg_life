import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../../languages/localizations";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../../../styles/colors";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";
import FoodBalance from "./components/FoodBalance";
import { getBalance, getMenu } from "./api/api";
import FoodMenu from "./components/FoodMenu";
import { getLanguage, localeCheck } from "../../../languages/languageLoad";
import { Skeleton } from "@rneui/themed";
import { FoodBalanceLoader } from "./loader/FoodMenuLoader";

function FoodMenuScreen() {
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  const { iin } = useContext(AuthContext);
  const [menu, setMenu] = useState("");
  const [balance, setBalance] = useState([]);
  console.log(balance);

  useEffect(() => {
    localeCheck(locale), getLanguage(setLang);
  });

  useEffect(() => {
    getMenu(setMenu);
    getBalance(iin, setBalance);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="dark" />

      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={i18n.t("foodmenu")}
        backButton={backButton()}
        height={"15%"}
      />

      <View style={{ alignItems: "center" }}>
        {balance.length !== 0 ? (
          <FoodBalance balance={balance} />
        ) : (
          <FoodBalanceLoader />
        )}

        <FoodMenu balance={balance} menu={menu} lang={lang} />
      </View>
    </View>
  );
}

export default FoodMenuScreen;
