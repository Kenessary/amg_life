import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../styles/colors";
import { StatusBar } from "expo-status-bar";
import TopBarNavigation from "../../../components/TopBarNavigation";
import { backButton } from "../../../components/GoBackButton";
import {
  AntDesign,
  Entypo,
  Foundation,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { Camera, CameraView } from "expo-camera";
import { useEffect } from "react";
import ButtonCamera from "../Edo/components/ButtonCamers";
import { useNavigation } from "@react-navigation/native";
import { FlashMode } from "expo-camera/build/legacy/Camera.types";
import axios from "axios";
import qs from "qs";
import ProductList from "./ProductList";

const ProductResult = ({ route }) => {
  // console.log(route.params.parsed_info);

  const [takePhotoVisible, setTakePhotoVisible] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);

  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const cameraRef = useRef(null);
  const [facing, setFacing] = useState("back");
  // aedi;

  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  // const [result, s]
  // console.log(imageBase64);

  const [guid, setGuid] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setGuid(route.params.guid);
  }, [route]);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

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

  const sendInfoWithPhoto = (phototovar, uidtovar) => {
    setIsLoading(true);

    const data = qs.stringify({
      phototovar: phototovar,
      uidtovar: uidtovar,
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
        if (
          JSON.parse(parsed_user.response).status === "Успешно добавлен файл"
        ) {
          Alert.alert(
            "Успешно добавлен файл", // Title of the alert
            "Нажмите ОК", // Message in the alert
            [
              {
                text: "OK", // Button text
                onPress: () => {
                  navigation.goBack(), navigation.goBack();
                }, // Action on button press
              },
            ],
            { cancelable: false } // Prevent dismissal by tapping outside
          );
        }

        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {!isCameraVisible ? (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.background,
            alignItems: "center",
            justifyContent: "space-between",
            opacity: takePhotoVisible ? 0.4 : 1,
          }}
        >
          <StatusBar style="dark" />

          <View style={{ ...styles.container, height: "15%" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.goBack()}
                style={{ paddingRight: 10 }}
              >
                <AntDesign name="left" size={24} color={Colors.smoothBlack} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: Colors.smoothBlack,
                  marginBottom: 3,
                }}
              >
                Объект
              </Text>
            </View>
          </View>

          <View
            style={{
              height: "84%",
              width: "95%",
              borderTopEndRadius: 20,
              borderTopStartRadius: 20,
              backgroundColor: Colors.white,
              alignItems: "center",
            }}
          >
            <ScrollView style={{ width: "100%" }}>
              <View style={{ width: "100%", alignItems: "center" }}>
                <View style={{ width: "90%", marginTop: 15 }}>
                  <Text style={{ fontSize: 13, fontWeight: "300" }}>
                    Наименование
                  </Text>
                  <Text
                    style={{ fontSize: 16, fontWeight: "500", marginTop: 4 }}
                  >
                    {route.params.parsed_info.naimenovanie}
                  </Text>
                </View>

                <View
                  style={{
                    width: "90%",
                    marginTop: 8,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 13, fontWeight: "300", marginRight: 5 }}
                  >
                    Найдено
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {route.params.parsed_info.count_items}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => setIsCameraVisible(true)}
                  style={{
                    width: "90%",
                    marginTop: 20,
                    padding: 10,
                    borderRadius: 15,
                    backgroundColor: Colors.background,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {image ? (
                    <View style={{ padding: 5 }}>
                      <Image
                        style={{ width: 130, height: 230, borderRadius: 15 }}
                        source={{ uri: image }}
                      />

                      <TouchableOpacity
                        onPress={() => {
                          setImage(null), setIsPinned(false);
                        }}
                        style={{
                          position: "absolute",
                          top: 0,
                          alignSelf: "flex-end",
                          backgroundColor: Colors.primary,
                          width: 30,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 40,
                        }}
                      >
                        <MaterialIcons name="delete" size={20} color="white" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: 70,
                        height: 70,
                        backgroundColor: "white",
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MaterialIcons
                        name="add-photo-alternate"
                        size={30}
                        color="grey"
                      />
                    </View>
                  )}

                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.grey,
                      fontWeight: "600",
                      marginTop: 5,
                      display: image ? "none" : "flex",
                    }}
                  >
                    Добавить фото
                  </Text>
                </TouchableOpacity>

                <View style={{ width: "90%", marginTop: 8 }}>
                  <Text
                    style={{ fontSize: 13, fontWeight: "300", marginBottom: 5 }}
                  >
                    Список
                  </Text>

                  {route.params.parsed_info.list.length === 0 ? (
                    <Text
                      style={{ fontSize: 16, fontWeight: "500", marginTop: 4 }}
                    >
                      пусто
                    </Text>
                  ) : (
                    route.params.parsed_info.list.map((el, index) => (
                      <ProductList key={index} listItem={el} />
                    ))
                  )}
                </View>
                <View style={{ marginBottom: 100 }} />
              </View>
            </ScrollView>

            <TouchableOpacity
              onPress={() =>
                sendInfoWithPhoto(`data:image/jpeg;base64,${imageBase64}`, guid)
              }
              style={{
                backgroundColor: Colors.primary,
                width: "90%",
                height: 40,
                borderRadius: 15,
                position: "absolute",
                bottom: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isLoading ? (
                <ActivityIndicator color={"white"} />
              ) : (
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "600" }}
                >
                  Отправить
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <StatusBar style="light" />
          {!image ? (
            <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
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
                    // navigation.goBack();
                    // setScanned(false);
                    // setQrData("");
                    setIsCameraVisible(false);
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
                  justifyContent: isPinned ? "center" : "space-between",
                  paddingHorizontal: 30,
                }}
              >
                {isPinned ? (
                  <></>
                ) : (
                  <ButtonCamera
                    title={"Переснять"}
                    icon="retweet"
                    onPress={() => setImage(null)}
                  />
                )}
                <ButtonCamera
                  title={isPinned ? "Назад" : "Прикрепить"}
                  icon={isPinned ? "chevron-thin-left" : "attachment"}
                  onPress={() => {
                    setIsCameraVisible(false);
                    setIsPinned(true);
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
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 35,
    padding: 35,
    paddingBottom: 15,
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
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    paddingBottom: 20,
    width: "100%",
    height: "100%",
  },
  camera: {
    flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
  takePhotoButton: {
    padding: 20,
    backgroundColor: "red",
    borderRadius: 5,
    marginBottom: 20,
  },
  container: {
    width: "100%",
    backgroundColor: Colors.white,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
});

export default ProductResult;

// import React, { useRef, useState, useEffect } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   Text,
//   TouchableOpacity,
//   View,
//   StyleSheet,
// } from "react-native";
// import { Colors } from "../../../styles/colors";
// import { StatusBar } from "expo-status-bar";
// import { Camera } from "expo-camera";
// import axios from "axios";
// import qs from "qs";
// import { AntDesign, MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import ButtonCamera from "../Edo/components/ButtonCamers";

// const ProductResult = ({ route }) => {
//   const [takePhotoVisible, setTakePhotoVisible] = useState(false);
//   const [hasPermission, setHasPermission] = useState(null);
//   const [isCameraVisible, setIsCameraVisible] = useState(false);
//   const [image, setImage] = useState(null);
//   const [imageBase64, setImageBase64] = useState("");
//   const [isPinned, setIsPinned] = useState(false);
//   const [guid, setGuid] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const cameraRef = useRef(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     setGuid(route.params.guid);
//   }, [route]);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       try {
//         const options = { quality: 0.2, base64: true, doNotSave: true };
//         const data = await cameraRef.current.takePictureAsync(options);
//         setImageBase64(data.base64);
//         setImage(data.uri);
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   };

//   const sendInfoWithPhoto = (phototovar, uidtovar) => {
//     setIsLoading(true);

//     const data = qs.stringify({
//       phototovar: phototovar,
//       uidtovar: uidtovar,
//     });

//     const config = {
//       method: "post",
//       url: "http://95.57.218.120/?index",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       data: data,
//     };

//     axios(config)
//       .then((response) => {
//         let user = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
//         let parsed_user = JSON.parse(user);

//         if (
//           JSON.parse(parsed_user.response).status === "Успешно добавлен файл"
//         ) {
//           Alert.alert(
//             "Успешно добавлен файл",
//             "Нажмите ОК",
//             [
//               {
//                 text: "OK",
//                 onPress: () => {
//                   navigation.goBack();
//                   navigation.goBack();
//                 },
//               },
//             ],
//             { cancelable: false }
//           );
//         }

//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setIsLoading(false);
//       });
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting camera permission...</Text>;
//   }

//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <>
//       {!isCameraVisible ? (
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: Colors.background,
//             alignItems: "center",
//             justifyContent: "space-between",
//             opacity: takePhotoVisible ? 0.4 : 1,
//           }}
//         >
//           <StatusBar style="dark" />

//           <View style={{ ...styles.container, height: "15%" }}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <TouchableOpacity
//                 activeOpacity={1}
//                 onPress={() => navigation.goBack()}
//                 style={{ paddingRight: 10 }}
//               >
//                 <AntDesign name="left" size={24} color={Colors.smoothBlack} />
//               </TouchableOpacity>
//               <Text
//                 style={{
//                   fontSize: 18,
//                   fontWeight: "600",
//                   color: Colors.smoothBlack,
//                   marginBottom: 3,
//                 }}
//               >
//                 Объект
//               </Text>
//             </View>
//           </View>

//           <View
//             style={{
//               height: "82%",
//               width: "95%",
//               borderTopEndRadius: 20,
//               borderTopStartRadius: 20,
//               backgroundColor: Colors.white,
//               alignItems: "center",
//             }}
//           >
//             <View style={{ width: "88%", marginTop: 15 }}>
//               <Text style={{ fontSize: 13, fontWeight: "300" }}>
//                 Наименование
//               </Text>
//               <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 4 }}>
//                 {route.params.parsed_info.naimenovanie}
//               </Text>
//             </View>

//             <View
//               style={{
//                 width: "88%",
//                 marginTop: 8,
//                 flexDirection: "row",
//                 alignItems: "center",
//               }}
//             >
//               <Text style={{ fontSize: 13, fontWeight: "300", marginRight: 5 }}>
//                 Найдено
//               </Text>
//               <Text style={{ fontSize: 16, fontWeight: "500" }}>
//                 {route.params.parsed_info.count_items}
//               </Text>
//             </View>

//             <View style={{ width: "88%", marginTop: 8 }}>
//               <Text
//                 style={{ fontSize: 13, fontWeight: "300", marginBottom: 5 }}
//               >
//                 Список
//               </Text>

//               {route.params.parsed_info.list.length === 0 ? (
//                 <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 4 }}>
//                   пусто
//                 </Text>
//               ) : (
//                 <View
//                   style={{
//                     width: "100%",
//                     borderColor: "rgba(0,0,0,0.09)",
//                     borderWidth: 1,
//                     padding: 8,
//                     borderRadius: 10,
//                   }}
//                 >
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                       marginBottom: 7,
//                     }}
//                   >
//                     <Text
//                       style={{ fontSize: 13, fontWeight: "300", width: "40%" }}
//                     >
//                       Наименование:
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 13,
//                         fontWeight: "400",
//                         width: "60%",
//                         textAlign: "right",
//                       }}
//                     >
//                       {route.params.parsed_info.list[0].Description}
//                     </Text>
//                   </View>

//                   <View
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                       marginBottom: 7,
//                     }}
//                   >
//                     <Text
//                       style={{ fontSize: 13, fontWeight: "300", width: "40%" }}
//                     >
//                       Склад:
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 13,
//                         fontWeight: "400",
//                         width: "60%",
//                         textAlign: "right",
//                       }}
//                     >
//                       {route.params.parsed_info.list[0].SkladDescr}
//                     </Text>
//                   </View>

//                   <View
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                       marginBottom: 7,
//                     }}
//                   >
//                     <Text
//                       style={{ fontSize: 13, fontWeight: "300", width: "40%" }}
//                     >
//                       Направление:
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 13,
//                         fontWeight: "400",
//                         width: "60%",
//                         textAlign: "right",
//                       }}
//                     >
//                       {route.params.parsed_info.list[0].NapravlenieDescr}
//                     </Text>
//                   </View>

//                   <View
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                       marginBottom: 7,
//                     }}
//                   >
//                     <Text
//                       style={{ fontSize: 13, fontWeight: "300", width: "40%" }}
//                     >
//                       Контракт:
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 13,
//                         fontWeight: "400",
//                         width: "60%",
//                         textAlign: "right",
//                       }}
//                     >
//                       {route.params.parsed_info.list[0].ContractDescr}
//                     </Text>
//                   </View>

//                   <View
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                       marginBottom: 7,
//                     }}
//                   >
//                     <Text
//                       style={{ fontSize: 13, fontWeight: "300", width: "40%" }}
//                     >
//                       Количество:
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 13,
//                         fontWeight: "400",
//                         width: "60%",
//                         textAlign: "right",
//                       }}
//                     >
//                       {route.params.parsed_info.list[0].Count}
//                     </Text>
//                   </View>

//                   <View
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                       marginBottom: 7,
//                     }}
//                   >
//                     <Text
//                       style={{ fontSize: 13, fontWeight: "300", width: "40%" }}
//                     >
//                       Сумма:
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 13,
//                         fontWeight: "400",
//                         width: "60%",
//                         textAlign: "right",
//                       }}
//                     >
//                       {route.params.parsed_info.list[0].Summa}
//                     </Text>
//                   </View>

//                   <View
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Text
//                       style={{ fontSize: 13, fontWeight: "300", width: "40%" }}
//                     >
//                       Цена:
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 13,
//                         fontWeight: "400",
//                         width: "60%",
//                         textAlign: "right",
//                       }}
//                     >
//                       {route.params.parsed_info.list[0].Cena}
//                     </Text>
//                   </View>
//                 </View>
//               )}
//             </View>

//             <TouchableOpacity
//               onPress={() => setIsCameraVisible(true)}
//               style={{
//                 width: "88%",
//                 marginTop: 30,
//                 padding: 20,
//                 borderRadius: 15,
//                 backgroundColor: Colors.background,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {image ? (
//                 <View style={{ padding: 10 }}>
//                   <Image
//                     style={{ width: 150, height: 250, borderRadius: 15 }}
//                     source={{ uri: image }}
//                   />

//                   <TouchableOpacity
//                     onPress={() => {
//                       setImage(null), setIsPinned(false);
//                     }}
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       alignSelf: "flex-end",
//                       backgroundColor: Colors.primary,
//                       width: 30,
//                       height: 30,
//                       alignItems: "center",
//                       justifyContent: "center",
//                       borderRadius: 40,
//                     }}
//                   >
//                     <MaterialIcons name="delete" size={20} color="white" />
//                   </TouchableOpacity>
//                 </View>
//               ) : (
//                 <View
//                   style={{
//                     width: 70,
//                     height: 70,
//                     backgroundColor: "white",
//                     borderRadius: 10,
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <MaterialIcons
//                     name="add-photo-alternate"
//                     size={30}
//                     color="grey"
//                   />
//                 </View>
//               )}

//               <Text
//                 style={{
//                   fontSize: 16,
//                   color: Colors.grey,
//                   fontWeight: "600",
//                   marginTop: 5,
//                   display: image ? "none" : "flex",
//                 }}
//               >
//                 Добавить фото
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={() =>
//                 sendInfoWithPhoto(`data:image/jpeg;base64,${imageBase64}`, guid)
//               }
//               style={{
//                 backgroundColor: Colors.primary,
//                 width: "90%",
//                 height: 40,
//                 borderRadius: 15,
//                 position: "absolute",
//                 bottom: 20,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {isLoading ? (
//                 <ActivityIndicator color={"white"} />
//               ) : (
//                 <Text
//                   style={{ color: "white", fontSize: 18, fontWeight: "600" }}
//                 >
//                   Отправить
//                 </Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       ) : (
//         <View style={styles.cameraContainer}>
//           <StatusBar style="light" />
//           {!image ? (
//             <Camera style={styles.camera} ref={cameraRef}>
//               <ButtonCamera
//                 icon={"chevron-left"}
//                 color="#f1f1f1"
//                 onPress={() => setIsCameraVisible(false)}
//               />
//             </Camera>
//           ) : (
//             <Image source={{ uri: image }} style={{ flex: 1 }} />
//           )}

//           <View>
//             {image ? (
//               <ButtonCamera
//                 title={"Переснять"}
//                 icon="retweet"
//                 onPress={() => setImage(null)}
//               />
//             ) : (
//               <ButtonCamera
//                 title={"Сфотографировать"}
//                 icon="camera"
//                 onPress={takePicture}
//               />
//             )}
//           </View>
//         </View>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalView: {
//     backgroundColor: "white",
//     borderRadius: 35,
//     padding: 35,
//     paddingBottom: 15,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   cameraContainer: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "#000",
//     paddingBottom: 20,
//     width: "100%",
//     height: "100%",
//   },
//   camera: {
//     flex: 1,
//   },
//   container: {
//     width: "100%",
//     backgroundColor: Colors.white,
//     borderBottomRightRadius: 40,
//     borderBottomLeftRadius: 40,
//     flexDirection: "row",
//     alignItems: "flex-end",
//     justifyContent: "space-between",
//     paddingHorizontal: 25,
//     paddingBottom: 20,
//   },
// });

// export default ProductResult;
