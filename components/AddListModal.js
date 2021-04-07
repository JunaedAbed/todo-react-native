import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors";

export default class AddListModal extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity
          style={{ position: "absolute", top: 30, right: 25 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={28} color={colors.grey} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
