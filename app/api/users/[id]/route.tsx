import { NextRequest, NextResponse } from "next/server";
import { confluenceApi } from "@/lib/atlassian";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(id);

  if (!id) {
    return new NextResponse(
      JSON.stringify({ error: 'Missing accountId.' }),
      { status: 400 }
    );
  }

  try {
    const confluenceUrl = `user?accountId=${id}`;
    const { data } = await confluenceApi.get(confluenceUrl);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
