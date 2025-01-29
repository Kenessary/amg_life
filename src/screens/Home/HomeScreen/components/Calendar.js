import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TopBarNavigation from "../../../../components/TopBarNavigation";
import i18n from "i18n-js";
import { backButton } from "../../../../components/GoBackButton";
import { ru, ch, kz } from "../../../../languages/localizations";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../styles/colors";
import { getLanguage, localeCheck } from "../../../../languages/languageLoad";
import { eventsChi, eventsKaz, eventsRus } from "../data/events";
import { AuthContext } from "../../../../context/AuthContext";

const Calendar = ({ route }) => {
  const { iin } = useContext(AuthContext);
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    localeCheck(locale), getLanguage(setLang);
  });

  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();
  const [sequence, setSequence] = useState(0);
  const [calendarData, setCalendarData] = useState([]);
  const [userAge, setUserAge] = useState("");
  const [userMonth, setUserMonth] = useState("");
  const [userDay, setUserDay] = useState("");
  console.log(route.params);

  useEffect(() => {
    if (route.params === "kz") {
      setCalendarData(eventsKaz);
    } else if (route.params === "ru") {
      setCalendarData(eventsRus);
    } else {
      setCalendarData(eventsChi);
    }
  }, [route.params]);

  useEffect(() => {
    if (iin[2] === "0") {
      setUserMonth(parseInt(iin[3], 10));
    } else {
      setUserMonth(parseInt(iin[2] + iin[3], 10));
    }
    if (iin[4] === "0") {
      setUserDay(parseInt(iin[5], 10));
    } else {
      setUserDay(parseInt(iin[4] + iin[5], 10));
    }

    // console.log(thirdAndFourth);
  }, []);

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#F7F8FA",
        alignItems: "center",
      }}
    >
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />

      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={`${i18n.t("calendar")} 2025`}
        backButton={backButton()}
        height={"15%"}
      />
      <View
        style={{
          width: "95%",
          height: 300,
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          disabled={sequence === 0}
          onPress={() => setSequence(sequence - 1)}
          style={{
            width: "10%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign
            name="caretleft"
            size={24}
            color={sequence === 0 ? "grey" : Colors.primary}
          />
        </TouchableOpacity>
        <View style={{ width: "80%", height: "100%" }}>
          <Image
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            source={
              route.params === "kz"
                ? eventsKaz[sequence].source
                : route.params === "ru"
                ? eventsRus[sequence].source
                : eventsChi[sequence].source
            }
          />
        </View>
        <TouchableOpacity
          disabled={sequence === 11}
          onPress={() => setSequence(sequence + 1)}
          style={{
            width: "10%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign
            name="caretright"
            size={24}
            color={sequence === 11 ? "grey" : Colors.primary}
          />
        </TouchableOpacity>
      </View>

      <View
        key={Math.random()}
        style={{
          width: "90%",
          backgroundColor: "white",
          padding: 10,
          paddingHorizontal: 15,
          borderRadius: 15,
          marginTop: 10,
          display: userMonth - 1 === sequence ? "flex" : "none",
          flexDirection: "row",
        }}
      >
        <View style={{ width: "85%" }}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              color: Colors.smoothBlack,
              marginBottom: 3,
            }}
          >
            {userDay}{" "}
            {calendarData.length > 0 && calendarData[sequence].monthName}
          </Text>
          <Text style={{}}>
            {route.params === "kz"
              ? "Туған күн"
              : route.params === "ru"
              ? "День рождения"
              : "生日"}{" "}
          </Text>
        </View>
        <View
          style={{
            width: "15%",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <FontAwesome name="birthday-cake" size={24} color={Colors.primary} />
        </View>
      </View>

      {calendarData.length > 0 &&
      calendarData[sequence].events &&
      calendarData[sequence].events.length > 0 ? (
        calendarData[sequence].events.map((el) => (
          <View
            key={Math.random()}
            style={{
              width: "90%",
              backgroundColor: "white",
              padding: 10,
              paddingHorizontal: 15,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 18,
                color: Colors.smoothBlack,
              }}
            >
              {el.startDate}
              {el.endDate !== "" ? "-" + el.endDate : ""}
              {" " + el.month}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Colors.smoothBlack,
                marginTop: 3,
              }}
            >
              {el.eventName}
            </Text>
          </View>
        ))
      ) : (
        <Text>
          {route.params === "kz"
            ? "Бұл айда мейрам жоқ"
            : route.params === "ru"
            ? "В этом месяце нет праздников"
            : "这个月没有假期"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Calendar;
