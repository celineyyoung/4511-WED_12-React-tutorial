import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function EditTaskScreen({
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  editDueDate,
  setEditDueDate,
  saveEdit,
  setIsEditing,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setIsEditing(false)}>
        <Text style={styles.backButtonText}>← Task Details</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Edit Task</Text>

      <View style={styles.editCard}>
        <Text style={styles.label}>Title</Text>

        <TextInput
          style={styles.input}
          value={editTitle}
          onChangeText={setEditTitle}
        />

        <Text style={styles.label}>Description</Text>

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={editDescription}
          onChangeText={setEditDescription}
          multiline
        />

        <Text style={styles.label}>Due Date</Text>

        <TextInput
          style={styles.input}
          value={editDueDate}
          onChangeText={setEditDueDate}
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
    color: "#373735",
    marginBottom: 20,
  },

  backButton: {
    marginBottom: 20,
  },

  backButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6F6E60",
  },

  editCard: {
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

  saveButton: {
    marginTop: 24,
    padding: 13,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#6F6E60",
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
