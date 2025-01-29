import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Input from "../../../components/Input";
import { WaveIndicator } from "react-native-indicators";
import axios from "axios";
import qs from "qs";
import moment from "moment";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../../styles/colors";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function PushSendScreen() {
  const navigation = useNavigation();
  // Declare all hooks here
  const [inputs, setInputs] = useState({ pushtext: "", type: "" });
  const [disabled, setDisabled] = useState(true);
  const [pushes, setPushes] = useState("");
  const [pushForApparat, setPushForApparat] = useState("");
  const [pushesIin, setPushesIin] = useState("");
  const [pushFull, setPushFull] = useState("");
  const [sended, setSended] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  // Move useContext to the top if necessary
  // const someContext = useContext(SomeContext); (if applicable)

  const getData = () => {
    try {
      AsyncStorage.getItem("sendedPushes").then((value) => {
        if (value != null) {
          setSended(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []); // Add dependency to avoid endless rerendering

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const date = moment().format(`YYYY-MM-DD HH:mm:ss`);

  const subArrayLength = 100;
  const numSubArrays = Math.ceil(pushes.length / subArrayLength);
  const subArrays = [];

  for (let i = 0; i < numSubArrays; i++) {
    subArrays.push(pushes.slice(i * subArrayLength, (i + 1) * subArrayLength));
  }

  const subArrayLengthIin = 100;
  const numSubArraysIin = Math.ceil(pushesIin.length / subArrayLengthIin);
  const subArraysIin = [];

  for (let i = 0; i < numSubArraysIin; i++) {
    subArraysIin.push(
      pushesIin.slice(i * subArrayLengthIin, (i + 1) * subArrayLengthIin)
    );
  }

  const subArrayLengthForApparat = 100;
  const numSubArraysForApparat = Math.ceil(
    pushForApparat.length / subArrayLengthForApparat
  );
  const subArraysForApparat = [];

  for (let i = 0; i < numSubArraysForApparat; i++) {
    subArraysForApparat.push(
      pushForApparat.slice(
        i * subArrayLengthForApparat,
        (i + 1) * subArrayLengthForApparat
      )
    );
  }

  async function sendPushNotification1() {
    for (let i = 0; i < subArrays.length; i++) {
      const message = {
        to: subArrays[i],
        sound: "default",
        title: "AMG Life",
        body: inputs.pushtext,
      };

      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }
  }

  async function sendPushForApp() {
    for (let i = 0; i < subArraysIin.length; i++) {
      for (let j = 0; j < subArraysIin[i].length; j++) {
        setIsLoading1(true);
        const data = qs.stringify({
          pushhistoryiin: subArraysIin[i][j],
          pushhistorydate: date,
          pushhistorytitle: "AMG-Life",
          pushhistorybody: `${inputs.pushtext}`,
          pushhistorybadge: 0,
          pushhistoryopened: 0,
          pushhistorytype: `${inputs.type}`,
        });
        const config = {
          method: "post",
          url: "http://95.57.218.120/?index",
          headers: {
            Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };
        axios(config)
          .then(async function (response) {
            let user = response.data
              .replace(/<[^>]*>/g, "")
              .replace(/-->/g, "");
            let parsed = JSON.parse(user);

            if (
              subArraysIin[i][j] ===
              subArraysIin[subArraysIin.length - 1][
                subArraysIin[subArraysIin.length - 1].length - 1
              ]
            ) {
              sendPushNotificationForApparat();
              setIsLoading1(false);
            }
          })
          .catch(function (error) {
            console.log(error);
            setIsLoading1(false);
          });
      }
    }
  }

  useEffect(() => {
    setIsLoading(true);
    const data = qs.stringify({
      collectpush: "1",
    });
    const config = {
      method: "post",
      url: "http://95.57.218.120/?index",
      headers: {
        Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(async function (response) {
        let user = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        let parsed = JSON.parse(user);
        let parsedList = parsed.list;
        let filteredData = parsedList.filter((item) => item.apparat === "1");

        let newArrayApparat = filteredData.map((list) => {
          return list.pushtoken;
        });

        let newArray = parsedList.map((list) => {
          return list.pushtoken;
        });
        let newArrayIin = filteredData.map((list) => {
          return list.iin;
        });

        let newArrayFull = parsedList.map((list) => {
          return {
            pushtoken: list.pushtoken,
            fio: list.fio,
            date: list.date,
            apparat: list.apparat,
          };
        });

        setPushFull(newArrayFull);
        setPushForApparat(newArrayApparat);
        setPushes(newArray);
        setPushesIin(newArrayIin);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (inputs.pushtext !== "" && inputs.type !== "") {
      if (inputs.type === "menu" || inputs.type === "message") {
        setDisabled(false);
      }
    } else {
      setDisabled(true);
    }
  }, [inputs.pushtext, inputs.type]); // Add dependencies to avoid missing hook issue

  if (subArrays.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.white,
        }}
      >
        <WaveIndicator key={Math.random()} color={Colors.primary} />
      </View>
    );
  }

  const backButton = () => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.goBack()}
          style={{ paddingRight: 10 }}
        >
          <AntDesign name="left" size={24} color={Colors.smoothBlack} />
        </TouchableOpacity>
      </>
    );
  };

  if (isLoading1) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.white,
        }}
      >
        <WaveIndicator key={Math.random()} color={Colors.primary} />
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: Colors.background,
        height: "100%",
        alignItems: "center",
      }}
    >
      <TopBarNavigation
        isHome={false}
        isDepartment={false}
        title={"Отправка уведомления"}
        backButton={backButton()}
        height={"15%"}
      />

      <View
        style={{
          width: "90%",
          padding: 15,
          backgroundColor: Colors.white,
          borderRadius: 15,
          marginTop: 15,
        }}
      >
        <Input
          label="Текст для уведомления"
          placeholder="Текст"
          onChangeText={(text) => handleOnChange(text, "pushtext")}
        />
        <Input
          label="Тип сообщения (menu или message)"
          placeholder="Тип"
          onChangeText={(text) => handleOnChange(text, "type")}
        />
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          disabled={disabled}
          style={{
            padding: 15,
            backgroundColor: disabled === true ? "grey" : "#D64D43",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            width: "90%",
          }}
          onPress={() => sendPushNotification1()}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
            Уведомления общий
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        disabled={disabled}
        style={{
          width: "90%",
          marginTop: 10,
          padding: 15,
          backgroundColor: disabled === true ? "grey" : "#D64D43",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
        }}
        onPress={() => sendPushForApp()}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
          Уведомления для аппрата
        </Text>
      </TouchableOpacity>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
          width: "100%",
        }}
      >
        <View
          style={{
            width: "90%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 15,
          }}
        >
          <Text style={{ fontSize: 16, color: Colors.smoothBlack }}>
            Количество пользователей: {pushes.length}
          </Text>
        </View>
      </View>
    </View>
  );
}
