const { promisify } = require("util");
const request = promisify(require("request"));

let userInfoCache = {};

module.exports = async ({ accessToken, domain }) =>
  userInfoCache[accessToken] ||
  (await refreshUserInfo({ accessToken, domain }));

async function refreshUserInfo({ accessToken, domain }) {
  const data = await request(`https://${domain}/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  }).then(({ body }) => JSON.parse(body));

  userInfoCache[accessToken] = data;
  console.log("userInfo cached");
  return data;
}
