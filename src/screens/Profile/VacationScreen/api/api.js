import axios from "axios";
import qs from "qs";

export const getVacation = (setIsLoading, iin, setOtpusk) => {
  setIsLoading(true);
  const data = qs.stringify({
    otpuskiin: iin,
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
      const parsed = JSON.parse(info).list;

      let newArray = parsed.map((list) => {
        return {
          nachalo: list.nachalo,
          konec: list.konec,
          dni: list.dni,
          vid: list.vid,
          naprezhonnost: list.naprezhonnost,
          tyazh: list.tyazh,
          priarale: list.priarale,
          invalidnost: list.invalidnost,
          drugie: list.drugie,
        };
      });

      setOtpusk(newArray);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};
