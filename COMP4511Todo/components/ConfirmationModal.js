import React from "react";

import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ConfirmationModal({
  visible,
  title,
  message,
  confirmText,
  onCancel,
  onConfirm,
  destructive = false,
}) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.confirmationPopup}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.confirmButton,
                destructive
                  ? styles.destructiveButton
                  : styles.normalConfirmButton,
              ]}
              onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#373735",
    marginBottom: 8,
  },

  message: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 20,
  },

  buttonRow: {
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

  confirmButton: {
    flex: 1,
    padding: 11,
    borderRadius: 9,
    alignItems: "center",
  },

  normalConfirmButton: {
    backgroundColor: "#6F6E60",
  },

  destructiveButton: {
    backgroundColor: "#DC2626",
  },

  confirmButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
