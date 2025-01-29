import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import i18n from "i18n-js";
import Input from "../../../../components/Input";
import Buttons from "../../../../components/Buttons";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useState } from "react";
import { Colors } from "../../../../styles/colors";
import { Keyboard } from "react-native";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const ChangePasswordContainer = () => {
  const navigation = useNavigation();
  const { iin, newPassword, logout } = useContext(AuthContext);
  const [inputs, setInputs] = useState({ parol: "", parol2: "" });
  const [errors, setErrors] = useState({});
  const [newPasswords, setNewPasswords] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.parol) {
      handleError(i18n.t("erPass"), "parol");
      valid = false;
    } else if (inputs.parol.length < 4) {
      handleError(i18n.t("passwordWarning5"), "parol");
      valid = false;
    }
    if (!inputs.parol2) {
      handleError(i18n.t("passwordRep"), "parol2");
      valid = false;
    } else if (inputs.parol.length < 5) {
      handleError(i18n.t("passwordWarning5"), "parol2");
      valid = false;
    } else if (inputs.parol !== inputs.parol2) {
      handleError(i18n.t("passwordMatch"), "parol2");
      valid = false;
    }
    if (valid) {
      newPassword(iin, inputs.parol, setIsLoading, setNewPasswords);
    }
  };
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  useEffect(() => {
    if (newPasswords) {
      Alert.alert(
        "Успешно!", // Title of the alert
        `${newPasswords}`, // Message in the alert
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(), // Action for OK button
          },
        ]
      );
    }
  }, [newPasswords]);

  return (
    <View
      style={{
        width: "90%",
        padding: 15,
        borderRadius: 20,
        backgroundColor: Colors.white,
        marginTop: 15,
      }}
    >
      <Input
        iconName="lock-outline"
        label={i18n.t("password")}
        error={errors.parol}
        onFocus={() => {
          handleError(null, "parol");
        }}
        placeholder={i18n.t("passwordLabel")}
        password
        onChangeText={(text) => handleOnChange(text, "parol")}
      />
      <View style={{ marginTop: -15 }}>
        <Input
          iconName="lock-outline"
          label={i18n.t("passwordRep")}
          error={errors.parol2}
          onFocus={() => {
            handleError(null, "parol2");
          }}
          placeholder={i18n.t("passwordLabel")}
          password
          onChangeText={(text) => handleOnChange(text, "parol2")}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator
          color={Colors.primary}
          size={"large"}
          style={{ marginTop: 50 }}
        />
      ) : (
        <View style={{ marginTop: -15 }}>
          <Buttons title={i18n.t("renewParolChange")} onPress={validate} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChangePasswordContainer;
