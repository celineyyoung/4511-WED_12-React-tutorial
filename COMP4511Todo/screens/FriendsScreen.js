import React, { useState } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";

export default function FriendsScreen({
  friends,
  setFriends,
  setCurrentScreen,
  removeFriend,
}) {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newFriendName, setNewFriendName] = useState("");
  const [newFriendUsername, setNewFriendUsername] = useState("");
  const [friendToRemove, setFriendToRemove] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewFriend = () => {
    if (newFriendName.trim() === "") {
      setErrorMessage("Please enter a friend's name.");
      return;
    }

    if (newFriendUsername.trim() === "") {
      setErrorMessage("Please enter a friend's username.");
      return;
    }

    setErrorMessage("");
    addFriend();
  };

  const addFriend = () => {
    const formattedUsername = newFriendUsername.trim().startsWith("@")
      ? newFriendUsername.trim()
      : `@${newFriendUsername.trim()}`;

    const newFriend = {
      id: Date.now().toString(),
      name: newFriendName.trim(),
      username: formattedUsername,
    };

    setFriends([...friends, newFriend]);

    setNewFriendName("");
    setNewFriendUsername("");
    setErrorMessage("");
    setShowAddFriend(false);
  };

  const cancelAddFriend = () => {
    setShowAddFriend(false);
    setNewFriendName("");
    setNewFriendUsername("");
    setErrorMessage("");
  };

  const confirmRemoveFriend = () => {
    if (friendToRemove) {
      removeFriend(friendToRemove.id);
      setFriendToRemove(null);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setCurrentScreen("profile")}>
        <Text style={styles.backButtonText}>← Profile</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Friends List</Text>

      <Text style={styles.subtitle}>People you're connected with</Text>

      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            You haven't added any friends yet.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.friendCard}>
            <View style={styles.friendInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.name.charAt(0).toUpperCase()}
                </Text>
              </View>

              <View>
                <Text style={styles.friendName}>{item.name}</Text>

                <Text style={styles.username}>{item.username}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setFriendToRemove(item)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addFriendButton}
        onPress={() => {
          setErrorMessage("");
          setShowAddFriend(true);
        }}>
        <Text style={styles.addFriendText}>+ Add Friend</Text>
      </TouchableOpacity>

      <Modal
        visible={showAddFriend}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelAddFriend}>
        <View style={styles.modalOverlay}>
          <View style={styles.addFriendModal}>
            <Text style={styles.modalTitle}>Add Friend</Text>

            <Text style={styles.inputLabel}>Name</Text>

            <TextInput
              style={styles.input}
              placeholder="Friend's name"
              value={newFriendName}
              onChangeText={setNewFriendName}
            />

            <Text style={styles.inputLabel}>Username</Text>

            <TextInput
              style={styles.input}
              placeholder="@username"
              value={newFriendUsername}
              onChangeText={setNewFriendUsername}
              autoCapitalize="none"
            />

            {errorMessage !== "" && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={cancelAddFriend}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleNewFriend}>
                <Text style={styles.confirmButtonText}>Add Friend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={friendToRemove !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFriendToRemove(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.removeFriendModal}>
            <Text style={styles.modalTitle}>Remove Friend?</Text>

            <Text style={styles.removeFriendText}>
              Are you sure you want to remove {friendToRemove?.name} from your
              friends?
            </Text>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setFriendToRemove(null)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmRemoveButton}
                onPress={confirmRemoveFriend}>
                <Text style={styles.confirmRemoveText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 100,
  },

  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 30,
  },

  friendCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
  },

  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#BDB1A0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#373735",
  },

  friendName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#373735",
  },

  username: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  removeButton: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 7,
    backgroundColor: "#F3E8E8",
  },

  removeButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#B91C1C",
  },

  addFriendButton: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 30,
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#6F6E60",
    alignItems: "center",
  },

  addFriendText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  addFriendModal: {
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

  removeFriendModal: {
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
    marginBottom: 5,
    marginTop: 10,
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

  errorText: {
    fontSize: 13,
    color: "#B91C1C",
    marginTop: 12,
  },

  removeFriendText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 20,
  },

  modalButtonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
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

  confirmButton: {
    flex: 1,
    padding: 11,
    borderRadius: 9,
    backgroundColor: "#6F6E60",
    alignItems: "center",
  },

  confirmButtonText: {
    fontWeight: "700",
    color: "#FFFFFF",
  },

  confirmRemoveButton: {
    flex: 1,
    padding: 11,
    borderRadius: 9,
    backgroundColor: "#DC2626",
    alignItems: "center",
  },

  confirmRemoveText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
