const http = require('http');
http.get('http://127.0.0.1:8000/api/frontend/dynamic-post-step-form/1', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(data), null, 2)));
});
