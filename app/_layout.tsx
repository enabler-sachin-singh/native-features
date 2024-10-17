import React, { useContext, useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import AuthProvider, { AuthContext } from "@/contexts/AuthProvider";

const StackLayout = () => {
  const authCTX = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(protected)";
    console.log("Authentication status:", authCTX?.isAuthenticated);
    console.log("Current segment:", segments);

    if (!authCTX?.isAuthenticated && inAuthGroup) {
      console.log("Not logged in, redirecting to home...");
      router.replace("/");
    } else if (authCTX?.isAuthenticated && !inAuthGroup) {
      console.log("Logged in, redirecting to protected...");
      router.replace("/(protected)");
    }
  }, [authCTX, segments]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
}
