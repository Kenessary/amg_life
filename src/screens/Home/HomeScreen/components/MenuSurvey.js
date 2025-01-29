import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  SafeAreaView,
  Linking,
  Platform,
  Image,
} from "react-native";
import { menuForSurvey, otvet } from "../responses/HomeApi";
import { useContext, useEffect, useState } from "react";
import { loadDarkMode } from "../../../loadDarkMode";
import themeContext from "../../../../cores/themeContext";
import LottieView from "lottie-react-native";
import { WaveIndicator } from "react-native-indicators";
import { Colors } from "../../../../styles/colors";

const windowWidth = Dimensions.get("window").width;

export function MenuSurvey({ menu, iin, opros, setOpros }) {
  const theme = useContext(themeContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  let [isLoading1, setIsLoading1] = useState(false);
  let [modalResult, setModalResult] = useState(false);
  let [otvetOpros, setOtvetOpros] = useState("");

  const foods = [];
  for (let i = 0; i < menu.length - 1; i++) {
    const eat = menu[i].replace('"', "").replace(" ", "");
    foods.push(
      <View
        style={{ height: 40, flexDirection: "row", marginBottom: 12 }}
        key={Math.random()}
      >
        <View style={{ marginLeft: 5, width: windowWidth / 1.3 }}>
          <Text
            style={{ color: Colors.smoothBlack, fontSize: 16 }}
            key={Math.random()}
          >
            {eat}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <Modal animationType="slide" transparent={false} visible={opros}>
      <SafeAreaView
        style={[styles.menuOpros, { backgroundColor: Colors.white }]}
      >
        <View style={styles.menuOprosHeader}>
          <View style={styles.menuOprosTitleCenter}>
            <Text style={[styles.menuOprosTitle, { color: "#D64D43" }]}>
              Меню на сегодня
            </Text>
          </View>
          {foods}
        </View>
        <Text style={{ fontSize: 20, color: Colors.smoothBlack }}>
          Будете сегодня обедать?
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.buttonYes, { backgroundColor: "#D64D43" }]}
            onPress={() =>
              otvet(iin, 1, setIsLoading1, setOtvetOpros, setModalResult)
            }
          >
            <Text style={[styles.buttonYesText, { color: Colors.white }]}>
              Да
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonNo, { borderColor: "#D64D43" }]}
            onPress={() =>
              otvet(iin, 2, setIsLoading1, setOtvetOpros, setModalResult)
            }
          >
            <Text style={[styles.buttonNoText, { color: Colors.smoothBlack }]}>
              Нет
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Modal animationType="fade" transparent={true} visible={modalResult}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: "white" }]}>
            {/* <FontAwesome name="check-circle" size={70} color="#1CA510" /> */}
            <LottieView
              source={require("../../../../../assets/animation/done.json")}
              autoPlay
              loop={false}
              speed={1.6}
              style={{ width: 150, height: 150 }}
            />
            <View style={styles.modalContainer}>
              <Text style={[styles.otvetOpros, { color: "#1CA510" }]}>
                {otvetOpros}
              </Text>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { borderColor: "#D64D43" },
                ]}
                onPress={() => setOpros(false)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={isLoading1}>
        <View style={styles.centeredView}>
          <View
            style={[styles.modalViewLoad, { backgroundColor: Colors.white }]}
          >
            <WaveIndicator key={Math.random()} color={Colors.primary} />
          </View>
        </View>
      </Modal>
    </Modal>
  );
}

const styles = StyleSheet.create({
  menuOpros: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menuOprosHeader: {
    width: windowWidth - 40,
    padding: 15,
    borderRadius: 15,
    paddingBottom: -10,
  },
  menuOprosTitleCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  menuOprosTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  buttonContainer: {
    width: windowWidth - 40,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonYes: {
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    height: 50,
    marginRight: 70,
    borderRadius: 15,
  },
  buttonYesText: {
    fontSize: 18,
    fontWeight: "500",
  },
  buttonNo: {
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    height: 50,
    borderRadius: 15,
    borderWidth: 3,
  },
  buttonNoText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#D64D43",
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
    borderWidth: 2,
  },
  modalView: {
    borderRadius: 20,
    width: windowWidth - 40,
    height: 300,
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
  modalContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  otvetOpros: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 10,
  },
  modalViewLoad: {
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
