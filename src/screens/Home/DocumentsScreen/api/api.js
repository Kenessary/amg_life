import axios from "axios";
import qs from "qs";

const exampleData = {
  response1:
    '{\r\n"Строка1": {\r\n"Name": "Доверенность",\r\n"Number": "AU-000255",\r\n"DateDoc": "28.10.2024 16:49:06",\r\n"guid": "edf29b52-9522-11ef-80cd-00155dd42208",\r\n"type": "Доверенность",\r\n"system": "edo"\r\n},\r\n"Строка2": {\r\n"Name": "Задание на командировку",\r\n"Number": "AU-002792",\r\n"DateDoc": "28.10.2024 15:53:02",\r\n"guid": "057c6e7c-951b-11ef-80cd-00155dd42208",\r\n"type": "Заданиенакомандировку",\r\n"system": "edo"\r\n},\r\n"Строка3": {\r\n"Name": "Задание на командировку",\r\n"Number": "AU-002793",\r\n"DateDoc": "28.10.2024 15:42:46",\r\n"guid": "28667580-951b-11ef-80cd-00155dd42208",\r\n"type": "Заданиенакомандировку",\r\n"system": "edo"\r\n},\r\n"Строка4": {\r\n"Name": "Задание на командировку",\r\n"Number": "AU-002556",\r\n"DateDoc": "09.10.2024 15:04:58",\r\n"guid": "0cda09e7-8626-11ef-80cd-00155dd42208",\r\n"type": "Заданиенакомандировку",\r\n"system": "edo"\r\n},\r\n"Строка5": {\r\n"Name": "Задание на командировку",\r\n"Number": "AU-002556",\r\n"DateDoc": "09.10.2024 15:04:58",\r\n"guid": "0cda09e7-8626-11ef-80cd-00155dd42208",\r\n"type": "Заданиенакомандировку",\r\n"system": "edo"\r\n},\r\n"Строка6": {\r\n"Name": "Доверенность",\r\n"Number": "AU-000237",\r\n"DateDoc": "08.10.2024 15:22:44",\r\n"guid": "6bfd846e-855f-11ef-80cd-00155dd42208",\r\n"type": "Доверенность",\r\n"system": "edo"\r\n},\r\n"Строка7": {\r\n"Name": "Доверенность",\r\n"Number": "AU-000236",\r\n"DateDoc": "08.10.2024 15:19:27",\r\n"guid": "295b5771-855f-11ef-80cd-00155dd42208",\r\n"type": "Доверенность",\r\n"system": "edo"\r\n},\r\n"Строка8": {\r\n"Name": "Доверенность",\r\n"Number": "AU-000235",\r\n"DateDoc": "08.10.2024 15:15:23",\r\n"guid": "70d87284-855e-11ef-80cd-00155dd42208",\r\n"type": "Доверенность",\r\n"system": "edo"\r\n}\r\n}',
  response2:
    '{\r\n"Строка1": {\r\n"mail_id": "324786",\r\n"mail_name": "входящая и исходящая корреспонденция(2024-10-03 09:12:01)",\r\n"system": "oa"\r\n},\r\n"Строка2": {\r\n"mail_id": "325517",\r\n"mail_name": "Письмо №325517",\r\n"system": "oa"\r\n},\r\n"Строка3": {\r\n"mail_id": "326141",\r\n"mail_name": "Письмо №326141",\r\n"system": "oa"\r\n},\r\n"Строка4": {\r\n"mail_id": "327665",\r\n"mail_name": "входящая и исходящая корреспонденция(2024-10-29 09:58:12)",\r\n"system": "oa"\r\n}\r\n}',
  response3: [
    {
      doc: "Заявка на приобретение ТМЦ KN-000930 от 01.11.2024 8:25:49",
      tip_doc: "УЗ_Заявка",
      user_iin: "800528302827",
    },
  ],
};

// const exampleDataEmpty = {
//   response1: '{\r\n"status": "false"\r\n}',
//   response2: "{}",
//   response3: [],
// };

export const docDefaultDateMixed = (
  documentiin3,
  edooagod,
  edooames,
  setIsLoading,
  setDocsArrayMixed
) => {
  setIsLoading(true);
  const data = qs.stringify({
    // documentiin3: "831120400361",
    // documentiin3: "800528302827",
    documentiin3: documentiin3,
    documentnameedo: "exec",
    edooagod: edooagod,
    edooames: edooames,
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
      // console.log(Object.values(JSON.parse(exampleData.response1)));
      setDocsArrayMixed([
        JSON.parse(info).response1 === "{}"
          ? Object.values("")
          : Object.values(JSON.parse(JSON.parse(info).response1)),
        JSON.parse(info).response2 === "{}"
          ? Object.values("")
          : Object.values(JSON.parse(JSON.parse(info).response2)),
        JSON.parse(info).response3.length === 0
          ? Object.values("")
          : JSON.parse(info).response3,
      ]);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};

export const docDefaultDateMixedFull = (
  documentiin3,
  edooagod,
  edooames,
  setIsLoading,
  setDocsArrayMixed
) => {
  setIsLoading(true);
  const data = qs.stringify({
    // documentiin3: "831120400361" "800528302827",
    documentiin3: documentiin3,
    documentnameedo: "full",
    edooagod: edooagod,
    edooames: edooames,
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
      console.log(info);
      setDocsArrayMixed([
        JSON.parse(JSON.parse(info).response1).status === "false"
          ? Object.values("")
          : Object.values(JSON.parse(JSON.parse(info).response1)),
        JSON.parse(info).response2 === "{}"
          ? Object.values("")
          : Object.values(JSON.parse(JSON.parse(info).response2)),
        JSON.parse(info).response3.length === 0
          ? Object.values("")
          : JSON.parse(info).response3,
      ]);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};

export const signDocument = (
  podpisiin,
  podpistype,
  podpisguid,
  setSignDocumentModal,
  setSignDocumentResult,
  setSignDocumentLoad,
  podpisaction
) => {
  setSignDocumentModal(true);
  setSignDocumentLoad(true);
  const data = qs.stringify({
    podpisiin: podpisiin,
    podpistype: podpistype,
    podpisguid: podpisguid,
    podpisaction: podpisaction,
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
      console.log(JSON.parse(info));
      if (JSON.parse(info).key === "false") {
        setSignDocumentResult("Проблема с ключом");
      }
      if (
        JSON.parse(info).key === "true" &&
        JSON.parse(info).status === "false"
      ) {
        setSignDocumentResult("Не удалось подписать документ");
      }
      if (
        JSON.parse(info).key === "true" &&
        JSON.parse(info).status === "true"
      ) {
        setSignDocumentResult("Документ успешно подписан");
      }

      setSignDocumentLoad(false);
    })
    .catch(function (error) {
      console.log(error);
      setSignDocumentLoad(false);
    });
};

export const docDefaultDate = (
  documentiin,
  god,
  mes,
  setIsLoading,
  setDocsArray
) => {
  setIsLoading(true);
  const data = qs.stringify({
    documentiin: "980624351476",
    // documentiin: documentiin,
    documentname: "exec",
    godedo: god,
    mesedo: mes,
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
      // console.log(arrayWithoutParam)
      setDocsArray(arrayWithoutParam);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};

export const docDefaultDateFull = (
  documentiin,
  god,
  mes,
  setIsLoading,
  setDocsArrayFull
) => {
  setIsLoading(true);
  const data = qs.stringify({
    // documentiin: "831120400361",
    // documentiin: documentiin,
    documentiin: "980624351476",
    documentname: "full",
    godedo: god,
    mesedo: mes,
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
      setDocsArrayFull(arrayWithoutParam);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};
