import axios from "axios";
import i18n from "i18n-js";

const greeApiConfig = (data) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.green-api.com/waInstance7103843536/sendMessage/9b4b62a22d4f46eaa6598d12b8a1a69a1293ab4375eb47fbbc",
    headers: {
      "Content-Type": "text/plain",
    },
    data: data,
  };
  return config;
};

const greenApiRes = (config, setVisible1, setIsSendMessage, setIsLoading) => {
  const axiosRes = axios(config)
    .then(function (response) {
      let idMess = response.data;
      idMess !== "" && setVisible1(true);
      setIsSendMessage(idMess);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
  return axiosRes;
};

const greenApiData = (recCode, telphone) => {
  const data = `{\r\n    "chatId":"${
    "7" + telphone
  }@c.us",\r\n    "message":"${i18n.t("codeVerifyTitle")}: ${recCode}"\r\n}`;
  return data;
};

const codeParserFromServer = (response) => {
  let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
  let parse_first = JSON.parse(info);
  let parse_second = parse_first.response;
  let recCode = JSON.parse(parse_second).status;
  return recCode;
};

const codeFromServerConfig = () => {
  const config = {
    method: "get",
    url: `http://95.57.218.120/?apitest.helloAPI515={}`,
    headers: {},
  };
  return config;
};

const getNumbersRes = (
  config,
  setCode,
  setIsLoading,
  respass,
  setVisible1,
  setIsSendMessage
) => {
  const getNumbersAxios = axios(config)
    .then(function (response) {
      const code = codeParserFromServer(response);
      setCode(code);
      let data = greenApiData(code, respass.slice(1));
      let config = greeApiConfig(data);
      greenApiRes(config, setVisible1, setIsSendMessage, setIsLoading);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
  return getNumbersAxios;
};

export const getNumbers = (
  setCode,
  setIsLoading,
  respass,
  setVisible1,
  setIsSendMessage
) => {
  setIsLoading(true);
  const config = codeFromServerConfig();
  getNumbersRes(
    config,
    setCode,
    setIsLoading,
    respass,
    setVisible1,
    setIsSendMessage
  );
};
