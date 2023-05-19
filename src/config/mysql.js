/*
const mysql = require("mysql");
const logger = require('./logger');
let { mysqlEnv } = require('./vars');

try {
  mysqlEnv = JSON.parse(mysqlEnv)
} catch (e) {
  mysqlEnv = {}
  logger.info("unable to parse mysqlEnv, err:", e)
}

const connObj = {
  connectionLimit: 10,
  host: mysqlEnv.host,
  user: mysqlEnv.user,
  password: mysqlEnv.password,
  database: 'global'
};


const pool = mysql.createPool(connObj);

const initTable = [
  `CREATE TABLE IF NOT EXISTS sample_table (
  			id int(11) NOT NULL AUTO_INCREMENT,
  			email varchar(320) DEFAULT NULL,
  			name varchar(320) DEFAULT NULL,
			  active int(11) DEFAULT '1',
  			PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1`
];

function initMysqlTables() {

  setTimeout(function () {
    initTable.forEach(n => {
      pool.query(n, function (err, result) {
        if (err) {
          logger.info("initMysqlTables error:", err)
        } else {
          logger.info("initMysqlTables result:", result)
        }
      })
    })
  }, 0);
}

module.exports = {
  pool: pool,
  initMysqlTable: initMysqlTables
}
*/