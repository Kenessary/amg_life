import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../styles/colors";
import TopBarNavigation from "../../../components/TopBarNavigation";
import i18n from "i18n-js";
import { backButton } from "../../../components/GoBackButton";
import { Text } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const TechnicalSupportScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        height: "100%",
        alignItems: "center",
      }}
    >
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={i18n.t("adminpo")}
        backButton={backButton()}
        height={"15%"}
      />

      <View style={{ width: "90%" }}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Цент IT, отдел программного обеспечения
          </Text>

          <View style={styles.subContainer}>
            <View style={styles.columnBtnContainer}>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${Number(87132766272)}`)}
                style={styles.columnBtn}
              >
                <View style={styles.phoneIconContainer}>
                  <Entypo name="phone" size={10} color="white" />
                </View>
                <Text style={styles.phoneemailText}>87132766272</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL(`mailto:support@cnpc-amg.kz`)}
                style={styles.columnBtn}
              >
                <View style={styles.mailIconContainer}>
                  <MaterialIcons name="email" size={10} color="white" />
                </View>
                <Text style={styles.phoneemailText}>support@cnpc-amg.kz</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.addressContainer}>
            <MaterialIcons
              name="location-pin"
              size={20}
              color={Colors.primary}
            />
            <Text style={styles.addressText}>
              г.Актобе, пр-т 312 стрелковой дивизии, 3, кабинет 2207-2208
            </Text>
          </View>
        </View>
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
  columnBtnContainer: {
    width: "100%",
    flexDirection: "column",
    marginTop: 5,
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

export default TechnicalSupportScreen;
