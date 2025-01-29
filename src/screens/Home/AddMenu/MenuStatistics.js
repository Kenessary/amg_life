import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { WaveIndicator } from "react-native-indicators";
import moment from "moment";

import { Colors } from "../../../styles/colors";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";

export default function MenuStatistics() {
  const date = moment().format(`DD.MM.YYYY`);
  const dateClock = moment().format(`hh:mm:ss`);

  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const menuStats = () => {
    setIsLoading(true);
    const config = {
      method: "get",
      url: `http://95.57.218.120//?apitest.helloAPIWithParams13={"iin":" "}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        let parse_first = JSON.parse(info);
        let parse_second = JSON.parse(parse_first.response);
        setStats(parse_second);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    menuStats();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.white,
        }}
      >
        <WaveIndicator key={Math.random()} color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ height: "100%", backgroundColor: Colors.background }}>
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={"Статистика опроса"}
        backButton={backButton()}
        height={"15%"}
      />
      <View style={styles.dateContainer}>
        <Text style={styles.title}>Результаты на дату</Text>
        <Text style={{ ...styles.title, marginVertical: 5 }}>{date}</Text>
        <View style={styles.divider} />
        <Text style={{ ...styles.title, marginTop: 5 }}>{dateClock}</Text>
      </View>

      <View style={{ alignItems: "center", marginTop: 10 }}>
        <View style={styles.topStat}>
          <Cards
            color={"#41B21A"}
            title={"Да"}
            stats={stats.da}
            width={"32%"}
          />
          <Cards
            color={"#D64D43"}
            title={"Нет"}
            stats={stats.net}
            width={"32%"}
          />
          <Cards
            color={"grey"}
            title={"Нет ответа"}
            stats={stats.ne_otvetili}
            width={"32%"}
          />
        </View>

        <View style={styles.bottomStat}>
          <Cards
            color={"#2E89DC"}
            title={"Всего опрошено"}
            stats={stats.vsego_opros}
            width={"100%"}
          />
        </View>
      </View>
    </View>
  );
}

const Cards = ({ color, title, stats, width }) => {
  return (
    <View style={{ width: width }}>
      <View style={{ ...styles.top, backgroundColor: color }}>
        <Text style={styles.topText}>{title}</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.bottomText}>{stats}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    alignItems: "center",
    marginTop: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.smoothBlack,
  },
  divider: {
    height: 1,
    width: 130,
    backgroundColor: Colors.smoothBlack,
  },
  topStat: {
    width: "90%",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  top: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  topText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  bottom: {
    width: "100%",
    height: 70,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bottomText: {
    color: "#4d4d4d",
    fontSize: 28,
    fontWeight: "700",
  },
  bottomStat: {
    width: "90%",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
