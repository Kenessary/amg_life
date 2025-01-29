import React, { useEffect, useState } from "react";
import { Alert, Keyboard, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { StyleSheet, View } from "react-native";
import i18n from "i18n-js";
import Input from "../../../../components/Input";
import Buttons from "../../../../components/Buttons";
import { Colors } from "../../../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { register } from "../api/api";

const RegisterContainer = ({ setLoading }) => {
  const navigation = useNavigation();
  const [errors, setErrors] = React.useState({});
  const [status, setStatus] = useState("");
  const [inputs, setInputs] = React.useState({
    iin: "",
    tel: "",
    parol: "",
    parol2: "",
  });

  console.log(inputs.tel);

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  useEffect(() => {
    if (status === "Not found") {
      Alert.alert(
        "Пользователь не найден",
        "Попробуйте снова",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }

    if (status === "Ok") {
      Alert.alert(
        "Вы успешно зарегистрировались",
        "Войти в личный кабинет",
        [
          {
            text: "Войти",
            onPress: () => navigation.navigate("LoginScreen"),
          },
        ],
        { cancelable: false }
      );
    }
  }, [status]);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.iin) {
      handleError(i18n.t("erIin"), "iin");
      valid = false;
    } else if (inputs.iin.length < 12) {
      handleError(i18n.t("erIin"), "iin");
      valid = false;
    }
    if (!inputs.tel) {
      handleError(i18n.t("telephoneNumberLabel0"), "tel");
      valid = false;
    }
    if (!inputs.parol) {
      handleError(i18n.t("erPass"), "parol");
      valid = false;
    } else if (inputs.parol.length < 5) {
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
      register(inputs.iin, inputs.parol, inputs.tel, setLoading, setStatus);
    }
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{
        paddingTop: 30,
        paddingHorizontal: 20,
      }}
    >
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.title}>{i18n.t("register")}</Text>
      </View>

      <View style={styles.registerContainer}>
        <RegisterInputs
          handleError={handleError}
          handleOnChange={handleOnChange}
          errors={errors}
          inputs={inputs}
        />

        <Buttons title={i18n.t("register2")} onPress={validate} />

        <IsExistAccount />
      </View>
    </ScrollView>
  );
};

const RegisterInputs = ({ errors, handleError, handleOnChange, inputs }) => {
  return (
    <>
      <Input
        keyboardType="number-pad"
        iconName="account-outline"
        label={i18n.t("iin")}
        error={errors.iin}
        onFocus={() => {
          handleError(null, "iin");
        }}
        placeholder={i18n.t("iinLabel")}
        onChangeText={(text) => handleOnChange(text, "iin")}
        maxLength={12}
      />
      <Input
        keyboardType="number-pad"
        iconName="phone-outline"
        error={errors.tel}
        onFocus={() => {
          if (!inputs.tel.startsWith("8")) {
            handleOnChange("8", "tel");
          }
          handleError(null, "tel");
        }}
        label={i18n.t("telephoneNumber")}
        placeholder="Формат номера: 87056021453"
        value={inputs.tel} // Ensure the value is controlled
        onChangeText={(text) => {
          // Ensure the first digit is always '8'
          if (text.length === 0 || text[0] !== "8") {
            text = "8" + text.replace(/^8/, ""); // Prepend '8' if it's not the first digit
          }
          handleOnChange(text, "tel");
        }}
      />
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
    </>
  );
};

const IsExistAccount = () => {
  const navigation = useNavigation();
  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.isHaveAccount}>{i18n.t("isHaveAccount2")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.signupText}>{i18n.t("enter")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.smoothBlack,
    fontSize: 36,
    fontWeight: "bold",
  },
  registerContainer: {
    marginVertical: 15,
    width: "100%",
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 25,
  },
  isHaveAccount: {
    color: Colors.smoothBlack,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default RegisterContainer;
