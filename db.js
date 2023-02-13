const Pool = require(`pg`).Pool;

const pool = new Pool({
    host : "localhost",
    user : "postgres",
    port : 5432,
    password : "Rajv@826",
    database :"Clapit"

});
module.exports = pool;