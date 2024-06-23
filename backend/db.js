import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  // LOCAL HOST
  // host: "localhost",
  // user: "root",
  // password: process.env.LOCAL_DB_PASSWORD,
  // database: process.env.LOCAL_DB_NAME,

  // HEROKU
  // host: "us-cluster-east-01.k8s.cleardb.net",
  // user: "b9754a3004d8b5",
  // password: process.env.HEROKU_DB_PASSWORD,
  // database: process.env.HEROKU_DB_NAME,

  // FREE SQL DATABASE
  host: "sql12.freesqldatabase.com",
  user: "sql12714848",
  password: process.env.FREE_SQL_DB_PASSWORD,
  database: process.env.FREE_SQL_DB_NAME,

  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

// export const db = mysql.createConnection({
//   // LOCAL HOST
//   // host: "localhost",
//   // user: "root",
//   // password: process.env.LOCAL_DB_PASSWORD,
//   // database: process.env.LOCAL_DB_NAME,

//   // HEROKU
//   // host: "us-cluster-east-01.k8s.cleardb.net",
//   // user: "b9754a3004d8b5",
//   // password: process.env.HEROKU_DB_PASSWORD,
//   // database: process.env.HEROKU_DB_NAME,

//   // FREE SQL DATABASE
//   host: "sql12.freesqldatabase.com",
//   user: "sql12714848",
//   password: process.env.FREE_SQL_DB_PASSWORD,
//   database: process.env.FREE_SQL_DB_NAME,
// });
