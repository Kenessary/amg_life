import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProductList = ({ listItem }) => {
  return (
    <View style={styles.container}>
      <LabelWithValue label={"Склад"} value={listItem.SkladDescr} />
      <LabelWithValue label={"Направление"} value={listItem.NapravlenieDescr} />
      <LabelWithValue label={"Контракт"} value={listItem.ContractDescr} />
      <LabelWithValue label={"Количество"} value={listItem.Count} />
      <LabelWithValue label={"Сумма"} value={listItem.Summa} />
      <LabelWithValue label={"Цена"} value={listItem.Cena} />
    </View>
  );
};

const LabelWithValue = ({ label, value }) => {
  return (
    <View style={styles.labelValueContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: "rgba(0,0,0,0.09)",
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  labelValueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    marginTop: 3,
  },
  label: {
    fontSize: 13,
    fontWeight: "300",
    width: "40%",
  },
  value: {
    fontSize: 13,
    fontWeight: "400",
    width: "60%",
    textAlign: "right",
  },
});

export default ProductList;
