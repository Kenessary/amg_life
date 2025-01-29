import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, BackHandler, Linking } from "react-native";
import axios from "axios";
import qs from "qs";
import moment from "moment";

export const openAppStore = () => {
  Linking.openURL("https://apps.apple.com/kz/app/amg-life/id1594409514"); // Replace with your app's App Store URL
};

export const openGooglePlayStore = () => {
  Linking.openURL(
    "https://play.google.com/store/apps/details?id=kz.portmasterplus.cnpcamglife"
  ); // Replace with your app's Google Play Store URL
};

export function getMenuSurvey(iin, setOpros) {
  // setIsLoading(true);
  const data = qs.stringify({
    oprosdlyastolovkiiin: iin,
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
      // console.log(parsed)
      if (parsed.status === 1) {
        setOpros(true);
      }
      if (parsed.status === 0) {
        setOpros(false);
      }
      // setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      // setIsLoading(false);
    });
}

export function setExpoPushToken(iin, pushToken, setPushStatus) {
  try {
    const data = qs.stringify({
      pushedoiin: iin,
      pushedotoken: pushToken,
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
    axios(config).then(async function (response) {
      let user = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
      let parsed = JSON.parse(user);
      console.log(parsed);
      // setIsSetPushToken(parsed)
      setPushStatus(parsed.status);
    });
  } catch (error) {
    console.error(error);
  }
}

export function setUpdateVersion(iin, version) {
  try {
    const data = qs.stringify({
      addinfoversionontableiin: iin,
      addinfoversionontablever: version,
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
    axios(config).then(async function (response) {
      let user = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
      let parsed = JSON.parse(user);
      // console.log(parsed);
    });
  } catch (error) {
    console.error(error);
  }
}

export function menuForSurvey(setMenu) {
  // setIsLoading(true);
  const config = {
    method: "get",
    url: `http://95.57.218.120/?apitest.helloAPI5={}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
      let parse_first = JSON.parse(info);

      let parse_second = JSON.parse(parse_first.response);
      let parse_third = parse_second.status;
      setMenu(JSON.stringify(parse_third).split(";"));

      // console.log(JSON.stringify(parse_third).split(";"));
      // setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      // setIsLoading(false);
    });
}

export function checkUpdate(version, setModalUpdate) {
  // setIsLoading(true);
  const config = {
    method: "get",
    url: `http://95.57.218.120/?apitest.helloAPIObnova={"ver":"${version}"}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
      let parse_first = JSON.parse(info);
      let parse_second = parse_first.response;
      if (parse_second !== null) {
        if (parse_second.status === false) {
          setModalUpdate(true);
        }
        if (parse_second.status === true) {
          setModalUpdate(false);
        }
      }
      // setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      // setIsLoading(false);
    });
}

export function isApparat(setApparat) {
  try {
    AsyncStorage.getItem("userApparat").then((value) => {
      if (value != null) {
        setApparat(value);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export function isStolovaya(setStol) {
  try {
    AsyncStorage.getItem("userStolovaya").then((value) => {
      if (value != null) {
        setStol(value);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export function androidBackHandler() {
  const backAction = () => {
    Alert.alert(
      "Выйти из приложения",
      "Вы действительно хотите выйти из AMG-Life?!",
      [
        {
          text: "Отмена",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Да", onPress: () => BackHandler.exitApp() },
      ]
    );
    return true;
  };
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );
  return () => backHandler.remove();
}

export const otvet = (
  oprospitanieiin,
  oprospitanieotvet,
  setIsLoading1,
  setOtvetOpros,
  setModalResult
) => {
  setIsLoading1(true);
  const data = qs.stringify({
    oprospitanieiin: oprospitanieiin,
    oprospitanieotvet: oprospitanieotvet,
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
      let oprStat = parsed.status;
      setOtvetOpros(oprStat);
      if (oprStat.length !== 0) {
        setModalResult(true);
      }
      setIsLoading1(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading1(false);
    });
};

export const infoIin = (
  // setIsLoadingVer,
  iin,
  setresPass,
  setFio,
  setVerified,
  setisForeign
  // setButtonShow
) => {
  // setIsLoadingVer(true);
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
      globalThis.profileUser = parsed;

      let telephone = parsed.tel;
      let ver = parsed.verified;
      let forin = parsed.isforeign;
      if (telephone === null) {
        setresPass(telephone);
        AsyncStorage.setItem("restorepass", JSON.stringify(telephone));
      }
      setresPass(telephone);
      setFio(parsed.fio);
      setVerified(ver);
      setisForeign(forin);

      // const day = moment().format(`DD`);
      // const mm = moment().format(`MM`);
      // const iinMonth = iin.slice(2, 4);
      // const iinDay = iin.slice(4, 6);

      // if (day === iinDay && mm === iinMonth) {
      //   setButtonShow(true);
      // } else {
      //   setButtonShow(false);
      // }

      // setIsLoadingVer(false);
    })

    .catch(function (error) {
      console.log(error);
      setIsLoadingVer(false);
    });
};

export const docDefaultDate = (
  documentiin,
  god,
  mes,
  setIsLoading,
  setDocsArrayLength
) => {
  setIsLoading(true);
  const data = qs.stringify({
    documentiin: documentiin,
    documentname: "exec",
    god: god,
    mes: mes,
  });
  const config = {
    method: "post",
    url: "http://95.57.218.120/?index",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      const info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
      const parsed = JSON.parse(info);
      const arrayWithoutParam = Object.values(parsed);
      setDocsArrayLength(arrayWithoutParam.length);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};

export const getSearch = (
  setIsLoading1,
  setSearchResult,
  setVisible3,
  comment
) => {
  setIsLoading1(true);

  const config = {
    method: "get",
    url: `http://95.57.218.120/?apitest.helloAPIWithParams23={"data":"${comment}"}`,
    headers: { "Content-Type": "application/json" },
  };
  axios(config)
    .then(function (response) {
      let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
      let parse_first = JSON.parse(info);
      let parse_second = JSON.parse(parse_first.response);
      let parse_third = parse_second.list;
      let newArray = parse_third.map((list) => {
        return {
          fio: list.fio,
          doljnost: list.doljnost,
          cabinet: list.cabinet,
          raboch_tel: list.raboch_tel,
          sot_tel: list.sot_tel,
          email: list.email,
          fax: list.fax,
          predki: list.predki,
        };
      });
      setSearchResult(newArray);
      setIsLoading1(false);
      setVisible3(true);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading1(false);
    });
};

export const getInterface = (setInterfaces) => {
  try {
    AsyncStorage.getItem("mainPageInterface").then((value) => {
      if (value != null) {
        setInterfaces(value);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export function checkSurvey(
  setIsLoading,
  iin,
  setSurveyOutcome,
  setSurvey,
  setIntensity
) {
  setIsLoading(true);
  const config = {
    method: "get",
    url: `http://95.57.218.120/?apitest.helloAPIWithParamanswer={"iin":"${iin}"}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
      let parse_first = JSON.parse(info);
      let parse_second = JSON.parse(parse_first.response);
      if (
        parse_second === "Активных опросов нет!" ||
        parse_second === "Вы уже прошли все доступные опросы"
      ) {
        setSurveyOutcome(false);
      } else {
        setIntensity(25);
        setSurveyOutcome(true);
        setSurvey(parse_second[0]);
      }
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
}

export const sendSurvey = (
  surveyiin,
  surveytext,
  surveyanswer,
  surveyid,
  surveycomment,
  setIsLoading,
  setResultSurvey
) => {
  setIsLoading(true);
  const data = qs.stringify({
    surveyiin: surveyiin,
    surveytext: surveytext,
    surveyanswer: surveyanswer,
    surveyid: surveyid,
    surveycomment: surveycomment,
  });
  const config = {
    method: "post",
    url: "http://95.57.218.120/?index",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      const info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
      const parsed = JSON.parse(info);
      setResultSurvey(parsed.status);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};

export const loadChosenInterface = async (setInterfacesSwitch) => {
  try {
    // setIsLoading(true)
    const interfaceName = await AsyncStorage.getItem("chosenInterface");
    if (interfaceName) {
      setInterfacesSwitch(interfaceName);
    }
    // setIsLoading(false)
  } catch (error) {
    console.error("Error loading chosen interface:", error);
    // setIsLoading(false)
  }
};
