// src/app/api/search/route.ts or pages/api/search.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { searchQuery, result } = req.body;
    const API_URL = "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2";
    const AUTH_TOKEN = `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': AUTH_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {
            source_sentence: searchQuery,
            sentences: result,
          }
        })
      });

      const output = await response.json();
      res.status(200).json(output);
    } catch (error) {
      res.status(500).json({ error: 'Error during search' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
