import { NextResponse } from "next/server";
import { confluenceApi } from "@/lib/atlassian";

export async function GET() {
  try {
    const response = await confluenceApi.get('/group');
    const groups = response.data;
    return NextResponse.json(groups);
  } catch (error) {
    console.error("Failed to fetch Confluence groups:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
