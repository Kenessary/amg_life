import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import i18n from "i18n-js";
import { Colors } from "../../../../styles/colors";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

const FoodBalance = ({ balance }) => {
  const img = require("../../../../../assets/androidpush.png");

  return (
    <View style={styles.balance}>
      <Text style={styles.label}>{i18n.t("foodbalance")}</Text>
      <Text style={styles.foodBalanceText}>
        {balance} <Text style={styles.tenge}>₸</Text>
      </Text>

      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.label}>{i18n.t("foodtime")}</Text>

          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>12:45 - 14:00</Text>
          </View>
        </View>

        <Image style={styles.img} source={img} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balance: {
    top: 15,
    width: "85%",
    padding: 25,
    paddingVertical: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: Colors.white,
  },
  label: {
    fontSize: 13,
    color: Colors.smoothBlack,
    fontWeight: "300",
  },
  foodBalanceText: {
    fontWeight: "bold",
    color: Colors.smoothBlack,
    fontSize: 28,
    marginTop: 7,
  },
  tenge: {
    fontWeight: "bold",
    color: Colors.smoothBlack,
    fontSize: 22,
  },
  bottomContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  timeContainer: {
    alignSelf: "flex-start",
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0,0,0,0.03)",
    marginTop: 7,
    borderRadius: 5,
  },
  timeText: {
    fontWeight: "400",
    color: Colors.smoothBlack,
    fontSize: 13,
  },
  img: {
    width: 35,
    height: 35,
    opacity: 0.8,
  },
});

export default FoodBalance;
