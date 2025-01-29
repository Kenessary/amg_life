import React, { useContext, useEffect, useState } from "react";
import {
  Animated,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../../../../../context/AuthContext";
import { TextInput } from "react-native";

const OtpLoginVerification = ({ code }) => {
  const [time, setTime] = useState(60);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [focusedInput, setFocusedInput] = useState(-1);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [warning, setWarning] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [code, setCode] = useState("");
  const [successSendCode, setSuccessSendCode] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const { phone } = useContext(AuthContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  });

  const formatTimer = (timer) => {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  const handleResendCode = () => {
    if (time === 0) {
      setTime("");
    }
    setTime(60);
    getCodeRetry(phone.slice(1), setCode);
  };

  useEffect(() => {
    if (warning) {
      // Start the smooth appearance animation when the component mounts or isVisible becomes true
      Animated.timing(animation, {
        toValue: 1, // End value for the animation
        duration: 400, // Duration of the animation in milliseconds
        useNativeDriver: true, // Enable native driver for better performance
      }).start();
    } else {
      // Reset the animation when switchIsForgotPass becomes false
      animation.setValue(0); // Reset the animation value to 0
    }
  }, [warning]);

  const animatedStyles = {
    opacity: animation, // Use animated value for opacity
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.6, 1], // Interpolate scale from 0.8 to 1
        }),
      },
    ],
  };

  useEffect(() => {
    if (parseInt(code, 10) === parseInt(otp.join(""), 10)) {
      setIsMatched(true);
    } else {
      setIsMatched(false);
      if (code.length === 4 && otp.join("").length === 4) {
        setWarning(true);
      }
    }
  }, [code, otp]);

  useEffect(() => {
    inputRefs.forEach((ref, index) => {
      if (ref.current && ref.current.isFocused()) {
        setFocusedInput(index);
      }
    });
  }, []);

  const resetOtp = () => {
    {
      setOtp(["", "", "", ""]);
      setFocusedInput(-1);
      Keyboard.dismiss();
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    if (newOtp.join("").length !== 4) {
      setWarning(false);
    }

    setOtp(newOtp);

    // Only move to the next input if the current input is filled
    if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }

    if (newOtp[3] !== "") {
      Keyboard.dismiss();
      setFocusedInput(-1);
    }
  };

  const handleBackspace = (index) => {
    const newOtp = [...otp];

    // Delete the digit in the current input field
    newOtp[index] = "";

    if (index > 0) {
      // Focus on the previous input field
      inputRefs[index - 1].current.focus();
    }

    setOtp(newOtp);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={{ ...textStyles.medium18pxWhite }}>Введите код</Text>

        <View style={otpStyle.container}>
          {otp.map((digit, index) => (
            <TextInput
              autoFocus={index === 0}
              key={index}
              ref={inputRefs[index]}
              style={[
                styles.input,
                { borderColor: warning ? "#F83E59" : "#ccc" },
                index === 0 ? styles.firstInput : null, // Add special style for first input
                index === focusedInput ? styles.focusedInput : null, // Change style when focused
              ]}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(value) => handleOtpChange(index, value)}
              value={digit}
              // caretHidden={true}
              cursorColor="#BC994A"
              onKeyPress={({ nativeEvent: { key } }) => {
                if (key === "Backspace") {
                  handleBackspace(index);
                }
              }}
              onFocus={() => setFocusedInput(index)} // Update focused input index
            />
          ))}
        </View>

        {warning && (
          <Animated.View
            key={Math.random()}
            style={[
              {
                width: "100%",
                padding: 13,
                backgroundColor: "#56060D",
                borderRadius: 10,
                marginTop: 10,
              },
              animatedStyles,
            ]}
          >
            <Text style={{ ...textStyles.medium16pxGrey, color: "#F83E59" }}>
              Неправильный код, попробуйте еще раз
            </Text>
          </Animated.View>
        )}

        {time === 0 ? (
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 25,
              padding: 10,
              backgroundColor: "white",
              borderRadius: 10,
            }}
            onPress={handleResendCode}
          >
            <Text style={{ ...textStyles.medium16pxGrey, color: "#000" }}>
              Получить код еще раз
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              backgroundColor: "#393C43",
              marginTop: 25,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={textStyles.medium16pxGrey}>
              Получить код повторно {formatTimer(time)}
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

const textStyles = StyleSheet.create({
  medium18pxWhite: {
    color: "white",
    fontSize: 18,
  },
  fontSize: 16,
  color: "#B8B8B6",
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 45,
    alignItems: "center",
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 10,
    fontSize: 20,
    width: 50,
    textAlign: "center",
    marginHorizontal: 5,
    color: "white",
  },
  focusedInput: {
    // Change border color and width when focused
    borderColor: "#BC994A",
    borderWidth: 3,
  },
});

export default OtpLoginVerification;
