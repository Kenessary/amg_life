import axios from "axios";
import qs from "qs";

export const qrPodpis = (
  docnamemd,
  docuid,
  dociin,
  docsovpadenie,
  setPodpisInfo
) => {
  const dataSp = qs.stringify({
    docnamemd: docnamemd,
    docuid: docuid,
    dociin: dociin,
    docsovpadenie: docsovpadenie,
  });
  const config = {
    method: "post",
    url: "http://95.57.218.120/?index",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: dataSp,
  };
  axios(config)
    .then(function (response) {
      let user = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
      let parsed_user = JSON.parse(user);
      setPodpisInfo(parsed_user);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const qrscan = (
  docoborotiin,
  docoborotguid,
  docoborotnowdate,
  docoborotipaddress,
  setIsLoading,
  setVhodResult
) => {
  setIsLoading(true);
  const data = qs.stringify({
    docoborotiin: docoborotiin,
    docoborotguid: docoborotguid,
    docoborotnowdate: docoborotnowdate,
    docoborotipaddress: docoborotipaddress,
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
      setVhodResult(parsed_user);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};

export const qrscanTest = (
  docoborotiinn,
  docoborotguidd,
  docoborotnowdatee,
  docoborotipaddresss,
  setVhodResult
) => {
  const data = qs.stringify({
    docoborotiinn: docoborotiinn,
    docoborotguidd: docoborotguidd,
    docoborotnowdatee: docoborotnowdatee,
    docoborotipaddresss: docoborotipaddresss,
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
      setVhodResult(parsed_user);
      console.log(parsed_user);
    })
    .catch(function (error) {
      console.log(error);
    });
};
