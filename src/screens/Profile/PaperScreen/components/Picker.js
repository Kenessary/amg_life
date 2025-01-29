import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import i18n from "i18n-js";
import DropDownPicker from "react-native-dropdown-picker";
import { Colors } from "../../../../styles/colors";
import { kz, ru, ch } from "../../../../languages/localizations";
import { useEffect } from "react";
import { getLanguage, localeCheck } from "../../../../languages/languageLoad";

const Picker = ({ type, value, setValue, modalTitle }) => {
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";
  //   console.log(lang);

  useEffect(() => {
    localeCheck(locale), getLanguage(setLang);
  });
  const [openMonth, setOpenMonth] = useState(false);
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
    <DropDownPicker
      open={type === "month" ? openMonth : openYear}
      value={value}
      items={type === "month" ? itemsMonth : itemsYear}
      setOpen={type === "month" ? setOpenMonth : setOpenYear}
      setValue={setValue}
      setItems={type === "month" ? setItemsMonth : setItemsYear}
      labelStyle={{ color: Colors.smoothBlack }}
      style={styles.mainStyle}
      containerStyle={{ width: "100%" }}
      badgeSeparatorStyle={{ borderWidth: 2 }}
      itemSeparator={true}
      itemSeparatorStyle={styles.itemSeparator}
      searchable={false}
      modalTitle={modalTitle}
      modalAnimationType="slide"
      listMode="MODAL"
      modalContentContainerStyle={{
        backgroundColor: Colors.white,
      }}
      modalTitleStyle={styles.modalTitleStyle}
    />
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    width: "100%",
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.09)",

    borderRadius: 12,
  },
  itemSeparator: {
    width: "100%",
    marginLeft: 5,
    opacity: 0.1,
  },
  modalTitleStyle: {
    fontWeight: "bold",
    color: Colors.smoothBlack,
  },
});

export default Picker;
