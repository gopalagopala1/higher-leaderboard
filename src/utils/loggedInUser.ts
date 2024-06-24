export async function getUserRank(fid: string) {
  const response = await fetch(`/api/fetchRankForFid?fid=${parseInt(fid)}`, {
    method: "GET",
  });
  // calculate rank of the user
  return response.json();
}

export async function getUser(fid: string) {
  return localStorage.getItem("userData");
}
