import { executeRankByFidQuery, fetchRankByExecutionId } from "@/utils/apis";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  fid: string;
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const executionId = url.searchParams.get("executionId") as string;

    const jsonData = await fetchRankByExecutionId(executionId);

    return new NextResponse(jsonData, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    return new NextResponse("Failed to fetch leaderboard", { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody: RequestBody = await req.json();
    const fid = reqBody.fid as string;

    const jsonData = await executeRankByFidQuery(fid);

    return new NextResponse(jsonData, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    return new NextResponse("Failed to fetch leaderboard", { status: 500 });
  }
}
