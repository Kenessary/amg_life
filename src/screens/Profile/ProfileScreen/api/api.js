import axios from "axios";
import qs from "qs";

export const getProfile = (iin, setIsLoading, setUserp) => {
  setIsLoading(true);
  //   const startTime = new Date();
  //   console.log("Request start:", startTime);

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
      setUserp(parsed);
      setIsLoading(false);

      //   const endTime = new Date();
      //   console.log("Request end:", endTime);
      //   console.log("Time taken:", endTime - startTime, "ms");
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};
