import React from "react";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { mainOffice } from "../data/mainOffice";
import { Text } from "react-native";
import { Colors } from "../../../../styles/colors";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const Mainoffice = ({ visibleMain }) => {
  return (
    <View
      style={{ ...styles.container, display: visibleMain ? "flex" : "none" }}
    >
      <Text style={styles.title}>{mainOffice.title}</Text>

      <View style={styles.subContainer}>
        <Text style={styles.subtitle}>Канцелярия</Text>
        <View style={styles.rowBtnContainer}>
          {mainOffice.office.map((el) => (
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${Number(el)}`)}
              key={Math.random()}
              style={styles.rowBtn}
            >
              <View style={styles.phoneIconContainer}>
                <Entypo name="phone" size={10} color="white" />
              </View>
              <Text style={styles.phoneemailText}>{el}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.subtitle}>Факс</Text>
        <View style={styles.columnBtnContainer}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`tel:${Number(mainOffice.faxPhone)}`)
            }
            style={styles.columnBtn}
          >
            <View style={styles.phoneIconContainer}>
              <Entypo name="phone" size={10} color="white" />
            </View>
            <Text style={styles.phoneemailText}>{mainOffice.faxPhone}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(`mailto:${mainOffice.faxPost}`)}
            style={styles.columnBtn}
          >
            <View style={styles.mailIconContainer}>
              <MaterialIcons name="email" size={10} color="white" />
            </View>
            <Text style={styles.phoneemailText}>{mainOffice.faxPost}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.subtitle}>Приемная</Text>
        <View style={styles.columnBtnContainer}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`tel:${Number(mainOffice.receptionPhone)}`)
            }
            style={styles.columnBtn}
          >
            <View style={styles.phoneIconContainer}>
              <Entypo name="phone" size={10} color="white" />
            </View>
            <Text style={styles.phoneemailText}>
              {mainOffice.receptionPhone}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(`mailto:${mainOffice.faxPost}`)}
            style={styles.columnBtn}
          >
            <View style={styles.mailIconContainer}>
              <MaterialIcons name="email" size={10} color="white" />
            </View>
            <Text style={styles.phoneemailText}>{mainOffice.faxPost}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.addressContainer}>
        <MaterialIcons name="location-pin" size={20} color={Colors.primary} />
        <Text style={styles.addressText}>{mainOffice.addres}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    color: Colors.smoothBlack,
    fontWeight: "500",
  },
  subContainer: {
    backgroundColor: "rgba(0,0,0,0.03)",
    padding: 10,
    width: "100%",
    marginTop: 10,
    borderRadius: 15,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.smoothBlack,
    marginLeft: 5,
  },
  rowBtnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  columnBtnContainer: {
    width: "100%",
    flexDirection: "column",
    marginTop: 5,
  },
  rowBtn: {
    padding: 5,
    backgroundColor: Colors.white,
    width: "49%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },

  columnBtn: {
    padding: 5,
    backgroundColor: Colors.white,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 5,
  },
  phoneIconContainer: {
    padding: 5,
    backgroundColor: "rgba(24, 125, 7, 0.7)",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  mailIconContainer: {
    padding: 5,
    backgroundColor: "rgba(10,118,153, 0.7)",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  phoneemailText: {
    fontSize: 12,
    color: Colors.smoothBlack,
  },
  addressContainer: {
    width: "100%",
    padding: 10,
    paddingBottom: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  addressText: {
    color: Colors.smoothBlack,
    fontSize: 12,
    marginLeft: 5,
  },
});

export default Mainoffice;
