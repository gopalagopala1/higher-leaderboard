/** @jsxImportSource frog/jsx */

import { Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api/frame",
});

app.frame(
  "/:username/:pfp_url/:likes/:recasts/:replies/:rank/:engagement_score",
  (c) => {
    const {
      username,
      pfp_url,
      likes,
      recasts,
      replies,
      rank,
      engagement_score,
    } = c.req.param();

    return c.res({
      image: `${process.env.NEXT_PUBLIC_SITE_URL}/test?userData=${username}&likes=${likes}&replies=${replies}&recasts=${recasts}&${rank}&${engagement_score}&pfp_url=${pfp_url}`,
    });
  }
);

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
