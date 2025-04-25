import { NextRequest, NextResponse } from "next/server";
import { confluenceApi } from "@/lib/atlassian";

export async function GET(
  req: NextRequest,
  { params }: { params: { groupName: string } }
) {
  const groupName = params.groupName;

  try {
    console.log(groupName);
    
    const response = await confluenceApi.get(`/group/${encodeURIComponent(groupName)}/member`);
    const members = response.data;
    return NextResponse.json(members);
  } catch (error) {
    console.error(`Failed to fetch members for group ${groupName}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
