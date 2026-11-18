import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

import BottomNav from "../components/BottomNav";
import ActivityButton from "../components/ActivityButton";

export default function SharedScreen({
  sharedTasks,
  setSelectedSharedTaskId,
  currentScreen,
  setCurrentScreen,
  setSelectedTaskId,
}) {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const feedbackOpacity = useRef(new Animated.Value(0)).current;

  const showFeedback = (message) => {
    setFeedbackMessage(message);

    // Fade in
    Animated.timing(feedbackOpacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    // Wait 1 seconds, then fade out
    setTimeout(() => {
      Animated.timing(feedbackOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setFeedbackMessage("");
      });
    }, 1000);
  };
  return (
    <View style={styles.container}>
      <ActivityButton onPress={() => setCurrentScreen("activity")} />
      <Text style={styles.heading}>Shared With Me</Text>

      <Text style={styles.subtitle}>
        Tasks your friends have shared with you
      </Text>

      <FlatList
        data={sharedTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            {/* FRIEND */}
            <View style={styles.ownerRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.owner.charAt(0)}</Text>
              </View>

              <View>
                <Text style={styles.ownerName}>{item.owner}</Text>

                <Text style={styles.ownerUsername}>{item.username}</Text>
              </View>
            </View>
            {/* TASK INFORMATION */}
            <Text style={styles.taskTitle}>{item.title}</Text>

            <Text style={styles.description}>{item.description}</Text>

            <Text style={styles.dueDate}>Due: {item.dueDate}</Text>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.kudosButton, styles.actionButton]}
                onPress={() => showFeedback(`👍 Kudos sent to ${item.owner}!`)}>
                <Text style={styles.kudosButtonText}>👍 Send Kudos</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.detailsButton, styles.actionButton]}
                onPress={() => {
                  setSelectedSharedTaskId(item.id);
                }}>
                <Text style={styles.detailsButtonText}>View Details →</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {feedbackMessage !== "" && (
        <Animated.View
          style={[
            styles.feedbackPopup,
            {
              opacity: feedbackOpacity,
            },
          ]}>
          <Text style={styles.feedbackText}>{feedbackMessage}</Text>
        </Animated.View>
      )}
      <BottomNav
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        setSelectedTaskId={setSelectedTaskId}
        setSelectedSharedTaskId={setSelectedSharedTaskId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 90,
    backgroundColor: "#E1DAD6",
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
    paddingBottom: 100,
  },

  // TASK CARD

  taskCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 2,
  },

  // FRIEND

  ownerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,

    backgroundColor: "#BDB1A0",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
  },

  avatarText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#373735",
  },

  ownerName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#373735",
  },

  ownerUsername: {
    fontSize: 12,
    color: "#8A8A8A",
    marginTop: 2,
  },
  // TASK INFORMATION

  taskTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },

  description: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },

  dueDate: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 10,
    marginBottom: 14,
  },

  // ENCOURAGEMENT

  feedbackPopup: {
    position: "absolute",

    bottom: 100,
    left: 30,
    right: 30,

    backgroundColor: "#373735",

    paddingVertical: 12,
    paddingHorizontal: 16,

    borderRadius: 10,

    alignItems: "center",

    zIndex: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 5,
  },

  feedbackText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  actionButton: {
    flex: 1,
  },
  kudosButton: {
    paddingVertical: 11,
    borderRadius: 9,
    backgroundColor: "#BDB1A0",
    alignItems: "center",
  },

  kudosButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#373735",
  },

  detailsButton: {
    paddingVertical: 11,
    borderRadius: 9,
    backgroundColor: "#E1DAD6",
    alignItems: "center",
  },

  detailsButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#373735",
  },
});
