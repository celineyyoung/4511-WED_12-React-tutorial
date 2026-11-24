import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

import BottomNav from "../components/BottomNav";
import ConfirmationModal from "../components/ConfirmationModal";
export default function TaskDetailsScreen({
  selectedTask,
  setSelectedTaskId,
  toggleVisibility,
  toggleComplete,
  openEdit,
  setCurrentScreen,
  currentScreen,
}) {
  const [showVisibilityConfirmation, setShowVisibilityConfirmation] =
    useState(false);

  const handleVisibilityPress = () => {
    setShowVisibilityConfirmation(true);
  };

  const confirmVisibilityChange = () => {
    toggleVisibility(selectedTask.id);
    setShowVisibilityConfirmation(false);
  };

  const makingPublic = selectedTask.visibility === "private";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setSelectedTaskId(null)}>
        <Text style={styles.backButtonText}>← My Tasks</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Task Details</Text>

      <View style={styles.detailCard}>
        <Text style={styles.taskTitle}>{selectedTask.title}</Text>

        <View style={styles.metaRow}>
          <View>
            <Text style={styles.label}>Status</Text>

            <View
              style={[
                styles.badge,
                selectedTask.completed
                  ? styles.completedBadge
                  : styles.incompleteBadge,
              ]}>
              <Text style={styles.badgeText}>
                {selectedTask.completed ? "✓ Completed" : "Incomplete"}
              </Text>
            </View>
          </View>

          <View style={styles.rightMeta}>
            <Text style={styles.label}>Visibility</Text>

            <View
              style={[
                styles.visibilityBadge,
                selectedTask.visibility === "public"
                  ? styles.publicBadge
                  : styles.privateBadge,
              ]}>
              <Text
                style={[
                  styles.visibilityBadgeText,
                  selectedTask.visibility === "public"
                    ? styles.publicBadgeText
                    : styles.privateBadgeText,
                ]}>
                {selectedTask.visibility === "public"
                  ? "👥 Public"
                  : "🔒 Private"}
              </Text>
            </View>
          </View>
        </View>

        {selectedTask.description?.trim() !== "" && (
          <>
            <Text style={styles.label}>Description</Text>

            <Text style={styles.description}>{selectedTask.description}</Text>
          </>
        )}

        <Text style={styles.label}>Due Date</Text>

        <Text style={styles.description}>{selectedTask.dueDate}</Text>

        <TouchableOpacity
          style={styles.visibilityButton}
          onPress={handleVisibilityPress}>
          <Text style={styles.visibilityButtonText}>
            {selectedTask.visibility === "private"
              ? "Make Public 👥"
              : "Make Private 🔒"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => toggleComplete(selectedTask.id)}>
          <Text style={styles.completeButtonText}>
            {selectedTask.completed ? "Mark Incomplete" : "Mark Complete"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton} onPress={openEdit}>
          <Text style={styles.editButtonText}>Edit Task</Text>
        </TouchableOpacity>
      </View>

      <ConfirmationModal
        visible={showVisibilityConfirmation}
        title={makingPublic ? "Make Task Public?" : "Make Task Private?"}
        message={
          makingPublic
            ? "Your friends will be able to see this task and send you encouragement."
            : "Your friends will no longer be able to see or encourage you on this task."
        }
        confirmText={makingPublic ? "Make Public" : "Make Private"}
        onCancel={() => setShowVisibilityConfirmation(false)}
        onConfirm={confirmVisibilityChange}
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
    paddingBottom: 100,
    backgroundColor: "#E1DAD6",
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
    color: "#373735",
  },

  backButton: {
    marginBottom: 20,
  },

  backButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6F6E60",
  },

  detailCard: {
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

  taskTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },

  rightMeta: {
    alignItems: "flex-end",
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
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  completedBadge: {
    backgroundColor: "#B8B7A0",
  },

  incompleteBadge: {
    backgroundColor: "#BDB1A0",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },

  visibilityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: "flex-start",
  },

  publicBadge: {
    backgroundColor: "#DCE8DF",
    borderColor: "#8BA895",
  },

  privateBadge: {
    backgroundColor: "#EEE9E4",
    borderColor: "#B6AAA0",
  },

  visibilityBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  publicBadgeText: {
    color: "#496653",
  },

  privateBadgeText: {
    color: "#625950",
  },

  visibilityButton: {
    marginTop: 20,
    padding: 11,
    borderRadius: 9,
    alignItems: "center",
    backgroundColor: "#E1DAD6",
  },

  visibilityButtonText: {
    fontWeight: "600",
    color: "#373735",
  },

  completeButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 9,
    alignItems: "center",
    backgroundColor: "#6F6E60",
  },

  completeButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  editButton: {
    marginTop: 10,
    padding: 11,
    borderWidth: 1,
    borderColor: "#BDB1A0",
    borderRadius: 9,
    alignItems: "center",
  },

  editButtonText: {
    fontWeight: "600",
    color: "#373735",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  confirmationPopup: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },

  confirmationTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#373735",
    marginBottom: 8,
  },

  confirmationText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 20,
  },

  modalButtonRow: {
    flexDirection: "row",
    gap: 10,
  },

  cancelButton: {
    flex: 1,
    padding: 11,
    borderRadius: 9,
    backgroundColor: "#E1DAD6",
    alignItems: "center",
  },

  cancelButtonText: {
    fontWeight: "600",
    color: "#373735",
  },

  confirmVisibilityButton: {
    flex: 1,
    padding: 11,
    borderRadius: 9,
    alignItems: "center",
  },

  confirmPublicButton: {
    backgroundColor: "#6F8A76",
  },

  confirmPrivateButton: {
    backgroundColor: "#6F6E60",
  },

  confirmVisibilityButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
