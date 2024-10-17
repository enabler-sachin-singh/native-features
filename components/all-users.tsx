import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import UserItem from "@/components/user-item";
import { Colors } from "@/constants/Colors";
import { USER } from "@/data";

interface PickedLocation {
  lat: number;
  long: number;
}
interface User {
  id: string;
  title: string;
  location: PickedLocation;
  image: string;
}

const UserList: React.FC = () => {
  const handleUserPress = (userName: string) => {
    alert(`User pressed: ${userName}`);
  };

  const renderItem = ({ item }: { item: User }) => (
    <UserItem title={item.title} image={item.image} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={USER}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: Colors.light.text,
  },
  listContainer: {
    paddingBottom: 100,
  },
});

export default UserList;
