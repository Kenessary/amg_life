import { Skeleton } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

export const BirthdayLoading = () => {
  const skeleteonLength = 10;
  const WaveSkeleton = [];
  for (let i = 0; i < skeleteonLength; i++) {
    WaveSkeleton.push(
      <Skeleton
        key={i}
        style={{
          backgroundColor: "rgba(0,0,0,0.04)",
          height: 50,
          width: "90%",
          borderRadius: 15,
          marginTop: 10,
        }}
        animation="pulse"
        skeletonStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      />
    );
  }
  return (
    <View style={{ width: "100%", alignItems: "center" }}>{WaveSkeleton}</View>
  );
};

export default BirthdayLoading;
