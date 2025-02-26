import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { Context } from "hono";
import { createblogschema, updateblogschema } from "@simandhar14/medium-common";

type Bindings = {
  datasourceUrl: string;
  DIRECT_URL: string;
};

type Variables = {
  userId: string;
};

type AppContext = Context<{
  Bindings: Bindings;
  Variables: Variables;
}>;

export const blogRouter = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

const createPrisma = (c: any) =>
  new PrismaClient({
    datasourceUrl: c.env.DIRECT_URL,
  }).$extends(withAccelerate());

blogRouter.use("/*", async (c: any, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    c.status(401);
    return c.json({ message: "No token provided" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (!user?.id) {
      c.status(401);
      return c.json({ message: "Unauthorized" });
    }

    c.set("userId", user.id as string);
    await next();
  } catch (error) {
    c.status(401);
    return c.json({ message: "You are not logged in" });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = createPrisma(c);
  try {
    const blogs = await prisma.blog.findMany();
    return c.json({ blogs });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error: "Something went wrong" });
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = createPrisma(c);
  try {
    const paramid = c.req.param("id");
    if (!paramid) {
      c.status(411);
      return c.json({ message: "Invalid id / id not provided" });
    }
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(paramid),
      },
    });
    return c.json({
      blog,
    });
  } catch (error) {
    console.log(error);
    c.status(411);
  }
});

blogRouter.post("/", async (c) => {
  const prisma = createPrisma(c);
  try {
    const body = await c.req.json();
    const { success } = createblogschema.safeParse(body);
    if (!success) {
      c.status(411);
      return c.text("Invalid input types or inputs not correct");
    }
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(c.get("userId")),
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (error) {
    console.log(error);
    c.status(411);
  }
});
blogRouter.put("/", async (c) => {
  const prisma = createPrisma(c);
  try {
    const body = await c.req.json();
    const { success } = updateblogschema.safeParse(body);
    if (!success) {
      c.status(411);
      return c.text("Invalid input types or inputs not correct");
    }
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      id: blog.id,
      message: "Blog updated",
    });
  } catch (error) {
    console.log(error);
    c.status(411);
  }
});
