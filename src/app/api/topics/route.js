import connectMongoDB from "../../../../libs/mongodb";
import Topic from "../../../../models/topic";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // অথবা তোমার frontend domain
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// OPTIONS handler (preflight requests)
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// GET all topics
export async function GET() {
  try {
    await connectMongoDB();
    const topics = await Topic.find();
    return new NextResponse(JSON.stringify({ topics }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

// POST a new topic
export async function POST(request) {
  try {
    const { title, description, category, price, image } = await request.json();

    if (!title || !description || !category || !price || !image) {
      return new NextResponse(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    await connectMongoDB();
    const newTopic = await Topic.create({
      title,
      description,
      category,
      price,
      image,
    });

    return new NextResponse(
      JSON.stringify({ message: "Topic Created", topic: newTopic }),
      {
        status: 201,
        headers: corsHeaders,
      }
    );
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

// DELETE a topic by ID
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // last segment of the path

    await connectMongoDB();

    // Convert to ObjectId
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch {
      return new NextResponse(JSON.stringify({ error: "Invalid ID format" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const deleted = await Topic.findByIdAndDelete(objectId);

    if (!deleted) {
      return new NextResponse(JSON.stringify({ error: "Topic not found" }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "Topic deleted successfully" }),
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
