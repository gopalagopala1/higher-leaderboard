"use client";
import localFont from "next/font/local";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import {
  AuthKitProvider,
  SignInButton,
  StatusAPIResponse,
} from "@farcaster/auth-kit";
import "@farcaster/auth-kit/styles.css";
import CustomSignInButton from "./sign-in";

const kreadonDemi = localFont({
  src: "../../public/fonts/Kreadon-Demi.ttf",
});

const kreadonBold = localFont({
  src: "../../public/fonts/Kreadon-Bold.ttf",
});

type LeaderboardEntry = {
  rank: number;
  user: string;
  memberSince: string;
  casts: number;
  recasts: number;
  likes: number;
  replies: number;
  topCasts: string;
};

const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    user: "@v",
    memberSince: "05.22.2024",
    casts: 7322,
    recasts: 7322,
    likes: 164,
    replies: 77,
    topCasts: "Link",
  },
  {
    rank: 2,
    user: "@6969",
    memberSince: "05.22.2024",
    casts: 6500,
    recasts: 6500,
    likes: 141,
    replies: 72,
    topCasts: "Link",
  },
  {
    rank: 3,
    user: "@jhve",
    memberSince: "05.22.2024",
    casts: 5321,
    recasts: 5321,
    likes: 135,
    replies: 63,
    topCasts: "Link",
  },
  {
    rank: 4,
    user: "@cassie",
    memberSince: "05.22.2024",
    casts: 4484,
    recasts: 4484,
    likes: 122,
    replies: 56,
    topCasts: "Link",
  },
  {
    rank: 5,
    user: "@ace",
    memberSince: "05.22.2024",
    casts: 3231,
    recasts: 3231,
    likes: 109,
    replies: 55,
    topCasts: "Link",
  },
  {
    rank: 6,
    user: "@mcbain",
    memberSince: "05.22.2024",
    casts: 1500,
    recasts: 1500,
    likes: 98,
    replies: 41,
    topCasts: "Link",
  },
  {
    rank: 7,
    user: "@pjc",
    memberSince: "05.22.2024",
    casts: 1324,
    recasts: 1324,
    likes: 95,
    replies: 39,
    topCasts: "Link",
  },
  {
    rank: 8,
    user: "@jayme",
    memberSince: "05.22.2024",
    casts: 1128,
    recasts: 1128,
    likes: 81,
    replies: 34,
    topCasts: "Link",
  },
  {
    rank: 9,
    user: "@naomiii",
    memberSince: "05.22.2024",
    casts: 1102,
    recasts: 1102,
    likes: 79,
    replies: 23,
    topCasts: "Link",
  },
  {
    rank: 10,
    user: "@matthew",
    memberSince: "05.22.2024",
    casts: 1003,
    recasts: 1003,
    likes: 69,
    replies: 21,
    topCasts: "Link",
  },
];

export default function Leaderboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [displayData, setDisplayData] = useState<LeaderboardEntry[]>([]);

  const paginate = (action: "prev" | "next") => {
    if (action === "prev" && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = leaderboardData.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    setDisplayData(currentPosts);
  }, [currentPage, postsPerPage]);

  const config = {
    // For a production app, replace this with an Optimism Mainnet
    // RPC URL from a provider like Alchemy or Infura.
    rpcUrl: "https://mainnet.optimism.io",
    domain: "example.com",
    siweUri: "https://example.com/login",
  };

  const onSignInSuccess = (res: StatusAPIResponse) => {
    if (res.state === "completed") {
      localStorage.setItem("userFid", JSON.stringify(res.fid));
    }
  };

  const onSignOut = () => {
    localStorage.removeItem("connectedUser");
  };

  return (
    <AuthKitProvider config={config}>
      <div className=" text-white max-h-screen p-4 md:text-xs lg:text-base">
        <div className="flex space-x-4 mb-8 justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image
              src="/Vector.png"
              alt="logo"
              width={50}
              height={40}
              style={{ height: "50px" }}
            />
            <h1 className="text-4xl font-bold text-[#FEFAE0]">HIGHERBOARD</h1>
          </div>

          <div className="sign-in-button">
            <SignInButton onSuccess={onSignInSuccess} onSignOut={onSignOut} />
          </div>
        </div>
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-0 bg-green-600  text-center border border-black ${kreadonDemi.className}`}
        >
          <div className="col-span-1 md:col-span-1 md:border-r py-2 md:py-6 border-black px-2 lg:px-6 ">
            Rank
          </div>
          <div className="col-span-1 md:col-span-3 md:border-r py-2 md:py-6 border-black px-2 lg:px-6 ">
            User
          </div>

          <div className="col-span-1 md:col-span-1 md:border-r py-2 md:py-6 border-black px-2 lg:px-6 ">
            Casts
          </div>
          <div className="col-span-1 md:col-span-1 md:border-r py-2 md:py-6 border-black px-2 lg:px-6 ">
            Recasts
          </div>
          <div className="col-span-1 md:col-span-1 md:border-r py-2 md:py-6 border-black px-2 lg:px-6 ">
            Likes
          </div>
          <div className="col-span-1 md:col-span-1 md:border-r py-2 md:py-6 border-black px-2 lg:px-6 ">
            Replies
          </div>
          <div className="col-span-1 md:col-span-2 md:border-r py-2 md:py-6 border-black px-2 lg:px-6 ">
            Total Engagement
          </div>
          <div className="col-span-1 md:col-span-2 py-2 md:py-6">
            Engagement Score
          </div>
        </div>
        <div
          className={`max-h-[calc(100vh-560px)] md:max-h-[calc(100vh-400px)] bg-black overflow-y-auto ${kreadonDemi.className} border-[0.01px] border-t-0 border-[#FEFAE0] border-opacity-50`}
        >
          {leaderboardData.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 gap-y-0 text-center items-center  border-r border-[#FEFAE0] border-opacity-50 border-b md:border-b-0"
            >
              <div className="col-span-1 md:col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
                {item.rank}
              </div>
              <div className="col-span-1 md:col-span-3 border-r border-[#FEFAE0] border-opacity-50 py-6">
                <div className="flex items-center space-x-2 justify-center md:justify-start">
                  <div className="md:ml-4">
                    <Image
                      src={`https://avatars.dicebear.com/api/initials/${item.user}.svg`}
                      alt={item.user}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </div>

                  <div>{item.user}</div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
                {item.casts}
              </div>
              <div className="col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
                {item.recasts}
              </div>
              <div className="col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
                {item.likes}
              </div>
              <div className="col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
                {item.replies}
              </div>
              <div className="col-span-1 md:col-span-2 border-r border-[#FEFAE0] border-opacity-50 py-6">
                {123}
              </div>
            </div>
          ))}
        </div>
        <div
          className={`flex justify-between items-center mt-10 ${kreadonBold.className}`}
        >
          <button className="bg-green-600 text-black py-2 px-4 uppercase hover:bg-green-700 font-bold text-sm max-h-[35px]">
            Create Frame
          </button>
          <div
            className={`flex items-center space-x-10 ${kreadonBold.className} text-[#FEFAE0]`}
          >
            <div className="flex items-center" onClick={() => paginate("prev")}>
              <FaCaretLeft size={24} /> PREVIOUS
            </div>

            <div
              className="flex items-center "
              onClick={() => paginate("next")}
            >
              NEXT <FaCaretRight size={24} />
            </div>
          </div>
        </div>
      </div>
    </AuthKitProvider>
  );
}
