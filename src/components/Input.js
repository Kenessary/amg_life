import React, { useContext } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Colors } from "../styles/colors";

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={[style.label, { color: Colors.smoothBlack }]}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? Colors.primary
              : isFocused
              ? "grey"
              : "#F3F4FB",
            borderWidth: isFocused ? 2 : 0,
          },
        ]}
      >
        <Icon
          name={iconName}
          style={{ fontSize: 24, color: Colors.grey, marginRight: 10 }}
        />
        <TextInput
          secureTextEntry={hidePassword}
          placeholderTextColor={"grey"}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{ color: Colors.grey, flex: 1 }}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            style={{ fontSize: 24, color: Colors.grey }}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
          />
        )}
      </View>
      {error && (
        <Text style={{ color: Colors.primary, fontSize: 12, marginTop: 7 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
  },
  inputContainer: {
    height: 48,
    backgroundColor: "#F3F4FB",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default Input;
