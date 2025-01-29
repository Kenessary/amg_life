import {
  androidBackHandler,
  checkUpdate,
  getMenuSurvey,
  infoIin,
  loadChosenInterface,
  menuForSurvey,
  setExpoPushToken,
  setUpdateVersion,
} from "./responses/HomeApi";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
// import { StatusBar } from "expo-status-bar";
import { WaveIndicator } from "react-native-indicators";
import { loadDarkMode } from "../../loadDarkMode";
import { BirthdayCongratulation } from "./components/BirthdayCongratulation";
import { HomeContainer } from "./components/HomeContainer";
import { ReviewSurvey } from "./components/ReviewSurvey";
import { VersionUpdateModal } from "./components/VersionUpdateModal";
import { MenuSurvey } from "./components/MenuSurvey";
import themeContext from "../../../cores/themeContext";
import UserVerification from "./components/UserVerification";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import { StatusBar } from "react-native";

const statusBarHeight =
  Platform.OS === "android"
    ? Constants.statusBarHeight - 10
    : Platform.OS === "ios"
    ? 0 // For iOS status bar
    : 0;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HomeScreen() {
  const route = useRoute();
  const { paramName } = route.params;

  // console.log(paramName, "expotoken fromhome");
  const version = "2.2.5";

  const theme = useContext(themeContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  loadDarkMode(setIsDarkMode);

  const { iin, logout } = useContext(AuthContext);
  let [isLoadingVer, setIsLoadingVer] = useState(false);
  let [modalUpdate, setModalUpdate] = useState(false);
  let [buttonShow, setButtonShow] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [opros, setOpros] = useState(false);

  let [isForeign, setisForeign] = useState("");
  let [verified, setVerified] = useState("");
  let [respass, setresPass] = useState("");
  let [menu, setMenu] = useState("");
  // let [fio, setFio] = useState(globalThis.userp.fio);

  let [interfacesSwitch, setInterfacesSwitch] = useState("list");
  const [pushStatus, setPushStatus] = useState("");

  useEffect(() => {
    const day = moment().format(`DD`);
    const mm = moment().format(`MM`);
    const iinMonth = iin.slice(2, 4);
    const iinDay = iin.slice(4, 6);

    if (day === iinDay && mm === iinMonth) {
      setButtonShow(true);
    } else {
      setButtonShow(false);
    }
  }, [iin]);

  useEffect(() => {
    // setIsLoading(true);
    setExpoPushToken(iin, paramName, setPushStatus);
    // infoIin(
    //   // setIsLoadingVer,
    //   iin,
    //   setresPass,
    //   setFio,
    //   setVerified,
    //   setisForeign
    //   // setButtonShow
    // );
    loadChosenInterface(setInterfacesSwitch);
    getMenuSurvey(iin, setOpros);

    iin !== "980624351476" && setUpdateVersion(iin, version);
    menuForSurvey(setMenu);
    iin !== "980624351476" && checkUpdate(version, setModalUpdate);
    androidBackHandler();
  }, []);

  // console.log(globalThis.asexpo);

  // console.log(Constants.statusBarHeight)

  const [hasShownAlert, setHasShownAlert] = useState(false);

  // useEffect(() => {
  //   const checkAlertStatus = async () => {
  //     const alertShown = await AsyncStorage.getItem("alertShown");
  //     if (alertShown !== "true") {
  //       showLogoutAlert(); // Show alert if it hasn't been shown
  //     }
  //   };

  //   checkAlertStatus();
  // }, []);

  // const showLogoutAlert = () => {
  //   Alert.alert(
  //     "Требуется выход из приложения",
  //     "Чтобы улучшить функциональность приложения, пожалуйста, выйдите и войдите еще раз.",
  //     [
  //       {
  //         text: "Выйти",
  //         onPress: handleLogout,
  //         style: "destructive",
  //       },
  //     ],
  //     { cancelable: false } // Makes sure the alert cannot be dismissed without pressing the button
  //   );
  // };

  // const handleLogout = async () => {
  //   logout();
  //   await AsyncStorage.setItem("alertShown", "true");
  //   console.log("User logged out");
  // };

  if (menu.length === 0 && interfacesSwitch && isLoading) {
    return (
      <View
        style={{
          ...styles.loader,
          backgroundColor: isDarkMode === true ? "#262C38" : "",
        }}
      >
        <WaveIndicator key={Math.random()} color={theme.loading} />
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: "#F7F8FA",
        // paddingTop: statusBarHeight,
      }}
    >
      <StatusBar barStyle={"dark-content"} backgroundColor="white" />
      {/* <UserVerification
        respass={respass}
        verified={verified}
        setVerClose={infoIin}
        foreign={isForeign}
      /> */}
      {/* <BirthdayCongratulation fio={fio} buttonShow={buttonShow} /> */}
      <HomeContainer
        version={version}
        interfacesSwitch={interfacesSwitch === "" ? "grid" : interfacesSwitch}
        setInterfacesSwitch={setInterfacesSwitch}
      />
      <VersionUpdateModal modalUpdate={modalUpdate} />
      <MenuSurvey menu={menu} iin={iin} opros={opros} setOpros={setOpros} />
      <ReviewSurvey
        setIsLoading={setIsLoading}
        iin={iin}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    flex: 1,
    zIndex: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
