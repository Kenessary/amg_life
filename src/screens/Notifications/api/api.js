import axios from "axios";
import qs from "qs";

export const getNotifications = (
  iin,
  setIsLoading,
  setHistoryStatus,
  setHistoryNotification
) => {
  setIsLoading(true);
  const data = qs.stringify({
    getnotifhistoryiin: iin,
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
      let parsedL = parsed.list;
      let status_parsed = parsed.status;

      let newArray = parsedL.map((list) => {
        return {
          title: list.title,
          body: list.body,
          opened: list.opened,
          type: list.type,
          date: list.date.split(" ")[0],
          hour: list.date.split(" ")[1],
        };
      });

      setHistoryStatus(status_parsed);
      setHistoryNotification(newArray);

      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};
