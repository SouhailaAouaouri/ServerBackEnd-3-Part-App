const introspect = require("./introspect");

async function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Authorization header missing");
  }

  const jwt = authHeader.split(" ")[1];

  try {
    const payload = await introspect(jwt);
    console.log("payload .........", payload);
    req.scope = payload.scope;
    console.log('scopes :',req.scope);
    req.aud = payload.aud;
    console.log('aud :',req.aud);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Invalid token");
  }
}

module.exports = validateToken;
