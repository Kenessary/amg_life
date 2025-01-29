import {
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Linking,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
// import { InterfaceList } from "./InterfaceList/";
import { InterfaceGrid } from "./InterfaceGrid";
import { Search } from "./Search";
import { BottomSheet } from "react-native-btr";
import { useContext, useEffect, useState } from "react";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { multiLanguage } from "../../../language";
import { loadDarkMode } from "../../../loadDarkMode";
import themeContext from "../../../../cores/themeContext";
import i18n from "i18n-js";
import { ru, ch, kz } from "../../../../languages/localizations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WaveIndicator } from "react-native-indicators";
import { Colors } from "../../../../styles/colors";
import { docDefaultDate } from "../responses/HomeApi";
import { AuthContext } from "../../../../context/AuthContext";
import { docDefaultDateMixed } from "../../DocumentsScreen/api/api";
import { InterfaceList } from "./InterfaceList";
import { events } from "../data/events";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import { getInterface } from "../responses/HomeApi";

const windowWidth = Dimensions.get("window").width;
export function HomeContainer({
  version,
  interfacesSwitch,
  setInterfacesSwitch,
}) {
  const { iin } = useContext(AuthContext);
  const [docsArrayLength, setDocsArrayLength] = useState(0);
  const [docsArrays, setDocsArrays] = useState(0);
  let [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  multiLanguage(locale, setLang);
  // console.log(lang === "");

  useEffect(() => {
    docDefaultDateMixed(iin, "", "", setIsLoading, setDocsArrays);
  }, []);

  useEffect(() => {
    docsArrays &&
      setDocsArrayLength(
        docsArrays[0].length + docsArrays[1].length + docsArrays[2].length
      );
  }, [docsArrays]);

  const saveChosenInterface = async (interfaceName) => {
    try {
      await AsyncStorage.setItem("chosenInterface", interfaceName);
    } catch (error) {
      console.error("Error saving chosen interface:", error);
    }
  };

  const selectInterface = (interfaceName) => {
    setInterfacesSwitch(interfaceName);
    saveChosenInterface(interfaceName);
  };

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  // if(isLoading) {
  //   return(
  //     <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
  //     <WaveIndicator color={theme.loading}/>
  //   </View>
  //   )
  // }
  // const isBetweenDates = (start, end) => {
  //   const today = new Date();
  //   const startDate = new Date(today.getFullYear(), start.month - 1, start.day);
  //   const endDate = new Date(today.getFullYear(), end.month - 1, end.day);
  //   return today >= startDate && today <= endDate;
  // };
  // console.log(new Date().getFullYear());

  // const isBetweenDates = (start, end) => {
  //   const today = new Date();
  //   const currentYear = today.getFullYear();

  //   // Start Date
  //   const startDate = new Date(currentYear, start.month - 1, start.day);

  //   // End Date: Check if endDate is before startDate (it spans to the next year)
  //   let endDate = new Date(currentYear, end.month - 1, end.day);
  //   if (endDate < startDate) {
  //     endDate = new Date(currentYear + 1, end.month - 1, end.day);
  //   }

  //   return today >= startDate && today <= endDate;
  // };

  // const currentEvent = events.find((event) =>
  //   isBetweenDates(event.startDate, event.endDate)
  // );

  // const currentEvent = events.find((event) =>
  //   isBetweenDates(event.startDate, event.endDate)
  // );
  // console.log(currentEvent);

  return (
    <View>
      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}
        <View
          style={[
            styles.bottomNavigationView,
            { backgroundColor: Colors.white, zIndex: 30 },
          ]}
        >
          <View style={{}}>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 22,
                  fontWeight: "700",
                  // backgroundColor:'red'
                  color: Colors.smoothBlack,
                }}
              >
                AMG-Life
              </Text>
            </View>
            <View style={{ width: "100%", marginTop: 15 }}>
              <Text
                style={{
                  color: "#3A3B40",
                  fontSize: 12,
                  fontWeight: "300",
                  marginLeft: 5,
                }}
              >
                Интерфейс
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                width: "100%",
                justifyContent: "space-between",
                padding: 8,
                backgroundColor: "rgba(0,0,0,0.04)",
                borderRadius: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  selectInterface("list");
                  setVisible(false);
                }}
                style={{
                  borderWidth:
                    interfacesSwitch && interfacesSwitch === "list" ? 3 : 1,
                  borderColor:
                    interfacesSwitch === "list" ? "#D5463C" : "white",
                  alignItems: "center",
                  width: "48%",
                  height: 50,
                  justifyContent: "center",
                  borderRadius: 15,
                  backgroundColor: "white",
                }}
              >
                <Feather
                  name="list"
                  size={30}
                  color={interfacesSwitch === "list" ? "#D5463C" : "#9D9D9D"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  selectInterface("grid");
                  setVisible(false);
                }}
                style={{
                  borderWidth:
                    interfacesSwitch && interfacesSwitch === "grid" ? 3 : 1,
                  borderColor:
                    interfacesSwitch === "grid" ? "#D5463C" : "white",
                  alignItems: "center",
                  width: "48%",
                  height: 50,
                  justifyContent: "center",
                  borderRadius: 15,
                  backgroundColor: "white",
                }}
              >
                <Ionicons
                  name="grid"
                  size={28}
                  color={interfacesSwitch === "grid" ? "#D5463C" : "#9D9D9D"}
                />
              </TouchableOpacity>
            </View>

            <View style={{ width: "100%", marginTop: 15 }}>
              <Text
                style={{
                  color: "#3A3B40",
                  fontSize: 12,
                  fontWeight: "300",
                  marginLeft: 5,
                }}
              >
                Социальные сети
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,

                padding: 8,
                backgroundColor: "rgba(0,0,0,0.04)",
                borderRadius: 20,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`instagram://user?username=cnpc_kazakhstan`)
                }
                style={{
                  width: "23%",
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  borderRadius: 15,
                }}
              >
                <Entypo name="instagram" size={30} color="#DC453C" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("vnd.youtube://@cnpc-amg7239/CNPC-AMG/")
                }
                style={{
                  width: "23%",
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  borderRadius: 15,
                }}
              >
                <AntDesign name="youtube" size={30} color="#DC453C" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("http://facebook.com/cnpc.kazakhstan")
                }
                style={{
                  width: "23%",
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  borderRadius: 15,
                }}
              >
                <Entypo name="facebook" size={30} color="#DC453C" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL("http://www.cnpc-amg.kz/")}
                style={{
                  width: "23%",
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  borderRadius: 15,
                }}
              >
                <MaterialCommunityIcons name="web" size={30} color="#DC453C" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                padding: 12,
                backgroundColor: "rgba(0,0,0,0.04)",
                borderRadius: 15,
                marginTop: 30,
              }}
            >
              <MaterialIcons
                name="phone-iphone"
                size={18}
                color={Colors.smoothBlack}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  // backgroundColor:'red'
                  color: Colors.smoothBlack,
                  marginLeft: 5,
                }}
              >
                Версия приложения: {version}
              </Text>
            </View>
          </View>
        </View>
      </BottomSheet>

      <View style={{ alignItems: "center", height: "100%" }}>
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            height: "13%",
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingHorizontal: 30,
            paddingBottom: 10,
          }}
        >
          <View style={{}}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../../../assets/androidpush.png")}
                style={{ width: 25, height: 25, marginRight: 8 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: Colors.smoothBlack,
                }}
              >
                AMG-Life
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={toggleBottomNavigationView}>
            <Entypo name="menu" size={28} color="#DC453C" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            height: 35,
            borderBottomRightRadius: 40,
            borderBottomLeftRadius: 40,
            paddingHorizontal: 30,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                "Calendar",
                lang === "" ? i18n.defaultLocale : lang
              )
            }
            style={{
              backgroundColor: "rgba(0,0,0,0.03)",
              padding: 5,
              paddingHorizontal: 7,
              alignSelf: "flex-start",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            <MaterialCommunityIcons
              name="calendar-month"
              size={11}
              color="grey"
            />
            <Text
              style={{
                fontSize: 11,
                color: "grey",
                marginLeft: 6,
                marginRight: 12,
              }}
            >
              {i18n.t("calendar") + " " + "2025"}
            </Text>

            <AntDesign name="right" size={10} color="grey" />
          </TouchableOpacity>
        </View>

        <Search />

        {/* {currentEvent ? ( */}
        {/* <View
          style={{
            width: "90%",
            borderRadius: 25,
            backgroundColor: "#BB1201",
            height: 150,
            marginTop: 10,
            justifyContent: "center",
          }}
        >
          <View style={{ width: "100%", height: "96%", borderRadius: 20 }}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
              source={
                lang === "" || lang === "kz"
                  ? events[0].image
                  : lang === "ru"
                  ? events[0].imageRus
                  : events[0].imageChi
              }
            />
          </View>
          <Image
            style={{
              height: 100,
              width: 65,
              position: "absolute",
              right: 5,
              bottom: 0,
              resizeMode: "contain",
            }}
            source={require("../../../../../assets/events/christmas_tree.png")}
          />
        </View> */}
        {/* ) : (
          <></>
        )} */}

        <InterfaceList
          interfacesSwitch={interfacesSwitch}
          docsArrayLength={docsArrayLength}
          isEvent={true}
        />
        <InterfaceGrid
          interfacesSwitch={interfacesSwitch}
          docsArrayLength={docsArrayLength}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavigationView: {
    width: "100%",
    padding: 25,
    paddingBottom: 35,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    marginTop: Platform.OS === "ios" ? 50 : 30,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    width: windowWidth - 40,
  },
});
