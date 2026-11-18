import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Share,
  StyleSheet,
  Image,
} from "react-native";

import BottomNav from "../components/BottomNav";
import AntDesign from "@expo/vector-icons/AntDesign";
import ActivityButton from "../components/ActivityButton";
export default function ProfileScreen({
  profile,
  setProfile,
  tasks,
  friends,
  currentScreen,
  setCurrentScreen,
  toggleComplete,
  setSelectedTaskId,
}) {
  // Only show tasks the user has made public
  const publicTasks = tasks.filter((task) => task.visibility === "public");
  const [showEditProfile, setShowEditProfile] = useState(false);

  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");

  const [profileError, setProfileError] = useState("");

  const openEditProfile = () => {
    setEditName(profile.name);
    setEditUsername(profile.username);
    setEditBio(profile.bio);

    setProfileError("");
    setShowEditProfile(true);
  };

  const saveProfile = () => {
    if (editName.trim() === "") {
      setProfileError("Please enter your name.");
      return;
    }

    const formattedUsername =
      editUsername.trim() === ""
        ? ""
        : editUsername.startsWith("@")
        ? editUsername
        : `@${editUsername}`;

    setProfile({
      name: editName,
      username: formattedUsername,
      bio: editBio,
    });

    setProfileError("");
    setShowEditProfile(false);
  };

  const shareProfile = async () => {
    try {
      await Share.share({
        message:
          `${profile.name}\n` + `${profile.username}\n\n` + `${profile.bio}`,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ActivityButton onPress={() => setCurrentScreen("activity")} />

      <View style={styles.profileCard}>
        <Text style={styles.profileTitle}>Profile</Text>

        <View style={styles.profileInfoRow}>
          <Image
            source={require("../assets/default-pfp.png")}
            style={styles.avatar}
          />

          <View style={styles.userInfo}>
            <Text style={styles.name}>{profile.name}</Text>

            <Text style={styles.username}>{profile.username}</Text>

            <Text style={styles.bio}>{profile.bio}</Text>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{friends.length}</Text>

                <Text style={styles.statLabel}>Friends</Text>
              </View>

              <View style={styles.stat}>
                <Text style={styles.statNumber}>28</Text>

                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>
        </View>

        {/* PROFILE ACTIONS */}

        <View style={styles.profileActions}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={openEditProfile}>
            <Text style={styles.profileButtonText}>Edit profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton} onPress={shareProfile}>
            <Text style={styles.profileButtonText}>Share profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.friendIconButton}
            onPress={() => setCurrentScreen("friends")}>
            <AntDesign name="user-add" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* PUBLIC TASKS */}

      <Text style={styles.sectionHeading}>Public Tasks</Text>

      <FlatList
        data={publicTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No public tasks yet.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>

            <View
              style={[
                styles.badge,
                item.completed ? styles.completedBadge : styles.incompleteBadge,
              ]}>
              <Text style={styles.badgeText}>
                {item.completed ? "✓ Completed" : "Incomplete"}
              </Text>
            </View>

            <Text style={styles.description}>{item.description}</Text>

            <Text style={styles.dueDate}>Due: {item.dueDate}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => toggleComplete(item.id)}>
                <Text style={styles.completeButtonText}>
                  {item.completed ? "Mark Incomplete" : "Mark Complete"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => {
                  setSelectedTaskId(item.id);
                  setCurrentScreen("tasks");
                }}>
                <Text style={styles.detailsButtonText}>View Details →</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Modal visible={showEditProfile} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.editProfileModal}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <Text style={styles.inputLabel}>Name</Text>

            <TextInput
              style={styles.input}
              value={editName}
              onChangeText={setEditName}
              placeholder="Your name"
            />

            <Text style={styles.inputLabel}>Username</Text>

            <TextInput
              style={styles.input}
              value={editUsername}
              onChangeText={setEditUsername}
              placeholder="@username"
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Bio</Text>

            <TextInput
              style={[styles.input, styles.bioInput]}
              value={editBio}
              onChangeText={setEditBio}
              placeholder="Tell us about yourself"
              multiline
            />

            {profileError !== "" && (
              <Text style={styles.errorText}>{profileError}</Text>
            )}

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowEditProfile(false);
                  setProfileError("");
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveProfileButton}
                onPress={saveProfile}>
                <Text style={styles.saveProfileButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    padding: 12,
    paddingTop: 45,
    paddingBottom: 90,
    backgroundColor: "#E1DAD6",
  },

  // PROFILE CARD

  profileCard: {
    padding: 12,
    marginBottom: 10,
  },

  profileTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#373735",
    marginBottom: 16,
  },

  // PROFILE INFORMATION

  profileInfoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginRight: 18,
    resizeMode: "cover",
  },

  userInfo: {
    flex: 1,
  },

  name: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },

  username: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 7,
  },

  bio: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 15,
  },

  // FOLLOWER / FRIEND INFO

  statsRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 25,
  },

  stat: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 12,
    fontWeight: "700",
    color: "#373735",
  },

  statLabel: {
    fontSize: 9,
    color: "#6B7280",
  },

  // PROFILE BUTTONS

  profileActions: {
    flexDirection: "row",
    gap: 6,
    marginTop: 14,
  },

  profileButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#BDB1A0",

    alignItems: "center",
  },

  profileButtonText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#373735",
  },

  friendIconButton: {
    width: 36,
    height: 32,

    borderRadius: 5,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#D1D5DB",

    alignItems: "center",
    justifyContent: "center",
  },

  // PUBLIC TASKS

  sectionHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#373735",
    marginVertical: 8,
    marginLeft: 5,
    marginBottom: 15,
  },

  listContent: {
    paddingBottom: 100,
    paddingLeft: 10,
    paddingRight: 10,
  },

  emptyText: {
    fontSize: 13,
    color: "#6B7280",
    margin: 10,
  },

  // TASK CARDS

  taskCard: {
    backgroundColor: "#FFFFFF",

    padding: 14,

    marginBottom: 10,

    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,

    elevation: 2,
  },

  taskTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },

  badge: {
    alignSelf: "flex-start",

    paddingHorizontal: 8,
    paddingVertical: 3,

    borderRadius: 8,

    marginBottom: 5,
  },

  completedBadge: {
    backgroundColor: "#B8B7A0",
  },

  incompleteBadge: {
    backgroundColor: "#BDB1A0",
  },

  badgeText: {
    fontSize: 9,
    fontWeight: "600",
    color: "#374151",
  },

  description: {
    fontSize: 10,
    color: "#6B7280",
  },

  dueDate: {
    fontSize: 9,
    color: "#6B7280",

    textAlign: "right",

    marginTop: 8,
    marginBottom: 8,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },

  completeButton: {
    flex: 1,

    paddingVertical: 9,

    borderRadius: 6,

    alignItems: "center",

    backgroundColor: "#BDB1A0",
  },

  completeButtonText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#373735",
  },

  detailsButton: {
    flex: 1,

    paddingVertical: 9,

    borderRadius: 6,

    alignItems: "center",

    backgroundColor: "#E1DAD6",
  },

  detailsButtonText: {
    fontSize: 10,
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

  editProfileModal: {
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

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#373735",
    marginBottom: 18,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 10,
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#F7F8FA",

    borderWidth: 1,
    borderColor: "#D1D5DB",

    borderRadius: 9,

    padding: 11,

    fontSize: 14,
    color: "#373735",
  },

  bioInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },

  errorText: {
    fontSize: 12,
    color: "#B91C1C",
    marginTop: 10,
  },

  modalButtonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
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

  saveProfileButton: {
    flex: 1,

    padding: 11,
    borderRadius: 9,

    backgroundColor: "#6F6E60",

    alignItems: "center",
  },

  saveProfileButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
