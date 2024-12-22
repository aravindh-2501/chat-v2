import {
  ChatBubbleBottomCenterTextIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import AuthImagePattern from "./AuthImagePattern";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { REGISTER } from "../api/endPoints";
import apiClient from "../api/apiInstance";

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await apiClient.post(REGISTER, data);
      toast.success(res?.data?.msg);
      console.log({res})
      navigate("/login");
      reset();
    } catch (error) {
      console.log({error})
      const errorMessage =
        error?.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-screen h-screen grid lg:grid-cols-2 bg-base-100">
      {/* Left Side */}
      <AuthImagePattern
        subtitle={
          <div className="flex items-center justify-center gap-1">
            Looking for fun? Join the sassiest squad in town!
            <ChatBubbleOvalLeftEllipsisIcon className="inline w-6 h-6 text-primary" />
          </div>
        }
        title="Sign Up, Cutie!"
      />

      {/* Right Side */}
      <div className="flex flex-col items-center justify-center gap-10 p-6">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="border border-primary p-4 rounded-lg shadow-lg bg-base-200">
            <ChatBubbleBottomCenterTextIcon className="w-10 h-10 text-primary animate-bounce" />
          </div>
          <h1 className="text-5xl font-extrabold mt-4 text-center">
            Ready to Sparkle? 💖
          </h1>
          <p className="text-base-content/60 text-center mt-2">
            Join us and be the star of the chat show! 🌟
          </p>
        </div>

        {/* Input Fields */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-5 w-full max-w-sm"
        >
          {/* Username Field */}
          <label className="input input-bordered flex items-center gap-2 w-full shadow-sm">
            <UserIcon className="w-6 h-6 text-primary" />
            <input
              type="text"
              className="grow focus:outline-none bg-transparent rounded-xl"
              autoComplete="username"
              placeholder="Your fabulous username 💅"
              {...register("username", { required: "Username is required" })}
            />
          </label>

          {/* Email Field */}
          <label className="input input-bordered flex items-center gap-2 w-full shadow-sm">
            <EnvelopeIcon className="w-6 h-6 text-primary" />
            <input
              type="email"
              className="grow focus:outline-none bg-transparent rounded-xl"
              autoComplete="email"
              placeholder="Your dreamy email ✉️"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
          </label>

          {/* Password Field */}
          <label className="input input-bordered flex items-center gap-2 w-full shadow-sm">
            <input
              type={showPassword ? "text" : "password"}
              className="grow focus:outline-none bg-transparent rounded-xl"
              placeholder="Your sassy password 🔒"
              {...register("password", { required: "Password is required" })}
              autoComplete="password"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-6 h-6 text-primary hover:text-secondary" />
              ) : (
                <EyeIcon className="w-6 h-6 text-primary hover:text-secondary" />
              )}
            </div>
          </label>

          <p className="text-base-content/80">
            Got an account already?{" "}
            <span
              className="text-primary font-bold underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Slide back in! 😉
            </span>
          </p>

          {/* Register Button */}
          <button type="submit" className="btn btn-primary w-full shadow-lg">
            💃 Create My Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
