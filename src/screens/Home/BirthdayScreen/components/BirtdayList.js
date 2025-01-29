import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import i18n from "i18n-js"; // Adjust this import according to your project structure
import { Colors } from "../../../../styles/colors";
const windowWidth = Dimensions.get("window").width;

export const BirtdayList = ({ birthday, lang }) => {
  const birthdayUsers = [];

  if (birthday.length !== 1) {
    for (let i = 0; i < birthday.length - 1; i++) {
      const bd = birthday[i].replace('"', "").replace(" ", "");
      birthdayUsers.push(
        <View style={styles.birthdayItem} key={Math.random()}>
          <View style={styles.birthdayIcon}>
            <FontAwesome name="birthday-cake" size={15} color={Colors.white} />
          </View>
          <View style={styles.birthdayText}>
            <Text style={{ color: Colors.smoothBlack }}>{bd}</Text>
          </View>
        </View>
      );
    }
  } else {
    const noneBirthday = JSON.parse(birthday);
    birthdayUsers.push(
      <View style={styles.noneContainer} key={Math.random()}>
        <Text style={styles.noneText}>
          {lang === "ch" ? i18n.t("birthdayWarning") : noneBirthday} 😕
        </Text>
      </View>
    );
  }

  return <>{birthdayUsers}</>;
};

const styles = StyleSheet.create({
  birthdayItem: {
    width: "100%",
    borderRadius: 22,
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    backgroundColor: Colors.white,
  },
  birthdayIcon: {
    width: 30,
    height: 30,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  birthdayText: {
    marginLeft: 10,
    marginRight: 10,
    width: windowWidth - 150,
  },
  noneContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth - 60,
    height: 50,
    backgroundColor: "#F5DBDA",
    borderRadius: 15,
    marginTop: 30,
  },
  noneText: {
    fontSize: 15,
    textAlign: "center",
    color: "#D64D43",
    fontWeight: "bold",
  },
});

export default BirtdayList;
