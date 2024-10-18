import React, { useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import AuthProvider, { AuthContext } from "@/contexts/AuthProvider";
import { Slot } from "expo-router";
import { Routes } from "@/utils";

const RootLayout = () => {
  const authCTX = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authCTX?.isAuthenticated) {
      router.replace(Routes.LOGIN);
    } else if (authCTX?.isAuthenticated) {
      router.replace(Routes.PROTECTED_ROUTES);
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
