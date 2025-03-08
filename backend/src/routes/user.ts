import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupschema, signinschema } from "@simandhar14/medium-common";

export const userRouter = new Hono();

const createPrisma = (c: any) =>
  new PrismaClient({
    datasourceUrl: c.env.DIRECT_URL,
  }).$extends(withAccelerate());

userRouter.post("/signup", async (c: any) => {
  const prisma = createPrisma(c);
  try {
    const body = await c.req.json();
    const { success } = signupschema.safeParse(body);
    if (!success) {
      c.status(411);

      return c.text("Invalid input types or inputs not correct");
    }
    const user = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.text("Invalid");
  }
});

userRouter.post("/signin", async (c: any) => {
  const prisma = createPrisma(c);
  try {
    const body = await c.req.json();
    const { success } = signinschema.safeParse(body);
    if (!success) {
      c.status(411);
      return c.text("Invalid input types or inputs not correct");
    }
    const user = await prisma.user.findUnique({
      where: { username: body.username },
    });

    if (!user) {
      c.status(403);
      return c.json({ message: "User not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (error) {
    console.log(error);
    c.status(403); //unauthorized
    return c.text("Wrong/Missing credentials");
  }
});
