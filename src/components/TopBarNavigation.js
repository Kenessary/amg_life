import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../styles/colors";
import { Image } from "react-native";

const TopBarNavigation = ({
  isHome,
  isDepartment,
  titleDeparment,
  backButton,
  title,
  rightButton,
  height,
}) => {
  return (
    <View style={{ ...styles.container, height: height }}>
      <>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {backButton}
          {isHome && (
            <Image
              source={require("../../assets/androidpush.png")}
              style={{ width: 25, height: 25, marginRight: 8 }}
            />
          )}
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: Colors.smoothBlack,
                marginBottom: 3,
              }}
            >
              {title}
            </Text>
          </View>
        </View>
      </>
      {rightButton}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.white,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
});

export default TopBarNavigation;
