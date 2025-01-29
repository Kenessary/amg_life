import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../../../styles/colors";
import axios from "axios";
import qs from "qs";
import { AuthContext } from "../../../../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

const UserProfileImage = ({}) => {
  const { iin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const data = qs.stringify({
      photoiin: iin,
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
        setImage(parsed.photos[0]);

        setIsLoading(false);
      })

      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const uploadImage = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        // allowsEditing:true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        // setImage(result.assets[0].base64)
        const manipResult = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 240, height: 300 } }], // Adjust the dimensions as needed
          { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG } // Adjust the quality as needed
        );

        let base64Image = await fetch(manipResult.uri);
        let blob = await base64Image.blob();
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          let base64data = reader.result.replace(
            /^data:image\/jpeg;base64,/,
            ""
          );
          setImage(base64data); // This is your base64-encoded image
          setIsLoadingPhoto(true);
          const data = qs.stringify({
            faceiin: iin,
            facephoto: base64data,
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
              console.log("photo sended");
              setIsLoadingPhoto(false);
            })

            .catch(function (error) {
              console.log(error);
              setIsLoadingPhoto(false);
            });
        };
      }
    } catch (error) {
      alert("Error uploading image: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.addImage}>
          <ActivityIndicator size={"large"} color={Colors.smoothBlack} />
        </View>
      ) : image ? (
        <>
          <Image
            source={{ uri: `data:image/jpeg;base64,${image}` }}
            style={styles.image}
          />
          <TouchableOpacity
            onPress={() => uploadImage()}
            style={styles.changeImage}
          >
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={18}
              color="white"
            />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.addImage} onPress={() => uploadImage()}>
          <MaterialIcons name="add-a-photo" size={40} color="grey" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", width: 130 },
  image: {
    width: 130,
    height: 130,
    borderRadius: 100,
    transform: [{ scaleX: Platform.OS === "android" ? 1 : -1 }],
  },
  changeImage: {
    backgroundColor: Colors.primary,
    borderRadius: 40,
    padding: 10,
    bottom: -2,
    right: -5,
    position: "absolute",
  },
  changeImageText: {
    color: "#4d4d4d",
    fontWeight: "700",
    marginLeft: 5,
  },
  addImage: {
    backgroundColor: "#ECECEC",
    width: 130,
    height: 130,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UserProfileImage;
