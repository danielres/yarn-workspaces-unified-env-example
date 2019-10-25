const jwksClient = require("jwks-rsa");
const jwt = require("jsonwebtoken");

const getKey = domain => (header, cb) =>
  jwksClient({
    jwksUri: `https://${domain}/.well-known/jwks.json`
  }).getSigningKey(header.kid, (err, key) =>
    cb(null, key.publicKey || key.rsaPublicKey)
  );

module.exports = async ({ accessToken, audience, domain, issuer }) => {
  const options = { algorithms: ["RS256"], audience, issuer };
  return new Promise((resolve, reject) =>
    jwt.verify(accessToken, getKey(domain), options, (err, decoded) =>
      err ? reject(err) : resolve(decoded)
    )
  );
};
