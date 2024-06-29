"use client";
import { Rank, UserData } from "@/app/types/types";
import { fetchUserRankByFid } from "@/utils/apis";
import {
  AuthKitProvider,
  SignInButton,
  StatusAPIResponse,
} from "@farcaster/auth-kit";
import "@farcaster/auth-kit/styles.css";
import localFont from "next/font/local";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaShareFromSquare } from "react-icons/fa6";

const kreadonDemi = localFont({
  src: "../../public/fonts/Kreadon-Demi.ttf",
});

export default function Leaderboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState<Rank[]>([]);
  const [leadData, setLeadData] = useState<Rank[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loggedInUserRank, setLoggedInUserRank] = useState<Rank>();
  const [loggedInUserData, setLoggedInUserData] = useState<Partial<UserData>>();
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [fid, setFid] = useState<number>();
  const [loading, setLoading] = useState<boolean>();
  const [isFetchingUserRank, setFetchingUserRank] = useState<boolean>(false);
  const [executionId, setExecutionId] = useState<boolean>();
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalIdRef = useRef(null);

  const fetchUsers = async (fids: number[]) => {
    const response = await fetch(`/api/fetchUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fids }),
    });

    const data: UserData[] = await response.json();
    setUsers((prevUsers) => [...prevUsers, ...data]);
  };

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      setLoading(true);
      const response = await fetch(`/api/fetchLeaderBoard`, {
        method: "GET",
      });

      const data: Rank[] = await response.json();
      setLeadData(data);
      setLoading(false);
    };

    if (leadData.length === 0) {
      fetchLeaderBoard();
    }
  }, [leadData.length]);

  useEffect(() => {
    setLoading(true);
    if (leadData.length === 0) {
      console.error("Data array is empty");
      return;
    }

    const ranksPerPage = parseInt(process.env.NEXT_POST_PER_PAGE || "15");

    const indexOfLastPost = currentPage * ranksPerPage;
    const indexOfFirstPost = indexOfLastPost - ranksPerPage;
    const currentRanks = leadData.slice(indexOfFirstPost, indexOfLastPost);

    setDisplayData((prevRanks) => [...prevRanks, ...currentRanks]);

    const fids = currentRanks
      .filter(
        (post): post is Rank =>
          post !== null && typeof post === "object" && "fid" in post
      )
      .map((post) => post.fid);

    if (fids.length === 0) {
      console.error("No valid fids found in the current posts");
      return;
    }

    fetchUsers(fids);
    setLoading(false);
  }, [leadData, currentPage]);

  useEffect(() => {
    const statsForFid = async () => {
      try {
        if (!fid) return;
        setFetchingUserRank(true);
        const userRankString = await fetchUserRankByFid(fid.toString());
        let userRank;
        if (userRankString) {
          userRank = JSON.parse(userRankString);
        }

        setLoggedInUserRank(userRank);
        setFetchingUserRank(false);
      } catch (error) {
        console.error("error occurred while fetching user rank", error);
      }
    };

    if (isAuthenticated) {
      statsForFid();
    }
  }, [isAuthenticated, fid]);

  const fetchLoggedInUserRank = useCallback(async () => {
    const rankResponse = await fetch(
      `/api/fetchRankForFid?executionId=${executionId}`,
      {
        method: "GET",
      }
    );

    const data = await rankResponse?.json();

    if (data.state === "QUERY_STATE_COMPLETED") {
      const userRank = data.result?.rows?.[0];
      setLoggedInUserRank(userRank);
      setFetchingUserRank(false);
      clearInterval(intervalIdRef.current!);
    }
  }, [executionId]);

  // useEffect(() => {
  //   if (!executionId && !intervalIdRef.current) return;

  //   fetchLoggedInUserRank();

  //   //@ts-ignore
  //   intervalIdRef.current = setInterval(fetchLoggedInUserRank, 10000);

  //   setTimeout(() => {
  //     clearInterval(intervalIdRef.current!);
  //   }, 180000); // 180000 milliseconds = 3 minutes

  //   // Clean up interval on component unmount
  //   return () => clearInterval(intervalIdRef.current!);
  // }, [executionId, fetchLoggedInUserRank]);

  //TODO: update this
  const config = {
    // For a production app, replace this with an Optimism Mainnet
    // RPC URL from a provider like Alchemy or Infura.
    rpcUrl: "https://mainnet.optimism.io",
    domain: "example.com",
    siweUri: "https://example.com/login",
  };

  /**
   * useCallback is required because function is being passed to
   * child component and will be called on every re-render if useCallback
   * is not used
   */
  const onSignInSuccess = useCallback((res: StatusAPIResponse) => {
    if (res.state === "completed") {
      setAuthenticated(true);
      const userData: Partial<UserData> = {
        fid: res.fid as number,
        custody_address: res.custody as `0x${string}`,
        username: res.username as string,
        display_name: res.displayName as string,
        pfp_url: res.pfpUrl as string,
        follower_count: 0,
        following_count: 0,
        verifications: [],
      };
      setFid(res.fid);
      setLoggedInUserData(userData);
    }
  }, []);

  const onSignOut = useCallback(() => {
    setAuthenticated(false);
  }, []);

  const navigateToUserProfile = (username: string) => {
    const navUrl = `https://warpcast.com/${username}`;
    window.open(navUrl, "_blank");
  };

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
      containerRef.current.scrollHeight - 5
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  });

  const onComposeFrame = () => {
    const url = `https://warpcast.com/~/compose?text=Go%20Higher%20%21%21%21%21%21%21&embeds[]=${process.env.NEXT_PUBLIC_SITE_URL}/api/frame2/${loggedInUserData?.fid}`;

    window.open(url, "_blank");
  };

  return (
    <AuthKitProvider config={config}>
      <div className=" text-white max-h-screen md:text-xs lg:text-base">
        <div className="flex space-x-4 mb-4 justify-between items-center">
          <Image
            src="/images/header.png"
            width={400}
            height={200}
            alt="header"
          />
          <div className="flex space-x-4">
            {isAuthenticated && loggedInUserData && !isFetchingUserRank && (
              <button
                className="bg-[#0C8B38] text-[#FEFAE0] max-h-[34px] px-4 flex justify-center items-center text-sm"
                onClick={onComposeFrame}
              >
                <div className="mr-1">
                  <FaShareFromSquare color="white" size={16} />
                </div>
                Share Your Rank
              </button>
            )}
            <div className="sign-in-button" id="sign-in">
              <SignInButton onSuccess={onSignInSuccess} onSignOut={onSignOut} />
            </div>
          </div>
        </div>

        <div className={`flex justify-end ${kreadonDemi.className} text-xs`}>
          Ranks are calculated based on engagement score
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-11 gap-0 bg-[#0C8B38]  text-center border border-[#FEFAE0] ${kreadonDemi.className}`}
        >
          <div className="col-span-1 md:col-span-1 md: py-2 md:py-4 border-[#FEFAE0] px-2 lg:px-6">
            Rank
          </div>
          <div className="col-span-1 md:col-span-2 md: py-2 md:py-4 border-[#FEFAE0] px-2 lg:px-6">
            <div className="flex justify-start ml-4">User</div>
          </div>

          <div className="col-span-1 md:col-span-1 md: py-2 md:py-4 border-[#FEFAE0] px-2 lg:px-6 ">
            Likes
          </div>
          <div className="col-span-1 md:col-span-1 md: py-2 md:py-4 border-[#FEFAE0] px-2 lg:px-6 ">
            Recasts
          </div>
          <div className="col-span-1 md:col-span-1 md: py-2 md:py-4 border-[#FEFAE0] px-2 lg:px-6 ">
            Replies
          </div>
          <div className="col-span-1 md:col-span-2 md: py-2 md:py-4 border-[#FEFAE0] px-2 lg:px-6 ">
            Total Engagement
          </div>
          <div className="col-span-1 md:col-span-3 py-2 md:py-4">
            Engagement Score
          </div>
        </div>
        <div
          className={`overflow-hidden max-h-[calc(100vh-560px)] md:max-h-[calc(100vh-230px)] bg-[#1E1E1E] overflow-y-auto no-scrollbar ${kreadonDemi.className} border-[0.01px] border-t-0 border-[#FEFAE0] border-opacity-50`}
          ref={containerRef}
        >
          {users.length === 0 || leadData.length === 0 ? (
            <div className="text-[#FEFAE0] text-2xl font-medium p-6 text-center w-full h-full min-h-[calc(100vh-560px)] md:min-h-[calc(100vh-230px)]">
              <div className="grid grid-cols-1 md:grid-cols-11 gap-y-0 text-center items-center  border-[#FEFAE0] border-opacity-50 border-b md:border-b-0 text-[#FEFAE0]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <React.Fragment key={i}>
                    <div className="col-span-1 md:col-span-1  border-[#FEFAE0] border-opacity-50 py-4">
                      <div className="bg-gray-300 h-4 w-12 mx-auto rounded animate-pulse"></div>
                    </div>
                    <div className="col-span-1 md:col-span-2  border-[#FEFAE0] border-opacity-50 py-4">
                      <div className="flex items-center space-x-2 justify-center md:justify-center">
                        <div className="md:ml-4">
                          <div className="rounded-full bg-gray-300 w-6 h-6 animate-pulse"></div>
                        </div>
                        <div className="bg-gray-300 h-4 w-24 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-1  border-[#FEFAE0] border-opacity-50 py-4">
                      <div className="bg-gray-300 h-4 w-8 mx-auto rounded animate-pulse"></div>
                    </div>
                    <div className="col-span-1  border-[#FEFAE0] border-opacity-50 py-4">
                      <div className="bg-gray-300 h-4 w-8 mx-auto rounded animate-pulse"></div>
                    </div>
                    <div className="col-span-1  border-[#FEFAE0] border-opacity-50 py-4">
                      <div className="bg-gray-300 h-4 w-8 mx-auto rounded animate-pulse"></div>
                    </div>
                    <div className="col-span-1 md:col-span-2  border-[#FEFAE0] border-opacity-50 py-4">
                      <div className="bg-gray-300 h-4 w-16 mx-auto rounded animate-pulse"></div>
                    </div>
                    <div className="col-span-1 md:col-span-3  border-[#FEFAE0] border-opacity-50 py-4">
                      <div className="bg-gray-300 h-4 w-16 mx-auto rounded animate-pulse"></div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ) : (
            <>
              {displayData &&
                displayData.length > 0 &&
                displayData.map((item, index) => {
                  const userData: UserData = users[index];

                  return (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-11 gap-y-0 text-center items-center   border-[#FEFAE0] border-opacity-50 border-b md:border-b-0 text-[#FEFAE0]"
                    >
                      <div className="col-span-1 md:col-span-1  border-[#FEFAE0] border-opacity-50 py-4">
                        {item.rank === 1 ? (
                          ""
                        ) : item.rank === 2 ? (
                          ""
                        ) : item.rank === 3 ? (
                          ""
                        ) : (
                          <span>#{item.rank} </span>
                        )}
                        <span className="text-[#0C8B38]">
                          {item.rank === 1
                            ? "↑"
                            : item.rank === 2
                              ? "↑↑"
                              : item.rank === 3
                                ? "↑↑↑"
                                : ""}
                        </span>
                      </div>
                      <div className="col-span-1 md:col-span-2  border-[#FEFAE0] border-opacity-50 py-4">
                        {!userData?.username ? (
                          <div className="flex items-center space-x-2 justify-center md:justify-start">
                            <div className="md:ml-10">
                              <div className="rounded-full bg-gray-300 w-6 h-6 animate-pulse"></div>
                            </div>
                            <div className="bg-gray-300 h-4 w-24 rounded animate-pulse"></div>
                          </div>
                        ) : (
                          <div
                            className="flex items-center space-x-2 justify-center md:justify-start cursor-pointer hover:underline"
                            onClick={() =>
                              navigateToUserProfile(userData.username)
                            }
                          >
                            <div className="md:ml-10">
                              <Image
                                loader={() => userData?.pfp_url}
                                src={userData?.pfp_url}
                                alt={"pfp"}
                                width={18}
                                height={18}
                                className="rounded-full max-w-6 max-h-6"
                              />
                            </div>

                            <div className="max-w-36 overflow-hidden text-ellipsis whitespace-nowrap">
                              @{userData?.username}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="col-span-1 md:col-span-1  border-[#FEFAE0] border-opacity-50 py-4">
                        {/* {item?.item?.count_likes}} */}
                        {item?.count_likes >= 1000
                          ? `${(Number(item?.count_likes) / 1000).toFixed(2)}k`
                          : item?.count_likes}
                      </div>
                      <div className="col-span-1  border-[#FEFAE0] border-opacity-50 py-4">
                        {item?.count_recasts >= 1000
                          ? `${(Number(item?.count_recasts) / 1000).toFixed(2)}k`
                          : item?.count_recasts}                      </div>
                      <div className="col-span-1  border-[#FEFAE0] border-opacity-50 py-4">
                        {item?.count_replies >= 1000
                          ? `${(Number(item?.count_replies) / 1000).toFixed(2)}k`
                          : item?.count_replies}                      </div>
                      <div className="col-span-1 md:col-span-2  border-[#FEFAE0] border-opacity-50 py-4">
                        {item?.total_engagement >= 1000
                          ? `${(Number(item?.total_engagement) / 1000).toFixed(2)}k`
                          : item?.total_engagement}
                      </div>
                      <div className="col-span-1 md:col-span-3  border-[#FEFAE0] border-opacity-50 py-4">
                        {item?.Engagement_Score >= 1000
                          ? `${(Number(item?.Engagement_Score) / 1000).toFixed(2)}k`
                          : item?.Engagement_Score}
                      </div>
                    </div>
                  );
                })}
              {loading && (
                <div className="py-4 border-t-2 border-[#FEFAE0] border-opacity-50 shadow-md">
                  <div className="spinner">
                    <div className="bounce" />
                    <div className="bounce" />
                    <div className="bounce" />
                  </div>
                </div>
              )}
              {displayData.length >= leadData.length &&
                displayData.length !== 0 && (
                  <p className=" bg-[#1E1E1E] py-4 text-center items-center border-t-2 border-[#FEFAE0] border-opacity-50 shadow-md text-[#FEFAE0]">
                    You&apos;ve reached the end
                  </p>
                )}

              {isAuthenticated && !loggedInUserRank && isFetchingUserRank && (
                <div className="sticky bottom-0 bg-[#1E1E1E] text-center items-center border-t-2 border-[#FEFAE0] border-opacity-50 shadow-md py-4 text-[#FEFAE0]">
                  ...Fetching Your Rank
                </div>
              )}

              {isAuthenticated && loggedInUserRank && !isFetchingUserRank && (
                <div className="sticky bottom-0 bg-[#1E1E1E] grid grid-cols-4 md:grid-cols-11 gap-0 text-center items-center border-t-2 border-[#FEFAE0] border-opacity-50 shadow-md text-[#FEFAE0]">
                  <div className="col-span-1 md:col-span-1  border-[#FEFAE0] border-opacity-50 py-4">
                    #{loggedInUserRank.rank}
                  </div>
                  <div className="col-span-1 md:col-span-2  border-[#FEFAE0] border-opacity-50 py-4">
                    <div
                      className="flex items-center space-x-2 justify-center md:justify-start cursor-pointer hover:underline"
                      onClick={() =>
                        navigateToUserProfile(
                          loggedInUserData?.username as string
                        )
                      }
                    >
                      <div className="md:ml-10">
                        <Image
                          loader={() => loggedInUserData?.pfp_url || ""}
                          src={loggedInUserData?.pfp_url || ""}
                          alt={"pfp"}
                          width={18}
                          height={18}
                          className="rounded-full max-w-6 max-h-6"
                        />
                      </div>

                      <div>@{loggedInUserData?.username as string}</div>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-1  border-[#FEFAE0] border-opacity-50 py-4">
                    {loggedInUserRank?.count_recasts}
                  </div>
                  <div className="col-span-1 md:col-span-1  border-[#FEFAE0] border-opacity-50 py-4">
                    {loggedInUserRank?.count_likes}
                  </div>
                  <div className="col-span-1 md:col-span-1  border-[#FEFAE0] border-opacity-50 py-4">
                    {loggedInUserRank?.count_replies}
                  </div>
                  <div className="col-span-1 md:col-span-2  border-[#FEFAE0] border-opacity-50 py-4">
                    {loggedInUserRank?.total_engagement}
                  </div>
                  <div className="col-span-1 md:col-span-3  border-[#FEFAE0] border-opacity-50 py-4">
                    {loggedInUserRank?.Engagement_Score.toFixed(2)}
                  </div>
                </div>
              )}

              {isAuthenticated && !loggedInUserRank && !isFetchingUserRank && (
                <div className="sticky bottom-0 bg-[#1E1E1E] text-center items-center border-t-2 border-[#FEFAE0] border-opacity-50 shadow-md py-4 text-[#FEFAE0]">
                  You do not have a rank
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AuthKitProvider>
  );
}
