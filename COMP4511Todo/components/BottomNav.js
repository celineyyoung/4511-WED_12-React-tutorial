import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BottomNav({
  currentScreen,
  setCurrentScreen,
  setSelectedTaskId,
}) {
  const activeColor = "#373735";
  const inactiveColor = "#6F6E60";
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => {
          setSelectedTaskId?.(null);
          setCurrentScreen("tasks");
        }}>
        <FontAwesome5
          name="tasks"
          size={22}
          color={currentScreen === "tasks" ? activeColor : inactiveColor}
        />
        <Text
          style={[
            styles.navText,
            currentScreen === "tasks" && styles.activeNavText,
          ]}>
          My Tasks
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => {
          setSelectedTaskId?.(null);
          setCurrentScreen("shared");
        }}>
        <FontAwesome5
          name="user-friends"
          size={22}
          color={currentScreen === "shared" ? activeColor : inactiveColor}
        />

        <Text
          style={[
            styles.navText,
            currentScreen === "shared" && styles.activeNavText,
          ]}>
          Shared with Me
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => {
          setSelectedTaskId?.(null);
          setCurrentScreen("profile");
        }}>
        <Ionicons
          name="person-circle-outline"
          size={26}
          color={currentScreen === "profile" ? activeColor : inactiveColor}
        />

        <Text
          style={[
            styles.navText,
            currentScreen === "profile" && styles.activeNavText,
          ]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    paddingTop: 10,
    paddingBottom: 18,

    borderTopWidth: 1,
    borderTopColor: "#D1D5DB",

    elevation: 5,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },

  navIcon: {
    fontSize: 20,
    marginBottom: 3,
  },

  navText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6F6E60",
  },

  activeNavText: {
    color: "#373735",
    fontWeight: "800",
  },
});
