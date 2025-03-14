import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupbody } from "@simandhar14/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      console.log(jwt);
      navigate("/blogs");
    } catch (error) {
      alert(`Error while ${type === "signup" ? "signup" : "signin"} `);
      console.log(error);
    }
  }
  const [postInputs, setpostInputs] = useState<signupbody>({
    name: "",
    username: "",
    password: "",
  });
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold ">Create an account</div>
            <div className="text-slate-400">
              {type === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signup" ? "/signin" : "/signup"}
              >
                {type === "signin" ? "Signup" : "Sign In"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Enter your name"
                onChange={(e) => {
                  setpostInputs({ ...postInputs, name: e.target.value });
                }}
              />
            ) : null}
            <LabelledInput
              label="Username"
              placeholder="Enter your username"
              onChange={(e) => {
                setpostInputs({ ...postInputs, username: e.target.value });
              }}
            />
            <LabelledInput
              label="Password"
              type={"password"}
              placeholder="Enter your password"
              onChange={(e) => {
                setpostInputs({ ...postInputs, password: e.target.value });
              }}
            />
          </div>
          <button
            onClick={sendRequest}
            type="button"
            className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {type === "signup" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};
interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "password" | "text";
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-black pt-2">
        {label}
      </label>
      <input
        type={type || "text"}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
