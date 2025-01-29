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
import { multiLanguage } from "../../../language";
import React, { useContext, useEffect, useState } from "react";
import i18n from "i18n-js";
import { ru, ch, kz } from "../../../../languages/localizations";
import { Feather } from "@expo/vector-icons";
import { openAppStore, openGooglePlayStore } from "../responses/HomeApi";

import { Colors } from "../../../../styles/colors";

const windowWidth = Dimensions.get("window").width;
export function VersionUpdateModal({ modalUpdate }) {
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");

  multiLanguage(locale, setLang);

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  return (
    <Modal animationType="fade" transparent={false} visible={modalUpdate}>
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "flex-end",
          backgroundColor: Colors.white,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 60 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              fontWeight: "600",
              color: Colors.smoothBlack,
            }}
          >
            {i18n.t("updateAlert")}
          </Text>

          <TouchableOpacity
            onPress={() =>
              Platform.OS === "ios" ? openAppStore() : openGooglePlayStore()
            }
            style={{
              width: windowWidth - 80,
              height: 50,
              backgroundColor: "#D64D43",
              marginTop: 20,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Feather
              name="download"
              size={20}
              color={Colors.white}
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                color: Colors.white,
                fontSize: 20,
                fontWeight: "500",
              }}
            >
              {i18n.t("updateApp")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("http://www.cnpc-amg.kz/?p=ann_6")}
            style={{
              width: windowWidth - 80,
              height: 50,
              borderColor: "grey",
              borderWidth: 0.6,
              marginTop: 20,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Image
              source={require("../../../../../assets/huawei-logo-transparent-2.png")}
              style={{ width: 50, height: 50 }}
              // style={styles.bottomImage}
            />
            <Text
              style={{
                color: Colors.smoothBlack,
                fontSize: 18,
                fontWeight: "500",
                marginLeft: -2,
              }}
            >
              Huawei
            </Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require("../../../../../assets/mobileupdate.jpg")}
          style={{ width: "100%", height: "50%" }}
          // style={styles.bottomImage}
        />
      </View>
    </Modal>
  );
}
