export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("Missing 'url' query parameter");
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "Cookie": "ageConfirmed=true",
      },
    });

    const body = await response.text();
    res.status(response.status).send(body);
  } catch (error) {
    res.status(500).send(`Fetch Error: ${error.message}`);
  }
}
