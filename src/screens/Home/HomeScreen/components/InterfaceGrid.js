import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import {
  AddconSecond,
  AddconSecondDark,
  AppdevSecond,
  AppdevSecondDark,
  BirthdayIconSecond,
  BirthdayIconSecondDark,
  DocumentForReviewSecond,
  DocumentForReviewSecondDark,
  EventIconSecond,
  EventIconSecondDark,
  InfoguideIconSecond,
  InfoguideIconSecondDark,
  NewsIconSecond,
  NewsIconSecondDark,
} from "../../../../cores/helpers/icon";
import themeContext from "../../../../cores/themeContext";
import { useNavigation } from "@react-navigation/native";
// import FoodAddSecond from "../../FoodAddSecond";
import i18n from "i18n-js";
import { multiLanguage } from "../../../language";
import { ru, ch, kz } from "../../../../languages/localizations";
import { useContext, useEffect, useState } from "react";
import { docDefaultDate, isApparat, isStolovaya } from "../responses/HomeApi";
// import MenuHideSecond from "../../MenuHideSecond";
import { Skeleton } from "@rneui/themed";
import { loadDarkMode } from "../../../loadDarkMode";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "../../../../styles/colors";
import { AuthContext } from "../../../../context/AuthContext";

const windowWidth = Dimensions.get("window").width;

export function InterfaceGrid({ interfacesSwitch, docsArrayLength }) {
  const { iin } = useContext(AuthContext);
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  let [stol, setStol] = useState("No");
  let [apparat, setApparat] = useState("No");
  // const stol = "Yes";
  // const apparat = "Yes";
  let [isLoading, setIsLoading] = useState(false);

  multiLanguage(locale, setLang);

  useEffect(() => {
    isStolovaya(setStol);
    isApparat(setApparat);
  }, []);

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  const navigation = useNavigation();

  const nine = 9;

  const WaveSkeletonForGrid = [];
  for (let i = 0; i < nine; i++) {
    WaveSkeletonForGrid.push(
      <Skeleton
        key={i}
        animation="pulse"
        style={{
          backgroundColor: "#DADADA",
          borderRadius: 10,
          marginBottom: 10,
          marginTop: 10,
        }}
        skeletonStyle={{ backgroundColor: "#EBEAEA" }}
        width={"32%"}
        height={90}
      />
    );
  }

  if (
    stol.length === 0 &&
    apparat.length === 0 &&
    interfacesSwitch === "grid"
  ) {
    return (
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: windowWidth - 20,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
            flexWrap: "wrap",
          }}
        >
          {WaveSkeletonForGrid}
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        display: interfacesSwitch === "grid" ? "flex" : "none",
        alignItems: "center",
        marginTop: 15,
      }}
    >
      <View
        style={{
          width: "95%",
          flexDirection: "row",
          justifyContent: "flex-start",
          marginBottom: 15,
          flexWrap: "wrap",
        }}
      >
        {stol === "Yes" && (
          <TouchableOpacity
            style={{
              width: "31%",
              alignItems: "center",
              padding: 3,
              paddingVertical: 10,
              borderRadius: 16,
              marginBottom: 10,
              backgroundColor: "white",
              marginRight: "3%",
            }}
            onPress={() => navigation.navigate("FoodMenuPanel")}
          >
            <MaterialIcons
              name="assignment-add"
              size={35}
              color="grey"
              style={{ marginTop: 5 }}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                marginTop: 8,
                fontWeight: "500",
                color: "grey",
              }}
            >
              Ввод меню
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{
            width: "31%",
            alignItems: "center",
            padding: 3,
            paddingVertical: 10,
            borderRadius: 16,
            marginBottom: 10,
            backgroundColor: "white",
            marginRight: "3%",
          }}
          onPress={() => {
            navigation.navigate("SafetyRulesScreen");
          }}
        >
          <Entypo name="info" size={33} color={Colors.primary} />
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              marginTop: 8,
              fontWeight: "500",
              color: Colors.smoothBlack,
            }}
          >
            {i18n.t("goldenRules")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "31%",
            alignItems: "center",
            padding: 3,
            paddingVertical: 10,
            borderRadius: 16,
            marginBottom: 10,
            backgroundColor: "white",
            marginRight: stol !== "Yes" ? "3%" : "0%",
          }}
          onPress={() => {
            navigation.navigate("InfoguideScreen");
          }}
        >
          <MaterialCommunityIcons
            name="briefcase-search"
            size={35}
            color="#DC453C"
            style={{ marginTop: 5 }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              marginTop: 8,
              fontWeight: "500",
              color: Colors.smoothBlack,
            }}
          >
            {interfacesSwitch.interfacesSwitch !== "false"
              ? i18n.t("guide")
              : i18n.t("infoguide")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "31%",
            alignItems: "center",
            padding: 3,
            paddingVertical: 10,
            borderRadius: 16,
            marginBottom: 10,
            backgroundColor: "white",
            marginRight: stol === "Yes" ? "3%" : "0%",
          }}
          onPress={() => navigation.navigate("DocumentListScreen")}
        >
          {docsArrayLength !== 0 && (
            <View
              style={{
                position: "absolute",
                right: 4,
                top: 4,
                width: 22,
                height: 22,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
                backgroundColor: Colors.primary,
              }}
            >
              <Text style={{ fontSize: 12, color: Colors.white }}>
                {docsArrayLength}
              </Text>
            </View>
          )}

          <Ionicons
            name="documents"
            size={35}
            color="#DC453C"
            style={{ marginTop: 5 }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              marginTop: 8,
              fontWeight: "500",
              color: Colors.smoothBlack,
            }}
          >
            {i18n.t("docLoad")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "31%",
            alignItems: "center",
            padding: 3,
            paddingVertical: 10,
            borderRadius: 16,
            marginBottom: 10,
            backgroundColor: "white",
            marginRight: "3%",
          }}
          onPress={() => {
            navigation.navigate("EventsScreen");
          }}
        >
          <MaterialCommunityIcons
            name="folder-alert"
            size={35}
            color="#DC453C"
            style={{ marginTop: 5 }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              marginTop: 8,
              fontWeight: "500",
              color: Colors.smoothBlack,
            }}
          >
            {i18n.t("events")}
          </Text>
        </TouchableOpacity>

        {apparat === "Yes" ? (
          <TouchableOpacity
            style={{
              width: "31%",
              alignItems: "center",
              padding: 3,
              paddingVertical: 10,
              borderRadius: 16,
              marginBottom: 10,
              backgroundColor: "white",
              marginRight: stol === "Yes" ? "0%" : "3%",
            }}
            onPress={() => navigation.navigate("FoodMenuScreen")}
          >
            <MaterialIcons
              name="restaurant"
              size={35}
              color="#DC453C"
              style={{ marginTop: 5 }}
            />

            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                marginTop: 8,
                fontWeight: "500",
                color: Colors.smoothBlack,
              }}
            >
              {i18n.t("foodmenu")}
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <TouchableOpacity
          style={{
            width: "31%",
            alignItems: "center",
            padding: 3,
            paddingVertical: 10,
            borderRadius: 16,
            marginBottom: 10,
            backgroundColor: "white",
            marginRight:
              stol === "Yes" ? "3%" : apparat === "Yes" ? "0%" : "3%",
          }}
          onPress={() => {
            navigation.navigate("BirthdayScreen");
          }}
        >
          <FontAwesome
            name="birthday-cake"
            size={35}
            color="#DC453C"
            style={{ marginTop: 5 }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              marginTop: 8,
              fontWeight: "500",
              color: Colors.smoothBlack,
            }}
          >
            {i18n.t("birthdays")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NewsScreen");
          }}
          style={{
            width: "31%",
            alignItems: "center",
            padding: 3,
            paddingVertical: 10,
            borderRadius: 16,
            marginBottom: 10,
            backgroundColor: "white",
            marginRight: apparat === "Yes" ? "3%" : "0%",
          }}
        >
          <Ionicons
            name="newspaper"
            size={35}
            color="#DC453C"
            style={{ marginTop: 5 }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              marginTop: 8,
              fontWeight: "500",
              color: Colors.smoothBlack,
            }}
          >
            {i18n.t("news")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ContactsScreen");
          }}
          style={{
            width: "31%",
            alignItems: "center",
            padding: 3,
            paddingVertical: 10,
            borderRadius: 16,
            marginBottom: 10,
            backgroundColor: "white",
            marginRight: stol === "Yes" ? "0%" : "3%",
          }}
        >
          <Ionicons
            name="call"
            size={35}
            color="#DC453C"
            style={{ marginTop: 5 }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              marginTop: 8,
              fontWeight: "500",
              color: Colors.smoothBlack,
            }}
          >
            {i18n.t("contacts")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("TechnicalSupportScreen");
          }}
          style={{
            width: "31%",
            alignItems: "center",
            padding: 3,
            paddingVertical: 10,
            borderRadius: 16,
            marginBottom: 10,
            backgroundColor: "white",
            marginRight: apparat === "Yes" ? "0%" : "3%",
          }}
        >
          <MaterialIcons
            name="app-settings-alt"
            size={35}
            color="#DC453C"
            style={{ marginTop: 5 }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              marginTop: 10,
              fontWeight: "500",
              color: Colors.smoothBlack,
            }}
          >
            {i18n.t("adminpo")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
