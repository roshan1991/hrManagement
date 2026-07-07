const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });
    
    const tables = ['Companies', 'Branches', 'Departments', 'Posts'];
    for (const table of tables) {
      try {
        const [columns] = await connection.query(`DESCRIBE ${table}`);
        console.log(`${table} columns:`, columns.map(c => ({ Field: c.Field, Type: c.Type })));
      } catch (e) {
        console.log(`Error describing ${table}:`, e.message);
      }
    }
    
    await connection.end();
  } catch (err) {
    console.error('Connection failed:', err.message);
  }
}
run();
