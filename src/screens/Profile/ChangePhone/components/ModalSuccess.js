import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Modal, Text, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../../../styles/colors";

const ModalSuccess = ({ modalResult, result, setModalResult }) => {
  const navigation = useNavigation();
  return (
    <Modal animationType="fade" transparent={true} visible={modalResult}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <FontAwesome name="check-circle" size={70} color="#1CA510" />
          <View style={styles.modalContainer}>
            <Text style={styles.otvetOpros}>{result}</Text>

            <TouchableOpacity
              onPress={() => {
                setModalResult(false);
                navigation.goBack();
              }}
              style={styles.btn}
            >
              <Text style={styles.text}>OK</Text>
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
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    height: 200,
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
  },
  modalContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    marginTop: 20,
  },
  text: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
});

export default ModalSuccess;
