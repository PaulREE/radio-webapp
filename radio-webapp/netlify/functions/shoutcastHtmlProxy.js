import fetch from 'node-fetch';

export const handler = async () => {
  try {
    // Запрашиваем текущий трек напрямую
    const resp = await fetch('https://main.inf.fm:8101/currentsong?sid=1', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (NetlifyServerProxy)'
      }
    });
    const data = await resp.text();

    // Разделяем строку с ' - ' на артиста и трек
    let artist = '', title = '';
    if (data.includes(' - ')) {
      [artist, title] = data.split(' - ', 2);
    } else {
      title = data;
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ artist, title, raw: data.trim() })
    };
  } catch (e) {
    return {
      statusCode: 502,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Fetch error', details: e.message })
    };
  }
};