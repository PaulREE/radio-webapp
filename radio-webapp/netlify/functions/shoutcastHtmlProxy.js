import fetch from 'node-fetch';

export const handler = async () => {
  try {
    const resp = await fetch('https://main.inf.fm:8101/index.html?sid=1');
    const html = await resp.text();
    // Парсим Playing Now
    const match = html.match(/<td>Playing Now:\s*<\/td>\s*<td>.*?<b>.*?<a.*?>(.*?)<\/a>.*?<\/b>.*?<\/td>/is);
    const now = match ? match[1].trim() : '';
    let artist = '', title = '';
    if (now.includes(' - ')) [artist, title] = now.split(' - ', 2);
    else title = now;
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ artist, title, raw: now })
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: true }) };
  }
};