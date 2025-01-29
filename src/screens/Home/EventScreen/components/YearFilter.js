import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { Colors } from "../../../../styles/colors";
import { getEvents } from "../api/api";

const YearFilter = ({
  visible,
  setVisible,
  choosenYear,
  choosenMonth,
  setYear,
  setMonth,
  setIsLoading,
  setEvent,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, i) => currentYear - i
  );

  const firstHalfMonths = Array.from({ length: 6 }, (_, i) => i + 1);
  const secondHalfMonths = Array.from({ length: 6 }, (_, i) => i + 7);

  const toggleBottomNavigationView = () => {
    setVisible(false);
  };

  const chooseYear = (year, month) => {
    getEvents(setIsLoading, setEvent, year.toString(), month.toString());
    setYear(year.toString());
    setMonth(month.toString());
    setVisible(false);
  };

  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={toggleBottomNavigationView}
      onBackdropPress={toggleBottomNavigationView}
    >
      <View
        style={[
          styles.bottomNavigationView,
          { backgroundColor: "#F7F8FA", zIndex: 30 },
        ]}
      >
        <Text
          style={{ fontSize: 16, fontWeight: "600", color: Colors.smoothBlack }}
        >
          Выберите год
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10, marginBottom: 15 }}
        >
          {years.map((year) => (
            <TouchableOpacity
              onPress={() => chooseYear(year, choosenMonth)}
              key={year}
              style={{
                ...styles.yearButton,
                backgroundColor:
                  year === Number(choosenYear) ? Colors.primary : Colors.white,
              }}
            >
              <Text
                style={{
                  ...styles.yearText,
                  color:
                    year === Number(choosenYear)
                      ? Colors.white
                      : Colors.smoothBlack,
                }}
              >
                {year}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text
          style={{ fontSize: 16, fontWeight: "600", color: Colors.smoothBlack }}
        >
          Выберите месяц
        </Text>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          {firstHalfMonths.map((month) => (
            <TouchableOpacity
              onPress={() => chooseYear(choosenYear, month)}
              key={month}
              style={{
                padding: 7,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.white,
                width: "15%",
                borderRadius: 8,
                marginTop: 10,
                backgroundColor:
                  month === Number(choosenMonth)
                    ? Colors.primary
                    : Colors.white,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color:
                    month === Number(choosenMonth)
                      ? Colors.white
                      : Colors.smoothBlack,
                }}
              >
                {month}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {secondHalfMonths.map((month) => (
            <TouchableOpacity
              onPress={() => chooseYear(choosenYear, month)}
              key={month}
              style={{
                padding: 7,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.white,
                width: "15%",
                borderRadius: 8,
                marginTop: 10,
                backgroundColor:
                  month === Number(choosenMonth)
                    ? Colors.primary
                    : Colors.white,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color:
                    month === Number(choosenMonth)
                      ? Colors.white
                      : Colors.smoothBlack,
                }}
              >
                {month}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomNavigationView: {
    width: "100%",
    padding: 25,
    paddingBottom: 35,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  yearButton: {
    width: 80, // Adjust width for better spacing
    marginHorizontal: 5, // Add space between buttons
    padding: 7,
    borderRadius: 8, // Rounded corners for a nicer UI
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, // Subtle shadow effect
    shadowRadius: 5,
    elevation: 3, // Elevation for Android
  },
  yearText: {
    fontSize: 16,
    fontWeight: "500", // Assuming you have a primary color
  },
});

export default YearFilter;
