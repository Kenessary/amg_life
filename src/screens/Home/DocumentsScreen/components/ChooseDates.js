import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import i18n from "i18n-js";
import { Colors } from "../../../../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import {
  docDefaultDate,
  docDefaultDateFull,
  docDefaultDateMixed,
  docDefaultDateMixedFull,
} from "../api/api";
import { AuthContext } from "../../../../context/AuthContext";

const today = new Date();
const yyyy = today.getFullYear();
const yearNumber = JSON.parse(yyyy);

const ChooseDates = ({
  valueMonth,
  setValueMonth,
  valueYear,
  setValueYear,
  setUpDown,
  upDown,
  setIsLoading,
  // setDocsArray,
  // setDocsArrayFull,
  setDocsArrayMixed,
}) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = today.getMonth() + 1;

  const { iin } = useContext(AuthContext);
  const dateText =
    valueMonth === null
      ? i18n.t("choosedDate")
      : `${i18n.t("choosed")} ${
          valueMonth === null
            ? `${i18n.t("notChoosed")}`
            : valueMonth === 10 || valueMonth === 11 || valueMonth === 12
            ? "" + valueMonth
            : "0" + valueMonth
        }/${valueYear === null ? `${i18n.t("notChoosed")}` : valueYear}`;

  const reset = () => {
    setValueMonth(null), setValueYear(yearNumber), setUpDown(false);
    docDefaultDateMixed(iin, "", "", setIsLoading, setDocsArrayMixed);
    docDefaultDateMixedFull(iin, "", "", setIsLoading, setDocsArrayMixed);
  };

  // console.log(valueMonth === 10);

  const toggle = () => {
    setUpDown(!upDown);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.dateTextContainer}>
          <Text style={styles.choosenDateText}>{dateText}</Text>
        </View>

        <TouchableOpacity
          style={styles.chooseDatesBtn}
          onPress={() => toggle()}
        >
          <Text style={styles.chooseDatesBtnText}>{i18n.t("chooseDate")}</Text>
          {upDown === false ? (
            <AntDesign name="caretdown" size={11} color={Colors.smoothBlack} />
          ) : (
            <AntDesign name="caretup" size={11} color={Colors.smoothBlack} />
          )}
        </TouchableOpacity>
      </View>

      {valueMonth !== null && valueYear !== null ? (
        <TouchableOpacity
          onPress={() => reset()}
          style={{ ...styles.resetBtn, display: upDown ? "flex" : "none" }}
        >
          <Text style={styles.resetBtnText}>{i18n.t("reset")}</Text>
        </TouchableOpacity>
      ) : (
        ""
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignItems: "center",
  },
  dateTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  choosenDateText: {
    fontSize: 11,
    fontWeight: "500",
    marginRight: 8,
    marginLeft: 3,
    color: Colors.smoothBlack,
  },
  resetBtn: {
    width: "100%",
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    alignItems: "center",
  },
  resetBtnText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.white,
  },
  chooseDatesBtn: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: "rgba(0,0,0,0.05)",
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  chooseDatesBtnText: {
    color: Colors.smoothBlack,
    marginRight: 5,
  },
});

export default ChooseDates;
