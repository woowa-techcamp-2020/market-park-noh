const {cookieParser} = require('./middleware/authenticate.js');
const {findSessionID, deleteSessionID} = require('../api/register/database.js');

function deleteCookie(req, res){
    const cookies = req.headers.cookie;
    const parsedCookie = cookieParser(cookies);
    const sessionID = parsedCookie.sessionID;
    return deleteSessionID(sessionID);
}

module.exports = deleteCookie;