import qs from "qs";
import axios from "axios";
import i18n from "i18n-js";
export const getPaper = (
  iin,
  god,
  mes,
  setList,
  setNas,
  setUder,
  setTextMonth,
  setvisible,
  setIsLoading,
  valueMonth
) => {
  setIsLoading(true);
  const data = qs.stringify({
    iin: iin,
    // iin: "720309300892",
    god: god,
    mes: mes,
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
    .then(function (response) {
      let userList = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
      let parsedUserList = JSON.parse(userList);
      setList(parsedUserList);
      let nachislenia = parsedUserList.nachislenia;
      let uderzhania = parsedUserList.uderzhania;
      setNas(nachislenia);
      setUder(uderzhania);

      if (valueMonth === 1) {
        setTextMonth(i18n.t("january"));
      }
      if (valueMonth === 2) {
        setTextMonth(i18n.t("february"));
      }
      if (valueMonth === 3) {
        setTextMonth(i18n.t("march"));
      }
      if (valueMonth === 4) {
        setTextMonth(i18n.t("april"));
      }
      if (valueMonth === 5) {
        setTextMonth(i18n.t("may"));
      }
      if (valueMonth === 6) {
        setTextMonth(i18n.t("june"));
      }
      if (valueMonth === 7) {
        setTextMonth(i18n.t("july"));
      }
      if (valueMonth === 8) {
        setTextMonth(i18n.t("august"));
      }
      if (valueMonth === 9) {
        setTextMonth(i18n.t("september"));
      }
      if (valueMonth === 10) {
        setTextMonth(i18n.t("october"));
      }
      if (valueMonth === 11) {
        setTextMonth(i18n.t("november"));
      }
      if (valueMonth === 12) {
        setTextMonth(i18n.t("december"));
      }

      setvisible(true);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};

export const currentDate = (setValueMonth, setValueYear) => {
  const today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  const dayNumber = JSON.parse(dd);
  const monthNumber = JSON.parse(mm);
  const yearNumber = JSON.parse(yyyy);

  if (monthNumber === 1 && dayNumber < 10) {
    setValueMonth(12);
    setValueYear(yearNumber - 1);
  }
  if (monthNumber === 1 && dayNumber === 10) {
    setValueMonth(monthNumber);
    setValueYear(yearNumber);
  }
  if (monthNumber === 1 && dayNumber > 10) {
    setValueMonth(monthNumber);
    setValueYear(yearNumber);
  }
  if (monthNumber !== 1 && dayNumber > 10) {
    setValueMonth(monthNumber - 1);
    setValueYear(yearNumber);
  }
  if (monthNumber !== 1 && dayNumber <= 10) {
    setValueMonth(monthNumber - 1);
    setValueYear(yearNumber);
  }
};
