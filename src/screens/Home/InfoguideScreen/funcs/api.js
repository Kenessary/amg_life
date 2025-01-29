import axios from "axios";

export const getDep = (iin, id, setIsLoading, setDepartment, setShowed) => {
  setIsLoading(true);
  const config = {
    method: "get",
    url: `http://95.57.218.120/?apitest.helloAPIWithParams4444={"id":"${
      iin === "111111111111" ? 179 : id
    }"}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
      let parse_third = JSON.parse(JSON.parse(info).response).list;
      let newArray = parse_third.map((list) => {
        return {
          id: list.id,
          name: list.name,
          roditel: list.roditel,
          prioritet: list.prioritet,
          children: list.children,
          employees: list.employees,
        };
      });
      setDepartment(newArray);
      setIsLoading(false);
      setShowed(true);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};
