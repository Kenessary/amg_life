import axios from "axios";
import qs from "qs";

export const getSpecForm = (setIsLoading, iin, setSpec) => {
  setIsLoading(true);
  const data = qs.stringify({
    // specodjiin: "720309300892",
    specodjiin: iin,
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
      const parsed = JSON.parse(info).spec_odj_items;

      // console.log(parsed);
      let newArray = parsed.map((list) => {
        return {
          firm: list.firm,
          tovar: list.tovar,
          dat_pri: list.dat_pri,
          kol_ost: list.kol_ost,
          st_ost: list.st_ost,
          sr_isp: list.sr_isp,
          dat_spis: list.dat_spis,
          kod_tov: list.kod_tov,
        };
      });
      setSpec(newArray);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};
