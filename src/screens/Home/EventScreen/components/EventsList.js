import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const EventsList = ({ event }) => {
  const navigation = useNavigation();
  const events = [];
  for (let i = 0; i < event.length; i++) {
    const event_date = new Date(event[i].data_vv);
    const formattedDate = `${String(event_date.getDate()).padStart(
      2,
      "0"
    )}.${String(event_date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${event_date.getFullYear()}`;
    events.push(
      <TouchableOpacity
        key={i}
        style={{
          marginBottom: 15,
          padding: 15,
          backgroundColor: Colors.white,
          borderRadius: 20,
          width: "90%",
        }}
        onPress={() => {
          navigation.navigate("EventPdfScreen", event[i].ssilka);
        }}
      >
        <Text
          style={{ fontSize: 15, fontWeight: "500", color: Colors.smoothBlack }}
        >
          {event[i].nazvanie}
        </Text>
        <View
          style={{
            width: "100%",
            marginTop: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: Colors.smoothBlack,
            }}
          >
            {" "}
            {formattedDate}
          </Text>
          <AntDesign name="right" size={12} color={Colors.smoothBlack} />
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <ScrollView
      style={{ width: "100%", height: "85%", marginTop: 10 }}
      fadingEdgeLength={0}
    >
      <View style={{ alignItems: "center" }}>
        {events}
        <View style={{ marginBottom: 80 }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default EventsList;
