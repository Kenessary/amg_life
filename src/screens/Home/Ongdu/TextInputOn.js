import { useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

export function TextInputOn({
  label,
  setInputs,
  parameter,
  width,
  keyboardType,
  value,
  multiline,
  height,
  placeholder,
  input,
  editable,
}) {
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);

  const handleOnChangeParam = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleFocus = () => {
    setIsFocus(true);
    setIsFocus1(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };

  const borderColor = isFocus ? "#0095E9" : "gray";

  return (
    <View style={{ width: width, marginBottom: 5 }}>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: "600",
            color: "#4d4d4d",
            marginBottom: 5,
          }}
        >
          {label}
        </Text>
      </View>
      <TextInput
        editable={editable}
        value={isFocus1 === true ? input : placeholder}
        multiline={multiline}
        keyboardType={keyboardType}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={(text) => handleOnChangeParam(text, parameter)}
        style={{
          ...styles.textInputOngdu,
          height: height,
          borderColor: borderColor,
          paddingLeft: 10,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputOngdu: {
    borderRadius: 10,
    paddingLeft: 10,
  },
});
