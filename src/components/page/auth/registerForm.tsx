"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthBannerUI from "@/components/auth-ui/banner/banner";
import AuthButtonUI from "@/components/auth-ui/button/button";
import InputArea from "@/components/auth-ui/input/input-area";
import Image from "next/image";
import { useForm } from "@/hook/useForm";
import { registerFetcher } from "@/lib/auth/registerFetcher";

const initialFormValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  address: "",
  role: "CUSTOMER",
};

const RegisterForm = () => {
  const [isInputPage, setInputPage] = useState(1);
  const { formValues, handleChange, setFormValues } =
    useForm(initialFormValues);
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const checkedHandle = () => {
    setIsChecked((prev) => !prev);
  };

  const inputPageHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isInputPage === 1) {
      if (formValues.email === "" || formValues.password === "") {
        alert("Isi Email dan password");
        return;
      } else {
        setInputPage((prev) => prev + 1);
      }
    } else if (isInputPage === 2) {
      if (formValues.firstName === "" || formValues.lastName === "") {
        alert("Isi nama depan dan nama belakangmu");
        return;
      } else {
        setInputPage((prev) => prev + 1);
      }
    } else if (isInputPage === 3) {
      if (
        formValues.phoneNumber === "" ||
        formValues.address === "" ||
        !isChecked
      ) {
        alert(
          "Isi no telfon dan alamatmu, dan kamu harus menyetujui kebijakan kami"
        );
        return;
      } else {
        await submitUser();
      }
    }
  };

  const errorHandler = (message: string) => {
    setErrorMessage(message);
    setFormValues(initialFormValues);
    setIsChecked(false);
    setInputPage(1);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const submitUser = async () => {
    try {
      console.log("ini data yang terkirim: ", formValues);
      const result = await registerFetcher(
        "http://localhost:5000/auth/register",
        formValues,
        errorHandler
      );

      if (result) {
        alert(
          `Halo ${formValues.firstName} ${formValues.lastName}, Selamat Datang di Pawnesia!`
        );
        router.replace("/auth?mode=login");
      }
    } catch (err) {
      console.log(err);
      console.error(err);
    }
  };

  return (
    <div className="w-full h-[100vh] gray-background-color flex-centered ">
      <div className="w-[80%] h-[90vh] bg-white grid grid-cols-2">
        <AuthBannerUI image={`url("./auth-page-image/register-image.png")`} />
        <form
          onSubmit={inputPageHandle}
          className="w-full h-full grid grid-rows-[15vh_20vh_30vh_20vh] "
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
            <h1 className="poppins-font font-bold text-[30px]">
              Create Account
            </h1>
            <h3 className="nunito-font text-[13px] gray-text-color">
              Create an accont to access all the features
            </h3>
            {errorMessage && (
              <div className="text-red-600 text-sm mt-2 text-center">
                {errorMessage}
              </div>
            )}
          </div>
          <div className="w-full h-full flex-centered flex-col gap-5 ">
            <InputArea
              isInputPage={isInputPage}
              formValues={formValues}
              onChange={handleChange}
              checkedHandle={checkedHandle}
            />
          </div>
          <div className="flex-centered">
            <AuthButtonUI buttonText="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
