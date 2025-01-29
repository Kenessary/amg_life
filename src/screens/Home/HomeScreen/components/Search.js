import React, { useContext, useState } from "react";
import {
  Text,
  View,
  Alert,
  Keyboard,
  TextInput,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { multiLanguage } from "../../../language";
import { ru, ch, kz } from "../../../../languages/localizations";
import i18n from "i18n-js";
import { getSearch } from "../responses/HomeApi";
import { BottomSheet } from "react-native-btr";
import { Colors } from "../../../../styles/colors";

const windowWidth = Dimensions.get("window").width;

export function Search() {
  let [comment, setComment] = useState("");
  let [searchResult, setSearchResult] = useState("");

  let [isLoading1, setIsLoading1] = useState(false);
  let [visible3, setVisible3] = useState(false);
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");

  multiLanguage(locale, setLang);

  const toggleBottomNavigationView3 = () => {
    setVisible3(!visible3);
  };

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (comment === "") {
      Alert.alert(
        i18n.t("errorSearch"),
        i18n.t("errorSearchText"),
        [{ text: "OK" }],
        { cancelable: false }
      );
      valid = false;
    }
    if (valid) {
      getSearch(setIsLoading1, setSearchResult, setVisible3, comment);
    }
  };

  const searchOutcome = [];
  for (let i = 0; i < searchResult.length; i++) {
    const pred = searchResult[i].predki.split(" => ");
    searchOutcome.push(
      <View key={i} style={[styles.cardContainer, { borderColor: "#E4E4E4" }]}>
        {/* Left Side of Card*/}
        <View
          style={[styles.leftCardContainer, { borderRightColor: "#E4E4E4" }]}
        >
          <Text style={{ ...styles.employeeName, color: Colors.smoothBlack }}>
            {searchResult[i].fio}
          </Text>
          <View
            style={{
              marginTop: 10,
              display: searchResult[i].doljnost === "" ? "none" : "flex",
            }}
          >
            <Text style={{ fontSize: 12, color: Colors.smoothBlack }}>
              {searchResult[i].doljnost}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                `tel:${"87132" + Number(String(searchResult[i].raboch_tel))}`
              )
            }
            style={[
              styles.connectionBtn,
              {
                display: searchResult[i].raboch_tel === "" ? "none" : "flex",
                backgroundColor: "#FFEAD1",
              },
            ]}
          >
            <View style={styles.connectionIconPosition}>
              <MaterialCommunityIcons
                name="phone-classic"
                size={14}
                color="#C66C03"
              />
            </View>
            <Text style={{ ...styles.workTelFont }}>
              {searchResult[i].raboch_tel}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL(`mailto:${searchResult[i].email}`)}
            style={[styles.connectionBtn, { backgroundColor: "#C9E4FD" }]}
          >
            <Text style={[styles.connectionFont, { color: "#037FF1" }]}>
              {searchResult[i].email}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                `tel:${"8" + Number(String(searchResult[i].sot_tel).slice(1))}`
              )
            }
            style={[
              styles.connectionBtn,
              {
                backgroundColor: "#C7FBB5",
                display: searchResult[i].sot_tel === "" ? "none" : "flex",
              },
            ]}
          >
            <View style={styles.connectionIconPosition}>
              <FontAwesome name="phone" size={14} color="#299403" />
            </View>
            <Text style={[styles.connectionFont, { color: "#299403" }]}>
              {searchResult[i].sot_tel}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Right Side of Card*/}
        <View style={styles.rightCardContainer}>
          <View style={[styles.room, { borderColor: "#e4e4e4" }]}>
            <Text style={{ color: Colors.smoothBlack }}>
              {searchResult[i].cabinet}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ ...styles.depFontSize, color: Colors.smoothBlack }}>
              {pred[0]}
            </Text>
            <View style={[styles.divider, { backgroundColor: "#e4e4e4" }]} />
            <Text style={{ ...styles.depFontSize, color: Colors.smoothBlack }}>
              {pred[1]}
            </Text>
            <View style={[styles.divider, { backgroundColor: "#e4e4e4" }]} />
            <Text style={{ ...styles.depFontSize, color: Colors.smoothBlack }}>
              {pred[2]}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Result Bottom Sheet */}
      <BottomSheet
        visible={visible3}
        onBackButtonPress={toggleBottomNavigationView3}
        onBackdropPress={toggleBottomNavigationView3}
      >
        <View
          style={[
            styles.bottomNavigationViewSearch,
            { backgroundColor: Colors.white },
          ]}
        >
          <View style={styles.searchResultContainer}>
            <Text
              style={[styles.searchResultFont, { color: Colors.smoothBlack }]}
            >
              {i18n.t("searchResult")}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setVisible3(false);
                setSearchResult("");
                setComment("");
                setIsLoading1(false);
              }}
            >
              <Ionicons name="close-circle-sharp" size={26} color="grey" />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
            {searchResult.length === 0 ? (
              <View
                style={{ width: "75%", alignItems: "center", marginTop: 100 }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: Colors.smoothBlack,
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  По вашему запросу ничего не найдено
                </Text>
                <Feather name="search" size={70} color={"grey"} />
              </View>
            ) : (
              <ScrollView style={{ width: "100%", marginBottom: 50 }}>
                {searchOutcome}
              </ScrollView>
            )}
          </View>
        </View>
      </BottomSheet>

      {/* Search Text Input and Search Button */}
      <View style={styles.searchContainer}>
        <TextInput
          value={comment}
          onChangeText={setComment}
          editable={true}
          placeholder={i18n.t("searchGuide")}
          placeholderTextColor={"grey"}
          style={[
            styles.searchTextInput,
            { color: Colors.smoothBlack, borderColor: "#e4e4e4" },
          ]}
        />
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.searchBtn,
            { backgroundColor: isLoading1 ? "white" : "#DC453C" },
          ]}
          onPress={() => {
            validate();
          }}
        >
          {isLoading1 === true ? (
            <ActivityIndicator size="small" color={Colors.smoothBlack} />
          ) : (
            <Feather name="search" size={16} color={"white"} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    borderRadius: 15,
    height: 40,
    backgroundColor: "white",
    marginTop: 15,
    alignItems: "center",
    paddingRight: 10,
  },
  searchTextInput: {
    width: "90%",
    height: 40,
    paddingLeft: 15,
  },
  searchBtn: {
    height: 30,
    width: 30,
    backgroundColor: "#DC453C",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
  },
  searchResultContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchResultFont: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "700",
    marginBottom: 20,
  },
  cardContainer: {
    width: windowWidth - 20,
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: "row",
    marginBottom: 15,
  },
  leftCardContainer: {
    width: "50%",
    padding: 10,
    borderRightWidth: 1,
  },
  rightCardContainer: {
    width: "50%",
    padding: 10,
  },
  employeeName: {
    fontWeight: "500",
    fontSize: 15,
  },
  connectionBtn: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 10,
    flexDirection: "row",
    borderRadius: 10,
    padding: 3,
  },
  connectionIconPosition: {
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  workTelFont: {
    fontSize: 12,
    marginLeft: 5,
    color: "#C66C03",
    fontWeight: "500",
  },
  connectionFont: {
    fontSize: 10,
    marginLeft: 5,
    fontWeight: "500",
  },
  room: {
    borderWidth: 1,
    width: 90,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  depFontSize: { fontSize: 12 },
  divider: {
    height: 1,
    marginTop: 3,
    marginBottom: 3,
  },
  bottomNavigationViewSearch: {
    width: "100%",
    height: "80%",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    zIndex: 30,
    height: "90%",
  },
});
