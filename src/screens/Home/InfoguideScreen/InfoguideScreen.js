import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import axios from "axios";
import { WaveIndicator } from "react-native-indicators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../../languages/localizations";
import themeContext from "../../../cores/themeContext";
import { AuthContext } from "../../../context/AuthContext";
import { Department } from "./components/Department";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";
import { Colors } from "../../../styles/colors";
import ChooseBar from "./components/ChooseBar";
import DepartmentBarContainer from "./components/DepartmentBarContainer";
// import { departmentList } from "./components/data/deparmentlistdata";
import { Animated } from "react-native";

export default function InfoguideScreen() {
  const { iin } = useContext(AuthContext);

  const [selectedFull, setSelectedFull] = useState([]);
  const [selectedDescr, setSelectedDescr] = useState([]);
  const [showFavDep, setShowFavDep] = useState(false);
  const [depId, setDepId] = useState("");
  const [departmentIsFav, setDepartmentIsFav] = useState("");
  const [showed, setShowed] = useState(false);
  globalThis.showed = showed;

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([
    {
      descr: i18n.t("kmk"),
      id: 524,
      full: i18n.t("kmkfull"),
      favourite: false,
    },
    {
      descr: i18n.t("vspomogat"),
      id: 520,
      full: i18n.t("vspomogatfull"),
      favourite: false,
    },
    {
      descr: i18n.t("provkom"),
      id: 498,
      full: i18n.t("provkomfull"),
      favourite: false,
    },
    { descr: i18n.t("su"), id: 2, full: i18n.t("sufull"), favourite: false },
    {
      descr: i18n.t("cnpcAtk"),
      id: 13,
      full: i18n.t("cnpcAtkfull"),
      favourite: false,
    },
    {
      descr: i18n.t("usnNP"),
      id: 7,
      full: i18n.t("usnNPfull"),
      favourite: false,
    },
    {
      descr: i18n.t("uptoKo"),
      id: 1,
      full: i18n.t("uptoKofull"),
      favourite: false,
    },
    {
      descr: i18n.t("uopT"),
      id: 10,
      full: i18n.t("uopTfull"),
      favourite: false,
    },
    {
      descr: i18n.t("nursultanPrav"),
      id: 12,
      full: i18n.t("nursultanPravfull"),
      favourite: false,
    },
    { descr: i18n.t("ams"), id: 14, full: i18n.t("amsfull"), favourite: false },
    {
      descr: i18n.t("jngk"),
      id: 11,
      full: i18n.t("jngkfull"),
      favourite: false,
    },
    { descr: i18n.t("aen"), id: 15, full: i18n.t("aenfull"), favourite: false },
    {
      descr: i18n.t("ongdu"),
      id: 16,
      full: i18n.t("ongdufull"),
      favourite: false,
    },
    {
      descr: i18n.t("kngdu"),
      id: 17,
      full: i18n.t("kngdufull"),
      favourite: false,
    },
    {
      descr: i18n.t("nii"),
      id: 276,
      full: i18n.t("niifull"),
      favourite: false,
    },
    {
      descr: i18n.t("suoem"),
      id: 161,
      full: i18n.t("suoemfull"),
      favourite: false,
    },
    { descr: i18n.t("db"), id: 89, full: i18n.t("dbfull"), favourite: false },
    {
      descr: i18n.t("centIT"),
      id: 179,
      full: i18n.t("centITfull"),
      favourite: false,
    },
    { descr: i18n.t("ad"), id: 82, full: i18n.t("adfull"), favourite: false },
    {
      descr: i18n.t("drK"),
      id: 168,
      full: i18n.t("drKfull"),
      favourite: false,
    },
    { descr: i18n.t("df"), id: 142, full: i18n.t("dffull"), favourite: false },
    {
      descr: i18n.t("dpoz"),
      id: 118,
      full: i18n.t("dpozfull"),
      favourite: false,
    },
    {
      descr: i18n.t("dpd"),
      id: 123,
      full: i18n.t("dpdfull"),
      favourite: false,
    },
    {
      descr: i18n.t("dtr"),
      id: 136,
      full: i18n.t("dtrfull"),
      favourite: false,
    },
    {
      descr: i18n.t("ped"),
      id: 149,
      full: i18n.t("pedfull"),
      favourite: false,
    },
    {
      descr: i18n.t("dks"),
      id: 102,
      full: i18n.t("dksfull"),
      favourite: false,
    },
    {
      descr: i18n.t("dot"),
      id: 113,
      full: i18n.t("dotfull"),
      favourite: false,
    },
    {
      descr: i18n.t("dRazvetki"),
      id: 128,
      full: i18n.t("dRazvetkifull"),
      favourite: false,
    },
    {
      descr: i18n.t("dRazrabotki"),
      id: 131,
      full: i18n.t("dRazrabotkifull"),
      favourite: false,
    },
    {
      descr: i18n.t("dBurenie"),
      id: 93,
      full: i18n.t("dBureniefull"),
      favourite: false,
    },
    { descr: i18n.t("do"), id: 72, full: i18n.t("dofull"), favourite: false },
    { descr: i18n.t("ddn"), id: 97, full: i18n.t("ddnfull"), favourite: false },
    {
      descr: i18n.t("dkptr"),
      id: 107,
      full: i18n.t("dkptrfull"),
      favourite: false,
    },
    {
      descr: i18n.t("skbp"),
      id: 177,
      full: i18n.t("skbpfull"),
      favourite: false,
    },
    {
      descr: i18n.t("rukovot"),
      id: 184,
      full: i18n.t("rukovotfull"),
      favourite: false,
    },
    { descr: i18n.t("agd"), id: 77, full: i18n.t("agdfull"), favourite: false },
    {
      descr: i18n.t("asp"),
      id: 156,
      full: i18n.t("aspfull"),
      favourite: false,
    },
  ]);

  // console.log(data)

  globalThis.a = depId;

  globalThis.s = selectedFull;
  globalThis.d = selectedDescr;

  const [newArray, setNewArray] = useState([]);
  // console.log(newArray)

  const handleAddButtonPress = (newItem) => {
    setNewArray([...newArray, newItem]);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const savedData = await AsyncStorage.getItem("dataUpdated"); // Change 'yourDataKey' to a unique key
        if (savedData !== null) {
          setData(JSON.parse(savedData));
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data: ", error);
      }
    };

    loadData();
  }, []);

  const setFavourite = (itemId) => {
    setIsLoading(true);
    const updatedData = data.map((item) => {
      if (item.id === itemId) {
        return { ...item, favourite: !item.favourite };
      }
      return item;
    });
    setData(updatedData);
    AsyncStorage.setItem("dataUpdated", JSON.stringify(updatedData));
    setIsLoading(false);
  };

  // console.log(data)
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    if (locale !== "") {
      AsyncStorage.setItem("appLanguage", locale);
    }
  });

  useEffect(() => {
    getData1();
  });

  const getData1 = () => {
    try {
      AsyncStorage.getItem("appLanguage").then((value) => {
        if (value != null) {
          // setIsLoading(true)
          //   console.log(value)
          setLang(value);
        }
      });
      // setIsLoading(false)
    } catch (error) {
      // setIsLoading(false)
      console.log(error);
    }
  };

  const [department, setDepartment] = useState("");

  const getDep = (id) => {
    setIsLoading(true);

    // const startTime = performance.now();
    const config = {
      method: "get",
      url: `http://95.57.218.120/?apitest.helloAPIWithParams4444={"id":"${
        iin === "111111111111" ? 179 : id
      }"}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        let parse_third = JSON.parse(JSON.parse(info).response).list;
        let newArray = parse_third.map((list) => {
          return {
            id: list.id,
            name: list.name,
            roditel: list.roditel,
            prioritet: list.prioritet,
            children: list.children,
            employees: list.employees,
          };
        });
        setDepartment(newArray);
        setIsLoading(false);
        setShowed(true);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const [showPopup, setShowPopup] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0
  const translateYAnim = useRef(new Animated.Value(50)).current;

  // console.log(data)

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <WaveIndicator key={Math.random()} color="#D64D43" />
      </View>
    );
  }

  const setter = (deparmentType) => {
    setDepId(deparmentType.id);
    setSelectedFull(deparmentType.full);
    setSelectedDescr(deparmentType.descr);
    setDepartmentIsFav(deparmentType.favourite);
    getDep(deparmentType.id);
    handleAddButtonPress(deparmentType);
  };

  const sortedData = [...data]; // Create a copy of the original array to avoid modifying it directly

  sortedData.sort((a, b) => {
    return a.descr.localeCompare(b.descr);
  });

  const favoriteItems = data.filter((item) => item.favourite === true);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.background,
        zIndex: 10,
      }}
    >
      {!showed && (
        <TopBarNavigation
          isHome={false}
          backButton={backButton()}
          title={i18n.t("infoguide")}
          rightButton={false}
          height={"15%"}
        />
      )}

      <ChooseBar
        showed={showed}
        showFavDep={showFavDep}
        setShowFavDep={setShowFavDep}
      />

      <DepartmentBarContainer
        showed={showed}
        setter={setter}
        sortedData={sortedData}
        favoriteItems={favoriteItems}
        showFavDep={showFavDep}
        setFavourite={setFavourite}
      />

      <Department
        showed={showed}
        data={data}
        department={department}
        setShowed={setShowed}
        setDepartment={setDepartment}
        setFavourite={setFavourite}
        departmentIsFav={departmentIsFav}
        selectedFull={selectedFull}
        selectedDescr={selectedDescr}
        depId={depId}
      />
    </View>
  );
}
