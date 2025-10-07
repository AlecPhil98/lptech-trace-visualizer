// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getConnection } from './src/db.js';
import { decodeBlobToValues } from './src/decoder.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.static('public'));

app.get('/api/traces', async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const [rows] = await conn.execute(
      'SELECT trace_id, trace_data, trace_time FROM test ORDER BY trace_id ASC'
    );
    const traces = rows.map(r => ({
      trace_id: r.trace_id,
      trace_time: r.trace_time,
      values: decodeBlobToValues(r.trace_data)
    }));
    res.json({ count: traces.length, traces });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: String(err) });
  } finally {
    if (conn) await conn.end();
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
