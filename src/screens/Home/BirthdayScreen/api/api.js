import axios from "axios";

export const btd = (setIsLoading, setBirthday) => {
  setIsLoading(true);
  const config = {
    method: "get",
    url: `http://95.57.218.120/?apitest.helloAPI4={}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
      let parse_first = JSON.parse(info);
      let parse_second = JSON.parse(parse_first.response);
      let parse_third = parse_second.status;
      setBirthday(JSON.stringify(parse_third).split(";"));
      let arr = JSON.stringify(parse_third).split(";");
      let norm = arr.map((list) => list.replace('"', "").replace(" ", ""));
      norm.pop();
      norm.push("Зәкір Кенесары Тәжібайұлы");

      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};
