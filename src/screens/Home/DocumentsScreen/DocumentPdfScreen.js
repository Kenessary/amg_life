import * as React from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import PDFReader from "@valli_/rn-pdf-reader-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { WaveIndicator } from "react-native-indicators";
import { useContext } from "react";
import themeContext from "../../../cores/themeContext";
import qs from "qs";
import { Colors } from "../../../styles/colors";
import { useNavigation } from "@react-navigation/native";

export default function DocumentPdfScreen({ route }) {
  const navigation = useNavigation();
  const [key, setKey] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(route.params[0]);

  const openPdf = () => {
    setIsLoading(true);
    const data = qs.stringify({
      typepdf: route.params[2],
      guidpdf: route.params[1],
    });
    const config = {
      method: "post",
      url: "http://95.57.218.120/?index",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        const info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        setKey(info);
        console.log(info);
        if (info.length === 14) {
          Alert.alert("Нет подписанных данных", "", [
            {
              text: "OK",
              onPress: () => navigation.goBack(), // Navigates back on OK press
            },
          ]);
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const openPdfForOa = () => {
    setIsLoading(true);
    const data = qs.stringify({
      mail_id: route.params[1],
    });
    const config = {
      method: "post",
      url: "http://95.57.218.120/?index",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        const info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        setKey(info);
        console.log(info);
        if (info.length === 14) {
          Alert.alert("Нет подписанных данных", "", [
            {
              text: "OK",
              onPress: () => navigation.goBack(), // Navigates back on OK press
            },
          ]);
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  // console.log(key)

  useEffect(() => {
    route.params[0] === "edo" ? openPdf() : openPdfForOa();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.background,
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
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
