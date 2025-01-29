import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../../styles/colors";

const ChooseBar = ({ showed, showFavDep, setShowFavDep }) => {
  const onHandleAll = () => {
    setShowFavDep(false);
  };
  const onHandlePopular = () => {
    setShowFavDep(true);
  };
  return (
    <View style={{ ...styles.container, display: showed ? "none" : "flex" }}>
      <TouchableOpacity
        onPress={() => onHandleAll()}
        style={!showFavDep ? styles.activeBtn : styles.inactiveBtn}
      >
        <Text style={!showFavDep ? styles.activeText : styles.inactiveText}>
          Все
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onHandlePopular()}
        style={showFavDep ? styles.activeBtn : styles.inactiveBtn}
      >
        <Text style={showFavDep ? styles.activeText : styles.inactiveText}>
          Избранное
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 3,
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  inactiveBtn: {
    backgroundColor: "transparent",
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    borderRadius: 9,
  },
  activeBtn: {
    backgroundColor: "white",
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    borderRadius: 9,
  },
  activeText: {
    fontWeight: "600",
    color: Colors.smoothBlack,
  },
  inactiveText: {
    fontWeight: "400",
    color: Colors.smoothBlack,
  },
});

export default ChooseBar;
