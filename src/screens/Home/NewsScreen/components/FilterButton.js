import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../../styles/colors";
import { Ionicons } from "@expo/vector-icons";

const FilterButton = ({ setVisible, isLoading }) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={() => setVisible(true)}
      style={{
        padding: 7,
        backgroundColor: "rgba(0,0,0,0.04)",
        borderRadius: 20,
      }}
    >
      <Ionicons name="filter" size={18} color={Colors.smoothBlack} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default FilterButton;
