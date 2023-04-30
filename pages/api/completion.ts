import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { withNextSession } from '@/lib/session';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_CHATGPT_API_KEY,
});

const AI_PROMPT =
  "The following is a conversation with Walt. Walt is helpful and creative. Walt's only knowledge is React JS library. He can only answer questions related to React JS. He only cares about React JS. Walt provides often code examples. Walt provides answers formatted in markdown format.";
const AI_RESPONSE =
  "```js\nimport React from 'react';\n\nconst MyComponent = () => {\n  return <div>I'm a simple component!</div>;\n};\n\nexport default MyComponent;\n```\n\nThis example is a basic React component. It imports the React library, defines a component function, and returns a DOM element. Finally, the component is exported so it can be imported and used in other components.";

export default withNextSession(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const body = req.body;
    const prompt = body.prompt || '';
    const { user } = req.session;

    if (!configuration.apiKey) {
      return res.status(500).json({ error: { message: 'OpenAi Api Key is missing!' } });
    }

    if (!user) {
      return res.status(500).json({ error: { message: 'Session is missing!' } });
    }

    console.log(user.uid + ' wants to get some answers!');

    await new Promise((res) => setTimeout(res, 500));
    return res.status(200).json({ result: AI_RESPONSE });

    try {
      const openai = new OpenAIApi(configuration);

      const formattedPrompt = AI_PROMPT + '\n' + prompt + '\n' + 'Walt:';

      const completion = await openai.createCompletion({
        model: 'text-davinci-003', //* davinci is the default
        prompt: formattedPrompt,
        temperature: 0.7, //* 0.7 is the default
        max_tokens: 1024, //* one token is roughly 4 characters
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
  } else if (req.method === 'PUT') {
    const { uid } = req.query;

    if (!uid) {
      return res.status(500).json({ error: { message: 'Invalid uid provided!' } });
    }

    req.session.user = {
      uid,
    };

    await req.session.save();

    return res.status(200).json(uid);
  } else {
    return res.status(500).json({ error: { message: 'Invalid Api Route' } });
  }
});
