import React from "react";
import { View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import signIn from "@/SignIn";
import { WEB_ID, APPLE_ID } from "@/Key";

GoogleSignin.configure({
  webClientId: WEB_ID,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  iosClientId: APPLE_ID,
});

const Index = () => {
  const handleSignIn = async () => {
    const user = await signIn();
    if (user) {
      // setUserInfo(user); // Update state with user info
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

export default Index;
