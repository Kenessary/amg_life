import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import i18n from "i18n-js";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../../../../../styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PassCodeScreen = ({ isTypedSecond, setIsTypedSecond }) => {
  const logoImage = require("../../../../../../../assets/icon.png");

  const [passcode, setPasscode] = useState(["", "", "", ""]);
  const [secondPasscode, setSecondPassCode] = useState(["", "", "", ""]);
  const [isTypedFirst, setIsTypedFirst] = useState(false);

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
      { num: "" },
      { num: `0` },
      { num: "delete", icon: true },
    ],
    []
  );

  const createTwoButtonAlert1 = () =>
    Alert.alert(i18n.t("bioAlert"), i18n.t("bioAlert2"), [
      {
        text: "OK",
      },
    ]);

  useEffect(() => {
    if (!passcode.includes("")) {
      setTimeout(() => {
        handleSubmitPassCode();
      }, 50);
    }
  }, [passcode]);

  useEffect(() => {
    if (!secondPasscode.includes("")) {
      setTimeout(() => {
        if (JSON.stringify(secondPasscode) === JSON.stringify(passcode)) {
          AsyncStorage.setItem("secondPass", JSON.stringify(secondPasscode));
          handleSubmitSecondPassCode();
          setIsTypedFirst(false);
        } else {
          createTwoButtonAlert1();
          handleClearSecondPassCode();
        }
      }, 50);
    }
  }, [secondPasscode, passcode]);

  const onPressNumber = (num) => {
    if (num === "delete") {
      onPressBack();
      return;
    }

    !isTypedFirst
      ? setPasscode((prevPasscode) => {
          const tempPassCode = [...prevPasscode];
          for (let i = 0; i < tempPassCode.length; i++) {
            if (tempPassCode[i] === "") {
              tempPassCode[i] = num;
              break;
            }
          }
          return tempPassCode;
        })
      : setSecondPassCode((prevPasscode) => {
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
    !isTypedFirst
      ? setPasscode((prevPasscode) => {
          const tempPassCode = [...prevPasscode];
          for (let i = tempPassCode.length - 1; i >= 0; i--) {
            if (tempPassCode[i] !== "") {
              tempPassCode[i] = "";
              break;
            }
          }
          return tempPassCode;
        })
      : setSecondPassCode((prevPasscode) => {
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
    setIsTypedFirst(true);
  };
  const handleClearPassCode = () => {
    setPasscode(["", "", "", ""]);
  };

  const handleSubmitSecondPassCode = () => {
    setIsTypedFirst(false);
    setIsTypedSecond(true);
  };
  const handleClearSecondPassCode = () => {
    setSecondPassCode(["", "", "", ""]);
  };

  return (
    <>
      <View
        style={{ ...styles.swipe, display: isTypedSecond ? "none" : "flex" }}
      >
        <Image source={logoImage} style={styles.logo} />
        <View style={{ alignItems: "center" }}>
          <Text style={[styles.passCodeText, { color: Colors.smoothBlack }]}>
            {!isTypedFirst ? i18n.t("bioText") : i18n.t("bioTextRep")}
          </Text>

          <View style={styles.codeContainer}>
            {!isTypedFirst
              ? passcode.map((p) => {
                  return (
                    <View
                      style={p != "" ? styles.redDot : styles.defaultDot}
                      key={p + Math.random()}
                    />
                  );
                })
              : secondPasscode.map((p) => {
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

      <View
        style={{ ...styles.numbers, display: isTypedSecond ? "none" : "flex" }}
      >
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
                <Feather name="delete" size={32} color={Colors.smoothBlack} />
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
    </>
  );
};

const styles = StyleSheet.create({
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

export default PassCodeScreen;
