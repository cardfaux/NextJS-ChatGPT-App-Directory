import { NextApiRequest, NextApiResponse } from 'next';

import stacksJson from '@/data/stacks.json';
import { StackTypes } from '@/types/StackTypes';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const stacks = stacksJson as StackTypes;
    res.status(200).json(stacks);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error });
  }
}
