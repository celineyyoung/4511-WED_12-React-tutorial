import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function CreateTaskScreen({
  newTitle,
  setNewTitle,
  newDescription,
  setNewDescription,
  newDueDate,
  setNewDueDate,
  newVisibility,
  setNewVisibility,
  addTask,
  setCurrentScreen,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  // form validation
  const handleCreateTask = () => {
    if (newTitle.trim() === "") {
      setErrorMessage("Please enter a task title.");
      return;
    }
    if (newDueDate.trim() === "") {
      setErrorMessage("Please enter a due date.");
      return;
    }

    setErrorMessage("");
    addTask();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setCurrentScreen("tasks")}>
        <Text style={styles.backButtonText}>← My Tasks</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Create Task</Text>

      <View style={styles.createCard}>
        <Text style={styles.label}>Title</Text>

        <TextInput
          style={styles.input}
          placeholder="Task title"
          value={newTitle}
          onChangeText={setNewTitle}
        />

        <Text style={styles.label}>Description</Text>

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Task description"
          value={newDescription}
          onChangeText={setNewDescription}
          multiline
        />

        <Text style={styles.label}>Due Date</Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. 30 Oct 2026"
          value={newDueDate}
          onChangeText={setNewDueDate}
        />

        <Text style={styles.label}>Visibility</Text>

        <View style={styles.visibilityRow}>
          <TouchableOpacity
            style={[
              styles.visibilityButton,
              newVisibility === "private" && styles.selectedVisibilityButton,
            ]}
            onPress={() => setNewVisibility("private")}>
            <Text style={styles.visibilityButtonText}>🔒 Private</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.visibilityButton,
              newVisibility === "public" && styles.selectedVisibilityButton,
            ]}
            onPress={() => setNewVisibility("public")}>
            <Text style={styles.visibilityButtonText}>👥 Public</Text>
          </TouchableOpacity>
        </View>
        {errorMessage !== "" && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateTask}>
          <Text style={styles.createButtonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
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

  createCard: {
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

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 18,
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#F7F8FA",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#111827",
  },

  descriptionInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  visibilityRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },

  visibilityButton: {
    flex: 1,
    padding: 12,
    borderRadius: 9,
    alignItems: "center",
    backgroundColor: "#E1DAD6",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },

  selectedVisibilityButton: {
    backgroundColor: "#BDB1A0",
    borderColor: "#6F6E60",
  },

  visibilityButtonText: {
    fontWeight: "600",
    color: "#373735",
  },

  createButton: {
    marginTop: 24,
    padding: 13,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#6F6E60",

    shadowColor: "#4D4434",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,

    elevation: 2,
  },

  createButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  errorText: {
    fontSize: 13,
    color: "#B91C1C",
    marginTop: 12,
  },
});
