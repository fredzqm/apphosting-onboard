import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  // await new Promise(resolve => setTimeout(resolve, 5000));
  return Response.json({"dummy": "data", "ok": "sure"})
}

export async function POST(request: NextRequest) {
  return Response.json(request.body);
}