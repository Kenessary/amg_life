import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../../styles/colors";
import { TouchableOpacity } from "react-native";

const TypeSwitch = ({ typeDoc, setTypeDoc }) => {
  return (
    <View style={{ width: "90%", marginTop: 10 }}>
      <View
        style={{
          width: "60%",
          backgroundColor: "white",
          borderRadius: 8,
          padding: 5,
          alignSelf: "flex-start",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            height: 25,
            backgroundColor: "rgba(0,0,0,0.04)",
            borderRadius: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => setTypeDoc("edo")}
            style={[
              styles.button,
              {
                backgroundColor:
                  typeDoc === "edo" ? Colors.primary : "transparent",
              },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: typeDoc === "edo" ? "white" : Colors.smoothBlack,
                  fontWeight: typeDoc === "edo" ? "600" : "400",
                },
              ]}
            >
              ЭДО
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTypeDoc("oa")}
            style={[
              styles.button,
              {
                backgroundColor:
                  typeDoc === "oa" ? Colors.primary : "transparent",
              },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: typeDoc === "oa" ? "white" : Colors.smoothBlack,
                  fontWeight: typeDoc === "oa" ? "600" : "400",
                },
              ]}
            >
              OA
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTypeDoc("1c")}
            style={[
              styles.button,
              {
                backgroundColor:
                  typeDoc === "1c" ? Colors.primary : "transparent",
              },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: typeDoc === "1c" ? "white" : Colors.smoothBlack,
                  fontWeight: typeDoc === "1c" ? "600" : "400",
                },
              ]}
            >
              1C
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "33.3%",
    alignItems: "center",
    justifyContent: "center",
    height: 26,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
  },
});

export default TypeSwitch;
