import axios from "axios";

export const getEvents = (setIsLoading, setEvent, year, month) => {
  setIsLoading(true);
  const config = {
    method: "post",
    url: `http://95.57.218.120/?apitest.helloAPI35={"god":${year}, "mes": ${month}}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  axios(config)
    .then(function (response) {
      const info = response.data
        .replace(/<[^>]*>/g, "")
        .replace(/-->/g, "")
        .replace(/ ___ /g, "");
      const parsed = JSON.parse(info).response;
      const parsed1 = JSON.parse(parsed);
      // console.log(parsed1);

      // let newArray = parsed1.map((list) => {
      //   return {
      //     id: list.id,
      //     data_vv: list.data_vv.split(" 00")[0].split(" ")[0],
      //     nazvanie: list.nazvanie,
      //     ssilka: list.ssilka,
      //   };
      // });

      setEvent(parsed1);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};
