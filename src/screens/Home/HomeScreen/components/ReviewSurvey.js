import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Dimensions,
  StyleSheet,
  Alert,
} from "react-native";

import { BlurView } from "expo-blur";
import { checkSurvey, sendSurvey } from "../responses/HomeApi";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import { UIActivityIndicator } from "react-native-indicators";
import { multiLanguage } from "../../../language";
import { ru, ch, kz } from "../../../../languages/localizations";
import i18n from "i18n-js";
import { Colors } from "../../../../styles/colors";

const windowWidth = Dimensions.get("window").width;
export function ReviewSurvey({ setIsLoading, iin, isLoading }) {
  let [surveysOutcome, setSurveyOutcome] = useState(false);
  const [comment1, setComment1] = useState("");
  const [resultSurvey, setResultSurvey] = useState("");
  const [rating, setRating] = useState(0);
  const [survey, setSurvey] = useState("");
  const [intensity, setIntensity] = useState("");

  // console.log(rating === 0)

  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");

  multiLanguage(locale, setLang);

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    checkSurvey(setIsLoading, iin, setSurveyOutcome, setSurvey, setIntensity);
  }, []);

  const handleStarPress = (newRating) => {
    setRating(newRating);
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const starColor = i <= rating ? "gold" : "gray";
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          style={styles.starContainer11}
        >
          <FontAwesome name="star" size={40} color={starColor} />
        </TouchableOpacity>
      );
    }

    return stars;
  };

  const checkStars = () => {
    if (rating === 0) {
      Alert.alert(i18n.t("errorSearch"), survey.textsurvey, [{ text: "OK" }], {
        cancelable: false,
      });
    } else {
      sendSurvey(
        iin,
        survey.textsurvey,
        rating,
        survey.idsurvey,
        comment1,
        setIsLoading,
        setResultSurvey
      );
    }
  };

  return (
    <BlurView
      tint="light"
      style={[
        styles.background,
        { display: surveysOutcome === false ? "none" : "flex" },
      ]}
      intensity={20}
    >
      <View style={{ ...styles.content, backgroundColor: Colors.white }}>
        <Text
          style={[
            styles.title11,
            {
              display: resultSurvey.length === 0 ? "flex" : "none",
              textAlign: "center",
              color: Colors.smoothBlack,
            },
          ]}
        >
          {survey.textsurvey === "Оцените приложение" && i18n.t("textReview")}
        </Text>
        <View
          style={[
            styles.starRating11,
            { display: resultSurvey.length === 0 ? "flex" : "none" },
          ]}
        >
          {renderStars()}
        </View>
        <TextInput
          multiline={true}
          placeholder={i18n.t("yourOpinion")}
          placeholderTextColor={"grey"}
          value={comment1}
          onChangeText={setComment1}
          style={{
            color: Colors.smoothBlack,
            marginTop: 20,
            width: "100%",
            borderWidth: 1,
            height: 100,
            borderColor: "rgba(0,0,0,0.2)",
            borderRadius: 5,
            padding: 15,
            paddingTop: 10,
            paddingBottom: 10,
            alignItems: "baseline",
            display: resultSurvey.length === 0 ? "flex" : "none",
          }}
        />
        <TouchableOpacity
          disabled={isLoading === true ? true : false}
          onPress={() => {
            Keyboard.dismiss();
            checkStars();
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#3678DD",
            width: windowWidth - 50,
            height: 40,
            marginTop: 20,
            borderRadius: 10,
            display: resultSurvey.length === 0 ? "flex" : "none",
          }}
        >
          {isLoading ? (
            <UIActivityIndicator color="white" size={25} />
          ) : (
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              {i18n.t("sendReview")}
            </Text>
          )}
        </TouchableOpacity>

        <View
          style={{
            alignItems: "center",
            display: resultSurvey.length === 0 ? "none" : "flex",
          }}
        >
          <AntDesign name="checkcircle" size={110} color="#0DC920" />
          <Text
            style={{
              textAlign: "center",
              marginTop: 15,
              fontWeight: "500",
              fontSize: 18,
              color: Colors.smoothBlack,
            }}
          >
            {i18n.t("thanksMessage")}
          </Text>
          <TouchableOpacity
            disabled={isLoading === true ? true : false}
            onPress={() => {
              Keyboard.dismiss();
              setSurveyOutcome(false);
              setResultSurvey(""), setComment1(""), setRating("");
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#3678DD",
              width: windowWidth - 50,
              height: 40,
              marginTop: 20,
              borderRadius: 10,
            }}
          >
            {isLoading ? (
              <UIActivityIndicator color="white" size={25} />
            ) : (
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                ОK
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  content: {
    width: windowWidth - 20,
    marginTop: 50,
    margin: 16,
    borderRadius: 10, // Add border radius for rounded corners
    // Background color of the content view
    elevation: 10, // Shadow depth
    shadowColor: "black", // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 5, // Shadow radius
    padding: 16,
    alignItems: "center",
    justifyContent: "center", // Add padding to separate content from the shadow
  },
  starContainer11: {
    marginHorizontal: 5,
  },
  title11: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
  },
  starRating11: {
    flexDirection: "row",
  },
});
