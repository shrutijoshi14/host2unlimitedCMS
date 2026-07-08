import https from 'https';

const postData = JSON.stringify({
  username: "testadmin",
  email: "testadmin@test.com",
  password: "testpassword123"
});

const options = {
  hostname: 'host2unlimitedcms-backend.onrender.com',
  port: 443,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log("Sending POST request to live registration endpoint...");

const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers, null, 2)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`BODY: ${data}`);
  });
});

req.on('error', (e) => {
  console.error(`Request Error: ${e.message}`);
});

req.write(postData);
req.end();
