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
    "#79c7b6",
    "#bb83bb",
    "#c99dd5",
    "#F39A27",
    "#3a5a90",
    "#00C891",
    "#f95959",
    "#9c9c9c",
  ];
  state = {
    name: "",
    color: this.backgroundColors[0],
  };

  createTodo = () => {
    if (this.state.name != "") {
      const { name, color } = this.state;

      tempData.push({
        name,
        color,
        todos: [],
      });

      this.setState({
        name: "",
      });
      this.props.closeModal();
    } else {
      this.props.closeModal();
    }
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
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: this.state.color }]}
        behavior="padding"
      >
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            {this.renderColors()}
          </View>

          <TouchableOpacity style={[styles.create]} onPress={this.createTodo}>
            <AntDesign name="plus" size={28} color={colors.grey} />
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
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1.25,
    borderColor: colors.black,
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
    borderColor: colors.black,
    borderWidth: 1.25,
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 0.5,
  },
});
