import https from 'https';

const url = 'https://host2unlimitedcms-backend.onrender.com/api/modules';

console.log(`Pinging modules endpoint: ${url}...`);

const req = https.get(url, (res) => {
  console.log(`Response Status Code: ${res.statusCode}`);
  console.log('Response Headers:', res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Body:', data.substring(0, 500));
  });
});

req.on('error', (e) => {
  console.error('Request Error:', e);
});

req.end();
