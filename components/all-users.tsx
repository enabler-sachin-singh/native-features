import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import UserItem from "@/components/user-item";
import { Colors } from "@/constants/Colors";
import { USER } from "@/lib";

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
      {USER.length === 0 ? (
        <View>
          <Text style={styles.noUsersText}>No current users</Text>
        </View>
      ) : (
        <FlatList
          data={USER}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 16,
  },
  noUsersText: {
    fontSize: 18,
    color: Colors.light.text,
    textAlign: "center",
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 100,
  },
});

export default UserList;
