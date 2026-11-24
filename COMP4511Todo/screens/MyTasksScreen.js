import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import BottomNav from "../components/BottomNav";
import ActivityButton from "../components/ActivityButton";
import ConfirmationModal from "../components/ConfirmationModal";
export default function MyTasksScreen({
  tasks,
  toggleComplete,
  setSelectedTaskId,
  taskToDelete,
  setTaskToDelete,
  deleteTask,
  currentScreen,
  setCurrentScreen,
  showTaskAddedConfirmation,
}) {
  const [taskFilter, setTaskFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === "active") {
      return !task.completed;
    }

    if (taskFilter === "completed") {
      return task.completed;
    }

    return true;
  });
  return (
    <View style={styles.container}>
      <ActivityButton onPress={() => setCurrentScreen("activity")} />
      <Text style={styles.heading}>My Tasks</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setCurrentScreen("create")}>
        <Text style={styles.addButtonText}>+ Add Task</Text>
      </TouchableOpacity>

      <View style={styles.addTaskBottomShadow} />
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            taskFilter === "all" && styles.activeFilterButton,
          ]}
          onPress={() => setTaskFilter("all")}>
          <Text
            style={[
              styles.filterText,
              taskFilter === "all" && styles.activeFilterText,
            ]}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            taskFilter === "active" && styles.activeFilterButton,
          ]}
          onPress={() => setTaskFilter("active")}>
          <Text
            style={[
              styles.filterText,
              taskFilter === "active" && styles.activeFilterText,
            ]}>
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            taskFilter === "completed" && styles.activeFilterButton,
          ]}
          onPress={() => setTaskFilter("completed")}>
          <Text
            style={[
              styles.filterText,
              taskFilter === "completed" && styles.activeFilterText,
            ]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTasks}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet, click Add Task to get started.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>

            <View style={styles.badgeRow}>
              <View
                style={[
                  styles.badge,
                  item.completed
                    ? styles.completedBadge
                    : styles.incompleteBadge,
                ]}>
                <Text style={styles.badgeText}>
                  {item.completed ? "✓ Completed" : "Incomplete"}
                </Text>
              </View>

              <View
                style={[
                  styles.visibilityBadge,
                  item.visibility === "public"
                    ? styles.publicBadge
                    : styles.privateBadge,
                ]}>
                <Text
                  style={[
                    styles.visibilityBadgeText,
                    item.visibility === "public"
                      ? styles.publicBadgeText
                      : styles.privateBadgeText,
                  ]}>
                  {item.visibility === "public" ? "👥 Public" : "🔒 Private"}
                </Text>
              </View>
            </View>

            {item.description?.trim() !== "" && (
              <Text style={styles.description}>{item.description}</Text>
            )}

            <Text style={styles.dueDate}>Due: {item.dueDate}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.completeButton, styles.rowButton]}
                onPress={() => toggleComplete(item.id)}>
                <Text style={styles.completeButtonText}>
                  {item.completed ? "Mark Incomplete" : "Mark Complete"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.detailsButton, styles.rowButton]}
                onPress={() => setSelectedTaskId(item.id)}>
                <Text style={styles.detailsButtonText}>View Details →</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => setTaskToDelete(item)}>
              <Text style={styles.deleteButtonText}>Delete 🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Modal
        visible={showTaskAddedConfirmation}
        transparent={true}
        animationType="fade">
        <View style={styles.successModalOverlay}>
          <View style={styles.successPopup}>
            <Text style={styles.successTitle}>Task added!</Text>

            <Text style={styles.successText}>
              Your task has been successfully added.
            </Text>
          </View>
        </View>
      </Modal>
      <ConfirmationModal
        visible={taskToDelete !== null}
        title="Delete Task?"
        message={`Are you sure you want to delete "${taskToDelete?.title}"?`}
        confirmText="Delete"
        destructive={true}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={() => {
          deleteTask(taskToDelete.id);
          setTaskToDelete(null);
        }}
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
    color: "#373735",
    marginBottom: 20,
  },

  listContent: {
    paddingBottom: 100,
  },
  addButton: {
    backgroundColor: "#6F6E60",
    padding: 13,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,

    shadowColor: "#4D4434",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,

    elevation: 2,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  addTaskBottomShadow: {
    height: 5,
    marginHorizontal: -20,
    marginBottom: 10,
    backgroundColor: "rgba(55,55,53,0.08)",
  },

  taskCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 14,
    borderRadius: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 2,
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },

  badgeRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 6,
  },

  badge: {
    backgroundColor: "#E5E7EB",
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

  description: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },

  dueDate: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 6,
    alignSelf: "flex-end",
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  rowButton: {
    flex: 1,
  },

  completeButton: {
    padding: 11,
    borderRadius: 9,
    alignItems: "center",
    backgroundColor: "#BDB1A0",
  },

  completeButtonText: {
    fontWeight: "600",
    color: "#1F2937",
  },

  detailsButton: {
    padding: 11,
    borderRadius: 9,
    alignItems: "center",
    backgroundColor: "#E1DAD6",
  },

  detailsButtonText: {
    fontWeight: "600",
    color: "#1F2937",
  },

  deleteButton: {
    marginTop: 8,
    padding: 9,
    alignItems: "center",
  },

  deleteButtonText: {
    fontWeight: "600",
    color: "#DC2626",
  },

  // DELETE MODAL

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  deletePopup: {
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

  deletePopupTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  deletePopupText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 18,
  },

  cancelButton: {
    flex: 1,
    padding: 11,
    borderRadius: 9,
    alignItems: "center",
    backgroundColor: "#E1DAD6",
  },

  cancelButtonText: {
    fontWeight: "600",
    color: "#373735",
  },

  confirmDeleteButton: {
    flex: 1,
    padding: 11,
    borderRadius: 9,
    alignItems: "center",
    backgroundColor: "#DC2626",
  },

  confirmDeleteButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 15,
  },

  filterButton: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },

  activeFilterButton: {
    backgroundColor: "#6F6E60",
    borderColor: "#6F6E60",
  },

  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
  },

  activeFilterText: {
    color: "#FFFFFF",
  },
  visibilityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },

  publicBadge: {
    backgroundColor: "#C0D5DF",
    borderColor: "#8C9EA7",
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
  emptyText: {
    color: "#496653",
  },
  successModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  successPopup: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#FFFFFF",
    padding: 22,
    borderRadius: 14,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 5,
  },

  successTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#373735",
    marginBottom: 6,
  },

  successText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});
