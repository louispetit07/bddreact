const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '172.18.0.4',
  user: 'root',
  password: 'enzocaca',
  database: 'fontaine'
});

const getDeuxiemeLigneLyceepro = (callback) => {
  connection.query('SELECT * FROM lyceepro LIMIT 1, 1', function (error, results, fields) {
    if (error) throw error;
    callback(results[0]);
  });
};

module.exports = getDeuxiemeLigneLyceepro;
