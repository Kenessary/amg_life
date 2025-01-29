// import React, { useContext, useEffect, useRef, useState } from "react";
// import "localstorage-polyfill";
// import { Provider } from "react-native-paper";
// import { theme } from "./src/cores/theme";
// import { AuthContext, AuthProvider } from "./src/context/AuthContext";
// import Navigation from "./src/stack/Navigation";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";

// import NetInfo from "@react-native-community/netinfo";
// import { Alert, Platform } from "react-native";
// import { StatusBar } from "expo-status-bar";

// export default function App({ navigation }) {
//   const [notification, setNotification] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [historyNotification, setHistoryNotification] = useState("");
//   const [hNotification, setHNotification] = useState("");
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   async function registerForPushNotificationsAsync() {
//     let token;
//     if (Device.isDevice) {
//       const { status: existingStatus } =
//         await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;

//       if (finalStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       token = (await Notifications.getExpoPushTokenAsync()).data;
//     } else {
//       alert("Must use physical device for Push Notifications");
//     }

//     if (Platform.OS === "android") {
//       Notifications.setNotificationChannelAsync("default", {
//         name: "default",
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: "#FF231F7C",
//       });
//     }

//     return token;
//   }

//   useEffect(() => {
//     registerForPushNotificationsAsync().then(
//       (token) => (globalThis.asexpo = token)
//     );

//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         setNotification(notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         const { data } = response.notification;
//       });

//     return () => {
//       Notifications.removeNotificationSubscription(
//         notificationListener.current
//       );
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   });

//   const checkInternetConnection = async () => {
//     const netInfo = await NetInfo.fetch();

//     if (netInfo.isConnected) {
//       // console.log('The device is connected to the internet.');
//     } else {
//       Alert.alert(
//         "Нет интернета",
//         "Подключитесь к интернету",
//         [
//           {
//             text: "OK",
//             style: "cancel",
//           },
//         ],
//         { cancelable: false }
//       );
//     }
//   };

//   useEffect(() => {
//     checkInternetConnection();
//   }, []);

//   return (
//     <AuthProvider>
//       <StatusBar style="dark" />
//       <Provider theme={theme}>
//         <Navigation />
//       </Provider>
//     </AuthProvider>
//   );
// }

import React, { useContext, useEffect, useRef, useState } from "react";
import "localstorage-polyfill";
import { Provider } from "react-native-paper";
import { theme } from "./src/cores/theme";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import Navigation from "./src/stack/Navigation";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import NetInfo from "@react-native-community/netinfo";
import { Alert, Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App({ navigation }) {
  const [token, setToken] = useState("");
  const [channels, setChannels] = useState([]);
  const [notification, setNotification] = useState("");

  const notificationListener = useRef();
  const responseListener = useRef();

  // console.log(Constants.expoConfig.extra.eas.projectId, "eeeee");
  // console.log("token from app", token);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error("Project ID not found");
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(token);
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setToken(token)
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const checkInternetConnection = async () => {
    const netInfo = await NetInfo.fetch();

    if (netInfo.isConnected) {
      // console.log('The device is connected to the internet.');
    } else {
      Alert.alert(
        "Нет интернета",
        "Подключитесь к интернету",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    checkInternetConnection();
  }, []);

  return (
    <AuthProvider>
      <Provider theme={theme}>
        <Navigation token={token} />
      </Provider>
    </AuthProvider>
  );
}
