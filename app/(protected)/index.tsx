import { View, Text, Image, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import { Colors } from "@/constants/Colors";

const Page = () => {
  const authCTX = useContext(AuthContext);
  const { userInfo } = authCTX || {};

  return (
    <View style={styles.container}>
      {userInfo && (
        <View style={styles.profileContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Sachin</Text>
          </View>
          {userInfo.photo && (
            <Image
              source={{ uri: userInfo.photo }}
              style={styles.profileImage}
            />
          )}
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.userEmail}>{userInfo.email}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  profileContainer: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    width: "100%",
    backgroundColor: "#D1E6FF",
    paddingVertical: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: Colors.light.text,
  },
  userEmail: {
    fontSize: 18,
    color: Colors.light.text,
    marginTop: 5,
  },
});

export default Page;
