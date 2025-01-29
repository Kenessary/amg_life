import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";

import themeContext from "../../../../cores/themeContext";
import { useNavigation } from "@react-navigation/native";

import i18n from "i18n-js";
import { multiLanguage } from "../../../language";
import { ru, ch, kz } from "../../../../languages/localizations";
import { useContext, useEffect, useState } from "react";
import { loadDarkMode } from "../../../loadDarkMode";
import { docDefaultDate, isApparat, isStolovaya } from "../responses/HomeApi";
import { AuthContext } from "../../../../context/AuthContext";
import { Skeleton } from "@rneui/themed";
import MenuButton from "../../../../components/MenuButton";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "../../../../styles/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function InterfaceList({ interfacesSwitch, docsArrayLength, isEvent }) {
  const { iin } = useContext(AuthContext);

  useEffect(() => {
    loadDarkMode(setIsDarkMode);
    isStolovaya(setStol);
    isApparat(setApparat);
  }, []);

  const theme = useContext(themeContext);
  let [isDarkMode, setIsDarkMode] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  let [stol, setStol] = useState("");
  let [apparat, setApparat] = useState("");
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  multiLanguage(locale, setLang);

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  const navigation = useNavigation();

  const eight = 8;
  // console.log('ssssssss')

  const WaveSkeletonForList = [];
  for (let i = 0; i < eight; i++) {
    WaveSkeletonForList.push(
      <View
        key={i}
        style={[
          styles.listwrapper,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          },
        ]}
      >
        <Skeleton
          circle
          width={"15%"}
          height={55}
          style={{ marginRight: 10, backgroundColor: "#DADADA" }}
          skeletonStyle={{ backgroundColor: "#EBEAEA" }}
        />
        <Skeleton
          width={"82%"}
          height={50}
          style={{ borderRadius: 20, backgroundColor: "#DADADA" }}
          skeletonStyle={{ backgroundColor: "#EBEAEA" }}
        />
      </View>
    );
  }

  if (
    stol.length === 0 &&
    apparat.length === 0 &&
    isLoading &&
    interfacesSwitch === "list"
  ) {
    return <View style={{ alignItems: "center" }}>{WaveSkeletonForList}</View>;
  }

  return (
    <View
      style={{
        width: "100%",
        display: interfacesSwitch === "list" ? "flex" : "none",
        alignItems: "center",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "91%", marginTop: 15, height: "72%" }}
      >
        {stol === "Yes" && (
          <MenuButton
            onPress={() => navigation.navigate("FoodMenuPanel")}
            icon={
              <MaterialIcons name="assignment-add" size={20} color="white" />
            }
            title={"Ввод меню"}
          />
        )}

        <MenuButton
          onPress={() => {
            navigation.navigate("SafetyRulesScreen");
          }}
          icon={<Entypo name="info" size={20} color="white" />}
          title={i18n.t("goldenRules")}
        />

        <MenuButton
          onPress={() => {
            navigation.navigate("InfoguideScreen");
          }}
          icon={
            <MaterialCommunityIcons
              name="briefcase-search"
              size={20}
              color="white"
            />
          }
          title={i18n.t("infoguide")}
        />

        <MenuButton
          onPress={() => navigation.navigate("DocumentListScreen")}
          icon={<Ionicons name="documents" size={20} color="white" />}
          title={i18n.t("docLoad")}
          docsArrayLength={docsArrayLength}
        />

        <MenuButton
          onPress={() => navigation.navigate("EventsScreen")}
          icon={
            <MaterialCommunityIcons
              name="folder-alert"
              size={20}
              color="white"
            />
          }
          title={i18n.t("events")}
        />

        <MenuButton
          onPress={() => navigation.navigate("NewsScreen")}
          icon={<Ionicons name="newspaper" size={18} color="white" />}
          title={i18n.t("news")}
        />

        {apparat === "Yes" && (
          <MenuButton
            onPress={() => navigation.navigate("FoodMenuScreen")}
            icon={<MaterialIcons name="restaurant" size={20} color="white" />}
            title={i18n.t("foodmenu")}
          />
        )}

        <MenuButton
          onPress={() => navigation.navigate("BirthdayScreen")}
          icon={<FontAwesome name="birthday-cake" size={16} color="white" />}
          title={i18n.t("birthdays")}
        />

        <MenuButton
          onPress={() => navigation.navigate("ContactsScreen")}
          icon={<Ionicons name="call" size={20} color="white" />}
          title={i18n.t("contacts")}
        />

        <MenuButton
          onPress={() => navigation.navigate("TechnicalSupportScreen")}
          icon={
            <MaterialIcons name="app-settings-alt" size={20} color="white" />
          }
          title={i18n.t("adminpo")}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
  },
  listwrapper: {
    marginBottom: 0,
    width: windowWidth - 30,
  },
  listwrapper1: {
    marginBottom: 0,
    width: windowWidth - 30,
  },
  listItem: {
    fontSize: 17,
  },
  btn: {
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOpacity: 0.02,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  menuBtn: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  menuBtnIconBackgroundGrey: {
    backgroundColor: "white",
    width: 32,
    height: 32,
    backgroundColor: "grey",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  menuBtnIconTitle: {
    color: "#3A3B40",
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "500",
  },
});
