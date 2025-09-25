import fetch from 'node-fetch';

export const handler = async () => {
  try {
    const resp = await fetch('https://main.inf.fm:8101/index.html?sid=1', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (NetlifyServerProxy)'
      }
    });
    const html = await resp.text();

    // Поиск строки Playing Now
    const match = html.match(/<td>Playing Now:\s*<\/td>\s*<td>.*?<b>.*?<a.*?>(.*?)<\/a>.*?<\/b>.*?<\/td>/is);
    const now = match ? match[1].trim() : '';

    let artist = '', title = '';
    if (now.includes(' - ')) {
      [artist, title] = now.split(' - ', 2);
    } else {
      title = now;
    }

    return {
      statusCode: 200,
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ artist, title, raw: now })
    };
  } catch (e) {
    return {
      statusCode: 502,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Fetch error', details: e.message })
    };
  }
};
