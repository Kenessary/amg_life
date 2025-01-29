import { Text, View, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { WaveIndicator } from "react-native-indicators";

import { Colors } from "../../../styles/colors";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";

export default function MenuHistory() {
  const [historyDate, setHistoryDate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = () => {
    setIsLoading(true);
    const config = {
      method: "get",
      url: `http://95.57.218.120//?apitest.helloAPI7={}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        let parse_first = JSON.parse(info);
        let parse_second = JSON.parse(parse_first.response);
        let parse_third = parse_second.status;
        let parse_fourth = JSON.stringify(parse_third).split("; 2");
        setHistoryDate(parse_fourth);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    history();
  }, []);

  const historymenu = [];

  for (let i = 0; i < historyDate.length; i++) {
    historymenu.push(
      <View key={i} style={styles.menu}>
        <Text style={styles.menuText}>
          {i !== 0
            ? "2" + historyDate[i].replace(`" `, "")
            : historyDate[i].replace(`" `, "")}
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <WaveIndicator key={Math.random()} color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={"История меню"}
        backButton={backButton()}
        height={"15%"}
      />
      <ScrollView showsVerticalScrollIndicator={true} style={styles.scrollView}>
        <View style={{ width: "100%", alignItems: "center" }}>
          {historymenu}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.background,
    height: "100%",
    width: "100%",
  },
  scrollView: {
    height: "85%",
    marginTop: 10,
    width: "100%",
  },
  menu: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    backgroundColor: Colors.white,
    marginTop: 20,
    padding: 10,
    borderRadius: 15,
  },
  menuText: {
    fontSize: 16,
    color: Colors.smoothBlack,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});
