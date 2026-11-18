import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import BottomNav from "../components/BottomNav";
export default function ActivityScreen({
  activities,
  setCurrentScreen,
  currentScreen,
  setSelectedTaskId,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Activity</Text>

      <Text style={styles.subtitle}>
        Encouragement and updates from your friends
      </Text>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.activityCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.from.charAt(0)}</Text>
            </View>

            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>
                <Text style={styles.friendName}>{item.from}</Text>{" "}
                {item.message}
              </Text>

              <Text style={styles.taskText}>on "{item.taskTitle}"</Text>

              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </View>
        )}
      />
      <BottomNav
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        setSelectedTaskId={setSelectedTaskId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#E1DAD6",
  },

  backButton: {
    marginBottom: 20,
  },

  backButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6F6E60",
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: "#373735",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },

  listContent: {
    paddingBottom: 40,
  },

  activityCard: {
    flexDirection: "row",

    backgroundColor: "#FFFFFF",

    padding: 15,
    marginBottom: 10,

    borderRadius: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,

    elevation: 2,
  },

  avatar: {
    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: "#BDB1A0",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  avatarText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#373735",
  },

  activityInfo: {
    flex: 1,
  },

  activityText: {
    fontSize: 14,
    color: "#373735",
    lineHeight: 20,
  },

  friendName: {
    fontWeight: "700",
  },

  taskText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  timeText: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 7,
  },
});
