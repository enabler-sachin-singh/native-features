import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import { router } from "expo-router";

const Page = () => {
  const authCTX = useContext(AuthContext);

  return (
    <View>
      <Text>Protected Index</Text>

      <Button
        title="Logout"
        onPress={() => {
          authCTX?.logout();
          router.navigate("/");
        }}
      />
    </View>
  );
};

export default Page;
