import React from "react";
import { StyleSheet, Text, View } from "react-native";
import i18n from "i18n-js";
import { Colors } from "../../../../styles/colors";

const UserInformation = ({ name, iin, phone }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.contactsContainer}>
        <View style={styles.row}>
          <Contact label={`${i18n.t("iin")}:`} contact={iin} />
          <Contact label={`${i18n.t("telephoneNumber")}:`} contact={phone} />
        </View>
      </View>
    </View>
  );
};

const Contact = ({ label, contact }) => {
  return (
    <View style={styles.contactBg}>
      <Text style={styles.contactLabel}>{label}</Text>
      <Text style={styles.contacTitle}>{contact}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "95%",
    marginTop: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.smoothBlack,
    marginBottom: 10,
    textAlign: "center",
  },
  contactsContainer: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.02)",
    padding: 5,
    borderRadius: 15,
  },
  row: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contactBg: {
    width: "49%",
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
  },
  contactLabel: {
    fontWeight: "300",
    color: Colors.smoothBlack,
    fontSize: 10,
    marginBottom: 5,
  },
  contacTitle: { fontWeight: "500", color: Colors.smoothBlack },
});

export default UserInformation;
