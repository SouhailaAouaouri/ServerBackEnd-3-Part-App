const jwt = require('jsonwebtoken');
const config = require('config');

exports.generateAuthToken = (person) => {

    //si le role non null et le compte est activé
    if (person.role !== null && person.isActivate === true) {
        const secretKey = config.get('jwtPrivateKey');
        try {
            const token = jwt.sign(
                { _id: person._id, role: person.role },
                secretKey,
                { expiresIn: '5m' }
            );
            return token;
        } catch (error) {
            console.error('Error generating JWT token:', error);
            return null;
        }
    }
    return null;
};
