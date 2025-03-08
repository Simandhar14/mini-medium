import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { Context } from "hono";
import { createblogschema, updateblogschema } from "@simandhar14/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DIRECT_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

const createPrisma = (c: any) =>
  new PrismaClient({
    datasourceUrl: c.env.DIRECT_URL,
  }).$extends(withAccelerate());

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    }
  } catch (e) {
    c.status(403);
    console.log(e);
    return c.json({
      message: "You are not logged in",
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = createPrisma(c);
  try {
    const blogs = await prisma.blog.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ blogs });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error: "Something went wrong" });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DIRECT_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while fetching blog post",
    });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = createPrisma(c);
  try {
    const body = await c.req.json();

    // Validate request body
    const result = createblogschema.safeParse(body);
    if (!result.success) {
      c.status(411);
      return c.text("Invalid input types or inputs not correct");
    }

    const { title, content } = result.data;

    // Ensure userId is valid
    const authorId = c.get("userId");

    // Create blog entry
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        authorId: Number(authorId),
      },
    });

    return c.json({ id: blog.id });
  } catch (error) {
    console.error("Error creating blog:", error);
    c.status(500);
    return c.text("Internal Server Error");
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
