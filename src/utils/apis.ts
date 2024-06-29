const DUNE_API_KEY = "41n3jvtDvxgZ0ivna7ZwKRYSvhEsPzZi";

export const fetchUserRanks = async () => {
  try {
    const response = await fetch(
      `https://api.dune.com/api/v1/query/3852566/results?limit=2000`,
      {
        headers: {
          "X-Dune-API-Key": DUNE_API_KEY!,
        },
      }
    );
    const data = await response.json();

    return JSON.stringify(data.result.rows);
  } catch (error) {
    console.error("error occurred while fetching the users ranks: ", error);
  }
};

export const executeRankByFidQuery = async (fid: string) => {
  try {
    const response = await fetch(
      `https://api.dune.com/api/v1/query/3850728/execute`,
      {
        method: "POST",
        headers: {
          "X-Dune-API-Key": DUNE_API_KEY!,
        },

        body: JSON.stringify({
          query_parameters: {
            fid: fid,
          },
        }),
      }
    );

    const data = await response.json();

    return JSON.stringify(data);
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchRankByExecutionId = async (executionId: string) => {
  try {
    const response = await fetch(
      `https://api.dune.com/api/v1/execution/${executionId}/results`,
      {
        method: "GET",
        headers: {
          "X-Dune-API-Key": DUNE_API_KEY!,
        },
      }
    );

    const data = await response.json();

    if (!data.is_execution_finished) {
      return JSON.stringify(data);
    }

    return JSON.stringify(data);
  } catch (error) {
    console.error("error while fetching execution results: ", error);
  }
};

export const fetchExecutedUserRank = async () => {
  try {
    const response = await fetch(
      `https://api.dune.com/api/v1/query/3850728/results`,
      {
        method: "GET",
        headers: {
          "X-Dune-API-Key": DUNE_API_KEY!,
        },
      }
    );

    const data = await response.json();

    if (!data.is_execution_finished) {
      return JSON.stringify(data);
    }

    return JSON.stringify(data.result.rows);
  } catch (error) {
    console.error("error while fetching executed user rank: ", error);
  }
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

export const fetchUserRankByFid = async (fid: string) => {
  try {
    const userRanksString = await fetchUserRanks();
    const userRanks = JSON.parse(userRanksString ?? "[]");

    const userRank = userRanks?.find(
      (user: { fid: string }) => user.fid === fid
    );
    if (userRank) {
      return JSON.stringify(userRank);
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching user ranks:", error);
  }
};
