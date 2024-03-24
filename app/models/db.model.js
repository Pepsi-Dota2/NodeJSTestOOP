const mysql = require("mysql");
const mysqlConnect = require("../config/dbConfig");

// Create Connection to the database
const connection = mysql.createConnection({
  host: mysqlConnect.HOST,
  user: mysqlConnect.USER,
  password: mysqlConnect.PASSWORD,
  database: mysqlConnect.DATABASE,
});

console.log(mysqlConnect.USER);
console.log(mysqlConnect.HOST);
console.log(mysqlConnect.PASSWORD);
console.log(mysqlConnect.DATABASE);

// Open MySQL connection
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
    return;
  }
  console.log("Successfully connected to database");
});

module.exports = connection;
