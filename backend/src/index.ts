import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono<{
  Bindings: {
    DIRECT_URL: string;
  };
}>();
app.use(logger());
app.use("/*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
