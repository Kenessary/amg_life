import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import themeContext from "../../../cores/themeContext";
import i18n from "i18n-js";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  HomeScreen,
  NotificationHistory,
  OpenQr,
  ProfileScreen,
} from "../../../screens";
import { AuthContext } from "../../../context/AuthContext";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const { openedLength } = useContext(AuthContext);
  const theme = useContext(themeContext);

  // console.log(globalThis.profileUser, "fromTab");
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
};

export default BottomNavigation;
