const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '94.130.22.223', // or 'localhost' if on same server
  user: 'arakashc_akash',
  password: 'akash100@@ssSS',
  database: 'arakashc_hms_shadow',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('MySQL connected successfully!');
  }
  connection.end();
});
