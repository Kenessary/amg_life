import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import CameraPhone from "./components/Camera";
import { CameraView, useCameraPermissions } from "expo-camera";
import { WaveIndicator } from "react-native-indicators";
import { MaterialIcons } from "@expo/vector-icons";
import base64 from "react-native-base64";
import ModalForEdo from "./components/ModalForEdo";
import { Colors } from "../../../styles/colors";
import { qrPodpis, qrscan, qrscanTest } from "./api/api";

export default function DocumentScreen({ navigation }) {
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");
  const [qrData, setQrData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [vhodResult, setVhodResult] = useState("");
  const { iin, logout } = useContext(AuthContext);
  const [modalErrorp, setModalErrorp] = useState(false);

  const [podpisInfo, setPodpisInfo] = useState("");
  const [podpisModal, setPodpisModal] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    if (vhodResult !== "") {
      setTimeout(() => {
        setModal(true);
      }, 500);
    }
  });

  useEffect(() => {
    if (podpisInfo !== "") {
      setPodpisModal(true);
    }
  });

  const handleBarCodeScaned = ({ type, data }) => {
    try {
      setScanned(true);
      setText(data);
      const a = base64.decode(data.replace(/\s/g, ""));
      const parsedA = JSON.parse(a);
      console.log(parsedA);
      if (parsedA.test === "Тестовая") {
        qrscanTest(
          iin,
          parsedA.guid,
          parsedA.nowdate,
          parsedA.ipaddress,
          setVhodResult
        );
      }
      if (parsedA.test === "Проверка" && parsedA.vhod === "1") {
        qrscan(
          iin,
          parsedA.guid,
          parsedA.nowdate,
          parsedA.ipaddress,
          setIsLoading,
          setVhodResult
        );
      }
      if (parsedA.test === "Проверка" && parsedA.vhod === "0") {
        qrPodpis(parsedA.namemd, parsedA.uid, parsedA.iin, iin, setPodpisInfo);
      }
      setQrData(parsedA);
    } catch (er) {
      if (er) {
        setModalErrorp(true);
      }
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <WaveIndicator key={Math.random()} color={Colors.primary} />
      </View>
    );
  }

  if (!permission) {
    return <Text>Разрешите использовать камеру чтобы сканировать QR код</Text>;
  }

  if (permission && !permission.granted) {
    return <Text>Нет доступа к камере</Text>;
  }

  const podpisBtn = () => {
    setPodpisInfo("");
    setPodpisModal(false);
    navigation.goBack();
    setScanned(false);
  };

  const vhodResultBtn = () => {
    setVhodResult("");
    setModal(false);
    navigation.goBack();
    setScanned(false);
  };

  const errorBtn = () => {
    navigation.goBack();
    setScanned(false);
    setModalErrorp(false);
  };

  return (
    <View style={styles.container}>
      {qrData.vhod === "2" ? (
        <CameraPhone
          navigation={navigation}
          qrData={qrData}
          setScanned={setScanned}
          setQrData={setQrData}
        />
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>Сканируйте QR-код</Text>
          <View style={styles.qrContainer}>
            <View style={styles.barcodebox}>
              <CameraView
                barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScaned}
                style={{ height: 800, width: 400 }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backBtnText}>Назад</Text>
          </TouchableOpacity>

          <ModalForEdo
            modalVisible={modal}
            icon={<FontAwesome name="check-circle" size={70} color="#1CA510" />}
            color={"#1CA510"}
            title={vhodResult.message}
            btnText={"OK"}
            onPress={vhodResultBtn}
          />

          <ModalForEdo
            modalVisible={podpisModal}
            icon={<FontAwesome name="check-circle" size={70} color="#1CA510" />}
            color={"#1CA510"}
            title={podpisInfo.status}
            btnText={"OK"}
            onPress={podpisBtn}
          />

          <ModalForEdo
            modalVisible={modalErrorp}
            icon={
              <MaterialIcons name="error" size={70} color={Colors.primary} />
            }
            color={Colors.primary}
            title="QR-код не распознан"
            btnText="Сканировать повторно"
            onPress={errorBtn}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: Colors.white,
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
  title: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "500",
    color: Colors.smoothBlack,
  },
  qrContainer: {
    width: 313,
    height: 313,
    borderWidth: 12,
    borderColor: Colors.primary,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  backBtn: {
    width: 300,
    height: 50,
    backgroundColor: "rgba(0,0,0,0.04)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 15,
  },
  backBtnText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.smoothBlack,
  },
});
