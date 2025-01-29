import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";
import * as LocalAuthentication from "expo-local-authentication";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../../../../languages/localizations";
import { AuthContext } from "../../../../../context/AuthContext";
import { Colors } from "../../../../../styles/colors";
import {
  getLanguage,
  localeCheck,
} from "../../../../../languages/languageLoad";

export default function PinlockScreen({ navigation }) {
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  const [passcode, setPasscode] = useState(["", "", "", ""]);
  const [secondPass, setSecondPass] = useState("");
  const [isAuthenticated, setIsAutenticated] = useState(false);
  const [isFace, setIsFace] = useState("");
  const { iin } = useContext(AuthContext);

  const logoImage = require("../../../../../../assets/icon.png");

  useEffect(() => {
    localeCheck(locale);
    getLanguage(setLang);
  });

  useEffect(() => {
    async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      return compatible;
    };
  });

  function onAuthenticate() {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: i18n.t("facetouch"),
      disableDeviceFallback: true,
      fallbackLabel: i18n.t("bioTypePass"),
      cancelLabel: i18n.t("bioCancel"),
    });
    auth.then((result) => {
      setIsAutenticated(result.success);
      console.log(result.error);
    });
  }

  const ver = () => {
    if (isAuthenticated) {
      navigation.navigate("HomeScreen");
    }
  };

  useEffect(() => {
    ver();
  });

  useEffect(() => {
    (async () => {
      const apapa =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      setIsFace(apapa);
    })();
  }, []);

  useEffect(() => {
    if (iin !== null) {
      onAuthenticate();
    }
  }, []);

  useEffect(() => {
    getData1();
  }, []);

  const createTwoButtonAlert = () =>
    Alert.alert(i18n.t("errorPin"), i18n.t("bioAlert2"), [
      {
        text: "OK",
      },
      {
        text: i18n.t("bioForget"),
        onPress: () => {
          navigation.navigate("ChangePassword");
        },
      },
    ]);

  useEffect(() => {
    if (!passcode.includes("")) {
      setTimeout(() => {
        if (JSON.stringify(passcode) === secondPass) {
          handleSubmitPassCode();
        } else {
          createTwoButtonAlert();
          handleClearPassCode();
        }
      }, 0);
    }
  }, [passcode]);

  const getData1 = () => {
    try {
      AsyncStorage.getItem("secondPass").then((value) => {
        if (value != null) {
          setSecondPass(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const numbers = useMemo(
    () => [
      { num: 1 },
      { num: 2 },
      { num: 3 },
      { num: 4 },
      { num: 5 },
      { num: 6 },
      { num: 7 },
      { num: 8 },
      { num: 9 },
      { num: "authenticate", icon: true },
      { num: `0` },
      { num: "delete", icon: true },
    ],
    []
  );

  const onPressNumber = (num) => {
    if (num === "delete") {
      onPressBack();
      return;
    }

    if (num === "authenticate") {
      onAuthenticate();
      return;
    }

    setPasscode((prevPasscode) => {
      const tempPassCode = [...prevPasscode];
      for (let i = 0; i < tempPassCode.length; i++) {
        if (tempPassCode[i] === "") {
          tempPassCode[i] = num;
          break;
        }
      }
      return tempPassCode;
    });
  };

  const onPressBack = () => {
    setPasscode((prevPasscode) => {
      const tempPassCode = [...prevPasscode];
      for (let i = tempPassCode.length - 1; i >= 0; i--) {
        if (tempPassCode[i] !== "") {
          tempPassCode[i] = "";
          break;
        }
      }
      return tempPassCode;
    });
  };

  const handleSubmitPassCode = () => {
    navigation.navigate("HomeScreen");
  };
  const handleClearPassCode = () => {
    setPasscode(["", "", "", ""]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.white }]}>
      <StatusBar style="dark" />
      <View>
        <View style={styles.swipe}>
          <Image source={logoImage} style={styles.logo} />
          <View style={{ alignItems: "center" }}>
            <View>
              <Text
                style={[styles.passCodeText, { color: Colors.smoothBlack }]}
              >
                {i18n.t("pinlock")}
              </Text>
            </View>
            <View style={styles.codeContainer}>
              {passcode.map((p) => {
                return (
                  <View
                    style={p != "" ? styles.redDot : styles.defaultDot}
                    key={p + Math.random()}
                  />
                );
              })}
            </View>
          </View>
        </View>

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View style={styles.numbersContainer}>
            {numbers.map((number, index) => (
              <TouchableOpacity
                style={{
                  ...styles.number,
                  backgroundColor:
                    number.num === "" ? "white" : "rgba(0, 0, 0, 0.02)",
                }}
                key={index}
                onPress={() => onPressNumber(number.num)}
                disabled={number.num === ""}
              >
                {number.icon ? (
                  number.num === "authenticate" ? (
                    isFace[0] === 2 ? (
                      <MaterialCommunityIcons
                        name="face-recognition"
                        size={32}
                        color={Colors.smoothBlack}
                      />
                    ) : (
                      <Ionicons
                        name="finger-print"
                        size={32}
                        color={Colors.smoothBlack}
                      />
                    )
                  ) : (
                    <Feather
                      name="delete"
                      size={32}
                      color={Colors.smoothBlack}
                    />
                  )
                ) : (
                  <Text
                    style={[styles.numberText, { color: Colors.smoothBlack }]}
                  >
                    {number.num}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  swipe: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  passCodeText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
  },
  codeContainer: {
    marginTop: 15,
    width: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  redDot: {
    width: 13,
    height: 13,
    borderRadius: 13,
    backgroundColor: Colors.primary,
  },
  defaultDot: {
    width: 13,
    height: 13,
    borderRadius: 13,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
  },
  numbers: {
    alignItems: "center",
    justifyContent: "center",
  },
  numbersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 282,
    height: 348,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    width: 75,
    height: 75,
    borderRadius: 75,
    margin: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontSize: 32,
    fontWeight: "600",
    letterSpacing: 0,
    textAlign: "center",
  },
});
