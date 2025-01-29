import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import i18n from "i18n-js";
import { Colors } from "../../../../styles/colors";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import qs from "qs";

const ExitConfirmation = ({ modalVisible, setModalVisible }) => {
  const { logout, iin } = useContext(AuthContext);
  const deleteUserToken = () => {
    const data = qs.stringify({
      deletetokenfromtableiin: iin,
    });
    const config = {
      method: "post",
      url: "http://95.57.218.120/?index",
      headers: {
        Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(async function (response) {
        let user = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        let parsed = JSON.parse(user);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <MaterialCommunityIcons
            name="exit-to-app"
            size={80}
            color={Colors.primary}
            style={{ marginTop: -10 }}
          />

          <Text style={styles.modalText}>{i18n.t("exitWarning")}</Text>

          <View style={styles.btnContainer}>
            <Pressable
              style={styles.buttonyes}
              onPress={() => {
                logout();
                deleteUserToken();
              }}
            >
              <Text style={styles.textStyleyes}>{i18n.t("daYes")}</Text>
            </Pressable>

            <TouchableOpacity
              style={styles.buttonno}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text tyle={styles.textStyleno}>{i18n.t("netNo")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  modalView: {
    borderRadius: 40,
    width: "90%",
    padding: 60,
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
  modalText: {
    marginBottom: 25,
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
    color: Colors.smoothBlack,
  },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonyes: {
    borderRadius: 15,
    padding: 10,

    backgroundColor: Colors.primary,
    width: "48%",
  },
  textStyleyes: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  buttonno: {
    borderRadius: 15,
    padding: 10,

    backgroundColor: "rgba(0,0,0,0.04)",
    width: "48%",
    alignItems: "center",
  },
  textStyleno: {
    color: Colors.smoothBlack,
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ExitConfirmation;
