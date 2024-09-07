
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Fetching data from the provided API
    const response = await fetch('https://api.ssv.network/api/v4/mainnet/operators?page=1&perPage=15&ordering=validators_count:desc');

    // Check if the request was successful
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: response.status });
    }

    // Parse the response data as JSON
    const data = await response.json();
    // Return the data in the response
    return NextResponse.json(data);
  } catch (error) {
    // Handle any errors that occurred during the fetch
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
