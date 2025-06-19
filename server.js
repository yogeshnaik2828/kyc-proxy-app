const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/submit-kyc', async (req, res) => {
  try {
    const response = await fetch('https://webhooks.magnetapp.in/dev/api/v1/credit-builder/okyc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const contentType = response.headers.get('content-type');
    const data = contentType.includes('json') ? await response.json() : await response.text();

    res.status(response.status).send(data);
  } catch (err) {
    console.error('Proxy Error:', err);
    res.status(500).json({ error: 'Proxy Failed', detail: err.message });
  }
});

app.listen(3000, () => {
  console.log('✅ Proxy server running at http://localhost:3000');
});
