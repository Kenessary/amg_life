import React from "react";
import { StyleSheet, Text, View } from "react-native";
import i18n from "i18n-js";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../../../../styles/colors";

const SpecFormList = ({ spec }) => {
  const specod = [];
  if (JSON.stringify(spec) !== "[]") {
    for (let i = 0; i < spec.length; i++) {
      specod.push(
        <View key={i} style={styles.cardContainer}>
          <View style={styles.firmContainer}>
            <Text style={styles.firmText}>{spec[i].firm}</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.amountContainer}>
              <Text style={{ fontSize: 10 }}>
                {i18n.t("kolichestvo")}: {spec[i].kol_ost}
              </Text>
            </View>

            <View style={styles.clotheContainer}>
              <View style={styles.clotheRowContainer}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="tshirt" size={10} color={Colors.white} />
                </View>
                <Text style={{ width: "80%" }}>{spec[i].tovar}</Text>
              </View>

              <View style={styles.codeContainer}>
                <Text style={{ fontSize: 12 }}>
                  {i18n.t("codeTovar")}: {spec[i].kod_tov}{" "}
                </Text>
              </View>
            </View>

            <View style={styles.additionalInfoContainer}>
              <View style={styles.additionalInfoContainerRow}>
                <Text style={styles.additionalInfoTextLight}>
                  {i18n.t("dataVydachi")}
                </Text>

                <Text style={styles.additionalInfoTextNormal}>
                  {spec[i].dat_pri}
                </Text>
              </View>

              <View style={styles.additionalInfoContainerRow}>
                <Text style={styles.additionalInfoTextLight}>
                  {i18n.t("dataSpisani")}
                </Text>

                <Text style={styles.additionalInfoTextNormal}>
                  {spec[i].dat_spis === "" ? "-/-" : spec[i].dat_spis}
                </Text>
              </View>

              <View style={styles.additionalInfoContainerRow}>
                <Text style={styles.additionalInfoTextLight}>
                  {i18n.t("normaDnei")}
                </Text>

                <Text style={styles.additionalInfoTextNormal}>
                  {spec[i].sr_isp}
                </Text>
              </View>

              <View style={styles.price}>
                <Text style={{ fontSize: 13 }}>
                  {i18n.t("stoimost")}: {spec[i].st_ost}₸
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  } else {
    const noneSpec = "Сведений о спецодежде нет";
    specod.push(
      <View style={styles.emptyContainer} key={Math.random()}>
        <Text style={styles.emptyText}>{noneSpec}</Text>
      </View>
    );
  }

  return (
    <View style={{ alignItems: "center" }}>
      {specod}
      <View style={{ marginTop: 80 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  firmContainer: {
    paddingHorizontal: 8,
    width: "100%",
  },
  firmText: {
    color: Colors.smoothBlack,
    fontSize: 16,
    fontWeight: "600",
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.06)",
    padding: 8,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  amountContainer: {
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 2,
    paddingHorizontal: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: "flex-end",
    marginRight: 10,
  },
  clotheContainer: {
    backgroundColor: Colors.white,
    padding: 8,
    paddingTop: 12,
    width: "100%",
    borderRadius: 10,
  },
  clotheRowContainer: {
    width: "100%",
    flexDirection: "row",
  },
  iconContainer: {
    width: 25,
    height: 25,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  codeContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 20,
  },
  additionalInfoContainer: {
    backgroundColor: Colors.white,
    padding: 8,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 12,
    marginTop: 8,
  },
  additionalInfoContainerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  additionalInfoTextLight: {
    fontSize: 13,
    fontWeight: "300",
  },
  additionalInfoTextNormal: {
    fontSize: 13,
    marginRight: 10,
  },
  price: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 12,
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

export default SpecFormList;
