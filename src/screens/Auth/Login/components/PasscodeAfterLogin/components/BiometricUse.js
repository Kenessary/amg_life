import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../../../../styles/colors";
import i18n from "i18n-js";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const BiometricUse = ({ isTypedSecond }) => {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <View
      style={{
        ...styles.container,
        display: isTypedSecond ? "flex" : "none",
      }}
    >
      <Ionicons
        name="finger-print-outline"
        size={70}
        color={Colors.primary}
        style={{ marginTop: 50 }}
      />

      <View style={styles.warningContainer}>
        <Text style={styles.warningText}>{i18n.t("bioTextTouch")}</Text>
        <TouchableOpacity style={styles.btn} onPress={() => goToHome()}>
          <Text style={styles.btnText}>{i18n.t("bioTextTouchId")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  warningContainer: {
    width: "90%",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  warningText: {
    fontSize: 19,
    textAlign: "center",
    lineHeight: 30,
    color: Colors.smoothBlack,
  },
  btn: {
    backgroundColor: Colors.primary,
    width: "100%",
    paddingHorizontal: 40,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 30,
  },
  btnText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "500",
  },
});

export default BiometricUse;
