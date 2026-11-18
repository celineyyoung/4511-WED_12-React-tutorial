import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import BottomNav from "../components/BottomNav";
export default function SharedTaskDetailsScreen({
  selectedSharedTask,
  setSelectedSharedTaskId,
  setCurrentScreen,
  currentScreen,
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
      {/* BACK */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setSelectedSharedTaskId(null)}>
        <Text style={styles.backButtonText}>← Shared With Me</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Task Details</Text>

      <View style={styles.card}>
        {/* FRIEND */}
        <View style={styles.ownerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {selectedSharedTask.owner.charAt(0)}
            </Text>
          </View>

          <View>
            <Text style={styles.ownerName}>{selectedSharedTask.owner}</Text>

            <Text style={styles.sharedLabel}>Shared this task with you</Text>
          </View>
        </View>

        {/* TASK */}
        <Text style={styles.taskTitle}>{selectedSharedTask.title}</Text>

        <Text style={styles.label}>Description</Text>

        <Text style={styles.description}>{selectedSharedTask.description}</Text>

        <Text style={styles.label}>Due Date</Text>

        <Text style={styles.description}>{selectedSharedTask.dueDate}</Text>

        {/* ENCOURAGEMENT */}

        <Text style={styles.encouragementHeading}>Send encouragement</Text>

        <Text style={styles.encouragementHelp}>
          Let {selectedSharedTask.owner} know you're supporting them.
        </Text>

        <View style={styles.encouragementGrid}>
          <TouchableOpacity
            style={styles.encouragementButton}
            onPress={() =>
              showFeedback(`Good Job sent to ${selectedSharedTask.owner}!`)
            }>
            <Text style={styles.encouragementText}>👍 Good Job</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.encouragementButton}
            onPress={() =>
              showFeedback(`Keep Going sent to ${selectedSharedTask.owner}!`)
            }>
            <Text style={styles.encouragementText}>👏 Keep Going</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.encouragementButton}
            onPress={() =>
              showFeedback(`Lock In sent to ${selectedSharedTask.owner}!`)
            }>
            <Text style={styles.encouragementText}>💪 Lock In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.encouragementButton}
            onPress={() =>
              showFeedback(`Checking In sent to ${selectedSharedTask.owner}!`)
            }>
            <Text style={styles.encouragementText}>👀 Checking In</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 2,
  },

  ownerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: "700",
    color: "#373735",
  },

  ownerName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#373735",
  },

  sharedLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  taskTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 14,
    marginBottom: 5,
  },

  description: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 21,
  },

  encouragementHeading: {
    fontSize: 17,
    fontWeight: "700",
    color: "#373735",
    marginTop: 28,
    marginBottom: 4,
  },

  encouragementHelp: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 14,
  },

  encouragementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  encouragementButton: {
    width: "48%",
    padding: 15,
    borderRadius: 9,
    backgroundColor: "#E1DAD6",
    alignItems: "center",
    shadowColor: "#6F6E60",
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 3,
  },

  encouragementText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#373735",
  },

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
});
