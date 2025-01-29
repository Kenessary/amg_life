import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, Text, View } from "react-native";

import { WaveIndicator } from "react-native-indicators";
import axios from "axios";
import { color } from "@rneui/base";
import { AuthContext } from "../../../context/AuthContext";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";

const InventarizationList = ({}) => {
  const { iin } = useContext(AuthContext);
  const [list, setList] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //   console.log(list[0]);

  useEffect(() => {
    setIsLoading(true);
    const config = {
      method: "post",
      url: `http://95.57.218.120/?apitest.helloAPIWithParams777={"iin":"${iin}"}`,
      headers: {},
    };
    axios(config)
      .then(async function (response) {
        let user = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        let parsed = JSON.parse(user);
        setList(JSON.parse(parsed.response));
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <WaveIndicator key={Math.random()} color="#D64D43" />
      </View>
    );
  }

  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: "100%" }}
    >
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        height={"15%"}
        backButton={backButton()}
        title={"Cписок документов"}
      />
      <View style={{ width: "90%", marginTop: 10 }}>
        {list === "Нету данных за сегодняшний день!" ? (
          <></>
        ) : (
          <Text
            style={{
              color: "#4d4d4d",
              fontWeight: "600",
              fontSize: 18,
              marginLeft: 10,
            }}
          >
            Сегодня
          </Text>
        )}
      </View>
      <ScrollView style={{ flex: 1, width: "90%" }}>
        {list === "Нету данных за сегодняшний день!" ? (
          <Text
            style={{
              color: "#4d4d4d",
              fontWeight: "600",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Нету данных за сегодняшний день!
          </Text>
        ) : (
          list &&
          list.map((el) => (
            <View
              key={Math.random()}
              style={{
                width: "100%",
                padding: 15,
                backgroundColor: "white",
                borderRadius: 15,
                marginTop: 15,
              }}
            >
              <Text
                style={{ color: "#4d4d4d", fontSize: 20, fontWeight: "600" }}
              >
                {el.ComplectName}
              </Text>
              <Text
                style={{
                  color: "#4d4d4d",
                  fontSize: 16,
                  fontWeight: "400",
                  marginTop: 10,
                }}
              >
                {el.ComplectCode}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default InventarizationList;
