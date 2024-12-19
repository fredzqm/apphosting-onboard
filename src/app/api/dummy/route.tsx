import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  return Response.json({"hello": "world"});
}

export async function POST(request: NextRequest) {
  return Response.json(request.body);
}