import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  docDefaultDate,
  docDefaultDateFull,
  docDefaultDateMixed,
  docDefaultDateMixedFull,
} from "../api/api";
import i18n from "i18n-js";
import { Colors } from "../../../../styles/colors";
import { AuthContext } from "../../../../context/AuthContext";

const TopSwitch = ({
  switched,
  setSwitched,
  setIsLoading,
  setDocsArray,
  setDocsArrayFull,
  valueMonth,
  valueYear,
  setDocsArrayMixed,
}) => {
  // console.log(valueMonth, "wwd");
  const { iin } = useContext(AuthContext);
  const getDefaultDate = () => {
    setSwitched(false),
      docDefaultDateMixed(
        iin,
        valueMonth === null ? "" : JSON.stringify(valueYear),
        valueMonth === null
          ? ""
          : valueMonth === 10 || valueMonth === 11 || valueMonth === 12
          ? JSON.stringify(valueMonth)
          : valueMonth.toString().padStart(2, "0"),
        setIsLoading,
        setDocsArrayMixed
      );
  };

  const getDefaultDateFull = () => {
    setSwitched(true);
    docDefaultDateMixedFull(
      iin,
      valueMonth === null ? "" : JSON.stringify(valueYear),
      valueMonth === null
        ? ""
        : valueMonth === 10 || valueMonth === 11 || valueMonth === 12
        ? JSON.stringify(valueMonth)
        : valueMonth.toString().padStart(2, "0"),
      setIsLoading,
      setDocsArrayMixed
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => getDefaultDate()}
        style={!switched ? styles.activeBtn : styles.inactiveBtn}
      >
        <Text style={styles.btnText}>{i18n.t("toExecute")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => getDefaultDateFull()}
        style={!switched ? styles.inactiveBtn : styles.activeBtn}
      >
        <Text style={styles.btnText}>{i18n.t("executed")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "rgba(0,0,0,0.04)",
    padding: 3,
    borderRadius: 10,
  },
  activeBtn: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
  },
  inactiveBtn: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
    padding: 5,
  },
  btnText: {
    fontSize: 14,
    color: Colors.smoothBlack,
  },
});

export default TopSwitch;
