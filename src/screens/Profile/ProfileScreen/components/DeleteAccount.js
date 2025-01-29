import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { Modal, StyleSheet, Text, View } from "react-native";
import i18n from "i18n-js";
import { AuthContext } from "../../../../context/AuthContext";
import { Colors } from "../../../../styles/colors";
import axios from "axios";
import qs from "qs";

const DeleteAccount = ({ modalVisibleForDelete, setModalVisibleForDelete }) => {
  const { logout, iin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [modalResult, setModalResult] = useState(false);
  const [deleted, setDeleted] = useState("");

  const deleteAccount = () => {
    setIsLoading(true);
    const data = qs.stringify({
      delacciin: iin,
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
        if (parsed.status === "Аккаунт успешно удален") {
          setModalResult(true);
        }
        setDeleted(parsed.status);
        setIsLoading(false);
      })

      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisibleForDelete}
      onRequestClose={() => {
        setModalVisibleForDelete(!modalVisibleForDelete);
      }}
    >
      <View style={styles.centeredView}>
        {!modalResult ? (
          <View style={styles.modalView}>
            <MaterialIcons
              name="delete"
              size={80}
              color={"rgba(0,0,0,0.5)"}
              style={{ marginTop: -10 }}
            />
            <Text style={styles.modalText}>{i18n.t("deleteWarning")}</Text>

            {isLoading ? (
              <ActivityIndicator
                style={{ color: Colors.primary }}
                size={"large"}
              />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  style={styles.buttonyes}
                  onPress={() => deleteAccount()}
                >
                  <Text style={styles.textStyleyes}>{i18n.t("daYes")}</Text>
                </Pressable>

                <Pressable
                  style={styles.buttonno}
                  onPress={() =>
                    setModalVisibleForDelete(!modalVisibleForDelete)
                  }
                >
                  <Text style={styles.textStyleno}>{i18n.t("netNo")}</Text>
                </Pressable>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.modalView}>
            <LottieView
              source={require("../../../../../assets/animation/done.json")}
              autoPlay
              loop={false}
              speed={1.4}
              style={{ width: 135, height: 135, marginTop: -10 }}
            />
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={{ marginBottom: 20, fontSize: 18 }}>{deleted}</Text>
              <Pressable
                style={{ ...styles.buttonno, width: "100%" }}
                onPress={() => logout()}
              >
                <Text style={styles.textStyleno}>OK</Text>
              </Pressable>
            </View>
          </View>
        )}
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

export default DeleteAccount;
