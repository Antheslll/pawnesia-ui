import AuthBannerUI from "@/components/auth-ui/banner/banner";
import AuthButtonUI from "@/components/auth-ui/button/button";
import AuthInputUI from "@/components/auth-ui/input/input";
import { useForm } from "@/hook/useForm";
import Image from "next/image";

const initialFormValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { formValues, handleChange } = useForm(initialFormValues);

  const loginExecute = () => {};

  return (
    <div className="w-full h-[100vh] gray-background-color flex-centered ">
      <div className="w-[80%] h-[90vh] bg-white grid grid-cols-2">
        <AuthBannerUI image={`url("./auth-page-image/login-image.png")`} />
        <div className="w-full h-full grid grid-rows-[15vh_20vh_30vh_20vh] ">
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
          </div>
          <div className="w-full h-full flex-centered flex-col gap-5 ">
            <AuthInputUI
              value={formValues.email}
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
            />
            <AuthInputUI
              value={formValues.password}
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex-centered">
            <AuthButtonUI
              buttonText="Sign In"
              executionAuthButton={loginExecute}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
