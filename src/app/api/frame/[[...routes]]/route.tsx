/** @jsxImportSource frog/jsx */

import { getUser, getUserRank } from "@/utils/loggedInUser";
import { Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { CgLayoutGrid } from "react-icons/cg";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api/frame",
});

app.frame("/", async (c) => {
  const query = c.req.query();
  const userDataString = query.userData;
  console.log(userDataString);
  const userData = JSON.parse(userDataString ?? "{}");
  console.log(userData);

  const encodedUserData = encodeURIComponent(JSON.stringify(userData));

  // const userQuery = encodeURIComponent(JSON.stringify(userData));
  // console.log(userData, userQuery);
  return c.res({
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/test2?userData=${encodedUserData}`,
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
