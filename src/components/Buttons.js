import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Colors } from "../styles/colors";

const Buttons = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        height: 55,
        width: "100%",
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 20,
      }}
    >
      <Text style={{ color: Colors.white, fontWeight: "bold", fontSize: 18 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Buttons;
