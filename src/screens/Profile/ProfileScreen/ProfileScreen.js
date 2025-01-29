import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import qs from "qs";
import { WaveIndicator } from "react-native-indicators";
import themeContext from "../../../cores/themeContext";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../../languages/localizations";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../../../styles/colors";
import TopBarNavigation from "../../../components/TopBarNavigation";
import RightButtons from "./components/RightButtons";
import BottomButtons, {
  PasswordChangeButton,
} from "./components/BottomButtons";
import UserInformation from "./components/UserInformation";
import UserProfileImage from "./components/UserProfileImage";
import { SettingsProfile } from "./components/Settings";
import { getLanguage, localeCheck } from "../../../languages/languageLoad";
import { getProfile } from "./api/api";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ProfileScreen({ navigation }) {
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    localeCheck(locale), getLanguage(setLang);
  });

  const { iin, userInfo } = useContext(AuthContext);
  const [userp, setUserp] = useState([]);
  const [sot, setSot] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleForDelete, setModalVisibleForDelete] = useState(false);
  const [iinforeign, setIinForeign] = useState("");
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("");
  globalThis.userp = userp;

  // console.log(userInfo, "ekjfernfejkrfkjerfjnek");÷

  // console.log(userp);

  // console.log(userp.tel);
  globalThis.type = type;

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  // const profile = [];

  useEffect(() => {
    if (iin === "111111111111") {
      setUserp({
        apparat: "No",
        fio: "Demo User",
        iin: "111111111111",
        invent: "No",
        isforeign: "0",
        phone_number: "87777777777",
        sotrpm: "No",
        status: "Ok",
        stolovaya: "No",
        verified: true,
      });
      setSot("No");
    } else {
      getSot();
    }
  }, []);

  const getSot = () => {
    setIsLoading(true);
    try {
      AsyncStorage.getItem("userInfo").then((value) => {
        if (value != null) {
          setUserp(JSON.parse(value));
          setSot(JSON.parse(value).sotrpm);

          console.log(JSON.parse(value));
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // profile.push(userp.fio, userp.iin, userp.tel);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.white,
          height: "100%",
          width: "100%",
        }}
      >
        <WaveIndicator key={Math.random()} color={Colors.primary} />
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.container,
        opacity: modalVisible || modalVisibleForDelete ? 0.3 : 1,
      }}
    >
      <StatusBar style={visible ? "light" : "dark"} />

      <SettingsProfile
        iinforeign={userp.isforeign}
        visible={visible}
        toggleBottomNavigationView={toggleBottomNavigationView}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalVisibleForDelete={modalVisibleForDelete}
        setModalVisibleForDelete={setModalVisibleForDelete}
        phone={userp.phone_number}
      />

      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={i18n.t("profile")}
        height={"15%"}
        rightButton={
          <RightButtons
            toggleBottomNavigationView={toggleBottomNavigationView}
          />
        }
      />

      <View style={styles.userProfile}>
        <UserProfileImage />
        <UserInformation
          name={userp.fio}
          iin={userp.iin}
          phone={userp.phone_number}
        />
      </View>

      <BottomButtons />
      {sot === "Yes" && <PasswordChangeButton />}
    </View>
  );
}

const styles = StyleSheet.create({
  userProfile: {
    alignItems: "center",
    backgroundColor: "white",
    width: "90%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 35,
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 15,
  },

  container: {
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
    backgroundColor: Colors.background,
    height: "100%",
  },
});
