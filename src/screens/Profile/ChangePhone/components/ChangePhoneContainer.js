import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import i18n from "i18n-js";
import Input from "../../../../components/Input";
import { Text } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { Colors } from "../../../../styles/colors";
import axios from "axios";
import qs from "qs";

export const ChangePhoneContainer = ({
  isLoading,
  setIsLoading,
  setResult,
  setModalResult,
  modalResult,
}) => {
  const { iin } = useContext(AuthContext);
  const [inputs, setInputs] = useState({ phonetext: "" });
  const [errors, setErrors] = React.useState({});

  const changePhone = (newparoliin, newtel) => {
    setIsLoading(true);
    const data = qs.stringify({
      newparoliin: newparoliin,
      newtel: newtel,
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
        let user_password = response.data
          .replace(/<[^>]*>/g, "")
          .replace(/-->/g, "");
        let parsed = JSON.parse(user_password);
        let newpassword = parsed.status;
        setResult(newpassword);
        if (newpassword.length !== 0) {
          setModalResult(true);
        }
        setIsLoading(false);
      })

      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (inputs.phonetext.length !== 11) {
      handleError(i18n.t("erTelephone"), "phonetext");
      valid = false;
    }
    if (valid) {
      changePhone(iin, inputs.phonetext);
    }
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  return (
    <View style={{ ...styles.container, opacity: modalResult ? 0.4 : 1 }}>
      <View style={{ width: "100%" }}>
        <Input
          keyboardType="numeric"
          label={i18n.t("telnumber")}
          error={errors.phonetext}
          onFocus={() => {
            handleError(null, "phonetext");
          }}
          placeholder={i18n.t("examplenumber")}
          onChangeText={(text) => handleOnChange(text, "phonetext")}
          maxLength={11}
        />

        <TouchableOpacity
          disabled={isLoading}
          style={{
            ...styles.btn,
            backgroundColor: isLoading === true ? "grey" : "#D64D43",
          }}
          onPress={() => validate()}
        >
          {isLoading ? (
            <ActivityIndicator size={"small"} color={Colors.white} />
          ) : (
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              {i18n.t("changePhone")}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    width: "90%",
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    padding: 10,
  },
});

// export default ChangePhoneContainer;
