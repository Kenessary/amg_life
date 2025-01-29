import * as React from "react";
import { Text, View } from "react-native";
import PDFReader from "@valli_/rn-pdf-reader-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { WaveIndicator } from "react-native-indicators";
import { useContext } from "react";
import themeContext from "../../../../cores/themeContext";
import { Skeleton } from "@rneui/base";

export default function EventPdfScreen({ route }) {
  const [key, setKey] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useContext(themeContext);

  // console.log(route.params)

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load the user's preference from AsyncStorage
    loadDarkModePreference();
  }, []);

  const loadDarkModePreference = async () => {
    try {
      const preference = await AsyncStorage.getItem("darkMode");
      if (preference !== null) {
        setIsDarkMode(JSON.parse(preference));
      }
    } catch (error) {
      console.log("Error loading dark mode preference:", error);
    }
  };

  // console.log(globalThis.link)
  //--------- PDF ДОКУМЕНТ --------- //
  useEffect(() => {
    setIsLoading(true);
    const config = {
      method: "get",
      url: `http://95.57.218.120/?apitest.helloAPIWithParams55={"addr":"${route.params}"}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    axios(config)
      .then(function (responsed) {
        const info = responsed.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        const info1 = JSON.parse(info);
        const info2 = JSON.parse(info1.response);
        // console.log(info2)
        setKey(info2);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Skeleton
        style={{
          backgroundColor: "rgba(0,0,0,0.04)",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        animation="pulse"
        skeletonStyle={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
      >
        <Text>pdf</Text>
      </Skeleton>
    );
  }

  const link = `data:application/pdf;base64,${key}`;

  return (
    <PDFReader
      source={{ base64: link }}
      withScroll={true}
      withPinchZoom={true}
    />
  );
}
