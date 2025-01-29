import axios from "axios";
import qs from "qs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const register = (
  findadduseriin,
  findadduserp,
  findaddusertel,
  setLoading,
  setStatus
) => {
  setLoading(true);
  const data = qs.stringify({
    findadduseriin: findadduseriin,
    findadduserp: findadduserp,
    findaddusertel: findaddusertel,
  });
  const config = {
    method: "post",
    url: `http://95.57.218.120/?index`,
    headers: {
      Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      let userInfo = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
      let parsed = JSON.parse(userInfo);
      setStatus(parsed.status);

      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false);
    });
};
