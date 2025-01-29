import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
  Image,
  Pressable,
  Modal,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import ButtonCamera from "./ButtonCamers";
import { FontAwesome } from "@expo/vector-icons";
import { WaveIndicator } from "react-native-indicators";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import qs from "qs";

export default function CameraPhone({
  navigation,
  qrData,
  setScanned,
  setQrData,
}) {
  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState("off");
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [modalPicture, setModalPicture] = useState(false);
  const [takePicturess, setTakePictures] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const cameraRef = useRef(null);

  //   console.log(takePicturess.message)

  const { iin } = useContext(AuthContext);
  useEffect(() => {
    if (takePicturess !== "") {
      setModalPicture(true);
    }
  });

  const openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      RNAndroidOpenSettings.appDetailsSettings();
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.2, base64: true, doNotSave: true };
        const data = await cameraRef.current.takePictureAsync(options);
        setImageBase64(data.base64);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const takePictures = (
    docfilephoto,
    docavtoriinphoto,
    docmobileiinphoto,
    docguidphoto
  ) => {
    setIsLoading(true);

    const data = qs.stringify({
      docfilephoto: docfilephoto,
      docavtoriinphoto: docavtoriinphoto,
      docmobileiinphoto: docmobileiinphoto,
      docguidphoto: docguidphoto,
    });
    const config = {
      method: "post",
      url: "http://95.57.218.120/?index",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: data,
    };
    axios(config)
      .then(function (response) {
        let user = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        let parsed_user = JSON.parse(user);
        console.log(parsed_user);
        setTakePictures(parsed_user);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <Text>Нет доступа к камере</Text>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>Нет доступа к камере</Text>
        <Button title={"Разрешить доступ к камере"} onPress={openAppSettings} />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {!image ? (
        <CameraView
          style={styles.camera}
          ref={cameraRef}
          facing={facing}
          flash={flash}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
              marginTop: 20,
            }}
          >
            <ButtonCamera
              icon={"chevron-left"}
              color="#f1f1f1"
              onPress={() => {
                navigation.goBack();
                // setScanned(false);
                // setQrData("");
              }}
            />
            <ButtonCamera
              icon={"flash"}
              color={flash === "off" ? "#f1f1f1" : "#E9B01E"}
              onPress={() => {
                setFlash(flash === "off" ? "on" : "off");
              }}
            />
          </View>
        </CameraView>
      ) : (
        <Image source={{ uri: image }} style={{ flex: 1 }} />
      )}

      <View>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <ButtonCamera
              title={"Переснять"}
              icon="retweet"
              onPress={() => setImage(null)}
            />
            <ButtonCamera
              title={"Отправить"}
              icon="paper-plane"
              onPress={() => {
                takePictures(imageBase64, qrData.iin, iin, qrData.uid);
              }}
            />
          </View>
        ) : (
          <ButtonCamera
            title={"Сфотографировать"}
            icon="camera"
            onPress={takePicture}
          />
        )}
      </View>

      <Modal animationType="fade" transparent={true} visible={modalPicture}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FontAwesome name="check-circle" size={70} color="#1CA510" />
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 10,
                  marginTop: 10,
                  color: "#1CA510",
                }}
              >
                {takePicturess.message}
              </Text>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setTakePictures("");
                  setModalPicture(false);
                  navigation.goBack();
                  setScanned(false);
                  setQrData("");
                  setImage(null);
                }}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={isLoading}>
        <View style={styles.centeredView}>
          <View style={styles.modalViewLoad}>
            <WaveIndicator key={Math.random()} color="#D64D43" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    paddingBottom: 20,
    width: "100%",
    height: "100%",
  },
  camera: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 4,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "white",
    borderColor: "#D64D43",
    borderWidth: 2,
  },
  modalViewLoad: {
    backgroundColor: "white",
    borderRadius: 20,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 4,
  },
});
