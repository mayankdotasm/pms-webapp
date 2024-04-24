//database.js

import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export default db;
// async function getSocieties() {
//     const [rows] = await db.query("select * from society");
//     return rows[0];
// }

// async function getSociety(socid) {
//     // prepared statement
//     const [row] = await db.query(`
//     select * from society
//     where socid=?`, [socid]);
//     return row[0];
// }

// async function createSoc(socid,socname,mentor_name,total_seats){
//     const [result]= await db.query(`
//     insert into 
//     society (socid,socname,mentor_name,total_seats)
//     values (?, ?, ?, ?)`,[socid,socname,mentor_name,total_seats]);
//     return result;
// }
