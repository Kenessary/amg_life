import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../languages/localizations";
import { Colors } from "../../styles/colors";
import TopBarNavigation from "../../components/TopBarNavigation";
import { getLanguage, localeCheck } from "../../languages/languageLoad";
import { AuthContext } from "../../context/AuthContext";

export default function OpenQr({ navigation }) {
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  let [invent, setInvent] = useState("");
  let [uptoiko, setUptoiko] = useState("");
  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  // const { uptoiko } = useContext(AuthContext);
  console.log(uptoiko, "uptoki");

  useEffect(() => {
    localeCheck(locale), getLanguage(setLang);
  });

  useEffect(() => {
    getDataInvent();
    getDataUptoiko();
  });

  const getDataInvent = () => {
    try {
      AsyncStorage.getItem("userInvent").then((value) => {
        if (value != null) {
          setInvent(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getDataUptoiko = () => {
    try {
      AsyncStorage.getItem("userUptoiko").then((value) => {
        if (value != null) {
          setUptoiko(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style={"dark"} />

      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={"QR Сканер"}
        height={"15%"}
      />
      <View style={styles.bottomContent}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("DocumentScreen")}
          >
            <MaterialCommunityIcons
              name="qrcode-scan"
              color={Colors.primary}
              size={30}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.buttonLabel}>QR</Text>
            <Text style={styles.buttonTitle}>ЭДО</Text>
          </TouchableOpacity>

          {invent === "Yes" ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Inventarization")}
            >
              <MaterialCommunityIcons
                name="qrcode-scan"
                color={Colors.primary}
                size={30}
                style={{ marginRight: 10 }}
              />

              <Text style={styles.buttonLabel}>QR</Text>
              <Text style={styles.buttonTitle}>Инвентаризация</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("ProductScan")}
            >
              <MaterialCommunityIcons
                name="qrcode-scan"
                color={Colors.primary}
                size={30}
                style={{ marginRight: 10 }}
              />

              <Text style={styles.buttonLabel}>QR</Text>
              <Text style={styles.buttonTitle}>АМГ ТМЦ</Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            ...styles.buttonContainer,
            marginTop: 10,
            display: invent === "Yes" && uptoiko !== "" ? "flex" : "none",
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ProductScan")}
          >
            <MaterialCommunityIcons
              name="qrcode-scan"
              color={Colors.primary}
              size={30}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.buttonLabel}>QR</Text>
            <Text style={styles.buttonTitle}>АМГ ТМЦ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={true}
            style={{ ...styles.button, backgroundColor: Colors.background }}
          ></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
    height: "100%",
  },
  bottomContent: {
    alignItems: "center",
    height: "85%",
    marginTop: 10,
  },
  buttonContainer: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "48%",
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 15,
  },
  buttonLabel: {
    fontSize: 14,
    color: Colors.smoothBlack,
    fontWeight: "300",
    marginTop: 10,
  },
  buttonTitle: {
    fontSize: 16,
    color: Colors.smoothBlack,
    fontWeight: "700",
    marginTop: 5,
  },
});
// const podpisBtn = () => {
//   setPodpisInfo("");
//   setPodpisModal(false);
//   navigation.goBack();
//   setScanned(false);
// };

// const vhodResultBtn = () => {
//   setVhodResult("");
//   setModal(false);
//   navigation.goBack();
//   setScanned(false);
// };

// const errorBtn=()=>{
//   navigation.goBack();
//   setScanned(false);
//   setModalErrorp(false);
// }
