import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { AppBar } from "../components/AppBar";
import { Spinner } from "../components/Spinner";
export const Blog = () => {
  const { id } = useParams();

  const { loading, blog } = useBlog({ id: id || "" });
  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }
  if (!blog) {
    return <div>Blog not found</div>;
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};
