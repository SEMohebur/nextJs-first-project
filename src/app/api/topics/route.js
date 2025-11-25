import connectMongoDB from "../../../../libs/mongodb";
import Topic from "../../../../models/topic";
import { NextResponse } from "next/server";

const FRONTEND_URL = "https://next-js-first-project-kappa.vercel.app";

// POST: add topic
export async function POST(request) {
  const { title, description, category, price, image } = await request.json();
  await connectMongoDB();
  await Topic.create({ title, description, category, price, image });

  return NextResponse.json(
    { message: "Topic Created" },
    {
      status: 201,
      headers: {
        "Access-Control-Allow-Origin": FRONTEND_URL,
        "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

// GET: get all topics
export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();

  return NextResponse.json(
    { topics },
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

// DELETE: delete topic by id
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "Topic deleted" },
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
