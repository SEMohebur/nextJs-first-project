import connectMongoDB from "../../../../libs/mongodb";
import Topic from "../../../../models/topic";
import { NextResponse } from "next/server";

// helper function to set CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // or your frontend domain
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({ topics }, { headers: corsHeaders });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request) {
  try {
    const { title, description, category, price, image } = await request.json();
    await connectMongoDB();
    const newTopic = await Topic.create({
      title,
      description,
      category,
      price,
      image,
    });
    return NextResponse.json(
      { message: "Topic Created", topic: newTopic },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Topic Deleted" },
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
