import connectMongoDB from "../../../../../libs/mongodb";
import Topic from "../../../../../models/topic";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params; // fixed here
    await connectMongoDB();

    const topic = await Topic.findById(id);

    if (!topic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ topic }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
