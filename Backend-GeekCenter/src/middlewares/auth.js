const jwt = require('jsonwebtoken');

const secret = require('../.env');

module.exports = (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        res.status(400).send({ error: 'No Token Provider' });
    }
 
    const parts = authToken.split(' ');

    if (parts.length !== 2) {
        res.status(400).send({ error: 'Token Error' });
    }

    const [scheme, token] = parts;

    //hegex
    if (!/^Bearer$/i.test(scheme)) {
        res.status(401).send({ error: 'Token malformatted' });
    }

    jwt.verify(token, secret.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        req.userId = decoded.id;
        return next();
    });
}
