import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function DatePickerField({
  value,
  onChange,
  label = "Due Date",
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getInitialDate = () => {
    if (!value) {
      return new Date();
    }

    const parsedDate = new Date(value);

    if (isNaN(parsedDate.getTime())) {
      return new Date();
    }

    return parsedDate;
  };

  const [pickerDate, setPickerDate] = useState(getInitialDate());

  const confirmDate = () => {
    const formattedDate = pickerDate.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    onChange(formattedDate);
    setShowDatePicker(false);
  };

  return (
    <>
      <Text style={styles.label}>
        {label}
      </Text>

      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowDatePicker(true)}
      >
        <Text
          style={
            value
              ? styles.dateText
              : styles.placeholderText
          }
        >
          {value || "Select due date"}
        </Text>

        <Text style={styles.calendarIcon}>
          📅
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerCard}>
            <Text style={styles.title}>
              Select Due Date
            </Text>

            <DateTimePicker
              value={pickerDate}
              mode="date"
              display="inline"
              minimumDate={new Date()}
              onValueChange={(event, selectedDate) => {
                if (selectedDate) {
                  setPickerDate(selectedDate);
                }
              }}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() =>
                  setShowDatePicker(false)
                }
              >
                <Text style={styles.cancelText}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.doneButton}
                onPress={confirmDate}
              >
                <Text style={styles.doneText}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 18,
    marginBottom: 5,
  },

  dateInput: {
    backgroundColor: "#F7F8FA",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dateText: {
    fontSize: 16,
    color: "#111827",
  },

  placeholderText: {
    fontSize: 16,
    color: "#9CA3AF",
  },

  calendarIcon: {
    fontSize: 18,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  pickerCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#373735",
    marginBottom: 12,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 9,
    backgroundColor: "#E1DAD6",
    alignItems: "center",
  },

  cancelText: {
    color: "#373735",
    fontWeight: "600",
  },

  doneButton: {
    flex: 1,
    padding: 12,
    borderRadius: 9,
    backgroundColor: "#6F6E60",
    alignItems: "center",
  },

  doneText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});