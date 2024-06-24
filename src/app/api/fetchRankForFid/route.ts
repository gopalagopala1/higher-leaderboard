import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  fid: string;
}

export const fetchRankByFid = async (fid: string) => {
  const response = await fetch(
    `https://api.dune.com/api/v1/query/3850728/results?fid=${fid}`,
    {
      headers: {
        "X-Dune-API-Key": process.env.DUNE_API_KEY!,
      },
    }
  );
  const data = await response.json();

  return JSON.stringify(data.result.rows);
};

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const reqBody: RequestBody = await req.json();
    const fid = reqBody.fid as string;

    const jsonData = await fetchRankByFid(fid);

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
