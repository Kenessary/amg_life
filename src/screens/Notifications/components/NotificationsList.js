import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";
import i18n from "i18n-js";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../styles/colors";

const NotificationsList = ({ historyNotification, historyStatus }) => {
  const navigation = useNavigation();
  if (historyNotification.length !== 0) {
    historyNotification.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.hour}`);
      const dateB = new Date(`${b.date}T${b.hour}`);
      return dateB - dateA;
    });
  }

  const openAppStore = () => {
    Linking.openURL("https://apps.apple.com/kz/app/amg-life/id1594409514");
  };

  const openGooglePlayStore = () => {
    Linking.openURL(
      "https://play.google.com/store/apps/details?id=kz.portmasterplus.cnpcamglife"
    );
  };

  const date = moment().format(`YYYY-MM-DD`);
  const yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");

  const icons = (iconName) => {
    if (iconName === "message") {
      return "forum";
    }
    if (iconName === "oa") {
      return "assignment";
    }
    if (iconName === "menu") {
      return "local-dining";
    }
    if (iconName === "update") {
      return "system-update";
    }
    if (iconName === "edo") {
      return "insert-drive-file";
    } else {
      return "";
    }
  };
  const notificationButton = (link) => {
    if (link === "menu") {
      navigation.navigate("FoodMenuScreen");
    } else {
      if (Platform.OS === "ios") {
        openAppStore();
      } else {
        openGooglePlayStore();
      }
    }
  };

  let notifications = [];
  for (let i = 0; i < historyNotification.length; i++) {
    const time = historyNotification[i].hour.split(":");
    notifications.push(
      <View key={i} style={{ width: "100%", alignItems: "center" }}>
        <StatusBar style={"dark"} />

        <View style={cardStyles.cardContainer}>
          <View style={cardStyles.iconContainer}>
            <MaterialIcons
              name={icons(historyNotification[i].type)}
              size={24}
              color={"grey"}
            />
          </View>

          <View style={cardStyles.notificationContainer}>
            <View style={cardStyles.notificationTitleContainer}>
              <Text style={cardStyles.title}>
                {historyNotification[i].title}
              </Text>

              <View
                style={{
                  ...cardStyles.isNewContainer,
                  display:
                    historyNotification[i].opened === 0 ? "flex" : "none",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    color: Colors.smoothBlack,
                    marginRight: 5,
                  }}
                >
                  Новое
                </Text>
                <View style={cardStyles.isNewText} />
              </View>
            </View>

            <Text style={cardStyles.notificationBody}>
              {historyNotification[i].body}
            </Text>

            {historyNotification[i].type !== "edo" &&
            historyNotification[i].type !== "message" &&
            historyNotification[i].type !== "oa" ? (
              <TouchableOpacity
                style={cardStyles.notificationButton}
                onPress={() => notificationButton(historyNotification[i].type)}
              >
                <Text style={cardStyles.notificationButtonTitle}>
                  {historyNotification[i].type === "menu"
                    ? "Меню"
                    : historyNotification[i].type === "update"
                    ? "Обновить приложения"
                    : ""}
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}

            <View style={cardStyles.dateContainer}>
              <View>
                <Text style={cardStyles.date}>
                  {historyNotification[i].date === date
                    ? i18n.t("today")
                    : historyNotification[i].date === yesterday
                    ? i18n.t("yesterday")
                    : historyNotification[i].date}
                </Text>
              </View>

              <View>
                <Text style={cardStyles.time}>
                  {time[0]}:{time[1]}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <ScrollView style={{ width: "100%" }}>
        {historyStatus !== "Нет данных" ? (
          notifications
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 22,
                color: Colors.smoothBlack,
                fontWeight: "600",
              }}
            >
              {" "}
              <Entypo
                name="archive"
                size={28}
                color={Colors.smoothBlack}
                style={{ marginRight: 5 }}
              />{" "}
              {historyStatus}
            </Text>
          </View>
        )}
        <View style={{ marginBottom: 150 }}></View>
      </ScrollView>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
    width: "90%",
    justifyContent: "space-between",
  },
  iconContainer: {
    width: "12%",
    height: 40,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationContainer: {
    width: "86%",
    backgroundColor: Colors.white,
    marginLeft: 8,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 16,
  },
  notificationTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.smoothBlack,
  },
  isNewContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  isNewText: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.smoothBlack,
    marginRight: 5,
  },
  notificationBody: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.smoothBlack,
    marginTop: 5,
  },
  notificationButton: {
    marginTop: 15,
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 10,
  },
  notificationButtonTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.white,
  },
  dateContainer: {
    justifyContent: "space-between",
    marginTop: 10,
    flexDirection: "row",
  },
  date: {
    fontSize: 13,
    fontWeight: "400",
    color: Colors.smoothBlack,
  },
  time: {
    fontSize: 13,
    fontWeight: "400",
    color: Colors.smoothBlack,
  },
});

export default NotificationsList;
