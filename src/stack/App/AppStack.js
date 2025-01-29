import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { WaveIndicator } from "react-native-indicators";

import {
  HomeScreen,
  InfoguideScreen,
  InfoDepartment,
  BirthdayScreen,
  EventScreen,
  EventPdfScreen,
  FoodMenuScreen,
  NewsScreen,
  PaperScreen,
  DocumentListScreen,
  ProfileScreen,
  VacationScreen,
  SpecformScreen,
  DocumentScreen,
  BiometricScreen,
  PinlockScreen,
  SingleNewsScreen,
  ChangePassword,
  ContactsScreen,
  AdminPO,
  Infodep,
  FoodMenuPanel,
  MenuHistory,
  MenuStatistics,
  OpenQr,
  CameraPhone,
  PushSendScreen,
  NotificationHistory,
  ChangeLang,
  LoginVerify,
  DocumentPdfScreen,
  Ongdu,
  SafetyRulesScreen,
} from "../../screens";

import i18n from "i18n-js";
import { kz, ru, ch } from "../../languages/localizations";

import UserPassChange from "../../screens/Profile/UserPasswordChange/UserPassChange";
import themeContext from "../../cores/themeContext";
// import VerifyForPassword from "../../screens/Profile/VerifyForPassword";
// import VerifyForPhone from "../../screens/Profile/VerifyForPhone";
import OngduList from "../../screens/Home/Ongdu/OngduList";
// import DocumentsMenu from "../../screens/Home/DocumentsMenu";
import Inventarization from "../../screens/Document/Inventarization/Inventarization";
import InventarizationList from "../../screens/Document/Inventarization/InventarizationList";
import FoodHeaderRight from "./components/FoodHeaderRight";
// import BottomNavigation from "./components/BottomNavigation";
import { getLanguage, localeCheck } from "../../languages/languageLoad";
import { getPassword } from "./functions/requests";
import TechnicalSupportScreen from "../../screens/Home/TechnicalSupportScreen/TechnicalSupportScreen";
import { Colors } from "../../styles/colors";
import ChangePhone from "../../screens/Profile/ChangePhone/ChangePhone";
import { AuthContext } from "../../context/AuthContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SafetyPdf from "../../screens/Home/SaferyRulesScreen/SafetyPdf";
import Calendar from "../../screens/Home/HomeScreen/components/Calendar";
import ProductScan from "../../screens/Document/ProductScan/ProductScan";
import ProductResult from "../../screens/Document/ProductScan/ProductResult";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppStack({ token }) {
  const theme = useContext(themeContext);

  const { openedLength, iin } = useContext(AuthContext);

  // const [user, setUser] = useState("");

  const [secondPassword, setSecondPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingPassword, setIsCheckingPassword] = useState(true);

  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    localeCheck(locale);
    getLanguage(setLang);
  });

  useEffect(() => {
    getPassword(setSecondPassword, setIsLoading, setIsCheckingPassword);
  }, [secondPassword]);

  if (isLoading || isCheckingPassword) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.white,
        }}
      >
        <WaveIndicator key={Math.random()} color="#D64D43" />
      </View>
    );
  }

  const optionsTrueDefaults = {
    headerShown: false,
  };

  const optionsFalseDefaults = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {iin !== "111111111111" &&
        (secondPassword === "" ? (
          <Stack.Screen
            name="BiometricScreen"
            component={BiometricScreen}
            options={{ animation: "fade", animationDuration: 400 }}
            initialParams={{ secondPassword: secondPassword }}
          />
        ) : (
          <Stack.Screen
            name="PinlockScreen"
            component={PinlockScreen}
            options={{ animation: "fade", animationDuration: 400 }}
          />
        ))}

      <Stack.Screen
        name="HomeScreen"
        component={BottomNavigation}
        options={{ gestureEnabled: false }}
      />

      <Stack.Screen name="DocumentScreen" component={DocumentScreen} />

      <Stack.Screen
        name="Inventarization"
        component={Inventarization}
        // options={{ presentation: "containedTransparentModal" }}
      />

      <Stack.Screen
        name="ProductScan"
        component={ProductScan}
        // options={{ presentation: "containedTransparentModal" }}
      />
      <Stack.Screen
        name="ProductResult"
        component={ProductResult}
        // options={{ presentation: "containedTransparentModal" }}
      />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

      <Stack.Screen
        name="InventarizationList"
        component={InventarizationList}
        options={{
          headerTitle: "Список инвентаризации",
          ...optionsTrueDefaults,
        }}
      />

      <Stack.Screen
        name="InfoguideScreen"
        component={InfoguideScreen}
        options={{
          headerTitle: i18n.t("infoguide"),
          ...optionsFalseDefaults,
        }}
      />

      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerTitle: i18n.t("infoguide"),
          ...optionsFalseDefaults,
        }}
      />

      <Stack.Screen
        name="EventsScreen"
        component={EventScreen}
        options={{
          headerTitle: i18n.t("events"),
          ...optionsTrueDefaults,
        }}
      />

      <Stack.Screen
        name="EventPdfScreen"
        component={EventPdfScreen}
        options={{
          headerTitle: i18n.t("events"),
          ...optionsTrueDefaults,
          headerShown: true,
          headerBackTitle: "Назад",
        }}
      />

      <Stack.Screen
        name="DocumentPdfScreen"
        component={DocumentPdfScreen}
        options={{
          headerTitle: "Документ",
          ...optionsTrueDefaults,
          headerShown: true,
          headerBackTitle: "Назад",
        }}
      />
      <Stack.Screen
        name="SafetyPdf"
        component={SafetyPdf}
        options={{
          headerTitle: "Документ",
          ...optionsTrueDefaults,
          headerShown: true,
          headerBackTitle: "Назад",
        }}
      />

      <Stack.Screen
        name="BirthdayScreen"
        component={BirthdayScreen}
        options={{
          headerTitle: i18n.t("birthdays"),
          ...optionsTrueDefaults,
        }}
      />

      <Stack.Screen
        name="FoodMenuScreen"
        component={FoodMenuScreen}
        options={{
          headerShown: false,
          headerTitle: i18n.t("foodmenu"),
          headerStyle: {
            backgroundColor: "#D64D43",
          },
          headerBackTitle: "Назад",
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{
          headerTitle: i18n.t("news"),
          ...optionsTrueDefaults,
        }}
      />

      <Stack.Screen
        name="SingleNewsScreen"
        component={SingleNewsScreen}
        options={{
          headerTitle: i18n.t("news"),
          ...optionsTrueDefaults,
        }}
      />

      <Stack.Screen
        name="FoodMenuPanel"
        component={FoodMenuPanel}
        options={{
          headerTitle: "Ввод меню",
          ...optionsTrueDefaults,
          headerRight: () => <FoodHeaderRight />,
        }}
      />

      <Stack.Screen
        name="MenuHistory"
        component={MenuHistory}
        options={{
          headerTitle: "История меню",
          ...optionsTrueDefaults,
          animation: "fade_from_bottom",
          animationDuration: 400,
        }}
      />

      <Stack.Screen
        name="MenuStatistics"
        component={MenuStatistics}
        options={{
          headerTitle: "Статистика опроса",
          ...optionsTrueDefaults,
          animation: "fade_from_bottom",
          animationDuration: 400,
        }}
      />

      <Stack.Screen
        name="PaperScreen"
        component={PaperScreen}
        options={{
          headerTitle: i18n.t("raschet"),
          ...optionsTrueDefaults,
        }}
      />

      <Stack.Screen
        name="DocumentListScreen"
        component={DocumentListScreen}
        options={{
          headerTitle: i18n.t("docLoad"),
          ...optionsTrueDefaults,
        }}
      />

      <Stack.Screen
        name="ChangeLang"
        component={ChangeLang}
        options={{
          headerTitle: i18n.t("changeLanguage"),
          ...optionsTrueDefaults,
        }}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerTitle: i18n.t("changeParol"),
          ...optionsFalseDefaults,
        }}
      />

      <Stack.Screen
        name="ContactsScreen"
        component={ContactsScreen}
        options={{
          headerTitle: i18n.t("contacts"),
          ...optionsTrueDefaults,
        }}
      />

      <Stack.Screen
        name="TechnicalSupportScreen"
        component={TechnicalSupportScreen}
        options={{
          headerTitle: i18n.t("adminpo"),
          ...optionsTrueDefaults,
        }}
      />
      <Stack.Screen
        name="SafetyRulesScreen"
        component={SafetyRulesScreen}
        options={{
          headerTitle: i18n.t("goldenRules"),
          ...optionsTrueDefaults,
        }}
      />

      <Stack.Screen
        name="VacationScreen"
        component={VacationScreen}
        options={{
          headerTitle: i18n.t("vacation"),
          ...optionsTrueDefaults,
        }}
      />

      <Stack.Screen
        name="SpecformScreen"
        component={SpecformScreen}
        options={{
          headerTitle: i18n.t("clothes"),
          ...optionsTrueDefaults,
        }}
      />

      <Stack.Screen
        name="CameraPhone"
        component={CameraPhone}
        options={{
          headerShown: false,
          headerTitle: "CameraPhone",
          headerTitleStyle: {
            fontSize: 18,
            color: "#4D4D4D",
          },
          headerTintColor: "#4D4D4D",
        }}
      />

      <Stack.Screen
        name="UserPassChange"
        component={UserPassChange}
        options={{
          headerTitle: `Изменить пароль`,
          ...optionsTrueDefaults,
        }}
      />

      <Stack.Screen
        name="PushSendScreen"
        component={PushSendScreen}
        options={{
          headerTitle: `Отправить уведомления`,
          ...optionsTrueDefaults,
        }}
      />

      <Stack.Screen
        name="ChangePhone"
        component={ChangePhone}
        options={{
          headerTitle: i18n.t("changePhone"),
          ...optionsFalseDefaults,
        }}
      />

      <Stack.Screen
        name="LoginVerify"
        component={LoginVerify}
        options={{
          headerTitle: `Верификация`,
          ...optionsFalseDefaults,
        }}
      />

      <Stack.Screen
        name="Ongdu"
        component={Ongdu}
        options={{
          headerTitle: "ОНГДУ",
          ...optionsFalseDefaults,
        }}
      />

      <Stack.Screen
        name="OngduList"
        component={OngduList}
        options={{
          headerTitle: "ОНГДУ список",
          ...optionsTrueDefaults,
        }}
      />
    </Stack.Navigator>
  );

  function BottomNavigation() {
    return (
      <Tab.Navigator
        activeColor="#D64D43"
        labelStyle={{ fontSize: 12 }}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#D64D43",
          tabBarStyle: {
            backgroundColor: "white",
            // display: globalThis. ? "flex" : "none",
            paddingTop: 15,
            paddingBottom: 5,
            borderTopWidth: 0,
          },
        }}
      >
        <Tab.Screen
          name="Основное"
          component={HomeScreen}
          options={{
            gestureEnabled: false,
            tabBarLabel: i18n.t("home"),
            tabBarShowLabel: false,

            tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
          initialParams={{ paramName: token }}
        />
        <Tab.Screen
          name="QR"
          component={OpenQr}
          options={{
            tabBarLabel: i18n.t("documentqr"),
            tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="qrcode-scan"
                color={color}
                size={23}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationHistory}
          options={{
            tabBarLabel: i18n.t("notification"),
            tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
            tabBarShowLabel: false,
            tabBarBadge: `${openedLength}`,
            tabBarBadgeStyle: {
              fontSize: 11,
              backgroundColor: "#FF7F7F",
              color: "white",
              display:
                openedLength === 0 || openedLength === "" ? "none" : "flex",
            },
            tabBarIcon: ({ color }) => (
              <Ionicons name="notifications" size={24} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Личный кабинет"
          component={ProfileScreen}
          options={{
            tabBarLabel: i18n.t("profile"),
            tabBarShowLabel: false,
            tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
            tabBarColor: false,
          }}
        />
      </Tab.Navigator>
    );
  }
}
