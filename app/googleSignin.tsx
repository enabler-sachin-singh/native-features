import React, { useContext } from "react";
import { View, Text } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import signIn from "@/SignIn";
import { WEB_ID, APPLE_ID } from "@/Key";
import { AuthContext } from "@/contexts/AuthProvider";

GoogleSignin.configure({
  webClientId: WEB_ID,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  iosClientId: APPLE_ID,
});

const SignIn = () => {
  const AuthCTX = useContext(AuthContext);

  const handleSignIn = async () => {
    const user = await signIn();
    if (user) {
      AuthCTX?.setIsAuthenticated(true);
      AuthCTX?.setUserInfo(user);
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

export default SignIn;
