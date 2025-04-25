import { NextResponse } from "next/server";
import { confluenceApi, lifecycleApi } from "@/lib/atlassian";
import { AtlassianUser, AtlassianUserResponse } from "@/types/IAtlassianUser";

export async function GET() {
  const orgId = '541ae007-d73c-45f9-adfb-0331a737bd70';
  let url: string | null = `/admin/v1/orgs/${orgId}/users`;
  const allUsers: AtlassianUser[] = [];

  try {
    while (url) {
      const response: { data: AtlassianUserResponse } = await lifecycleApi.get(url);
      const data: AtlassianUserResponse = response.data;

      allUsers.push(...(data.data || []));

      const nextUrl: string | undefined = data.links?.next;
      url = nextUrl ? new URL(nextUrl).pathname + new URL(nextUrl).search : null;
    }

    return NextResponse.json(allUsers);
  } catch (error) {
    console.error('Failed to fetch all users:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {

  try {
    const { accountId, action, message } = await request.json();
    if (!accountId || !action) {
      return new NextResponse('Missing accountId or action.', { status: 400 });
    }

    const url = `/users/${accountId}/manage/lifecycle/${action}`;

    console.log(url);
    
    const body = action === 'disable' && message ? { message } : undefined;
    const { data } = await lifecycleApi.post(url, body);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to process the lifecycle action:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
