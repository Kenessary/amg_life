import { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  LogBox,
  Dimensions,
  Linking,
  Platform,
  Animated,
} from "react-native";
import themeContext from "../../../../cores/themeContext";
import { AuthContext } from "../../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";
import { ch, kz, ru } from "../../../../languages/localizations";
import moment from "moment";
import Constants from "expo-constants";
import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import TopBarNavigation from "../../../../components/TopBarNavigation";
import {
  backButton,
  departmenBackButton,
} from "../../../../components/GoBackButton";
import { departmentRightButton } from "../../../../components/RightButtons";
import { Colors } from "../../../../styles/colors";

const statusBarHeight =
  Platform.OS === "android"
    ? Constants.statusBarHeight
    : Platform.OS === "ios"
    ? 20 // For iOS status bar
    : 0;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const Department = ({
  showed,
  department,
  setShowed,
  setDepartment,
  setFavourite,
  favourite,
  departmentIsFav,
  depId,
  data,
  selectedFull,
  selectedDescr,
}) => {
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  const { iin } = useContext(AuthContext);
  const [show, setShow] = useState(true);
  const [depFav, setDepFav] = useState(false);

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    if (departmentIsFav === false) {
      setDepFav(false);
    } else {
      setDepFav(true);
    }
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0
  const translateYAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (showPopup) {
      // Animate the popup to fade in and move up
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300, // Duration of the fade-in effect
        useNativeDriver: true,
      }).start();

      Animated.timing(translateYAnim, {
        toValue: 0, // Move to original position
        duration: 300, // Duration of the move-up effect
        useNativeDriver: true,
      }).start();

      // Set timeout to hide the popup after 5 seconds
      const timeout = setTimeout(() => {
        // Animate the popup to fade out and move down
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300, // Duration of the fade-out effect
          useNativeDriver: true,
        }).start();

        Animated.timing(translateYAnim, {
          toValue: 50, // Move back down
          duration: 300, // Duration of the move-down effect
          useNativeDriver: true,
        }).start(() => {
          setShowPopup(false); // Set showPopup to false after the animation completes
        });
      }, 2000);

      return () => {
        clearTimeout(timeout); // Clear timeout if component unmounts or showPopup changes
      };
    }
  }, [showPopup]);

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

  const date = moment().format('"YYYY-MM-DD 00:00:00"');

  const tableHeader = (a) => (
    <View
      style={{
        backgroundColor: "#f1f1f1",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 5,
        marginTop: 5,
      }}
    >
      <View></View>

      <View
        style={[
          styles.tableHeader,
          { backgroundColor: "#F5DA81", borderRadius: 10 },
        ]}
      >
        <View style={styles.columnHeader}>
          <Text style={[styles.columnHeaderTxt, { color: Colors.smoothBlack }]}>
            {i18n.t("fioImia")}
          </Text>
        </View>
        <View style={styles.columnHeader}>
          <Text style={[styles.columnHeaderTxt, { color: Colors.smoothBlack }]}>
            {i18n.t("doljnost")}
          </Text>
        </View>
        <View style={styles.columnHeader}>
          <Text style={[styles.columnHeaderTxt, { color: Colors.smoothBlack }]}>
            {i18n.t("telphoneNum")}
          </Text>
          <Text style={[styles.columnHeaderTxt, { color: Colors.smoothBlack }]}>
            {i18n.t("cabinet")}
          </Text>
        </View>
        <View style={styles.columnHeader}>
          <Text style={[styles.columnHeaderTxt, { color: Colors.smoothBlack }]}>
            {i18n.t("sotovi")}
          </Text>
          <Text style={[styles.columnHeaderTxt, { color: Colors.smoothBlack }]}>
            {i18n.t("pochta")}
          </Text>
        </View>
      </View>
    </View>
  );

  let depr = [];

  for (let i = 0; i < department.length; i++) {
    const a = department[i].id;
    const children = department[i].children;
    const ncd = department[i].employees;
    let deprChild = [];

    for (let j = 0; j < children.length; j++) {
      const bwer = children[j].id;

      deprChild.push(
        <View key={j}>
          <View
            style={{
              alignItems: "center",
              width: windowWidth,
              padding: 5,
              borderColor: "#4d4d4d",
              marginBottom: 8,
              marginTop: 8,
            }}
          >
            <Text
              style={{
                color: "#4d4d4d",
                width: windowWidth - 40,
                textAlign: "center",
              }}
            >
              {children[j].name}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <FlatList
              data={children[j].employees}
              style={{
                width: windowWidth - 10,
                backgroundColor: "#F1F1F1",
                padding: 5,
                borderRadius: 10,
              }}
              ListHeaderComponent={tableHeader}
              stickyHeaderIndices={[0]}
              horizontal={false}
              scrollEnabled={false}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      ...styles.tableRow,
                      backgroundColor: "white",
                      borderRadius: 10,
                      padding: 5,
                      marginBottom: 5,
                    }}
                  >
                    <Text
                      style={{
                        ...styles.columnRowTxt,
                        fontWeight: "bold",
                        color: Colors.smoothBlack,
                      }}
                    >
                      {item.fio}
                    </Text>
                    <Text
                      style={[
                        styles.columnRowTxt,
                        { color: Colors.smoothBlack },
                      ]}
                    >
                      {item.doljnost}
                    </Text>
                    <Text
                      style={[
                        styles.columnRowTxt,
                        { color: Colors.smoothBlack, lineHeight: 14 },
                      ]}
                    >
                      {item.raboch_tel}
                      {"\n"}
                      {"\n"}{" "}
                      <View
                        style={{
                          backgroundColor:
                            item.timein > JSON.parse(date) &&
                            item.timein > item.timeout
                              ? "#00A507"
                              : "",
                          color: "black",
                          padding: 3,
                          borderRadius: 5,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            ...styles.columnRowTxtRoom,
                            color:
                              item.timein > JSON.parse(date) &&
                              item.timein > item.timeout
                                ? "white"
                                : "#4d4d4d",
                          }}
                        >
                          {item.cabinet}
                        </Text>
                      </View>
                    </Text>
                    <Text
                      style={[
                        styles.columnRowTxt,
                        { color: Colors.smoothBlack },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(
                            `tel:${"8" + Number(String(item.sot_tel).slice(1))}`
                          )
                        }
                        style={{ alignItems: "center" }}
                      >
                        <Text
                          style={{
                            color: "#187D07",
                            fontSize: 11,
                            marginTop: 5,
                            fontWeight: "600",
                            textAlign: "center",
                          }}
                        >
                          {item.sot_tel}
                        </Text>
                      </TouchableOpacity>
                      {"\n"}
                      <Text
                        style={[
                          styles.columnRowTxt,
                          { color: Colors.smoothBlack },
                        ]}
                      >
                        {item.email}
                      </Text>
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      );
    }

    depr.push(
      <View key={i} style={styles.container}>
        <ScrollView nestedScrollEnabled={true}>
          <ScrollView horizontal={true} style={{ width: "100%" }}>
            <View>
              <View
                style={{
                  alignItems: "center",
                  width: windowWidth,
                  padding: 5,
                  borderColor: "#4d4d4d",
                  marginBottom: 8,
                  marginTop: 8,
                }}
              >
                <View
                  style={{
                    width: windowWidth - 50,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F1F1F1",
                    padding: 7,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#4d4d4d",
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                  >
                    {department[i].name}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.container1,
                  {
                    display:
                      department[i].children.length !== 0 ? "flex" : "none",
                  },
                ]}
              >
                {deprChild}
              </View>
              <View
                style={[
                  styles.container1,
                  {
                    display:
                      department[i].children.length === 0 ? "flex" : "none",
                    alignItems: "center",
                  },
                ]}
              >
                <FlatList
                  data={ncd}
                  style={{
                    width: windowWidth - 10,
                    display: show === true ? "flex" : "none",
                    backgroundColor: "#F1F1F1",
                    padding: 5,
                    borderRadius: 10,
                  }}
                  ListHeaderComponent={tableHeader}
                  stickyHeaderIndices={[0]}
                  horizontal={false}
                  scrollEnabled={false}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{}}>
                        <View
                          style={{
                            ...styles.tableRow,
                            backgroundColor: "white",
                            borderRadius: 10,
                            padding: 5,
                            marginBottom: 5,
                          }}
                        >
                          <Text
                            style={{
                              ...styles.columnRowTxt,
                              fontWeight: "bold",
                              color: Colors.smoothBlack,
                            }}
                          >
                            {item.fio}
                          </Text>
                          <Text
                            style={[
                              styles.columnRowTxt,
                              { color: Colors.smoothBlack },
                            ]}
                          >
                            {item.doljnost}
                          </Text>
                          <Text
                            style={[
                              styles.columnRowTxt,
                              { color: Colors.smoothBlack, lineHeight: 14 },
                            ]}
                          >
                            {item.raboch_tel}
                            {"\n"}
                            {"\n"}{" "}
                            <View
                              style={{
                                backgroundColor:
                                  item.timein > JSON.parse(date) &&
                                  item.timein > item.timeout
                                    ? "#00A507"
                                    : "",
                                color: "black",
                                padding: 3,
                                borderRadius: 5,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  ...styles.columnRowTxtRoom,
                                  color:
                                    item.timein > JSON.parse(date) &&
                                    item.timein > item.timeout
                                      ? "white"
                                      : "#4d4d4d",
                                }}
                              >
                                {item.cabinet}
                              </Text>
                            </View>
                          </Text>
                          <Text
                            style={[
                              styles.columnRowTxt,
                              { color: Colors.smoothBlack },
                            ]}
                          >
                            <TouchableOpacity
                              onPress={() =>
                                Linking.openURL(
                                  `tel:${
                                    "8" + Number(String(item.sot_tel).slice(1))
                                  }`
                                )
                              }
                              style={{ alignItems: "center" }}
                            >
                              <Text
                                style={{
                                  color: "#187D07",
                                  fontSize: 11,
                                  marginTop: 5,
                                  fontWeight: "600",
                                  textAlign: "center",
                                }}
                              >
                                {item.sot_tel}
                              </Text>
                            </TouchableOpacity>
                            {"\n"}
                            <Text
                              style={[
                                styles.columnRowTxt,
                                { color: Colors.smoothBlack },
                              ]}
                            >
                              {item.email}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        display: showed ? "flex" : "none",
        zIndex: 10,
        width: "100%",
      }}
    >
      <TopBarNavigation
        isHome={false}
        isDepartment={true}
        title={selectedDescr}
        titleDeparment={selectedFull}
        backButton={departmenBackButton(setDepartment, setShowed)}
        height={"15%"}
        rightButton={departmentRightButton(
          depId,
          depFav,
          setFavourite,
          setDepFav,
          setShowPopup
        )}
      />

      <ScrollView
        nestedScrollEnabled={true}
        style={{
          width: "100%",
          backgroundColor: Colors.white,
          marginTop: 10,
          paddingTop: 15,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          height: "84%",
        }}
      >
        {depr}

        <View style={{ marginBottom: 80 }} />
      </ScrollView>

      <Animated.View
        key={Math.random()}
        style={{ alignItems: "center", display: showPopup ? "flex" : "none" }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "#58B038",
            padding: 20,
            paddingBottom: 50,
            alignItems: "center",
            display: depFav ? "flex" : "none",
            zIndex: 3,
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <MaterialCommunityIcons
            name="bookmark-check"
            size={20}
            color="white"
          />
          <Text style={{ color: "white", marginLeft: 20 }}>
            {selectedDescr} добавлено в избранное
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            backgroundColor: "#C54635",
            padding: 20,
            paddingBottom: 50,
            alignItems: "center",
            display: !depFav ? "flex" : "none",
            zIndex: 3,
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <MaterialCommunityIcons
            name="bookmark-minus"
            size={20}
            color="white"
          />
          <Text style={{ color: "white", marginLeft: 20 }}>
            {selectedDescr} удален из избранных
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  container1: {
    marginLeft: 0,
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
  },

  tableHeader: {
    flexDirection: "row",
    height: 50,
  },
  headerText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    height: 60,
    border: 1,
  },
  "tableRow:last-child": {
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  columnHeader: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  columnHeaderTxt: {
    color: "black",
    fontWeight: "bold",
    fontSize: 10,
  },
  columnRowTxt: {
    textAlign: "center",
    width: "25%",
    fontSize: 10,
  },
  columnRowTxtRoom: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
    // width:40,

    color: "black",
  },
});
