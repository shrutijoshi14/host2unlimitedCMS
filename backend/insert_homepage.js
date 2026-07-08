import mysql from 'mysql2/promise';

async function run() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Shruti@1408',
    database: 'host2unlimited',
    port: 3306
  });

  try {
    // Check if homepage module exists
    const [existing] = await pool.query("SELECT * FROM cms_modules WHERE id = 'homepage'");
    if (existing.length === 0) {
      await pool.query(
        "INSERT INTO cms_modules (id, name, enabled) VALUES ('homepage', 'Homepage Management', 1)"
      );
      console.log('Homepage module inserted successfully!');
    } else {
      console.log('Homepage module already exists.');
    }
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

run();
