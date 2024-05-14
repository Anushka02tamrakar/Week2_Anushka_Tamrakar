import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: "TestOrder",
    password: "Centralogic@12",
    port: 5432,
});

export default pool;