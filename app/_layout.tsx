import React, { useContext, useEffect } from "react";
import { useRouter, useSegments, Redirect } from "expo-router";
import AuthProvider, { AuthContext } from "@/contexts/AuthProvider";
import { Slot } from "expo-router";

const RootLayout = () => {
  const authCTX = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log("Authentication status:", authCTX?.isAuthenticated);
    console.log("Current segment:", segments[0]);

    if (!authCTX?.isAuthenticated) {
      console.log("Redirecting to home from protected route.");
      router.replace("/googleSignin");
    } else if (authCTX?.isAuthenticated) {
      console.log("Redirecting to protected route.");
      router.replace("/(protected)");
    }
  }, [authCTX?.isAuthenticated, router]);

  return <Slot />;
};

export default function Root() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}
