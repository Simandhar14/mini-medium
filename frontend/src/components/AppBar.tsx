import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-2 border-slate-200">
      <div className="flex flex-col justify-center">
        <img
          src="https://img.icons8.com/?size=100&id=XVNvUWCvvlD9&format=png&color=000000"
          className="h-15 w-15"
        />
      </div>
      <div className="pt-2">
        <Link to="/publish">
          <button
            type="button"
            className="cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mr-4"
          >
            New Blog
          </button>
        </Link>
        <Avatar size={8} name="harkirat" />
      </div>
    </div>
  );
};
