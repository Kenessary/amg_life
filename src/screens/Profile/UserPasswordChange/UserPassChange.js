import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../../../components/Input";
import { Colors } from "../../../styles/colors";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";
import { newPassword, searchUser } from "./api/api";
import { useNavigation } from "@react-navigation/native";

export default function UserPassChange() {
  const [inputs, setInputs] = useState({ iin: "" });
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChange, setIsLoadingChange] = useState(false);

  const [userSearch, setUserSearch] = useState("");

  const navigation = useNavigation();
  const back = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (inputs.iin.length === 12) {
      Keyboard.dismiss();
      searchUser(inputs.iin, setIsLoading, setUserSearch);
    }
    if (inputs.iin.length !== 12) {
      setUserSearch("");
    }
  }, [inputs]);

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <View style={styles.container}>
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={"Изменить пароль пользователя"}
        backButton={backButton()}
        height={"15%"}
      />

      <View style={styles.inputContainer}>
        <Input
          keyboardType="numeric"
          iconName="account-outline"
          label="ИИН"
          error={errors.iin}
          onFocus={() => {
            handleError(null, "iin");
          }}
          placeholder="ИИН"
          onChangeText={(text) => handleOnChange(text, "iin")}
          maxLength={12}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator
          color={Colors.primary}
          size={"large"}
          style={{ marginTop: 20 }}
        />
      ) : userSearch && userSearch.iin !== "Not found" ? (
        <View style={{ alignItems: "center", width: "100%", marginTop: 20 }}>
          <View style={styles.userInfoContainer}>
            <Text style={{ fontSize: 20, fontWeight: "500", color: "#4D4D4D" }}>
              {userSearch.fio}
            </Text>

            <View style={styles.row}>
              <Text style={styles.label}>ИИН:</Text>
              <Text style={{ color: "#4D4D4D" }}>{userSearch.iin}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Номер телефона:</Text>
              <Text style={{ color: "#4D4D4D" }}>{userSearch.tel}</Text>
            </View>
          </View>

          <Text style={{ fontSize: 16, marginTop: 40 }}>
            Стандартный пароль: 1234
          </Text>

          <TouchableOpacity
            disabled={isLoadingChange}
            onPress={() => newPassword(inputs.iin, setIsLoadingChange, back)}
            style={styles.changeBtn}
          >
            {isLoadingChange ? (
              <ActivityIndicator size={"large"} color={"white"} />
            ) : (
              <Text style={styles.changeBtnText}>Сбросить пароль</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.empty}>
          {!userSearch ? <></> : "ИИН не найден"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    backgroundColor: Colors.background,
  },
  inputContainer: {
    width: "90%",
    padding: 15,
    backgroundColor: Colors.white,
    marginTop: 20,
    borderRadius: 20,
  },
  userInfoContainer: {
    width: "90%",
    padding: 25,
    borderRadius: 15,
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
  },
  label: {
    marginRight: 10,
    fontWeight: "bold",
    color: "#4D4D4D",
  },
  changeBtn: {
    width: "90%",
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  changeBtnText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.white,
  },
  empty: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: "600",
    color: Colors.smoothBlack,
  },
});
