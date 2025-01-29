import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import i18n from "i18n-js";

import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";
import { Colors } from "../../../styles/colors";
import Mainoffice from "./components/Mainoffice";
import Division from "./components/Division";

export default function ContactsScreen() {
  const [visibleMain, setVisibleMain] = useState(true);
  const [visibleDivision, setVisibleDivision] = useState(true);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        height: "100%",
        alignItems: "center",
      }}
    >
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={i18n.t("contacts")}
        backButton={backButton()}
        height={"15%"}
      />
      <ScrollView style={{ width: "90%" }} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => setVisibleMain(!visibleMain)}
          style={styles.btn}
        >
          <Text style={styles.text}>Головной офис</Text>
          <Entypo
            name={visibleMain ? "chevron-down" : "chevron-up"}
            size={18}
            color="grey"
          />
        </TouchableOpacity>

        <Mainoffice visibleMain={visibleMain} />

        <TouchableOpacity
          onPress={() => setVisibleDivision(!visibleDivision)}
          style={styles.btn}
        >
          <Text style={styles.text}>Подразделения</Text>
          <Entypo
            name={visibleDivision ? "chevron-down" : "chevron-up"}
            size={18}
            color="grey"
          />
        </TouchableOpacity>

        <Division visibleDivision={visibleDivision} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  text: {
    color: Colors.smoothBlack,
    fontSize: 18,
    fontWeight: "600",
  },
});
