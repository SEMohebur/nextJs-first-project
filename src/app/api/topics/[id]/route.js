import connectMongoDB from "../../../../../libs/mongodb";
import Topic from "../../../../../models/topic";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    await connectMongoDB();

    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch {
      return new NextResponse(JSON.stringify({ error: "Invalid ID format" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const topic = await Topic.findById(objectId);

    if (!topic) {
      return new NextResponse(JSON.stringify({ error: "Topic not found" }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    return new NextResponse(JSON.stringify({ topic }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: err.message || "Internal Server Error" }),
      { status: 500, headers: corsHeaders }
    );
  }
}
