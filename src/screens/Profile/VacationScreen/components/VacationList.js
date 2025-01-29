import React from "react";
import { StyleSheet, Text, View } from "react-native";
import i18n from "i18n-js";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../../../styles/colors";

const VacationList = ({ otpusk }) => {
  const vacation = [];
  for (let i = 0; i < otpusk.length; i++) {
    vacation.push(
      <View
        key={i}
        style={{
          ...styles.cardContainer,
          marginTop: i === 0 && 15,
        }}
      >
        <View style={styles.iconContainer}>
          <FontAwesome name="plane" size={18} color={Colors.white} />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {otpusk[i].vid.charAt(0).toUpperCase() + otpusk[i].vid.slice(1)}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.dateContainer}>
            <View style={styles.date}>
              <Text style={styles.dateTitleLight}>{i18n.t("nachOtpusk")}</Text>
              <Text style={styles.dateTitleNormal}>
                {otpusk[i].nachalo.split(" ")[0].split("-")[2]}.
                {otpusk[i].nachalo.split(" ")[0].split("-")[1]}.
                {otpusk[i].nachalo.split(" ")[0].split("-")[0]}
              </Text>
            </View>

            <View style={styles.date}>
              <Text style={styles.dateTitleLight}>{i18n.t("konOtpusk")}</Text>
              <Text style={styles.dateTitleNormal}>
                {otpusk[i].konec.split(" ")[0].split("-")[2]}.
                {otpusk[i].konec.split(" ")[0].split("-")[1]}.
                {otpusk[i].konec.split(" ")[0].split("-")[0]}
              </Text>
            </View>

            <View style={{ width: "30%", padding: 7 }}>
              <Text style={styles.dateTitleLight}>{i18n.t("dniOtpusk")}</Text>
              <Text style={styles.dateTitleNormal}>{otpusk[i].dni}</Text>
            </View>
          </View>

          <View style={styles.additionalInfo}>
            <View style={styles.additionalInfoRow}>
              <Text style={{ fontWeight: "300", width: "80%" }}>
                {i18n.t("zaNapr")}
              </Text>

              <View style={{ width: "20%", alignItems: "flex-end" }}>
                <Text style={{ fontWeight: "500" }}>
                  {otpusk[i].naprezhonnost}
                </Text>
              </View>
            </View>

            <View style={styles.additionalInfoRow}>
              <Text style={{ fontWeight: "300", width: "80%" }}>
                {i18n.t("zaTyazh")}
              </Text>

              <View style={{ width: "20%", alignItems: "flex-end" }}>
                <Text style={{ fontWeight: "500" }}>{otpusk[i].tyazh}</Text>
              </View>
            </View>

            <View style={styles.additionalInfoRow}>
              <Text style={{ fontWeight: "300", width: "80%" }}>
                {i18n.t("zaAral")}
              </Text>

              <View style={{ width: "20%", alignItems: "flex-end" }}>
                <Text style={{ fontWeight: "500" }}>{otpusk[i].priarale}</Text>
              </View>
            </View>

            <View style={styles.additionalInfoRow}>
              <Text style={{ fontWeight: "300", width: "80%" }}>
                {i18n.t("zaInvalid")}
              </Text>

              <View style={{ width: "20%", alignItems: "flex-end" }}>
                <Text style={{ fontWeight: "500" }}>
                  {otpusk[i].invalidnost}
                </Text>
              </View>
            </View>

            <View style={{ ...styles.additionalInfoRow, marginBottom: 0 }}>
              <Text style={{ fontWeight: "300", width: "80%" }}>
                {i18n.t("zaDrugie")}
              </Text>

              <View style={{ width: "20%", alignItems: "flex-end" }}>
                <Text style={{ fontWeight: "500" }}>{otpusk[i].drugie}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ alignItems: "center" }}>
      {otpusk.length !== 0 && otpusk[0].vid !== " " ? (
        vacation
      ) : (
        <View style={styles.emptyContainer} key={Math.random()}>
          <Text style={styles.emptyText}>
            Информация об отпуске отсутствует
          </Text>
        </View>
      )}
      <View style={{ marginTop: 80 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 15,
    marginBottom: 20,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    position: "absolute",
    top: -8,
    right: 5,
    borderRadius: 30,
  },
  titleContainer: {
    width: "100%",
    marginLeft: 4,
  },
  title: {
    color: Colors.smoothBlack,
    fontSize: 16,
    fontWeight: "500",
    width: "90%",
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.06)",
    padding: 5,
    borderRadius: 12,
    marginTop: 8,
  },
  dateContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  date: {
    width: "35%",
    padding: 7,
  },
  dateTitleLight: {
    fontSize: 12,
    fontWeight: "300",
  },
  dateTitleNormal: {
    fontSize: 14,
    color: Colors.grey,
    marginTop: 3,
  },
  additionalInfo: {
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 8,
    marginTop: 5,
  },
  additionalInfoRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    height: 50,
    backgroundColor: "rgba(0,0,0,0.04)",
    borderRadius: 15,
    marginTop: 30,
    padding: 5,
  },
  emptyText: {
    fontSize: 15,
    textAlign: "center",
    color: Colors.smoothBlack,
    fontWeight: "bold",
  },
});

export default VacationList;
