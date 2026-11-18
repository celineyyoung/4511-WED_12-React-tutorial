import React, { useState } from "react";

import MyTasksScreen from "./screens/MyTasksScreen";
import CreateTaskScreen from "./screens/CreateTaskScreen";
import TaskDetailsScreen from "./screens/TaskDetailsScreen";
import EditTaskScreen from "./screens/EditTaskScreen";
import SharedScreen from "./screens/SharedScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SharedTaskDetailsScreen from "./screens/SharedTaskDetailsScreen";
import FriendsScreen from "./screens/FriendsScreen";
import ActivityScreen from "./screens/ActivityScreen";
export default function App() {
  //  TASK DATA
  // for my tasks page
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
      dueDate: "1 Nov 2026",
    },
  ]);

  // for shared with me page
  const [sharedTasks, setSharedTasks] = useState([
    {
      id: "s1",
      title: "Finish robotics report",
      description: "Complete the results and discussion section",
      dueDate: "18 Nov 2026",
      owner: "Ben",
      username: "@ben.pal1628",
      completed: false,
    },

    {
      id: "s2",
      title: "Go for a 30 minute run",
      description: "Complete today's planned exercise",
      dueDate: "16 Nov 2026",
      owner: "Anjika",
      username: "@anjikaSharma123",
      completed: false,
    },
    {
      id: "s3",
      title: "Edit Article",
      description: "Solve all feedback commments that have been left",
      dueDate: "18 Nov 2026",
      owner: "Ben",
      username: "@ben.pal1628",
      completed: false,
    },
  ]);
  const [friends, setFriends] = useState([
    {
      id: "f1",
      name: "Ben",
      username: "@ben.pal1628",
    },
    {
      id: "f2",
      name: "Anjika",
      username: "@anjikaSharma123",
    },
  ]);

  // Profiles
  const [profile, setProfile] = useState({
    name: "Celine Young",
    username: "@celynestudio",
    bio: "21, akl, syd\nCS @UNSW",
  });
  // NAVIGATION

  const [currentScreen, setCurrentScreen] = useState("tasks");

  // CREATE TASK STATE

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newVisibility, setNewVisibility] = useState("private");

  // CREATE TASK CONFIRM POPUP
  const [showTaskAddedConfirmation, setShowTaskAddedConfirmation] =
    useState(false);
  // SELECTED TASK
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  const [selectedSharedTaskId, setSelectedSharedTaskId] = useState(null);
  const selectedSharedTask = sharedTasks.find(
    (task) => task.id === selectedSharedTaskId
  );

  // DELETE STATE
  const [taskToDelete, setTaskToDelete] = useState(null);

  // EDIT STATE
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  // FUNCTIONS ===

  // COMPLETE / INCOMPLETE
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  // DELETE TASK
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ADD TASK
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
      visibility: newVisibility,
    };

    // newest task first
    setTasks([newTask, ...tasks]);

    // clear form
    setNewTitle("");
    setNewDescription("");
    setNewDueDate("");
    setNewVisibility("private");

    setCurrentScreen("tasks");
    setShowTaskAddedConfirmation(true);

    setTimeout(() => {
      setShowTaskAddedConfirmation(false);
    }, 1500);
  };

  // VISIBILITY
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

  // OPEN EDIT
  const openEdit = () => {
    setEditTitle(selectedTask.title);

    setEditDescription(selectedTask.description);

    setEditDueDate(selectedTask.dueDate);

    setIsEditing(true);
  };

  // SAVE EDIT
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

  // activity logs - encouragement
  const [activities, setActivities] = useState([
    {
      id: "a1",
      from: "Ben",
      type: "Kudos",
      message: "sent you 👍 Kudos",
      taskTitle: "Finish COMP4511 prototype",
      time: "2 hours ago",
    },
    {
      id: "a2",
      from: "Anjika",
      type: "Encouragement",
      message: 'sent you "Keep Going"',
      taskTitle: "React Lab Activity",
      time: "Yesterday",
    },
  ]);
  // removing friend
  const removeFriend = (id) => {
    const friendToRemove = friends.find((friend) => friend.id === id);

    setFriends(friends.filter((friend) => friend.id !== id));

    if (friendToRemove) {
      setSharedTasks(
        sharedTasks.filter((task) => task.username !== friendToRemove.username)
      );
    }
  };
  // SCREEN DISPLAYS ===
  // CREATE
  if (currentScreen === "create") {
    return (
      <CreateTaskScreen
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newDescription={newDescription}
        setNewDescription={setNewDescription}
        newDueDate={newDueDate}
        setNewDueDate={setNewDueDate}
        newVisibility={newVisibility}
        setNewVisibility={setNewVisibility}
        addTask={addTask}
        setCurrentScreen={setCurrentScreen}
      />
    );
  }
  // activity logs screen
  if (currentScreen === "activity") {
    return (
      <ActivityScreen
        activities={activities}
        setCurrentScreen={setCurrentScreen}
        setSelectedTaskId={setSelectedTaskId}
      />
    );
  }
  // SHARED WITH ME
  // shared task detail
  if (currentScreen === "shared" && selectedSharedTask) {
    return (
      <SharedTaskDetailsScreen
        selectedSharedTask={selectedSharedTask}
        setSelectedSharedTaskId={setSelectedSharedTaskId}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        setSelectedTaskId={setSelectedTaskId}
      />
    );
  }
  // shared with me screen
  if (currentScreen === "shared") {
    return (
      <SharedScreen
        sharedTasks={sharedTasks}
        setSelectedSharedTaskId={setSelectedSharedTaskId}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        setSelectedTaskId={setSelectedTaskId}
      />
    );
  }
  // PROFILE
  if (currentScreen === "profile") {
    return (
      <ProfileScreen
        profile={profile}
        setProfile={setProfile}
        tasks={tasks}
        friends={friends}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        toggleComplete={toggleComplete}
        setSelectedTaskId={setSelectedTaskId}
      />
    );
  }

  // EDIT TASK
  if (selectedTask && isEditing) {
    return (
      <EditTaskScreen
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        editDueDate={editDueDate}
        setEditDueDate={setEditDueDate}
        saveEdit={saveEdit}
        setIsEditing={setIsEditing}
        setSelectedTaskId={setSelectedTaskId}
      />
    );
  }

  // TASK DETAILS
  if (selectedTask) {
    return (
      <TaskDetailsScreen
        selectedTask={selectedTask}
        setSelectedTaskId={setSelectedTaskId}
        toggleVisibility={toggleVisibility}
        toggleComplete={toggleComplete}
        openEdit={openEdit}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
    );
  }

  if (currentScreen === "friends") {
    return (
      <FriendsScreen
        friends={friends}
        setFriends={setFriends}
        setCurrentScreen={setCurrentScreen}
        setSelectedTaskId={setSelectedTaskId}
        removeFriend={removeFriend}
      />
    );
  }

  // DEFAULT SCREEN = MY TASKS
  return (
    <MyTasksScreen
      tasks={tasks}
      toggleComplete={toggleComplete}
      setSelectedTaskId={setSelectedTaskId}
      taskToDelete={taskToDelete}
      setTaskToDelete={setTaskToDelete}
      deleteTask={deleteTask}
      currentScreen={currentScreen}
      setCurrentScreen={setCurrentScreen}
      showTaskAddedConfirmation={showTaskAddedConfirmation}
    />
  );
}
