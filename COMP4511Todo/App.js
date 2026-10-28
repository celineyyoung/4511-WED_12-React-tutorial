import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Finish COMP4511 prototype",
      description: "Complete the low-fidelity prototype screens",
      completed: false,
      visibility: "private",
      dueDate: "30 Oct 2026",
    },
    {
      id: "2",
      title: "React Lab Activity",
      description: "Build the to-do list application",
      completed: true,
      visibility: "public",
      dueDate: "31 Oct 2026",
    },
    {
      id: "3",
      title: "Grocery shopping",
      description: "Go to woolies for weekly restock",
      completed: true,
      visibility: "public",
      dueDate: "1 Oct 2005",
    },
  ]);

  // === States ===
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [newDueDate, setNewDueDate] = useState("");
  // Editing task
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  // === functions ===
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const addTask = () => {
    if (newTitle.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDescription,
      dueDate: newDueDate,
      completed: false,
      visibility: "private",
    };

    setTasks([...tasks, newTask]);

    setNewTitle("");
    setNewDescription("");
    setNewDueDate("");
  };
  const openEdit = () => {
    setEditTitle(selectedTask.title);
    setEditDescription(selectedTask.description);
    setEditDueDate(selectedTask.dueDate);
    setIsEditing(true);
  };

  const saveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === selectedTask.id
          ? {
              ...task,
              title: editTitle,
              description: editDescription,
              dueDate: editDueDate,
            }
          : task
      )
    );

    setIsEditing(false);
  };
  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  const toggleVisibility = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              visibility: task.visibility === "private" ? "public" : "private",
            }
          : task
      )
    );
  };
  // edit task screen
  if (selectedTask && isEditing) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setIsEditing(false)}>
          <Text style={styles.backButtonText}>← Task Details</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Edit Task</Text>

        <View style={styles.editCard}>
          <Text style={styles.detailLabel}>Title</Text>

          <TextInput
            style={styles.editInput}
            value={editTitle}
            onChangeText={setEditTitle}
          />

          <Text style={styles.detailLabel}>Description</Text>

          <TextInput
            style={[styles.editInput, styles.descriptionInput]}
            value={editDescription}
            onChangeText={setEditDescription}
            multiline
          />
          <Text style={styles.detailLabel}>Due Date</Text>
          <TextInput
            style={styles.editInput}
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

  // Task Details screen
  if (selectedTask) {
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
            <View style={styles.metaItem}>
              <Text style={styles.detailLabel}>Status</Text>

              <View
                style={[
                  styles.detailBadge,
                  selectedTask.completed
                    ? styles.completedBadge
                    : styles.incompleteBadge,
                ]}>
                <Text style={styles.badgeText}>
                  {selectedTask.completed ? "✓ Completed" : "Incomplete"}
                </Text>
              </View>
            </View>

            <View style={[styles.metaItem, { alignItems: "flex-end" }]}>
              <Text style={styles.detailLabel}>Visibility</Text>

              <View style={[styles.detailBadge, styles.badge]}>
                <Text style={styles.badgeText}>
                  {selectedTask.visibility === "public"
                    ? "Public 👥"
                    : "Private 🔒"}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.detailLabel}>Description</Text>
          <Text>{selectedTask.description}</Text>

          <Text style={styles.detailLabel}>Due Date</Text>
          <Text>{selectedTask.dueDate}</Text>

          <TouchableOpacity
            style={styles.visibilityButton}
            onPress={() => toggleVisibility(selectedTask.id)}>
            <Text style={styles.visibilityButtonText}>
              {selectedTask.visibility === "private"
                ? "Make Public 👥"
                : "Make Private 🔒"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.detailCompleteButton}
            onPress={() => toggleComplete(selectedTask.id)}>
            <Text style={styles.detailCompleteButtonText}>
              {selectedTask.completed ? "Mark Incomplete" : "Mark Complete"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={openEdit}>
            <Text style={styles.editButtonText}>Edit Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Tasks</Text>
      <TextInput
        style={styles.input}
        placeholder="Task title"
        value={newTitle}
        onChangeText={setNewTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Task description"
        value={newDescription}
        onChangeText={setNewDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Due date (e.g. 30 Oct 2026)"
        value={newDueDate}
        onChangeText={setNewDueDate}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>+ Add Task</Text>
      </TouchableOpacity>
      <View style={styles.addTaskBottomShadow} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
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

              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {item.visibility === "public" ? "Public 👥" : "Private 🔒"}
                </Text>
              </View>
            </View>
            <Text style={styles.description}>{item.description}</Text>
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
              onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButtonText}>Delete 🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  // === Main Layout ===
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

  // === Add Task Section ===
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
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
    shadowOpacity: 1,
    shadowRadius: 2,

    elevation: 2,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  addTaskBottomShadow: {
    height: 8,
    marginHorizontal: -20,
    marginBottom: 0,
    backgroundColor: "rgba(55, 55, 53, 0.15)",
  },

  // === Task Cards ===
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

  description: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },

  dueDate: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 8,
    alignSelf: "flex-end",
  },

  // === Badges ===
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
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

  // === Task Card Buttons ===
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

  // === Task Details ===
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

  detailLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 18,
    marginBottom: 5,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 16,
  },

  metaItem: {
    alignItems: "flex-start",
  },

  detailBadge: {
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  // === Task Details Buttons ===
  visibilityButton: {
    marginTop: 10,
    padding: 11,
    borderRadius: 9,
    alignItems: "center",
    backgroundColor: "#E1DAD6",
  },

  visibilityButtonText: {
    fontWeight: "600",
    color: "#373735",
  },

  detailCompleteButton: {
    marginTop: 18,
    padding: 12,
    borderRadius: 9,
    alignItems: "center",
    backgroundColor: "#6F6E60",
  },

  detailCompleteButtonText: {
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

  // === Edit Task ===
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

  editInput: {
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
    marginTop: 20,
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
