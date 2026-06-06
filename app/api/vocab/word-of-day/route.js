import { getWordOfTheDay } from '../../../../lib/vocabUtils';

export async function GET() {
  try {
    const word = getWordOfTheDay(new Date());
    return new Response(JSON.stringify(word || {}), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({}), { status: 200 });
  }
}
