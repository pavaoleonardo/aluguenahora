const http = require('http');

const data = JSON.stringify({
  username: 'testuser123',
  email: 'testuser123@example.com',
  password: 'TestPassword123!'
});

const req = http.request({
  hostname: 'localhost',
  port: 1337,
  path: '/api/auth/local/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('BODY:', body);
  });
});

req.on('error', (e) => {
  console.error(`Problem: ${e.message}`);
});

req.write(data);
req.end();
