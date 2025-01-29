import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import i18n from "i18n-js";
import { BottomSheet } from "react-native-btr";
import { Colors } from "../../../../styles/colors";
import Input from "../../../../components/Input";
import { UIActivityIndicator } from "react-native-indicators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import qs from "qs";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const VerifyForgetPass = ({ setModalVisible, modalVisible }) => {
  const navigation = useNavigation();
  const [modalVisibleVer, setModalVisibleVer] = useState(false);
  const [errorsVerify, setErrorsVerify] = useState("");
  const [inputsVerify, setInputsVerify] = useState({ iin: "" });
  const [isLoadingVerify, setIsLoadingVerify] = useState(false);
  const [respass, setresPass] = useState("");
  const [resfio, setresFio] = useState("");
  const [resiin, setresIin] = useState("");
  const [resisforeign, setresforeign] = useState("");
  const [verifiedTick, setresVerifiedTick] = useState("");

  globalThis.respass = respass;
  globalThis.verTick = verifiedTick;
  globalThis.resiin = resiin;

  const toggleBottomNavigationView = () => {
    setModalVisible(!modalVisible);
  };

  const handleErrorVerify = (errorMessage, input) => {
    setErrorsVerify((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleOnChangeVerify = (text, input) => {
    setInputsVerify((prevState) => ({ ...prevState, [input]: text }));
  };

  const closeModule = () => {
    setTimeout(() => {
      setModalVisibleVer(false), setModalVisible(false);
    }, 300);
  };

  const verifyToRestorePassword = () => {
    setIsLoadingVerify(true);
    const data = qs.stringify({
      infoiin: inputsVerify.iin,
    });
    const config = {
      method: "post",
      url: "http://95.57.218.120/?index",
      headers: {
        Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(async function (response) {
        let user = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        let parsed = JSON.parse(user);
        // console.log(parsed, "ededededededdeed");
        let telephone = parsed.tel;
        let fio = parsed.fio;
        let iin1 = parsed.iin;
        let verified1 = parsed.verified;
        if (telephone === null) {
          setresPass(telephone);
          AsyncStorage.setItem("restorepass", JSON.stringify(telephone));
        }
        if (iin1 === "Not found") {
          Alert.alert(i18n.t("errorVerify"), i18n.t("errIinVerify"));
        }
        if (iin1 !== "Not found") {
          // navigation.navigate('VerifyForget')
          setModalVisibleVer(true);
        }
        // console.log(parsed.verified)
        setresPass(telephone);
        setresFio(fio);
        setresIin(iin1);
        setresVerifiedTick(verified1);
        setresforeign(parsed.isforeign);
        AsyncStorage.setItem("restorepass", JSON.stringify(telephone));
        setIsLoadingVerify(false);
      })

      .catch(function (error) {
        console.log(error);
        setIsLoadingVerify(false);
      });
  };

  const validateVerify = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputsVerify.iin) {
      handleErrorVerify(i18n.t("erIin"), "iin");
      valid = false;
    } else if (inputsVerify.iin.length < 12) {
      handleErrorVerify(i18n.t("erIin"), "iin");
      valid = false;
    }
    if (valid) {
      verifyToRestorePassword();
    }
  };

  return (
    <BottomSheet
      visible={modalVisible}
      onBackButtonPress={toggleBottomNavigationView}
      onBackdropPress={toggleBottomNavigationView}
    >
      <View style={styles.bottomNavigationView}>
        {modalVisibleVer === false ? (
          <View style={{ width: "90%", marginTop: 15 }}>
            <Text
              style={{
                fontSize: 18,
                color: Colors.smoothBlack,
                fontWeight: "500",
              }}
            >
              {i18n.t("iinVerifyInput")}
            </Text>

            <Input
              keyboardType="numeric"
              iconName="account-outline"
              error={errorsVerify.iin}
              onFocus={() => {
                handleErrorVerify(null, "iin");
              }}
              placeholder={i18n.t("iin")}
              onChangeText={(text) => handleOnChangeVerify(text, "iin")}
              maxLength={12}
            />

            <TouchableOpacity
              disabled={isLoadingVerify === false ? false : true}
              style={{
                height: 50,
                backgroundColor: !isLoadingVerify ? Colors.primary : "#B8B8B8",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
              onPress={() => {
                validateVerify();
              }}
            >
              {isLoadingVerify === false ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: Colors.white,
                  }}
                >
                  {i18n.t("next")}
                </Text>
              ) : (
                <UIActivityIndicator color="white" size={30} />
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              marginTop: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                marginBottom: 30,
                color: Colors.smoothBlack,
              }}
            >
              {i18n.t("textcheckaccount")}
            </Text>
            <View
              style={{
                width: "100%",
                padding: 15,
                backgroundColor: Colors.background,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                flexDirection: "row",
              }}
            >
              <MaterialIcons
                name="account-circle"
                size={48}
                color="#7A7A7A"
                style={{ marginRight: 7 }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: Colors.smoothBlack,
                  }}
                >
                  {resfio}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: Colors.smoothBlack,
                    marginTop: 4,
                  }}
                >
                  {resiin}
                </Text>
              </View>

              <View style={{ display: "none" }}></View>
            </View>

            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                marginTop: 150,
                width: "100%",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.primary,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  width: "100%",
                  height: 40,
                }}
                onPress={() => (
                  closeModule(),
                  resisforeign !== "0"
                    ? navigation.navigate("RestorePassword")
                    : navigation.navigate("VerifyForget")
                )}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: Colors.white,
                  }}
                >
                  {i18n.t("yesMy")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
                onPress={() => setModalVisibleVer(false)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: Colors.primary,
                  }}
                >
                  {i18n.t("notMy")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomNavigationView: {
    width: "100%",
    height: 500,
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
  },
});

export default VerifyForgetPass;
