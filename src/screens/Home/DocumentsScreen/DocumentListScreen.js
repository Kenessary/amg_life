import { View, StyleSheet, ScrollView, Modal, Text } from "react-native";
import React, { useContext } from "react";
import { Dimensions } from "react-native";

import { useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";

import i18n from "i18n-js";
import { kz, ru, ch } from "../../../languages/localizations";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";
import { Colors } from "../../../styles/colors";
import {
  docDefaultDate,
  docDefaultDateFull,
  docDefaultDateMixed,
} from "./api/api";
import DropdownDates from "./components/DropdownDates";
import TopSwitch from "./components/TopSwitch";
import DocumentsList from "./components/DocumentsList";
import { getLanguage, localeCheck } from "../../../languages/languageLoad";
import TypeSwitch from "./components/TypeSwitch";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";

export default function DocumentListScreen() {
  const { iin } = useContext(AuthContext);
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    localeCheck(locale), getLanguage(setLang);
  });

  const [docsArray, setDocsArray] = useState([]);
  const [docsArrayMixed, setDocsArrayMixed] = useState([]);
  // console.log(docsArrayMixed);
  const [oneExampleArray, setOneExampleArray] = useState([]);
  // console.log(oneExampleArray);
  const [docGuid, setDocGuid] = useState("");
  globalThis.docGuid = docGuid;
  const [docType, setDocType] = useState("");
  globalThis.docType = docType;
  const [docsArrayFull, setDocsArrayFull] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [switched, setSwitched] = useState(false);
  // console.log(switched);
  const [upDown, setUpDown] = useState(false);
  // console.log(docsArrayFull);

  const [valueYear, setValueYear] = useState(null);
  const [valueMonth, setValueMonth] = useState(null);
  const [signDocumentResult, setSignDocumentResult] = useState([]);
  const [signDocumentModal, setSignDocumentModal] = useState(false);
  const [signDocumentLoad, setSignDocumentLoad] = useState(false);
  // console.log(valueMonth === null);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = today.getMonth() + 1;
  const yearNumber = JSON.parse(yyyy);
  const monthNumber = JSON.parse(mm);

  const [typeDoc, setTypeDoc] = useState("edo");

  useEffect(() => {
    setValueYear(yearNumber);

    // docDefaultDate(iin, "", "", setIsLoading, setDocsArray);
    // docDefaultDateFull(iin, "", "", setIsLoading, setDocsArrayFull);
    docDefaultDateMixed(iin, "", "", setIsLoading, setDocsArrayMixed);
  }, []);
  // const example = [
  //   {
  //     DateDoc: "28.10.2024 16:49:06",
  //     Name: "Доверенность",
  //     Number: "AU-000255",
  //     guid: "edf29b52-9522-11ef-80cd-00155dd42208",
  //     system: "edo",
  //     type: "Доверенность",
  //     action: "false",
  //   },
  //   {
  //     DateDoc: "28.10.2024 15:53:02",
  //     Name: "Задание на командировку",
  //     Number: "AU-002792",
  //     guid: "057c6e7c-951b-11ef-80cd-00155dd42208",
  //     system: "edo",
  //     type: "Заданиенакомандировку",
  //     action: "true",
  //   },
  //   {
  //     DateDoc: "28.10.2024 15:42:46",
  //     Name: "Задание на командировку",
  //     Number: "AU-002793",
  //     guid: "28667580-951b-11ef-80cd-00155dd42208",
  //     system: "edo",
  //     type: "Заданиенакомандировку",
  //     action: "true",
  //   },
  //   {
  //     DateDoc: "09.10.2024 15:04:58",
  //     Name: "Задание на командировку",
  //     Number: "AU-002556",
  //     guid: "0cda09e7-8626-11ef-80cd-00155dd42208",
  //     system: "edo",
  //     type: "Заданиенакомандировку",
  //     action: "true",
  //   },

  //   {
  //     DateDoc: "08.10.2024 15:22:44",
  //     Name: "Доверенность",
  //     Number: "AU-000237",
  //     guid: "6bfd846e-855f-11ef-80cd-00155dd42208",
  //     system: "edo",
  //     type: "Доверенность",
  //     action: "false",
  //   },
  //   {
  //     DateDoc: "08.10.2024 15:19:27",
  //     Name: "Доверенность",
  //     Number: "AU-000236",
  //     guid: "295b5771-855f-11ef-80cd-00155dd42208",
  //     system: "edo",
  //     type: "Доверенность",
  //     action: "true",
  //   },
  //   {
  //     DateDoc: "08.10.2024 15:15:23",
  //     Name: "Доверенность",
  //     Number: "AU-000235",
  //     guid: "70d87284-855e-11ef-80cd-00155dd42208",
  //     system: "edo",
  //     type: "Доверенность",
  //     action: "true",
  //   },
  // ];

  useEffect(() => {
    if (typeDoc === "edo") {
      setOneExampleArray(docsArrayMixed[0]);
    }
    if (typeDoc === "oa") {
      setOneExampleArray(docsArrayMixed[1]);
    }
    if (typeDoc === "1c") {
      setOneExampleArray(docsArrayMixed[2]);
    }
  }, [docsArrayMixed, typeDoc]);

  return (
    <View style={{ ...styles.container, opacity: signDocumentModal ? 0.3 : 1 }}>
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={i18n.t("docLoad")}
        backButton={backButton()}
        height={"15%"}
      />

      <DropdownDates
        switched={switched}
        upDown={upDown}
        setDocsArray={setDocsArray}
        setDocsArrayFull={setDocsArrayFull}
        setDocsArrayMixed={setDocsArrayMixed}
        setIsLoading={setIsLoading}
        setUpDown={setUpDown}
        valueYear={valueYear}
        setValueYear={setValueYear}
        valueMonth={valueMonth}
        setValueMonth={setValueMonth}
      />

      <TopSwitch
        switched={switched}
        setSwitched={setSwitched}
        setIsLoading={setIsLoading}
        setDocsArray={setDocsArray}
        setDocsArrayFull={setDocsArrayFull}
        setDocsArrayMixed={setDocsArrayMixed}
        valueMonth={valueMonth}
        valueYear={valueYear}
      />

      <TypeSwitch typeDoc={typeDoc} setTypeDoc={setTypeDoc} />

      <ScrollView style={{ width: "100%", marginTop: 10 }}>
        {/* {switched ? (
          <DocumentsList documents={docsArrayFull} isLoading={isLoading} />
        ) : (
          <DocumentsList documents={docsArray} isLoading={isLoading} />
        )} */}

        <DocumentsList
          documents={oneExampleArray}
          isLoading={isLoading}
          type={typeDoc}
          setSignDocumentModal={setSignDocumentModal}
          setSignDocumentResult={setSignDocumentResult}
          setSignDocumentLoad={setSignDocumentLoad}
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={signDocumentModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {signDocumentLoad ? (
                <ActivityIndicator size={"large"} color={Colors.primary} />
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: Colors.smoothBlack,
                      marginBottom: 15,
                    }}
                  >
                    {signDocumentResult}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSignDocumentModal(false),
                        docDefaultDateMixed(
                          iin,
                          "",
                          "",
                          setIsLoading,
                          setDocsArrayMixed
                        );
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: Colors.primary,
                      }}
                    >
                      Закрыть
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  modalView: {
    borderRadius: 40,
    width: "90%",
    height: 100,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 4,
    backgroundColor: Colors.background,
  },
});
