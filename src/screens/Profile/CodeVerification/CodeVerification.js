import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import i18n from "i18n-js";
import { Colors } from "../../../styles/colors";
import { AuthContext } from "../../../context/AuthContext";

const CodeVerification = ({
  visible1,
  handleResendCode,
  code,
  setVisible1,
  timer,
  setTimer,
}) => {
  const [otp1, setOTP1] = useState("");
  const [otp2, setOTP2] = useState("");
  const [otp3, setOTP3] = useState("");
  const [otp4, setOTP4] = useState("");
  const [focusedInput, setFocusedInput] = useState(null); // Track focused input
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  const [errorMessage, setErrorMessage] = useState(false);

  const timerText = i18n.t("getCodeRetry");

  useEffect(() => {
    if (visible1 === true) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [visible1, setTimer]);

  const formatTimer = (timer) => {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (!otp1 || !otp2 || !otp3 || !otp4) {
      setErrorMessage(false);
    }
  }, [otp1, otp2, otp3, otp4]);

  useEffect(() => {
    const otp = otp1 + otp2 + otp3 + otp4;
    if (otp1 && otp2 && otp3 && otp4) {
      if (otp === code) {
        Keyboard.dismiss();
        setVisible1(false);
        setTimer(60);
        setOTP1("");
        setOTP2("");
        setOTP3("");
        setOTP4("");
      } else {
        setErrorMessage(true);
      }
    }
  }, [otp1, otp2, otp3, otp4, code]);

  const handleBackspace = (ref, setOTP, currentOTP) => {
    if (currentOTP === "") {
      if (ref === input4Ref) {
        input3Ref.current.focus();
        setOTP3("");
      } else if (ref === input3Ref) {
        input2Ref.current.focus();
        setOTP2("");
      } else if (ref === input2Ref) {
        input1Ref.current.focus();
        setOTP1("");
      }
    } else {
      setOTP("");
    }
  };

  const handleOTPChange = (ref, setOTP, text) => {
    if (text.length === 0) {
      handleBackspace(ref, setOTP, text);
    } else {
      setOTP(text.replace(/[^0-9]/g, "").slice(0, 1));
      if (ref === input1Ref) {
        input2Ref.current.focus();
      } else if (ref === input2Ref) {
        input3Ref.current.focus();
      } else if (ref === input3Ref) {
        input4Ref.current.focus();
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        display: visible1 === true ? "flex" : "none",
        width: "100%",
        marginTop: 60,
      }}
    >
      <View
        style={{
          alignItems: "center",
          width: "90%",
          backgroundColor: Colors.white,
          borderRadius: 25,
          padding: 20,
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              fontWeight: "400",
              color: Colors.smoothBlack,
              fontSize: 16,
              marginTop: 10,
            }}
          >
            {i18n.t("codeVerifySubTitle")}
          </Text>
        </View>

        <View style={styles.otpContainer}>
          <View style={styles.otpTextInputContainer}>
            <TextInput
              ref={input1Ref}
              value={otp1}
              onChangeText={(text) => handleOTPChange(input1Ref, setOTP1, text)}
              onFocus={() => setFocusedInput(1)} // Set focused input
              onBlur={() => setFocusedInput(null)} // Clear focused input on blur
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(input1Ref, setOTP1, otp1);
                }
              }}
              keyboardType="numeric"
              maxLength={1}
              style={[
                styles.otpInput,
                focusedInput === 1 && { borderColor: Colors.primary },
              ]}
            />
            <TextInput
              ref={input2Ref}
              value={otp2}
              onChangeText={(text) => handleOTPChange(input2Ref, setOTP2, text)}
              onFocus={() => setFocusedInput(2)} // Set focused input
              onBlur={() => setFocusedInput(null)} // Clear focused input on blur
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(input2Ref, setOTP2, otp2);
                }
              }}
              keyboardType="numeric"
              maxLength={1}
              style={[
                styles.otpInput,
                focusedInput === 2 && { borderColor: Colors.primary },
              ]}
            />
            <TextInput
              ref={input3Ref}
              value={otp3}
              onChangeText={(text) => handleOTPChange(input3Ref, setOTP3, text)}
              onFocus={() => setFocusedInput(3)} // Set focused input
              onBlur={() => setFocusedInput(null)} // Clear focused input on blur
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(input3Ref, setOTP3, otp3);
                }
              }}
              keyboardType="numeric"
              maxLength={1}
              style={[
                styles.otpInput,
                focusedInput === 3 && { borderColor: Colors.primary },
              ]}
            />
            <TextInput
              ref={input4Ref}
              value={otp4}
              onChangeText={(text) => handleOTPChange(input4Ref, setOTP4, text)}
              onFocus={() => setFocusedInput(4)} // Set focused input
              onBlur={() => setFocusedInput(null)} // Clear focused input on blur
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(input4Ref, setOTP4, otp4);
                }
              }}
              keyboardType="numeric"
              maxLength={1}
              style={[
                styles.otpInput,
                focusedInput === 4 && { borderColor: Colors.primary },
              ]}
            />
          </View>

          {errorMessage && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "#f8babb",
                  width: 260,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 15,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  {i18n.t("errorVerifyText")}
                </Text>
              </View>
            </View>
          )}

          <TouchableOpacity
            disabled={timer !== 0 ? true : false}
            onPress={handleResendCode}
            style={{
              width: 260,
              height: 40,
              borderRadius: 15,
              marginTop: 10,
              backgroundColor: timer === 0 ? Colors.primary : Colors.grey,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {timer != 0 ? (
              <Text style={[styles.timerText]}>
                {timerText} {formatTimer(timer)}
              </Text>
            ) : (
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {i18n.t("getCodeText")}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  otpTextInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  timerText: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
  },
  otpInput: {
    width: 55,
    height: 55,
    marginHorizontal: 5,
    borderWidth: 3,
    borderRadius: 12,
    borderColor: "#7b7b7b",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: Colors.white,
    color: "#7b7b7b",
  },
});

export default CodeVerification;
