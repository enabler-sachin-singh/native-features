import { View } from "react-native";
import React from "react";
import AddUserForm from "@/forms/add-user-form";

const AddUser = () => {
  return (
    <View style={{ flex: 1 }}>
      <AddUserForm />
    </View>
  );
};

export default AddUser;
