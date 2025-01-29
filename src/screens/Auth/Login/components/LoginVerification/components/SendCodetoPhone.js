import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import i18n from "i18n-js";
import { TouchableOpacity } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { getNumbers } from "../api/loginVerificationApi";
import { Colors } from "../../../../../../styles/colors";

const SendCodetoPhone = ({
  visible1,
  phone,
  isLoading,
  isLoadingPhone,
  setCode,
  setIsLoading,
  setVisible1,
  setIsSendMessage,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        display: !visible1 ? "flex" : "none",
      }}
    >
      <View style={styles.warningContainer}>
        <View style={styles.warningSubContainer}>
          <MaterialCommunityIcons
            name="message-processing"
            size={100}
            color={Colors.grey}
            style={{ marginBottom: 30 }}
          />

          <Text style={styles.warningText}>{i18n.t("whatsappWarning")}</Text>
          {isLoadingPhone ? (
            <ActivityIndicator
              size={"large"}
              color={"grey"}
              style={{ marginTop: 10 }}
            />
          ) : (
            <Text style={styles.warningTextPhone}>{"+7" + phone.slice(1)}</Text>
          )}
        </View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          disabled={isLoading === false ? false : true}
          style={{
            ...styles.btn,
            backgroundColor: isLoading === false ? Colors.primary : "#B8B8B8",
            display: isLoadingPhone ? "none" : "flex",
          }}
          onPress={() =>
            getNumbers(
              setCode,
              setIsLoading,
              phone,
              setVisible1,
              setIsSendMessage
            )
          }
        >
          {isLoading === false ? (
            <Text style={styles.btnText}>{i18n.t("getCodeText")}</Text>
          ) : (
            <UIActivityIndicator color="white" size={25} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.background,
    width: "100%",
  },
  warningContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  warningSubContainer: {
    backgroundColor: Colors.white,
    width: "90%",
    alignItems: "center",
    padding: 20,
    marginTop: 60,
    borderRadius: 25,
  },
  warningText: {
    textAlign: "left",
    color: Colors.smoothBlack,
    marginBottom: 5,
    fontSize: 13,
  },
  warningTextPhone: {
    fontWeight: "bold",
    color: Colors.smoothBlack,
    fontSize: 26,
  },
  btnContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 50,
    width: "90%",
    marginBottom: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.white,
  },
});

export default SendCodetoPhone;
