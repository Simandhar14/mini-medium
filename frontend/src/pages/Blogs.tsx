import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center">
          <div>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => {
            return (
              <BlogCard
                id={blog.id}
                key={blog.id}
                authorName={blog.author.name || "Unknown"}
                title={blog.title}
                publishedDate={"5th March,2025"}
                content={blog.content}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
