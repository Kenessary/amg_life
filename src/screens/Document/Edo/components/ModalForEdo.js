import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../../styles/colors";

const ModalForEdo = ({
  modalVisible,
  icon,
  color,
  onPress,
  btnText,
  title,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {icon}

          <View style={{ alignItems: "center", width: "100%" }}>
            <Text style={{ ...styles.text, color: color }}>{title}</Text>

            <TouchableOpacity onPress={() => onPress()} style={styles.btn}>
              <Text style={{ color: Colors.white }}>{btnText}</Text>
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
    width: 290,
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
  text: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 10,
  },
  btn: {
    width: "90%",
    padding: 10,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default ModalForEdo;
