# LPTech Trace Visualizer

### 📡 Full-Stack Data Visualization Project

**Purpose:**  
This project reads binary trace data (BLOBs) from a MySQL database, decodes each 601-point waveform using Node.js, and visualizes the result in real-time through an interactive web dashboard.

---

## 🧩 System Architecture

| Layer | Technology | Purpose |
|--------|-------------|----------|
| **Frontend** | HTML5 Canvas + JavaScript | Renders the waveform dynamically |
| **Backend** | Node.js + Express | REST API endpoint `/api/traces` |
| **Database** | MySQL (5.7 / 8.4) | Stores raw BLOB waveform data |
| **Config** | dotenv | Secure environment variables |

---

## ⚙️ Workflow Overview
1. **MySQL table** `test` holds 50 traces (`trace_id`, `trace_data`, `trace_time`).  
   - Each `trace_data` field = 601 signed 32-bit integers (~2404 bytes).  
2. **Node.js backend**  
   - Uses `mysql2/promise` to query the table.  
   - Decodes each 4-byte segment using `Buffer.readInt32BE(i)/1000`.  
   - Returns structured JSON `{ trace_id, trace_time, values }`.  
3. **Frontend**  
   - Fetches `/api/traces` once.  
   - Plots each trace on a black grid (spectrum analyzer style).  
   - Animates 1 trace per second; loops automatically.  
   - Includes a “Pause / Play” toggle for review.

---

## 🗂️ Key Files

| File | Description |
|------|--------------|
| `server.js` | Express server, serves static files & API endpoint |
| `src/db.js` | Connects to MySQL using credentials from `.env` |
| `src/decoder.js` | Converts BLOB → numeric array (big-endian decode) |
| `public/index.html` | Canvas rendering logic & UI |
| `.env.example` | Template for database connection settings |

---

▶️ Running Locally
1. Clone & Install
git clone https://github.com/<your-username>/lptech-trace-visualizer.git
cd lptech-trace-visualizer
npm install

2. Configure Environment

Create a .env file:

DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=lptech_test
DB_PORT=3306

3. Start the Server
node server.js


Visit http://localhost:3000

If cloning from GitHub later:

git clone https://github.com/<your-username>/lptech-trace-visualizer.git
cd lptech-trace-visualizer

3️⃣ Install dependencies
npm install

🐳 4️⃣ Run MySQL 5.7.21 with Docker
Create and start the container:
docker pull mysql:5.7.21
docker run -d --name mysql57 `
  -e MYSQL_ROOT_PASSWORD=YourPass123! `
  -p 3307:3306 `
  -v "C:\mysql57-data:/var/lib/mysql" `
  mysql:5.7.21

Import test data:
docker cp "C:\Users\AlecP\OneDrive\Documents\LPT Program\LPT Programmer Test\test_data.sql" mysql57:"/test_data.sql"
docker exec -i mysql57 mysql -uroot -pYourPass123! -e "CREATE DATABASE IF NOT EXISTS lptech_test;"
docker exec -i mysql57 sh -c "mysql -uroot -pYourPass123! lptech_test < /test_data.sql"


✅ Verify:

docker exec -i mysql57 mysql -uroot -pYourPass123! -e ^
"USE lptech_test; SHOW TABLES; SELECT COUNT(*) AS rows FROM test;"

🖥️ 5️⃣ Configure environment

Create a .env file in the project root:

DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASS=YourPass123!
DB_NAME=lptech_test

🚀 6️⃣ Run the server
node server.js


You’ll see:

Server running at http://localhost:3000
