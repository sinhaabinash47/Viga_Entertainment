const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const { PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT } = process.env;
const pool = new pg.Pool({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
    ssl: {
        rejectUnauthorized: false // For testing purposes, you may need to set this to false
    }
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error("Error acquiring client", err.stack);
    }
    console.log("Connected to database successfully.");
    release();
})
module.exports = pool;
