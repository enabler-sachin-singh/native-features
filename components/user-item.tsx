import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors } from "@/constants/Colors";

interface UserItemProps {
  image: string;
  title: string;
}

const UserItem: React.FC<UserItemProps> = ({ image, title }) => {
  return (
    <TouchableOpacity style={styles.userCard}>
      <Image source={{ uri: image }} style={styles.userImage} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Styles for the UserItem component
const styles = StyleSheet.create({
  userCard: {
    flexDirection: "row",
    backgroundColor: Colors.light.background,
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
  },
  userDescription: {
    fontSize: 14,
    color: Colors.light.icon,
  },
});

export default UserItem;