import { View, Text, Button, Image, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import { Colors } from "@/constants/Colors";

const Page = () => {
  const authCTX = useContext(AuthContext);
  const { userInfo } = authCTX || {};

  const handleOnLogout = () => {
    authCTX?.logout();
  };

  return (
    <View style={styles.container}>
      {userInfo && (
        <View style={styles.userInfoContainer}>
          {userInfo.photo && (
            <Image
              source={{ uri: userInfo.photo }}
              style={styles.profileImage}
            />
          )}
          <Text style={styles.userInfoText}>ID: {userInfo.id}</Text>
          <Text style={styles.userInfoText}>Name: {userInfo.name}</Text>
          <Text style={styles.userInfoText}>Email: {userInfo.email}</Text>
          <Text style={styles.userInfoText}>
            Family Name: {userInfo.familyName}
          </Text>
          <Text style={styles.userInfoText}>
            Given Name: {userInfo.givenName}
          </Text>
        </View>
      )}

      <Button
        title="Logout"
        onPress={handleOnLogout}
        color={Colors.light.tint}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfoContainer: {
    marginBottom: 30,
    alignItems: "center",
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userInfoText: {
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: 10,
  },
});

export default Page;
