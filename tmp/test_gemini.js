const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testKey() {
  try {
    const genAI = new GoogleGenerativeAI('gen-lang-client-0446167703');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent('Say hello world');
    console.log('SUCCESS:', result.response.text());
  } catch (error) {
    console.error('FAILED:', error.message);
  }
}
testKey();
