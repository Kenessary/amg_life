import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../../styles/colors";
import LottieView from "lottie-react-native";
import i18n from "i18n-js";
import { Dimensions } from "react-native";
import { Skeleton } from "@rneui/themed";
import { FoodMenuLoader } from "../loader/FoodMenuLoader";
const windowWidth = Dimensions.get("window").width;

const FoodMenu = ({ balance, menu, lang }) => {
  const foods = [];

  if (menu.length !== 1) {
    for (let i = 0; i < menu.length - 2; i++) {
      const eat = menu[i].replace('"', "").replace(" ", "");

      const processedData = eat
        .trim()
        .split("\n")
        .map((line) => {
          const [title, content] = line.split(":").map((part) => part.trim());
          return { title, content };
        });

      foods.push(
        <Menu
          key={Math.random()}
          title={processedData[0].title}
          content={processedData[0].content}
        />
      );
    }
  } else {
    const noneMenu = JSON.parse(menu);
    foods.push(
      <NoneMenu key={Math.random()} noneMenu={noneMenu} lang={lang} />
    );
  }

  return (
    <View
      style={[
        styles.foodmenu,
        { backgroundColor: balance.length !== 0 ? Colors.white : "" },
      ]}
    >
      {balance.length !== 0 ? (
        <View style={styles.foods}>{foods}</View>
      ) : (
        <FoodMenuLoader />
      )}
    </View>
  );
};

const Menu = ({ title, content }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.contentSubContainer}>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      </View>
    </View>
  );
};

const NoneMenu = ({ noneMenu, lang }) => {
  return (
    <View style={styles.noneContainer}>
      <View style={styles.noneSubContainer}>
        <LottieView
          source={require("../../../../../assets/animation/137365-food.json")}
          autoPlay
          loop={true}
          speed={1.3}
          style={{ width: 160, height: 160 }}
        />

        <View style={{ width: windowWidth - 120, marginTop: 15 }}>
          <Text style={styles.noneText}>
            {lang === "kz" || lang === "ch" ? i18n.t("foodwarning") : noneMenu}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.03)",
    paddingTop: 5,
    paddingBottom: 0,
    paddingHorizontal: 10,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    width: 150,
  },
  titleText: {
    color: Colors.smoothBlack,
    fontSize: 14,
    fontWeight: "600",
  },
  contentContainer: {
    backgroundColor: "rgba(0,0,0,0.03)",
    padding: 5,
    borderRadius: 15,
    borderTopLeftRadius: 0,
  },
  contentSubContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
  },
  contentText: {
    color: Colors.smoothBlack,
    fontSize: 14,
  },
  noneContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  noneSubContainer: {
    width: "auto",
    height: "auto",
    alignItems: "center",
    backgroundColor: "#FFE6D9",
    padding: 15,
    borderRadius: 50,
  },
  noneText: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.primary,
    fontWeight: "bold",
    lineHeight: 27,
  },
  foodmenu: {
    width: "100%",
    height: "100%",
    marginTop: 40,
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  foods: {
    width: "85%",
    marginTop: 25,
  },
});

export default FoodMenu;
