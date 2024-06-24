/** @jsxImportSource frog/jsx */

import { getUser, getUserRank } from "@/utils/loggedInUser";
import { Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api/frame",
});

app.frame("/", async (c) => {
  const query = c.req.query();

  console.log("query: ", query);

  return c.res({
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/test?userData=${query.userData}`,
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
