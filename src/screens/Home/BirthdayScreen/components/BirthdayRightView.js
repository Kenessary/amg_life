import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import { Colors } from "../../../../styles/colors";

const BirthdayRightView = () => {
  const date = moment().format(`DD.MM.YYYY`);
  return (
    <View
      style={{
        padding: 5,
        backgroundColor: "rgba(0,0,0, 0.06)",
        marginTop: 10,
        borderRadius: 8,
        paddingHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <FontAwesome name="birthday-cake" size={10} color={Colors.grey} />
      <Text
        style={{
          color: Colors.grey,
          fontWeight: "600",
          fontSize: 12,
          marginLeft: 5,
        }}
      >
        {date}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BirthdayRightView;
