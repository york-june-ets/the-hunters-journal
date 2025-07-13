// import { Pool } from 'pg';

// const pool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: 'postgres',
//   database: 'the-hunters-journal', // match your Docker/Postgres db name
// });

// export async function query<T = any>(
//   text: string,
//   params?: any[]
// ): Promise<{ rows: T[] }> {
//   const result = await pool.query(text, params);
//   return { rows: result.rows };
// }
