var jwt = require('jsonwebtoken');

var config = require('../config');
module.exports = function (req, res, next) {
    console.log("\n=================================================================");
    console.log("Request Headers", req.headers);
    console.log("-----------------------------------------------------------------");
    console.log("Request Body", req.body);
    console.log("-----------------------------------------------------------------");
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 'jsonwebtoken', function (err, decoded) {
            if (err) {
                return res.status(config.UNAUTHORIZED).json({message: err.message});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(config.UNAUTHORIZED).json({
            message: 'Unauthorized access'
        });
    }
}