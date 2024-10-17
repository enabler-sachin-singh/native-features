import React, { ReactNode } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface CustomButtonProps {
  onPress: () => void;
  color?: string;
  style?: object;
  children: ReactNode;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  color = Colors.light.tint,
  style,
  children,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: disabled ? Colors.light?.disabled : color },
        style,
      ]}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 5,
  },
  disabledText: {
    color: "#aaa",
  },
  text: {
    color: "#fff",
  },
});

export default CustomButton;
