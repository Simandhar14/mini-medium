import z from "zod";

export const signupschema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const signinschema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

export const createblogschema = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateblogschema = z.object({
  title: z.string(),
  content: z.string(),
  id: z.number(),
});

export type signupbody = z.infer<typeof signupschema>;
export type signinbody = z.infer<typeof signinschema>;
export type createblogbody = z.infer<typeof createblogschema>;
export type updateblogbody = z.infer<typeof updateblogschema>;
