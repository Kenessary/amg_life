import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import qs from "qs";

export const getTelephone = (iin, setPhone) => {
  const data = qs.stringify({
    infoiin: iin,
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
      let telephone = parsed.tel;

      console.log(telephone);
      setPhone(telephone);
      AsyncStorage.setItem("userPhoneNumber", JSON.stringify(telephone));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getPhone = (iin, setPhone, setIsLoading) => {
  setIsLoading(true);
  const data = qs.stringify({
    infoiin: iin,
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
      let telephone = parsed.tel;

      console.log(telephone);
      setPhone(telephone);
      AsyncStorage.setItem("userPhoneNumber", JSON.stringify(telephone));
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};
