/** @jsxImportSource frog/jsx */

import { Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api/frame",
});

app.frame("/", (c) => {
  return c.res({
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/test`,
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
