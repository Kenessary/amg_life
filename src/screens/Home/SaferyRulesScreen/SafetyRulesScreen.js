import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../styles/colors";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";
import i18n from "i18n-js";
import { TouchableOpacity } from "react-native";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ImageViewer from "react-native-image-zoom-viewer";

const SafetyRulesScreen = () => {
  const [visible, setVisible] = useState(false);
  const images = [
    {
      url: "",
      props: { source: require("../../../../assets/Amgrules.png") },
    },
  ];
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: Colors.background,
      }}
    >
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={i18n.t("goldenRules")}
        backButton={backButton()}
        height={"15%"}
      />
      <View style={{ width: "100%", height: "70%", alignItems: "center" }}>
        <TouchableOpacity
          style={{ width: "100%", height: "100%" }}
          onPress={() => setVisible(true)}
        >
          <Image
            source={require("../../../../assets/Amgrules.png")}
            style={[styles.imageContainer]}
            resizeMode="contain"
          />
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: "grey",
              borderRadius: 50,
              position: "absolute",
              bottom: 40,
              right: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="zoom-out-map" size={24} color="white" />
          </View>
        </TouchableOpacity>

        <Modal style={{ width: "100%" }} visible={visible} transparent={true}>
          <ImageViewer style={styles.imageContainer} imageUrls={images} />

          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              width: "100%",
              height: 80,
              marginTop: 0,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.primary,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: Colors.white,
                fontWeight: "600",
              }}
            >
              Закрыт
            </Text>
          </TouchableOpacity>
        </Modal>

        <View style={{ width: "100%", height: "15%", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SafetyPdf")}
            style={{
              width: "95%",
              padding: 15,
              borderRadius: 15,
              backgroundColor: Colors.primary,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign name="pdffile1" size={25} color="white" />
            <Text
              style={{
                fontSize: 14,
                color: Colors.white,
                fontWeight: "600",
                marginLeft: 10,
              }}
            >
              Положение о золотых правилах безопасности
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default SafetyRulesScreen;
