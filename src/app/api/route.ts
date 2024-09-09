import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: NextApiResponse) {
  const { searchQuery, result } = await req.json();  // Use `req.json()` to get request body in new app directory
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
        },
      }),
    });

    const output = await response.json();
    // Return the response using `NextResponse`
    return NextResponse.json(output); 
  } catch (error) {
    // Handle and return error response using `NextResponse`
    return NextResponse.json({ error: 'Error during search' });
  }
}
