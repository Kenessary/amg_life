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
import { getAllNews } from "../api/api";

const YearFilter = ({
  visible,
  setVisible,
  choosenYear,
  setYear,
  setIsLoading,
  newData,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, i) => currentYear - i
  );

  const toggleBottomNavigationView = () => {
    setVisible(false);
  };

  const chooseYear = (year) => {
    getAllNews(setIsLoading, newData, year.toString());
    setYear(year.toString());
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
          style={{ marginTop: 15, marginBottom: 15 }}
        >
          {years.map((year) => (
            <TouchableOpacity
              onPress={() => chooseYear(year)}
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
