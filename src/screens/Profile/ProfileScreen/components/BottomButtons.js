import React from "react";
import { StyleSheet, Text, View } from "react-native";
import i18n from "i18n-js";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../../styles/colors";
import { TouchableOpacity } from "react-native";

const BottomButtons = () => {
  return (
    <View style={styles.container}>
      <Button
        icon={<MaterialIcons name="payments" size={27} color={Colors.white} />}
        page={"PaperScreen"}
        title={i18n.t("raschet")}
      />
      <Button
        icon={<FontAwesome5 name="tshirt" size={22} color={Colors.white} />}
        page={"SpecformScreen"}
        title={i18n.t("clothes")}
      />
      <Button
        icon={<FontAwesome name="plane" size={27} color={Colors.white} />}
        page={"VacationScreen"}
        title={i18n.t("vacation")}
      />
    </View>
  );
};

const Button = ({ icon, page, title }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => {
        navigation.navigate(page);
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View style={styles.btnIconContainer}>{icon}</View>
        <Text style={styles.btnTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const PasswordChangeButton = () => {
  const navigation = useNavigation();

  const moveToPage = () => {
    navigation.navigate("UserPassChange");
  };
  return (
    <TouchableOpacity onPress={() => moveToPage()} style={styles.passChangeBtn}>
      <View style={styles.innerContainer}>
        <Text style={styles.passChangeBtnText}>
          Изменить пароль пользователя
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    width: "90%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    width: "32%",
    padding: 15,
    backgroundColor: "white",
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: 20,
  },
  btnIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: Colors.primary,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  btnTitle: {
    color: Colors.smoothBlack,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  passChangeBtn: {
    width: "90%",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 17,
  },
  passChangeBtnText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.smoothBlack,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default BottomButtons;
