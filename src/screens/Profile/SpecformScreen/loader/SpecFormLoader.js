import { Skeleton } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

const SpecFormLoader = ({ height }) => {
  const skeleteonLength = 10;
  const WaveSkeleton = [];
  for (let i = 0; i < skeleteonLength; i++) {
    WaveSkeleton.push(
      <Skeleton
        key={i}
        style={{
          backgroundColor: "rgba(0,0,0,0.04)",
          height: height,
          width: "90%",
          borderRadius: 20,
          marginBottom: 8,
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

export default SpecFormLoader;
