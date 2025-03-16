const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api'); // นำเข้า routes/api.js
const https = require('https');
const fs = require('fs');
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: true, 
  credentials: true, 
}));
app.use(cookieParser());

// Routes
app.use('/api/v1', apiRouter); // ใช้ apiRouter ที่กำหนดใน routes/api.js ด้วย prefix '/api/v1'
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs)); // Swagger UI (คอมเมนต์ไว้ตามต้นฉบับ)

// ตั้งค่า SSL สำหรับ HTTPS
const ssl_options = {
  key: fs.readFileSync('./ssl/key.pem'), // ต้องมีไฟล์ key.pem ในโฟลเดอร์ ssl
  cert: fs.readFileSync('./ssl/cert.pem'), // ต้องมีไฟล์ cert.pem ในโฟลเดอร์ ssl
};

// กำหนดพอร์ต
const port = 8800; // พอร์ต HTTP
const secure_port = 8443; // พอร์ต HTTPS

// เริ่มเซิร์ฟเวอร์ HTTP
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// เริ่มเซิร์ฟเวอร์ HTTPS
https.createServer(ssl_options, app).listen(secure_port, () => {
  console.log(`Server listening on port ${secure_port}`);
});
