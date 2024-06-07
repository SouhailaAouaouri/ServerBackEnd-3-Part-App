const config = require('config');
const jwt = require('jsonwebtoken');
function auth(req, res, next) {
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            //verify the token
            const decoded = jwt.verify(bearerToken, config.get('jwtPrivateKey'));
            //check if the token has exipred
            //token expired in 1day
            if (decoded.exp *1000 < Date.now()) {
                // //*1000 to keep both in milliseconds for the comparison:
                //     //decoded.exp is in seconds
                //     // Date.now is in milliseconds
                res.status(400).send('Access token has expired');
            }
            req.person = decoded;
            next();
        } else {
            res.status(403).send('Tu dois te connecter pour accéder à cette page')
        }
    }
    catch (e) {
        if(e.name==='TokenExpiredError'){
            res.status(400).send('Access token has expired');
        }
        else {
            res.status(400).send('Invalid token');
        }
    }
}
module.exports = auth;