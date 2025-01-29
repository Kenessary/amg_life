import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../styles/colors";

const RightButtons = ({ toggleBottomNavigationView }) => {
  const { iin } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PushSendScreen");
        }}
        style={{
          ...styles.btn,
          display:
            iin === "980624351476" ||
            iin === "860902303264" ||
            iin === "840611050122" ||
            iin === "980909350279"
              ? "flex"
              : "none",
          marginRight: 8,
        }}
      >
        <Ionicons name="send" size={18} color={Colors.smoothBlack} />
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleBottomNavigationView} style={styles.btn}>
        <Ionicons name="settings-sharp" size={18} color={Colors.smoothBlack} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 7,
    backgroundColor: "rgba(0,0,0,0.04)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RightButtons;
