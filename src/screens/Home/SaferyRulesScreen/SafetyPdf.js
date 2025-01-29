import React from "react";
import { StyleSheet, View } from "react-native";
import PdfReader from "@valli_/rn-pdf-reader-js";

const SafetyPdf = () => {
  return (
    <PdfReader
      source={{ uri: "https://portmaster.kz/trainervideos/zolotprav.pdf" }}
      withScroll={true}
      withPinchZoom={true}
      // useGoogleReader={true}
    />
  );
};

const styles = StyleSheet.create({});

export default SafetyPdf;
