import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Text, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import qs from "qs";

const ProductScan = () => {
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [guid, setGuid] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  console.log(guid);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setGuid(data);
    setLoading(true);
    const data1 = qs.stringify({
      mobileid: "5",
      uidtov: data,
    });
    const config = {
      method: "post",
      url: "http://95.57.218.120/?index",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: data1,
    };
    axios(config)
      .then(function (response) {
        let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");

        // console.log(parsed_info);

        setLoading(false);
        setScanned(false);
        let parsed_info = JSON.parse(info);
        if (parsed_info.naiden === 1) {
          setScanned(false);
          navigation.navigate("ProductResult", {
            parsed_info: parsed_info,
            guid: guid,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  // data:image/jpeg;base64,

  if (!permission) {
    return <Text>Разрешите использовать камеру чтобы сканировать QR код</Text>;
  }

  if (permission && !permission.granted) {
    return <Text>Нет доступа к камере</Text>;
  }

  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size={"large"} color={Colors.primary} />
          </View>
        </View>
      </Modal>

      <View
        style={{
          ...styles.barcodeContainer,
          //   display: visible ? "none" : "flex",
          opacity: loading ? 0.7 : 1,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: Colors.smoothBlack,
            marginBottom: 10,
          }}
        >
          AMG barcode
        </Text>
        <Text style={styles.barcodeTitle}>Сканируйте QR-код</Text>
        <View style={styles.barcodeBorder}>
          <View style={styles.barcodebox}>
            <CameraView
              barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 800, width: 400 }}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            ...styles.barcodeBackBtn,
            backgroundColor: "rgba(0,0,0,0.04)",
          }}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{ ...styles.barcodeBackBtnText, color: Colors.smoothBlack }}
          >
            Назад
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  centeredLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  barcodeContainer: {
    alignItems: "center",
  },
  barcodeTitle: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "500",
    color: "#4d4d4d",
  },
  barcodeBorder: {
    width: 313,
    height: 313,
    borderWidth: 12,
    borderColor: "#D64D43",
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  barcodebox: {
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
  },
  barcodeBackBtn: {
    width: 300,
    height: 50,
    backgroundColor: "#F5DBDA",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 15,
  },
  barcodeBackBtnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#D64D43",
  },
  inventoryTitle: {
    fontSize: 26,
    color: "black",
    fontWeight: "700",
    marginBottom: 30,
  },
  inventoryText: {
    fontSize: 20,
    color: "#4d4d4d",
    fontWeight: "700",
  },
  inventoryItem: {
    marginTop: 15,
  },
  inventoryLabel: {
    fontSize: 12,
    color: "#4d4d4d",
    fontWeight: "300",
    marginBottom: 3,
  },
  inventoryValue: {
    fontSize: 16,
    color: "#4d4d4d",
    fontWeight: "600",
  },
  resultMessageContainer: {
    backgroundColor: "#CDE9CF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 15,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 15,
  },
  resultMessageText: {
    fontSize: 16,
    color: "#31B43E",
    fontWeight: "700",
  },
  sendButton: {
    width: "95%",
    backgroundColor: "#D64D43",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 20,
    marginBottom: 15,
    marginTop: 20,
  },
  sendButtonText: {
    fontSize: 16,
    color: "white",
  },
  closeButton: {
    width: "95%",
    backgroundColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#4d4d4d",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ProductScan;
