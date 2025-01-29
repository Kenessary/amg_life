const Server = {
  scheme: "http",
  ip_address: "95.57.218.120",
  sub_folder: "?index",
};

const SERVER_URL_WITHOUT_ENDPOINT = (Server) => {
  const url = `${Server.scheme}://${Server.ip_address}/${Server.sub_folder}/`;
  return url;
};

const Headers = {
  Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
  "Content-Type": "application/x-www-form-urlencoded",
};

const Headers_Login = {
  "Content-Type": "application/x-www-form-urlencoded",
};

const ApiEndPoints = {
  login: SERVER_URL_WITHOUT_ENDPOINT(Server),
};

export { ApiEndPoints, Headers, Headers_Login };
