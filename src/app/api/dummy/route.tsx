import { type NextRequest } from 'next/server'
import { ExecuteQuery } from '../dataconnect_proxy';

export async function GET(req: NextRequest) {
  return ExecuteQuery("ListMovies");
}

export async function POST(request: NextRequest) {
  return Response.json(request.body);
}