import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import qs from "qs";
import { Alert } from "react-native";

export const searchUser = (iinUser, setIsLoading, setUserSearch) => {
  setIsLoading(true);
  const data = qs.stringify({
    infoiin: iinUser,
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
      setUserSearch(parsed);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};

export const newPassword = (newparoliin, setIsLoadingChange, navigation) => {
  setIsLoadingChange(true);
  const data = qs.stringify({
    newparoliin: newparoliin,
    newparolp: "1234",
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
      let user_password = response.data
        .replace(/<[^>]*>/g, "")
        .replace(/-->/g, "");
      let parsed = JSON.parse(user_password);

      Alert.alert(`ИИН: ${newparoliin}`, `${parsed.status}`, [
        {
          text: "OK",
          onPress: () => navigation(), // Action for OK button
        },
      ]);
      setIsLoadingChange(false);
    })

    .catch(function (error) {
      console.log(error);
      setIsLoadingChange(false);
    });
};
