import { AppBar } from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
export const Publish = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div>
      <AppBar />
      <div className="flex justify-center pt-8">
        <div className="w-full max-w-screen-lg">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="font-serif outline-none block p-2.5 w-full text-4xl text-slate-500 rounded-lg h-20"
            placeholder="Title..."
          ></input>
          <TextArea
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content,
                },
                {
                  headers: {
                    authorization: localStorage.getItem("token"),
                  },
                }
              );
              navigate(`/blog/${response.data.id}`);
            }}
            className="cursor-pointer mt-3 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 "
          >
            Publish Blog
          </button>
        </div>
      </div>
    </div>
  );
};

function TextArea({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <div className="w-full mt-3 rounded-lg bg-gray-50 ">
        <div className="px-4 py-2 bg-white rounded-b-lg ">
          <label className="sr-only">Publish post</label>
          <textarea
            onChange={onChange}
            rows={8}
            className="font-serif outline-none block w-full px-0 text-3xl text-slate-500 bg-white "
            placeholder="Tell your story..."
            required
          ></textarea>
        </div>
      </div>
    </div>
  );
}
