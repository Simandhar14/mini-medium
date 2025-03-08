import { Blog } from "../hooks";
import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12">
          <div className="col-span-8 pr-10">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Posted on 8th March,2025</div>
            <div className="pt-2">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="py-3 text-lg text-slate-800">Author</div>
            <div className="flex w-full">
              <div className="flex flex-col justify-center px-4">
                {" "}
                <Avatar name={blog.author.name || "Anonymous"} size={8} />
              </div>

              <div>
                <div className="font-bold text-xl">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="text-slate-500">
                  Master of intelligence and the funniest person in the kingdom
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
