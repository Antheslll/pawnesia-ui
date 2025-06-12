"use client";
import AuthBannerUI from "@/components/home-ui/banner/banner";
import AuthButtonUI from "@/components/auth-ui/button/button";
import AuthInputUI from "@/components/auth-ui/input/input";
import { useForm } from "@/hook/useForm";
import { authPostFetcher } from "@/lib/fetcher/auth/authPostFetcher";
import Image from "next/image";
import { useState } from "react";
import { AuthResponseType } from "@/types";
import Link from "next/link";

const initialFormValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { formValues, handleChange } = useForm(initialFormValues);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const token = localStorage.getItem("auth_token");
  // console.log(token);
  const credentialChecked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValues.email === "" || formValues.password === "") {
      alert("Isi Email dan password");
      return;
    } else {
      await submitUser();
    }
  };

  const submitUser = async () => {
    try {
      const result = await authPostFetcher<AuthResponseType>(
        "http://localhost:5000/api/auth/login",
        formValues,
        errorHandler
      );

      if (result) {
        const token = result.token;
        // const user = result.user;

        localStorage.setItem("auth_token", token);
      }
    } catch (err) {
      throw err;
    }
  };

  const errorHandler = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div className="w-full h-[100vh] gray-background-color flex-centered ">
      <div className="w-[80%] h-[90vh] bg-white grid grid-cols-2">
        <AuthBannerUI image={`url("./auth-page-image/login-image.png")`} />
        <form
          onSubmit={credentialChecked}
          className="w-full h-full grid grid-rows-[15vh_20vh_30vh_15vh_10vh] "
        >
          <div className="flex-centered">
            <Image
              className="w-[150px] h-[150px]"
              src="/logo/pawnesia-logo.png"
              alt="pawnesia-logo"
              width={1000}
              height={1000}
            />
          </div>
          <div className="flex-centered flex-col">
            <h1 className="poppins-font font-bold text-[30px]">Get In</h1>
            <h3 className="nunito-font text-[13px] gray-text-color">
              Our Pets is Waiting!
            </h3>
            {errorMessage && (
              <div className="text-red-600 text-sm mt-2 text-center">
                {errorMessage}
              </div>
            )}
          </div>
          <div className="w-full h-full flex-centered flex-col gap-5 ">
            <AuthInputUI
              value={formValues.email}
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
              min={1}
              max={255}
            />
            <AuthInputUI
              value={formValues.password}
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
              min={6}
              max={255}
            />
          </div>
          <div className="flex-centered">
            <AuthButtonUI buttonText="Sign In" />
          </div>
          <div className="w-full h-full flex-centered">
            <Link href="/auth?mode=register">
              <span className="text-blue-600 text-[13px] underline nunito-font cursor-pointer">
                don&apos;t have an account?
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
