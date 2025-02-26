import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge"; // ✅ Use `edge` version
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
const app = new Hono();
const createPrisma = (directUrl) => new PrismaClient({
    datasourceUrl: directUrl, // ✅ Use `DIRECT_URL` instead of `DATABASE_URL`
}).$extends(withAccelerate());
app.post("/api/v1/signup", async (c) => {
    const prisma = createPrisma(c.env.DIRECT_URL); // ✅ Correct way to use Prisma
    const body = await c.req.json();
    const user = await prisma.user.create({
        data: {
            email: body.email,
            password: body.password,
        },
    });
    const token = await sign({ id: user.id }, "secret");
    return c.json({ token });
});
export default app;
