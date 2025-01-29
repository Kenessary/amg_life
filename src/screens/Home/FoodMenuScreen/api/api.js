import axios from "axios";
import qs from "qs";

export const getBalance = (iin, setBalance) => {
  const data = qs.stringify({
    balanspitiin: iin,
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
      let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
      setBalance(JSON.parse(info).status);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getMenu = (setMenu) => {
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
    })
    .catch(function (error) {
      console.log(error);
    });
};
