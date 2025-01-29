import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../../styles/colors";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NewsList = ({ news }) => {
  const navigation = useNavigation();
  const newsList = [];
  for (let i = 0; i < news.length; i++) {
    newsList.push(
      <View key={i} style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SingleNewsScreen", news[i].href)}
          style={styles.newsBtn}
        >
          {news[i].label !== "" && (
            <View style={styles.newsBtnTopContainer}>
              <View style={styles.subTitleContainer}>
                {news[i].label === "Видео" && (
                  <Entypo
                    name="folder-video"
                    size={14}
                    color={Colors.grey}
                    style={{ marginRight: 5 }}
                  />
                )}
                <Text style={styles.subTitle}>{news[i].label}</Text>
              </View>
              <View style={{ width: "10%", alignItems: "flex-end" }}>
                <AntDesign name="right" size={12} color={Colors.smoothBlack} />
              </View>
            </View>
          )}

          <Text
            style={{
              ...styles.title,
              marginTop: news[i].label !== "" ? 15 : 0,
            }}
          >
            {news[i].title.replace(news[i].label, "")}
          </Text>
          <View
            style={{
              marginTop: news[i].date !== "" ? 15 : 0,
              alignSelf: "flex-end",
            }}
          >
            <Text style={styles.subTitle}>{news[i].date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ width: "100%", height: "85%", paddingBottom: 15 }}>
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        fadingEdgeLength={0}
      >
        {newsList}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  newsBtn: {
    width: "90%",
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 20,
  },
  newsBtnTopContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subTitleContainer: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,0,0,0.04)",
    borderRadius: 8,
    alignSelf: "flex-start",
    flexDirection: "row",
    maxWidth: "90%",
  },
  subTitle: {
    fontSize: 12,
    color: Colors.smoothBlack,
  },
  title: {
    fontSize: 15,
    color: Colors.smoothBlack,
    paddingLeft: 5,
    fontWeight: "500",
  },
});

export default NewsList;
