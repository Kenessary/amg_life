import React from "react";
import { StyleSheet, View } from "react-native";

const TopNavigation = () => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        height: "15%",
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingBottom: 20,
      }}
    >
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../../../assets/androidpush.png")}
            style={{ width: 25, height: 25, marginRight: 8 }}
          />
          <Text style={{ fontSize: 16, fontWeight: "600", color: theme.color }}>
            AMG-Life
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={toggleBottomNavigationView}>
        <Entypo name="menu" size={28} color="#DC453C" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TopNavigation;
