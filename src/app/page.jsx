"use client";
import React, { use } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Homepage = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/register");
    }
  }, [user, router]);

  if (!user) {
    return <p className=" text-center">Loading</p>;
  }

  return <div className=" h-screen text-3xl text-red-500">hello world</div>;
};

export default Homepage;
