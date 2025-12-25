const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: req.body.message }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'AI request failed' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
