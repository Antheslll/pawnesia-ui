"use client";

import LoginForm from "@/components/page/auth/loginForm";
import RegisterForm from "@/components/page/auth/registerForm";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");

  const [mode, setMode] = useState("login");

  useEffect(() => {
    if (modeParam === "register") {
      setMode("register");
    } else if (modeParam === "login") {
      setMode("login");
    } else {
      console.log("mode tidak ada dalam daftar url-nya");
    }
  }, [modeParam]);

  if (mode === "login") {
    return <LoginForm />;
  } else if (mode === "register") {
    return <RegisterForm />;
  } else {
    return (
      <div>
        <h1>Anda salah jalur</h1>
      </div>
    );
  }
}
