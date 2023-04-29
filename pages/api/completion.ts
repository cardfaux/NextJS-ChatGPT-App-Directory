import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_CHATGPT_API_KEY,
});

export default async function completion(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = req.body;
    const prompt = body.prompt || '';

    try {
      const openai = new OpenAIApi(configuration);
      const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.7,
        max_tokens: 1024,
      });

      const aiResponse = completion?.data?.choices[0]?.text?.trim();
      return res.status(200).json({ result: aiResponse });
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      reportError({ message, name: 'completion', body });
      console.log(message);
      return res.status(500).json({ error: { message: message } });
    }
  } else {
    return res.status(500).json({ error: { message: 'Invalid Api Route' } });
  }
}
