import React from "react";
import { Dimensions, ScrollView, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../../../styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import DepartmentListBtn from "./DepartmentListBtn";
const windowWidth = Dimensions.get("window").width;

const DepartmentBarContainer = ({
  showed,
  showFavDep,
  favoriteItems,
  sortedData,
  setter,
  setFavourite,
}) => {
  return (
    <View
      style={{
        alignItems: "center",
        display: !showed ? "flex" : "none",
        height: "76%",
      }}
    >
      <View style={{ marginTop: 5, width: windowWidth, alignItems: "center" }}>
        <ScrollView style={{ width: "90%" }}>
          {showFavDep ? (
            favoriteItems.length === 0 ? (
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <FontAwesome
                  name="bookmark"
                  size={100}
                  color={"#E4E4E4"}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    marginTop: 10,
                    color: Colors.smoothBlack,
                  }}
                >
                  Список избранного пуст
                </Text>
              </View>
            ) : (
              <DepartmentListBtn
                deparmentTypes={"favourite"}
                data={favoriteItems}
                setter={setter}
                setFavourite={setFavourite}
              />
            )
          ) : (
            <DepartmentListBtn
              deparmentTypes={"all"}
              data={sortedData}
              setter={setter}
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DepartmentBarContainer;
