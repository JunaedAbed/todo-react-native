import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors";

export default class AddListModal extends Component {
  backgroundColors = [
    "#d09292",
    "#83bb83",
    "#bb83bb",
    "#c99dd5",
    "#F39A27",
    "#03C03C",
    "#00C891",
    "#FF5D1A",
  ];
  state = {
    name: "",
    color: this.backgroundColors[0],
  };

  renderColors() {
    return this.backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        />
      );
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity
          style={{ position: "absolute", top: 30, right: 25 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={28} color={colors.grey} />
        </TouchableOpacity>

        <View style={{ alignSelf: "stretch", marginHorizontal: 20 }}>
          <Text style={styles.title}>Create Todo List</Text>

          <TextInput
            style={styles.input}
            placeholder="Title.."
            onChangeText={(text) => this.setState({ name: text })}
          />

          <TouchableOpacity style={[styles.create]}>
            <AntDesign name="plus" size={28} color={colors.seaGreen} />
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.seaGreen,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.seaGreen,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 20,
    height: 50,
    width: 50,
    borderColor: colors.seaGreen,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
});
