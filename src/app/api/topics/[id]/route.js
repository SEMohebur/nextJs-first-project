import connectMongoDB from "../../../../../libs/mongodb";
import Topic from "../../../../../models/topic";
import { NextResponse } from "next/server";

// FRONTEND URL dynamic: dev -> localhost, production -> deployed URL
const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://next-js-first-project-kappa.vercel.app"
    : "http://localhost:3000";

// GET: get single topic by id
export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });

  return NextResponse.json(
    { topic },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": FRONTEND_URL,
        "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

// OPTIONS: handle preflight requests
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": FRONTEND_URL,
        "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
