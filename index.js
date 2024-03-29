// import express from "express";
// import pg from "pg";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import cors from "cors";

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;
// const { PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT } = process.env;
// const pool = new pg.Pool({
//     user: PGUSER,
//     host: PGHOST,
//     database: PGDATABASE,
//     password: PGPASSWORD,
//     port: PGPORT,
// });

// app.use(bodyParser.json());
// app.use(cors());

// app.get('/test', async (req, res) => {
//     try {
//         const client = await pool.connect();
//         const result = await client.query('SELECT $1::text as message', ['Hello world!']);
//         const message = result.rows[0].message;
//         res.send(message);
//         client.release();
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error connecting to database');
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
// });

// index.js

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const pricingRoutes = require('./routes/route');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
app.use('/api/pricing', pricingRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});



