import React, { useContext } from "react";
import { View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import signIn from "@/SignIn";
import { WEB_ID, APPLE_ID } from "@/Key";
import { AuthContext } from "@/contexts/AuthProvider";
import { useRouter } from "expo-router";
import { Routes } from "@/types";

GoogleSignin.configure({
  webClientId: WEB_ID,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  iosClientId: APPLE_ID,
});

const index = () => {
  const AuthCTX = useContext(AuthContext);
  const router = useRouter();

  const handleSignIn = async () => {
    const user = await signIn();
    if (user) {
      // AuthCTX?.setIsAuthenticated(true);
      // AuthCTX?.setUserInfo(user);
      // router.navigate(Routes.ALL_USERS);
      console.log(user);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleSignIn}
      />
    </View>
  );
};

export default index;
