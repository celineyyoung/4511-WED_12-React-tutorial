import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
export default function ActivityButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <FontAwesome5 name="bell" size={24} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 55,
    right: 20,

    width: 45,
    height: 45,

    borderRadius: 21,

    backgroundColor: "#BDB1A0",

    alignItems: "center",
    justifyContent: "center",

    zIndex: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,

    elevation: 3,
  },
});
