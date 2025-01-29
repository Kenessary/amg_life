import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { BASE_URL, INDEX_URL } from "../config";
import axios from "axios";
import qs from "qs";
import i18n from "i18n-js";
import { kz, ru, ch } from "../languages/localizations";
// import { getTelephone } from "./api/getTelePhone";

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [splashLoading, setSplashLoading] = useState(false);
  const [iin, setIin] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userVerified, setUserVerified] = useState("");
  const [foreignUser, setForeignUser] = useState("");
  const [uptoiko, setUptoiko] = useState("");
  globalThis.isforeign = foreignUser;
  // console.log(foreignUser === "0");
  const [status, setStatus] = useState({});
  const [restores, setRestores] = useState(null);
  const [restoresp, setRestoresp] = useState(null);
  const [newPasswords, setNewPasswords] = useState(null);
  const [restoreIin, setRestoreIin] = useState(null);
  const [mod, setMod] = useState(false);
  const [isApparat, setIsApparat] = useState({});
  const [historyStatus, setHistoryStatus] = useState("");
  let [openedLength, setOpenedLength] = useState("");
  const [showBiometric, setShowBiometric] = useState(false);
  const [invent, setInvent] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [sotrpm, setSotprm] = useState("");
  globalThis.showBiometric = showBiometric;

  AsyncStorage.setItem("showbiometricpage", JSON.stringify(showBiometric));

  const historyOpened = () => {
    const data = qs.stringify({
      getnotifhistoryiin: iin,
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
        let parsedL = parsed.list;
        let status_parsed = parsed.status;
        const a = [];
        if (status_parsed !== "Нет данных" && parsedL !== undefined) {
          for (let i = 0; i < parsedL.length; i++) {
            if (parsedL[i].opened === 0) {
              a.push(parsedL[i].opened);
            }
          }
        }
        if (a.length !== 0) {
          setOpenedLength(a.length);
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (iin !== "") {
      historyOpened();
    }
  });

  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    if (locale !== "") {
      AsyncStorage.setItem("appLanguage", locale);
    }
  });

  useEffect(() => {
    getDataR();
  });

  const getDataR = () => {
    try {
      AsyncStorage.getItem("appLanguage").then((value) => {
        if (value != null) {
          setLang(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const register = (findadduseriin, findadduserp, findaddusertel) => {
    setIsLoading(true);
    const data = qs.stringify({
      findadduseriin: findadduseriin,
      findadduserp: findadduserp,
      findaddusertel: findaddusertel,
    });
    const config = {
      method: "post",
      url: `${BASE_URL}`,
      headers: {
        Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        let userInfo = response.data
          .replace(/<[^>]*>/g, "")
          .replace(/-->/g, "");
        setUserInfo(JSON.parse(userInfo));
        Alert.alert(JSON.parse(userInfo));
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const restore = (infoiin) => {
    setIsLoading(true);
    const data = qs.stringify({
      infoiin: infoiin,
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
        let iin = parsed.iin;
        if (telephone === null) {
          Alert.alert("Неверный ИИН");
          setRestores(telephone);
          AsyncStorage.setItem("restorepass", JSON.stringify(telephone));
        }
        setRestores(telephone);
        setRestoreIin(iin);
        AsyncStorage.setItem("restorepass", JSON.stringify(telephone));
        setIsLoading(false);
      })

      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const newPassword = (
    newparoliin,
    newparolp,
    setIsLoading,
    setNewPasswords
  ) => {
    setIsLoading(true);
    const data = qs.stringify({
      newparoliin: newparoliin,
      newparolp: newparolp,
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
        let newpassword = parsed.status;
        setNewPasswords(newpassword);
        setIsLoading(false);
      })

      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const changePhone = (newparoliin, newtel) => {
    setIsLoading(true);
    const data = qs.stringify({
      newparoliin: newparoliin,
      newtel: newtel,
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
        let newpassword = parsed.status;
        console.log(parsed);
        setIsLoading(false);
      })

      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("restorepass").then((value) => {
        if (value != null) {
          setRestoresp(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (finduseriin, finduserp) => {
    setIsLoading(true);
    const data = qs.stringify({
      finduseriin: finduseriin,
      finduserp: finduserp,
    });
    const config = {
      method: "post",
      url: "http://95.57.218.120/?index",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: data,
    };
    axios(config)
      .then(async function (response) {
        let user = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        let parsed_user = JSON.parse(user);
        console.log(parsed_user, "fromAuth");

        // setUserInfo(parsed_user);
        let iin = parsed_user.iin;
        let phone_number = parsed_user.phone_number;
        let status = parsed_user.status;
        let apparat = parsed_user.apparat;
        let stolovaya = parsed_user.stolovaya;
        let sotrpm = parsed_user.sotrpm;
        let invent = parsed_user.invent;
        let uptoiko = parsed_user.uptoiko;
        // getTelephone(iin, setPhone);
        setIin(iin);
        setPhoneNumber(phone_number);
        setIsApparat(apparat);
        setInvent(invent);
        setSotprm(sotrpm);
        setUptoiko(uptoiko);

        AsyncStorage.setItem("userUptoiko", uptoiko);
        AsyncStorage.setItem("userApparat", apparat === null ? "" : apparat);
        AsyncStorage.setItem(
          "userStolovaya",
          stolovaya === null ? "" : stolovaya
        );
        AsyncStorage.setItem("userSotrpm", sotrpm === null ? "" : sotrpm);
        AsyncStorage.setItem("userInvent", invent === null ? "" : invent);
        setStatus(status);

        if (status === "IIN not found") {
          Alert.alert(i18n.t("erIinAlert"));
          setStatus(status);
          AsyncStorage.removeItem("useriin");
          AsyncStorage.removeItem("userInfo");
          AsyncStorage.removeItem("userApparat");
          AsyncStorage.removeItem("userStolovaya");
          AsyncStorage.removeItem("userSotrpm");
          AsyncStorage.removeItem("userInvent");
          AsyncStorage.removeItem("userPhoneNumber");
          AsyncStorage.removeItem("userUptoiko");
          setIsLoading(false);
        }
        if (status === "Invalid pwd") {
          Alert.alert(i18n.t("erPassAlert"));
          setStatus(status);
          AsyncStorage.removeItem("useriin");
          AsyncStorage.removeItem("userInfo");
          AsyncStorage.removeItem("userApparat");
          AsyncStorage.removeItem("userStolovaya");
          AsyncStorage.removeItem("userSotrpm");
          AsyncStorage.removeItem("userInvent");
          AsyncStorage.removeItem("userPhoneNumber");
          AsyncStorage.removeItem("userUptoiko");
          setIsLoading(false);
        }
        if (status === "Not found") {
          Alert.alert(i18n.t("erUserAlert"));
          setStatus(status);
          AsyncStorage.removeItem("useriin");
          AsyncStorage.removeItem("userInfo");
          AsyncStorage.removeItem("userApparat");
          AsyncStorage.removeItem("userStolovaya");
          AsyncStorage.removeItem("userSotrpm");
          AsyncStorage.removeItem("userInvent");
          AsyncStorage.removeItem("userPhoneNumber");
          AsyncStorage.removeItem("userUptoiko");
          setIsLoading(false);
        }
        if (response && response.data && iin !== null) {
          await AsyncStorage.setItem("useriin", iin);
          await AsyncStorage.setItem("userPhoneNumber", phone_number);
          // await AsyncStorage.removeItem("alertShown");
          // await AsyncStorage.removeItem("userSotrpm", sotrpm);
          await AsyncStorage.setItem("userInfo", JSON.stringify(parsed_user));

          globalThis.iinuser1 = iin;
        }

        if (parsed_user.isforeign === "1" || parsed_user.verified === false) {
          setIsLoading(true);
          setShowBiometric(false);
          setIsLoading(false);
        } else {
          setIsLoading(true);
          setShowBiometric(true);
          setIsLoading(false);
        }

        if (parsed_user.iin === "111111111111") {
          setIsLoading(true);
          setShowBiometric(false);
          setIsLoading(false);
        }
        setForeignUser(parsed_user.isforeign);
        setUserVerified(parsed_user.verified);

        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    setIin(null);
    setForeignUser("");
    setModalVisible(false);
    AsyncStorage.removeItem("useriin");
    setUserInfo(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userApparat");
    AsyncStorage.removeItem("userStolovaya");
    AsyncStorage.removeItem("userInvent");
    AsyncStorage.removeItem("secondPass");
    AsyncStorage.removeItem("firstPassword");
    AsyncStorage.removeItem("pushMenu");
    AsyncStorage.removeItem("userPhoneNumber");
    AsyncStorage.removeItem("userUptoiko");
    setIsLoading(false);
  };

  const logoutRes = () => {
    setRestores(null);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let useriin = await AsyncStorage.getItem("useriin");
      setIin(useriin);
      let userInfo = await AsyncStorage.getItem("userInfo");
      setUserInfo(userInfo);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        iin,
        phoneNumber,
        userVerified,
        foreignUser,
        isLoading,
        splashLoading,
        setModalVisible,
        status,
        modalVisible,
        register,
        login,
        logout,
        restore,
        restores,
        restoresp,
        logoutRes,
        newPassword,
        newPasswords,
        changePhone,
        restoreIin,
        mod,
        isApparat,
        openedLength,
        setOpenedLength,
        historyOpened,
        setShowBiometric,
        showBiometric,
        type,
        setType,
        invent,
        phone,
        sotrpm,
        uptoiko,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
