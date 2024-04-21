const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Proxy endpoint
app.post('/foodvisor-analysis', async (req, res) => {
  try {
    const apiKey = req.headers.authorization;
    const imageUrl = req.body.image;
    const foodvisorResponse = await axios.post('https://vision.foodvisor.io/api/1.0/en/analysis/', { image: imageUrl }, {
      headers: {
        'Authorization': apiKey
      }
    });
    res.json(foodvisorResponse.data);
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
