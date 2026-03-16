
const fetch = require('node-fetch');

async function testConnection() {
  const url = 'https://djjygexkdcvuiimqlyke.supabase.co/auth/v1/health';
  console.log(`Testing connection to: ${url}`);
  try {
    const response = await fetch(url);
    console.log(`Status: ${response.status}`);
    console.log(`Status Text: ${response.statusText}`);
  } catch (error) {
    console.error('Fetch Error:', error.message);
  }
}

testConnection();
