const db = require("./db");
const login = async() => {
    return await db('SELECT * FROM user where user_name="admin"');
}
module.exports = login