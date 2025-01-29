import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../../styles/colors";
import { FontAwesome } from "@expo/vector-icons";

const DepartmentListBtn = ({ deparmentTypes, data, setter, setFavourite }) => {
  //   console.log(data);
  return (
    <>
      {data.map((el) => (
        <TouchableOpacity
          onPress={() => setter(el)}
          key={Math.random()}
          style={{
            width: "100%",
            padding: 15,
            marginBottom: 10,
            borderRadius: 15,
            backgroundColor: Colors.white,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: Colors.smoothBlack,
              }}
            >
              {el.descr}
            </Text>

            {deparmentTypes === "favourite" && (
              <FavouriteItemBtn data={el} setFavourite={setFavourite} />
            )}
          </View>
          <View style={{ alignItems: "center", marginTop: 5, marginBottom: 5 }}>
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "#E4E4E4",
              }}
            />
          </View>
          <Text style={{ fontSize: 12, color: Colors.smoothBlack }}>
            {el.full}
          </Text>
        </TouchableOpacity>
      ))}
    </>
  );
};

const FavouriteItemBtn = ({ data, setFavourite }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setFavourite(data.id);
      }}
    >
      {data.favourite ? (
        <FontAwesome
          name="bookmark"
          size={22}
          color="#FFC806"
          style={{ marginRight: 8 }}
        />
      ) : (
        <FontAwesome
          name="bookmark-o"
          size={22}
          color="#A7A7A7"
          style={{ marginRight: 8 }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default DepartmentListBtn;
