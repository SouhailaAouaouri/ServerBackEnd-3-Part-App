const axios = require("axios");

const introspect = async (jwt) => {
  const res = await axios.post("http://0.0.0.0:3000/oauth2/introspect", {
    token: jwt,
    token_type_hint: "access_token",
  });
  console.log("res********", res);
  return res.data;
};

module.exports = introspect;
