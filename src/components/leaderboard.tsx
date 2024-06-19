"use client";
import localFont from "next/font/local";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";

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

type LeaderboardData = LeaderboardEntry[];

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
  const onCreateFrame = () => {
    const url = `https://warpcast.com/~/compose?text=Hello%20World%20&embeds[]=${process.env.NEXT_PUBLIC_SITE_URL}/api/abc`;
    window.open(url, "_blank");
  };

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

  return (
    <div className="flex flex-col items-center justify-center max-h-screen text-white p-4">
      <div className="w-full max-w-7xl">
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

          <button
            className={`bg-green-600 text-black py-2 px-4 uppercase hover:bg-green-700 font-bold ${kreadonBold.className} text-sm max-h-[35px]`}
          >
            Connect
          </button>
        </div>
        <div className="overflow-x-auto bg-black  shadow-md max-h-[calc(100vh-250px)]">
          <table
            className={`min-w-full ${kreadonDemi.className} font-semibold text-sm`}
          >
            <thead className="text-black">
              <tr className="bg-green-600">
                <th className="py-8 px-4 border-b border-gray-900 border-r">
                  Rank
                </th>
                <th className="py-8 px-4 border-b border-gray-900  border-r">
                  User
                </th>
                <th className="py-8 px-4 border-b border-gray-900  border-r">
                  Member Since
                </th>
                <th className="py-8 px-4 border-b border-gray-900  border-r">
                  Casts
                </th>
                <th className="py-8 px-4 border-b border-gray-900  border-r">
                  Recasts
                </th>
                <th className="py-8 px-4 border-b border-gray-900  border-r">
                  Likes
                </th>
                <th className="py-8 px-4 border-b border-gray-900  border-r">
                  Replies
                </th>
                <th className="py-8 px-4 border-b border-gray-900 ">
                  Top Casts
                </th>
              </tr>
            </thead>
            <tbody className={kreadonDemi.className}>
              {displayData.map((entry, index) => (
                <tr key={index} className="">
                  <td className="py-8 px-10 border-r border-gray-900  text-center">
                    {entry.rank}
                  </td>
                  <td className="py-8 px-12 border-r border-gray-900  text-center">
                    <div className="flex items-center space-x-2">
                      <div>
                        <Image
                          src={`https://avatars.dicebear.com/api/initials/${entry.user}.svg`}
                          alt={entry.user}
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                      </div>
                      <div>{entry.user}</div>
                    </div>
                  </td>
                  <td className="py-8 px-12 border-r border-gray-900  text-center">
                    {entry.memberSince}
                  </td>
                  <td className="py-8 px-10 border-r border-gray-900 text-center">
                    {entry.casts}
                  </td>
                  <td className="py-8 px-10 border-r border-gray-900  text-center">
                    {entry.recasts}
                  </td>
                  <td className="py-8 px-10 border-r border-gray-900  text-center">
                    {entry.likes}
                  </td>
                  <td className="py-8 px-10 border-r border-gray-900  text-center">
                    {entry.replies}
                  </td>
                  <td className="py-8 px-4 text-center">
                    <a href="#" className="text-blue-400 hover:underline">
                      {entry.topCasts}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className={`flex justify-between items-center mt-10 ${kreadonBold.className}`}
        >
          <button
            className="bg-green-600 text-black py-2 px-4 uppercase hover:bg-green-700 font-bold text-sm max-h-[35px]"
            onClick={onCreateFrame}
          >
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
    </div>
  );
}
