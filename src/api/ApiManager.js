import axios from "axios";
import { Headers, Headers_Login } from "./Url";

export const postCallApi = (setIsLoading, data, url, setResult) => {
  setIsLoading(true);
  const config = {
    method: "post",
    url: url,
    headers: Headers,
    data: data,
  };
  axios(config)
    .then(function (response) {
      let res = response.data;
      // console.log(res);
      setResult(res);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};
