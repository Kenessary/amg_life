import React, { useContext, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import i18n from "i18n-js";
import Input from "../../../../components/Input";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Buttons from "../../../../components/Buttons";
import SelectLanguageLogin from "./SelectLanguageLogin";
import { Colors } from "../../../../styles/colors";

const LoginContainer = ({ setModalVisible, setLocale, lang }) => {
  const { login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({ iin: "", parol: "" });
  const [errors, setErrors] = useState("");

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

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
    if (!inputs.parol) {
      handleError(i18n.t("erPass"), "parol");
      valid = false;
    }
    if (valid) {
      login(inputs.iin, inputs.parol);
    }
  };

  return (
    <ScrollView
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 30,
        paddingHorizontal: 20,
      }}
    >
      <LoginPageTitle />
      <View
        style={{
          marginVertical: 15,
          width: "100%",
          backgroundColor: "white",
          padding: 20,
          borderRadius: 25,
        }}
      >
        <LoginInputs
          handleOnChange={handleOnChange}
          handleError={handleError}
          errors={errors}
        />
        <ForgetPassword setModalVisible={setModalVisible} />
        <Buttons
          title={i18n.t("enter")}
          onPress={() => {
            validate();
          }}
        />
        <IsExistAccount />
      </View>
      <SelectLanguageLogin setLocale={setLocale} lang={lang} />
    </ScrollView>
  );
};

const LoginInputs = ({ handleOnChange, errors, handleError }) => {
  return (
    <>
      <Input
        keyboardType="numeric"
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
    </>
  );
};

const LoginPageTitle = () => {
  return (
    <View style={{ marginLeft: 10 }}>
      <Text style={styles.title}>{i18n.t("login")}</Text>
    </View>
  );
};

const ForgetPassword = ({ setModalVisible }) => {
  return (
    <View style={styles.forgetPassContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.forgetPassText}>{i18n.t("forgetPassword")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const IsExistAccount = () => {
  const navigation = useNavigation();
  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.isExistContainer}>
        <Text style={styles.isExisText}>{i18n.t("isHaveAccount")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.isExisTextTomato}>{i18n.t("register")}</Text>
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
  subTitle: {
    color: Colors.smoothBlack,
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
  },
  forgetPassContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  forgetPassText: {
    textDecorationLine: "underline",
    color: Colors.smoothBlack,
    fontSize: 15,
  },
  isExistContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  isExisText: {
    color: Colors.smoothBlack,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  isExisTextTomato: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default LoginContainer;
