// for checking perpose 
//2 database are need for mysql prisma run and main another one is shadow and create 2 database under the same user for migration ...thank you!!
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
