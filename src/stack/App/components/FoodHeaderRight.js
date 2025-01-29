import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import themeContext from "../../../cores/themeContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../styles/colors";

const FoodHeaderRight = () => {
  const navigation = useNavigation();
  const theme1 = useContext(themeContext);
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          padding: 7,
          backgroundColor: "rgba(0,0,0,0.04)",
          borderRadius: 20,
          marginRight: 8,
        }}
      >
        <MaterialIcons
          name="history"
          size={18}
          color={Colors.smoothBlack}
          onPress={() => {
            navigation.navigate("MenuHistory");
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          padding: 7,
          backgroundColor: "rgba(0,0,0,0.04)",
          borderRadius: 20,
        }}
      >
        <Ionicons
          name="stats-chart"
          size={18}
          color={Colors.smoothBlack}
          onPress={() => {
            navigation.navigate("MenuStatistics");
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FoodHeaderRight;
