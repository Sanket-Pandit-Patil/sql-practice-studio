const fs = require('fs');
const path = require('path');
const pool = require('./postgres');

const seedPostgres = async () => {
    try {
        const sqlPath = path.join(__dirname, 'seed_pg.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Seeding PostgreSQL database...');
        await pool.query(sql);
        console.log('Successfully seeded PostgreSQL database!');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding PostgreSQL:', error);
        process.exit(1);
    }
};

seedPostgres();
