import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Picker from "./Picker";
import { Colors } from "../../../../styles/colors";
import i18n from "i18n-js";
import { AuthContext } from "../../../../context/AuthContext";
import { getPaper } from "../api/api";

const DatePickerForPaper = ({
  valueMonth,
  setValueMonth,
  valueYear,
  setValueYear,
  setList,
  setNas,
  setUder,
  setTextMonth,
  setvisible,
}) => {
  const { iin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={{ height: "85%", marginBottom: 100 }}>
      <View style={styles.page}>
        <View style={styles.pickerContainer}>
          <View style={styles.datePickers}>
            <View style={styles.monthPicker}>
              <Picker
                type={"month"}
                value={valueMonth}
                setValue={setValueMonth}
                modalTitle={i18n.t("chooseMonth")}
              />
            </View>

            <View style={styles.yearPicker}>
              <Picker
                type={"year"}
                value={valueYear}
                setValue={setValueYear}
                modalTitle={i18n.t("chooseYear")}
              />
            </View>
          </View>

          {isLoading === true ? (
            <>
              <Text style={styles.loadingText}>
                Подождите, расчетный лист формируется
              </Text>
              <ActivityIndicator color={Colors.primary} size={"large"} />
            </>
          ) : (
            <TouchableOpacity
              disabled={isLoading === false ? false : true}
              style={styles.btn}
              onPress={() => {
                getPaper(
                  iin,
                  valueYear,
                  valueMonth,
                  setList,
                  setNas,
                  setUder,
                  setTextMonth,
                  setvisible,
                  setIsLoading,
                  valueMonth
                );
              }}
            >
              <Text style={styles.btnText}>{i18n.t("loadPaper")}</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.attentionText}>{i18n.t("chisla10")}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: { alignItems: "center" },
  pickerContainer: {
    alignItems: "center",
    marginTop: 50,
    width: "90%",
    padding: 20,
    borderRadius: 25,
    paddingVertical: 30,
    backgroundColor: Colors.white,
  },
  datePickers: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.04)",
    borderRadius: 20,
  },
  yearPicker: { width: "48%" },
  monthPicker: { width: "48%" },
  loadingText: {
    fontSize: 16,
    color: Colors.smoothBlack,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 25,
    paddingTop: 25,
  },
  btn: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  btnText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "700",
  },
  attentionText: {
    textAlign: "left",
    fontSize: 12,
    width: "90%",
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    color: Colors.smoothBlack,
  },
});

export default DatePickerForPaper;
