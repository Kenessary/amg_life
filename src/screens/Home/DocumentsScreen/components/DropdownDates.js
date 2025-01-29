import React, { useContext, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import i18n from "i18n-js";
import { Colors } from "../../../../styles/colors";
import {
  docDefaultDate,
  docDefaultDateFull,
  docDefaultDateMixed,
  docDefaultDateMixedFull,
} from "../api/api";
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign } from "@expo/vector-icons";
import ChooseDates from "./ChooseDates";
import { AuthContext } from "../../../../context/AuthContext";
const windowWidth = Dimensions.get("window").width;

const DropdownDates = ({
  setIsLoading,
  setDocsArray,
  setDocsArrayFull,
  upDown,
  setUpDown,
  valueYear,
  setValueYear,
  valueMonth,
  setValueMonth,
  setDocsArrayMixed,
  switched,
}) => {
  const { iin } = useContext(AuthContext);
  const [openMonth, setOpenMonth] = useState(false);
  // console.log(valueMonth);

  const [itemsMonth, setItemsMonth] = useState([
    { label: "01", value: 1 },
    { label: "02", value: 2 },
    { label: "03", value: 3 },
    { label: "04", value: 4 },
    { label: "05", value: 5 },
    { label: "06", value: 6 },
    { label: "07", value: 7 },
    { label: "08", value: 8 },
    { label: "09", value: 9 },
    { label: "10", value: 10 },
    { label: "11", value: 11 },
    { label: "12", value: 12 },
  ]);

  const [openYear, setOpenYear] = useState(false);
  const [itemsYear, setItemsYear] = useState([
    { label: "2026", value: 2026 },
    { label: "2025", value: 2025 },
    { label: "2024", value: 2024 },
    { label: "2023", value: 2023 },
    { label: "2022", value: 2022 },
    { label: "2021", value: 2021 },
    { label: "2020", value: 2020 },
    { label: "2019", value: 2019 },
    { label: "2018", value: 2018 },
    { label: "2017", value: 2017 },
    { label: "2016", value: 2016 },
    { label: "2015", value: 2015 },
    { label: "2014", value: 2014 },
    { label: "2013", value: 2013 },
    { label: "2012", value: 2012 },
    { label: "2011", value: 2011 },
  ]);

  return (
    <View
      style={{
        alignItems: "center",
        width: "90%",
        padding: 10,
        backgroundColor: Colors.white,
        borderRadius: 20,
        marginTop: 10,
      }}
    >
      <ChooseDates
        valueMonth={valueMonth}
        setValueMonth={setValueMonth}
        valueYear={valueYear}
        setValueYear={setValueYear}
        setUpDown={setUpDown}
        upDown={upDown}
        setDocsArrayMixed={setDocsArrayMixed}
        // setDocsArray={setDocsArray}
        // setDocsArrayFull={setDocsArrayFull}
        setIsLoading={setIsLoading}
      />
      <View
        style={{
          display: upDown === true ? "flex" : "none",
          flexDirection: "row",
          backgroundColor: "rgba(0,0,0,0.04)",
          width: windowWidth - 20,
          marginTop: 10,
          padding: 7,
          borderRadius: 10,
          alignItems: "center",
          width: "100%",
        }}
      >
        <DropDownPicker
          open={openMonth}
          value={valueMonth}
          items={itemsMonth}
          setOpen={setOpenMonth}
          setValue={setValueMonth}
          setItems={setItemsMonth}
          labelStyle={{ color: Colors.smoothBlack }}
          style={{
            borderWidth: 0,
            backgroundColor: Colors.white,
          }}
          containerStyle={{ width: "40%", borderRadius: 0, marginRight: 10 }}
          badgeSeparatorStyle={{ borderWidth: 2 }}
          itemSeparator={true}
          itemSeparatorStyle={{
            width: windowWidth,
            marginLeft: 5,
            opacity: 0.1,
          }}
          placeholder={i18n.t("month")}
          searchable={false}
          modalTitle={i18n.t("chooseMonth")}
          modalAnimationType="slide"
          listMode="MODAL"
          modalContentContainerStyle={{
            backgroundColor: Colors.white,
          }}
          modalTitleStyle={{
            fontWeight: "bold",
            color: Colors.smoothBlack,
          }}
        />

        <DropDownPicker
          open={openYear}
          value={valueYear}
          items={itemsYear}
          setOpen={setOpenYear}
          setValue={setValueYear}
          setItems={setItemsYear}
          labelStyle={{ color: Colors.smoothBlack }}
          style={{
            // width: "40%",
            borderWidth: 0,
            backgroundColor: Colors.white,
          }}
          containerStyle={{ width: "40%", borderRadius: 0 }}
          dropDownContainerStyle={{ width: 120, borderWidth: 0 }}
          badgeSeparatorStyle={{ borderWidth: 2 }}
          itemSeparator={true}
          itemSeparatorStyle={{
            width: windowWidth,
            marginLeft: 5,
            opacity: 0.1,
          }}
          placeholder="Год"
          searchable={false}
          modalTitle={i18n.t("chooseYear")}
          modalAnimationType="slide"
          listMode="MODAL"
          modalContentContainerStyle={{
            backgroundColor: Colors.white,
          }}
          modalTitleStyle={{
            fontWeight: "bold",
            color: Colors.smoothBlack,
          }}
        />
        <TouchableOpacity
          style={{
            width: "15%",
            alignItems: "flex-end",
          }}
          onPress={() => {
            // setDocsArrayMixed([]);
            !switched
              ? docDefaultDateMixed(
                  iin,
                  JSON.stringify(valueYear),
                  valueMonth === 10 || valueMonth === 11 || valueMonth === 12
                    ? JSON.stringify(valueMonth)
                    : valueMonth.toString().padStart(2, "0"),
                  setIsLoading,
                  setDocsArrayMixed
                )
              : docDefaultDateMixedFull(
                  iin,
                  JSON.stringify(valueYear),
                  valueMonth === 10 || valueMonth === 11 || valueMonth === 12
                    ? JSON.stringify(valueMonth)
                    : valueMonth.toString().padStart(2, "0"),
                  setIsLoading,
                  setDocsArrayMixed
                );

            setUpDown(false);
          }}
        >
          <AntDesign name="rightcircle" size={30} color={"grey"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DropdownDates;
