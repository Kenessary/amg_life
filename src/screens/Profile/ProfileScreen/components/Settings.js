import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ExitConfirmation from "./ExitConfirmation";
import DeleteAccount from "./DeleteAccount";
import { useNavigation } from "@react-navigation/native";
import i18n from "i18n-js";
import { Colors } from "../../../../styles/colors";
import { BottomSheet } from "react-native-btr";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export const SettingsProfile = ({
  iinforeign,
  visible,
  toggleBottomNavigationView,
  modalVisible,
  modalVisibleForDelete,
  setModalVisible,
  setModalVisibleForDelete,
  phone,
}) => {
  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={toggleBottomNavigationView}
      onBackdropPress={toggleBottomNavigationView}
    >
      <View
        style={[
          styles.bottomNavigationView,
          {
            backgroundColor: Colors.white,
            opacity: modalVisible || modalVisibleForDelete ? 0.6 : 1,
          },
        ]}
      >
        <ExitConfirmation
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />

        <DeleteAccount
          modalVisibleForDelete={modalVisibleForDelete}
          setModalVisibleForDelete={setModalVisibleForDelete}
        />

        <View>
          <View>
            <Text
              style={{
                marginTop: 5,
                marginLeft: 5,
                fontSize: 24,
                fontWeight: "bold",
                color: Colors.smoothBlack,
              }}
            >
              {i18n.t("settings")}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={btnStyles.btnContainer}>
              <SettingButton
                // iinforeign={iinforeign}
                pageName={"ChangeLang"}
                title={i18n.t("changeLanguage")}
                icon={
                  <MaterialIcons
                    name="language"
                    size={16}
                    color={Colors.white}
                  />
                }
                toggleBottomNavigationView={toggleBottomNavigationView}
                marginBottom={10}
              />
              <SettingButton
                iinforeign={iinforeign}
                phone={phone}
                pageName={"ChangePassword"}
                title={i18n.t("changeParol")}
                icon={
                  <MaterialCommunityIcons
                    name="form-textbox-password"
                    size={16}
                    color={Colors.white}
                  />
                }
                toggleBottomNavigationView={toggleBottomNavigationView}
                marginBottom={10}
              />

              <SettingButton
                // iinforeign={iinforeign}
                // pageName={iinforeign === "1" ? "ChangePhone" : "VerifyForPhone"}
                phone={phone}
                pageName={"ChangePhone"}
                title={i18n.t("changePhone")}
                icon={
                  <MaterialIcons
                    name="phone-iphone"
                    size={16}
                    color={Colors.white}
                  />
                }
                toggleBottomNavigationView={toggleBottomNavigationView}
                marginBottom={0}
              />
            </View>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={btnStyles.exitBtn}
            >
              <Text style={btnStyles.exitBtnText}>{i18n.t("exit")}</Text>
              <Ionicons name="exit-outline" size={20} color={Colors.white} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisibleForDelete(true)}
              style={btnStyles.deleteBtn}
            >
              <Text style={btnStyles.deleteBtnText}>
                {i18n.t("deleteAccount")}
              </Text>

              <MaterialIcons
                name="delete"
                size={20}
                color={"rgba(0,0,0,0.4)"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};

const SettingButton = ({
  // iinforeign,
  pageName,
  title,
  icon,
  toggleBottomNavigationView,
  marginBottom,
  phone,
}) => {
  const navigation = useNavigation();

  const goToPage = (page) => {
    navigation.navigate(page, phone);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        goToPage(pageName), toggleBottomNavigationView();
      }}
      style={{
        ...btnStyles.btn,
        marginBottom: marginBottom,
      }}
    >
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <View style={btnStyles.iconContainer}>{icon}</View>
        <Text style={btnStyles.title}>{title}</Text>
      </View>
      <AntDesign name="right" size={12} color={Colors.smoothBlack} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomNavigationView: {
    width: "100%",
    padding: 20,
    paddingTop: 25,
    paddingBottom: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
const btnStyles = StyleSheet.create({
  btnContainer: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.04)",
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 50,
  },
  btn: {
    width: "100%",
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 40,
  },
  title: {
    color: Colors.smoothBlack,
    marginLeft: 10,
    fontSize: 14,
  },
  exitBtn: {
    width: "100%",
    flexDirection: "row",
    borderRadius: 16,
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  exitBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.white,
    marginRight: 10,
  },
  deleteBtn: {
    width: "100%",
    flexDirection: "row",
    borderRadius: 16,
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  deleteBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(0,0,0,0.4)",
    marginRight: 7,
  },
});
