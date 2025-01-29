import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import i18n from "i18n-js";
import { Colors } from "../styles/colors";

const MenuButton = ({ onPress, icon, title, docsArrayLength }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.menuBtn}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={
            title === "Ввод меню"
              ? styles.menuBtnIconBackgroundGrey
              : styles.menuBtnIconBackground
          }
        >
          {icon}
        </View>
        <Text
          style={{
            ...styles.menuBtnIconTitle,
            width: title === i18n.t("docLoad") ? "80%" : "85%",
          }}
        >
          {title}
        </Text>
      </View>
      {title === i18n.t("docLoad") && docsArrayLength !== 0 ? (
        <View
          style={{
            width: 25,
            height: 25,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            backgroundColor: Colors.primary,
            alignSelf: "flex-start",
            // marginRight: 15,
          }}
        >
          <Text style={{ fontSize: 12, color: Colors.white }}>
            {docsArrayLength}
          </Text>
        </View>
      ) : (
        <MaterialIcons name="arrow-forward-ios" size={14} color="#B0B0B2" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuBtn: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%",
  },
  menuBtnIconBackgroundGrey: {
    backgroundColor: "white",
    width: 32,
    height: 32,
    backgroundColor: "grey",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  menuBtnIconBackground: {
    backgroundColor: "white",
    width: 32,
    height: 32,
    backgroundColor: "#DC453C",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  menuBtnIconTitle: {
    color: "#3A3B40",

    fontSize: 15,
    marginLeft: 10,
    fontWeight: "500",
    // width: "85%",
  },
});

export default MenuButton;
