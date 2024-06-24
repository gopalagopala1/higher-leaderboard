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

export const fetchUsersByFid = async (fids: number[]) => {
  const fidsString = fids.join("%2C%20");
  const res = await fetch(
    `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fidsString}`,
    {
      headers: {
        api_key: process.env.NEYNAR_API_KEY!,
      },
    }
  );

  const data = await res.json();

  return JSON.stringify(data.users);
};
