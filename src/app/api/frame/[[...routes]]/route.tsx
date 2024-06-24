/** @jsxImportSource frog/jsx */

import { Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api/frame",
});

app.frame("/:fid", async (c) => {
  const { fid } = c.req.param();
  return c.res({
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/test2?fid=${fid}`,
    imageAspectRatio: "1.91:1",
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
