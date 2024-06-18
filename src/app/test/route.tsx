//@ts-nocheck
import { fetchData } from "@/utils/data";
import Image from "next/image";
import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const leaderboardData = fetchData();

  const imageData = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/images/background.png`
  ).then((res) => res.arrayBuffer());

  const fontData = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/fonts/Kreadon-Demi.ttf`
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
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
                {leaderboardData.map((entry, index) => (
                  <tr key={index} className="">
                    <td className="py-8 px-10 border-r border-gray-900  text-center">
                      {entry.rank}
                    </td>
                    <td className="py-8 px-12 border-r border-gray-900  text-center">
                      {entry.user}
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
          <div className={`flex justify-start mt-10 ${kreadonBold.className}`}>
            <button
              className="bg-green-600 text-black py-2 px-4 uppercase hover:bg-green-700 font-bold text-sm max-h-[35px]"
              onClick={onCreateFrame}
            >
              Create Frame
            </button>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { data: fontData, style: "normal", weight: 600, name: "Kreadon-Demi" },
      ],
    }
  );
}
