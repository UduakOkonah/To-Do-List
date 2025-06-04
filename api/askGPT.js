// /api/askGPT.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'No prompt provided' });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful productivity assistant.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 150
      })
    });

    const data = await openaiRes.json();

    if (openaiRes.ok) {
      const reply = data.choices[0].message.content.trim();
      res.status(200).json({ reply });
    } else {
      res.status(openaiRes.status).json({ error: data });
    }
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
