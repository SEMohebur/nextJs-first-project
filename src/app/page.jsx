"use client";
import React, { use } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Homepage = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/register");
    }
  }, [user, router, loading]);

  if (loading || !user) {
    return <p className="text-center mt-10 text-xl">Loading...</p>; // loading state
  }

  return <div className=" h-screen text-3xl text-red-500">hello world</div>;
};

export default Homepage;
