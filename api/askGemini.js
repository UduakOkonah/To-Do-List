export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + process.env.GEMINI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }],
        }],
      }),
    });

    const data = await response.json();

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return res.status(200).json({ answer: data.candidates[0].content.parts[0].text });
    } else {
      return res.status(500).json({ error: 'No valid response from Gemini API', raw: data });
    }

  } catch (err) {
    console.error('Error fetching from Gemini:', err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
